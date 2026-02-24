import { useState, useRef, useEffect } from 'react'

// Quick reply suggestions shown on open
const QUICK_REPLIES = [
  'What services do you offer?',
  'How much does a website cost?',
  'How fast is delivery?',
  'How do I get started?',
]

const BOT_NAME  = 'Aria'
const BOT_EMOJI = '🤖'

// Call our serverless API route
async function sendMessage(messages) {
  const res = await fetch('/api/chat', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ messages }),
  })
  if (!res.ok) throw new Error('Network response was not ok')
  const data = await res.json()
  return data.reply
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
        style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)' }}>
        {BOT_EMOJI}
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-none"
        style={{ background: '#f0f4ff', border: '1px solid #dbeafe' }}>
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isBot = msg.role === 'assistant'
  return (
    <div className={`flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      {isBot && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
          style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)' }}>
          {BOT_EMOJI}
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? 'rounded-bl-none text-gray-800'
            : 'rounded-br-none text-white'
        }`}
        style={
          isBot
            ? { background: '#f0f4ff', border: '1px solid #dbeafe' }
            : { background: 'linear-gradient(135deg,#2563eb,#3b82f6)' }
        }
      >
        {msg.content}
      </div>
    </div>
  )
}

export default function ChatBot() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [hasUnread,setUnread]   = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  // Show greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "👋 Hi! I'm Aria, your GoUltraX.co assistant. I can help you explore our services, pricing, and how to get started. What are you looking for today?",
      }])
    }
  }, [open])

  const handleSend = async (text) => {
    const userText = (text || input).trim()
    if (!userText || loading) return

    const userMsg    = { role: 'user', content: userText }
    const newHistory = [...messages, userMsg]

    setMessages(newHistory)
    setInput('')
    setLoading(true)

    try {
      // Convert to API format (filter out greeting which has no API history)
      const apiMessages = newHistory.map((m) => ({
        role:    m.role,
        content: m.content,
      }))

      const reply = await sendMessage(apiMessages)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role:    'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please DM us on Instagram @GoUltraX.co or use the contact form — we'll get back to you fast! 🙏",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Keyframe styles */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%           { transform: translateY(-6px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes popIn {
          0%   { transform: scale(0.5); opacity: 0; }
          80%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        .chat-window { animation: slideUp 0.25s ease forwards; }
        .fab-btn     { animation: popIn  0.3s ease forwards; }
      `}</style>

      {/* ── Floating Action Button ───────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fab-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)', boxShadow: '0 8px 32px rgba(37,99,235,0.5)' }}
      >
        {/* Unread dot */}
        {hasUnread && !open && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        )}

        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* ── Chat Window ──────────────────────────────────── */}
      {open && (
        <div
          className="chat-window fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl"
          style={{
            width:     'min(380px, calc(100vw - 24px))',
            height:    'min(560px, calc(100vh - 120px))',
            border:    '1px solid rgba(37,99,235,0.15)',
            background: '#ffffff',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 shrink-0"
            style={{ background: 'linear-gradient(135deg,#0d1f3c,#0a2960)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              {BOT_EMOJI}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-white text-sm leading-none">{BOT_NAME}</p>
              <p className="text-xs text-blue-300 mt-0.5">GoUltraX.co Assistant</p>
            </div>
            {/* Online indicator */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-300 font-medium">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}

            {loading && <TypingIndicator />}

            {/* Quick replies — only show after first bot message if no user messages yet */}
            {messages.length === 1 && !loading && (
              <div className="pt-1 space-y-1.5">
                <p className="text-xs text-gray-400 px-1">Quick questions:</p>
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium text-blue-700 transition-all hover:shadow-sm"
                    style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="px-4 py-3 shrink-0"
            style={{ borderTop: '1px solid #f0f0f0', background: '#fafbff' }}
          >
            <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
              style={{ background: '#fff', border: '1.5px solid #e0e7ff' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything…"
                disabled={loading}
                className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400 disabled:opacity-50 min-w-0"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)' }}
                aria-label="Send message"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-center text-gray-400 text-[10px] mt-2">
              Powered by GoUltraX.co · AI may make mistakes
            </p>
          </div>
        </div>
      )}
    </>
  )
}
