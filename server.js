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

const SYSTEM_PROMPT = `You are Aria, a friendly and knowledgeable AI assistant for Goultra.co — a digital marketing agency that provides affordable, high-quality digital services.

Your personality: warm, professional, concise, and enthusiastic about helping businesses grow.

About Goultra.co:
- We offer big-agency quality at 60–80% lower cost than traditional agencies
- Average turnaround: 48–72 hours
- 500+ projects delivered, 98% client satisfaction
- Contact: Instagram @goultra.co | Email: hello@goultra.co

Services (with starting prices):
1. Website Development — from $99
2. AI Tools & Automation — from $149
3. Prompt Engineering — from $49
4. Logo & Brand Design — from $59
5. Graphic Designing — from $29
6. Data Cleaning — from $39

Keep responses to 2–4 sentences. If someone is ready to start, direct them to the contact form or Instagram @goultra.co.`

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
      from:    'Goultra.co <onboarding@resend.dev>',
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
      from:    'Goultra.co <onboarding@resend.dev>',
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
