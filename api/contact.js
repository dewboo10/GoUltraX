import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, service, message } = req.body

  try {
    await resend.emails.send({
      from: 'Goultra.co <hello@goultra.co>',
      to:   'devanshusaxena8@gmail.com',          // your inbox
      replyTo: email,                     // so you can reply directly to client
      subject: `New inquiry: ${service}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    // Also send confirmation to the client
    await resend.emails.send({
      from: 'Goultra.co <hello@goultra.co>',
      to:   email,
      subject: `We got your message, ${name}! 🎉`,
      html: `
        <h2>Thanks for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your inquiry about <strong>${service}</strong> and will get back to you within a few hours.</p>
        <p>In the meantime, feel free to DM us on Instagram 
          <a href="https://instagram.com/goultra.co">@goultra.co</a>
        </p>
        <br/>
        <p>— Team Goultra.co</p>
      `,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}