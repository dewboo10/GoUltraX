// api/chat.js — Vercel Serverless Function
// Uses Groq's free API (https://console.groq.com) — no cost, very fast.
//
// Deploy to Vercel and set GROQ_API_KEY in your project's
// Environment Variables dashboard (Settings → Environment Variables).
const SYSTEM_PROMPT = `You are Aria, a friendly and knowledgeable AI assistant for Goultrax.com — a premium digital agency delivering world-class digital services.

Your personality: warm, confident, professional, and enthusiastic about helping businesses grow.

About Goultrax.com:
- We deliver premium quality digital services with dedicated support
- Average turnaround: 48–72 hours
- 500+ projects delivered, 98% client satisfaction
- Contact: Instagram @goultra.co | Email: hello@goultrax.com

Services we offer:
1. Website Development
   - Custom React/Next.js sites, mobile-first, SEO optimised, 30-day support included

2. AI Tools and Automation
   - Custom chatbots, workflow automation, API integrations

3. Prompt Engineering
   - Expert prompts for ChatGPT, Midjourney, Claude

4. Logo and Brand Design
   - Logo, brand kit, colour palette, typography, social media kit

5. Graphic Designing
   - Social media posts, banners, thumbnails, presentations, print assets

6. Data Cleaning
   - Deduplication, normalisation, CSV, Excel, SQL

Payment:
- We accept direct bank wire transfers
- Once you confirm your project, we share our bank details for payment
- Simple, secure, no middlemen

How to handle inquiries:
- NEVER mention specific prices or say our services are cheap or low cost
- If asked about pricing, say pricing depends on project scope and to get in touch for a custom quote
- Position us as a premium quality agency that delivers exceptional value
- If someone is ready to start, direct them to the contact form or DM @goultra.co on Instagram
- Keep responses short, 2 to 4 sentences max
- Never use markdown formatting like ** or ## or bullet dashes in your responses
- Write in plain conversational sentences with natural line breaks only
- Never make up services not listed above
- If asked something unrelated, politely redirect to how you can help with digital services`

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
