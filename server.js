// server.js — Local development server for testing the /api/chat endpoint
// Run alongside Vite:  node server.js
// Vite proxies /api → this server (see vite.config.js proxy setting)
//
// Install once:  npm install  (already includes express, cors, dotenv, concurrently)
// Then run:      npm run dev:full   (starts both this server + Vite together)

import 'dotenv/config'
import express from 'express'
import cors    from 'cors'
import { Resend } from 'resend'

const app  = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

console.log('RESEND KEY:', process.env.RESEND_API_KEY ? '✅ loaded' : '❌ missing')
console.log('GROQ KEY:',   process.env.GROQ_API_KEY   ? '✅ loaded' : '❌ missing')
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

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Set GROQ_API_KEY in your .env file — get it free at console.groq.com' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model:       'llama-3.1-8b-instant',
        max_tokens:  400,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
      }),
    })

    const data  = await response.json()
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response."
    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})
app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body

  // ✅ guard BEFORE new Resend()
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Set RESEND_API_KEY in your .env file' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Goultrax.com <hello@goultrax.com>',
      to:      'devanshusaxena8@gmail.com',
      replyTo: email,
      subject: `New inquiry: ${service}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    await resend.emails.send({
      from:    'Goultrax.com <hello@goultrax.com>',
      to:      email,
      subject: `We got your message, ${name}! 🎉`,
      html: `
        <h2>Thanks for reaching out!</h2>
        <p>Hi ${name}, we received your inquiry about <strong>${service}</strong> and will get back to you within a few hours.</p>
        <p>— Team Goultra.co</p>
      `,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send email' })
  }
})



app.listen(PORT, () => {
  console.log(`✅ Dev API server running at http://localhost:${PORT}`)
  console.log(`   Groq model: llama-3.1-8b-instant`)
})
