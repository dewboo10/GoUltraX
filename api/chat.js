// api/chat.js — Vercel Serverless Function
// Uses Groq's free API (https://console.groq.com) — no cost, very fast.
//
// Deploy to Vercel and set GROQ_API_KEY in your project's
// Environment Variables dashboard (Settings → Environment Variables).

const SYSTEM_PROMPT = `You are Aria, a friendly and knowledgeable AI assistant for Goultra.co — a digital marketing agency that provides affordable, high-quality digital services.

Your personality: warm, professional, concise, and enthusiastic about helping businesses grow.

About Goultra.co:
- We offer big-agency quality at 60–80% lower cost than traditional agencies
- Average turnaround: 48–72 hours
- 500+ projects delivered, 98% client satisfaction
- Contact: Instagram @goultra.co | Email: hello@goultra.co

Services we offer (with starting prices):
1. Website Development — from $99
   - Custom React/Next.js sites, mobile-first, SEO optimised, 30-day support included

2. AI Tools & Automation — from $149
   - Custom chatbots, workflow automation, OpenAI/LangChain integrations

3. Prompt Engineering — from $49
   - Expert prompts for ChatGPT, Midjourney, Claude; content, image gen, coding

4. Logo & Brand Design — from $59
   - Logo, brand kit, colour palette, typography, social media kit

5. Graphic Designing — from $29
   - Social media posts, banners, thumbnails, presentations, print assets

6. Data Cleaning — from $39
   - Deduplication, normalisation, CSV/Excel/SQL, large dataset handling

How to handle inquiries:
- If someone asks about pricing, give the starting price and note they can get a custom quote
- If someone is ready to start, direct them to fill out the contact form on the website or DM @goultra.co on Instagram
- Keep responses short (2–4 sentences max unless they need detail)
- Never make up services or prices not listed above
- Be honest if you don't know something specific
- If asked something unrelated to Goultra.co, politely redirect to how you can help with digital services`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model:       'llama-3.1-8b-instant', // free, very fast on Groq
        max_tokens:  400,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return res.status(response.status).json({ error: err.error?.message || 'Groq API error' })
    }

    const data  = await response.json()
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
