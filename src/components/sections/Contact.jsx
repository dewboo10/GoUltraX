import { useState } from 'react'
import { SERVICES } from '@/constants/services'
import { BRAND } from '@/constants'

const INITIAL = { name: '', email: '', service: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(INITIAL)
  const [submitted, setSubmit] = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to your backend / EmailJS / Formspree
    console.log('Form submitted:', form)
    setSubmit(true)
    setForm(INITIAL)
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* Info */}
        <div>
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title mt-2 mb-6">
            Let's Build Something
            <br />
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Tell us about your project and we'll get back to you within a few hours
            with a custom quote. No commitment. No fluff.
          </p>

          <div className="space-y-4">
            {[
              { icon: '📸', label: 'Instagram', val: '@GoUltraX.co', href: BRAND.instagram },
              { icon: '📧', label: 'Email',     val: BRAND.email,   href: `mailto:${BRAND.email}` },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(37,99,235,0.08)' }}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-400">{c.label}</div>
                  <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {c.val}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl p-8 shadow-xl border border-gray-100 bg-card-gradient">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display font-black text-xl text-navy mb-2">Message Sent!</h3>
              <p className="text-gray-500 text-sm">
                We'll get back to you within a few hours.
              </p>
              <button
                className="btn-primary mt-6 inline-flex"
                onClick={() => setSubmit(false)}
              >
                Send Another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { placeholder: 'Your Name',      field: 'name',  type: 'text'  },
                { placeholder: 'Email Address',  field: 'email', type: 'email' },
              ].map(({ placeholder, field, type }) => (
                <input
                  key={field}
                  type={type}
                  placeholder={placeholder}
                  value={form[field]}
                  onChange={set(field)}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm text-gray-700 transition-all"
                />
              ))}

              <select
                value={form.service}
                onChange={set('service')}
                required
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm text-gray-700 transition-all bg-white"
              >
                <option value="">Select a Service</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Other">Other / Multiple</option>
              </select>

              <textarea
                placeholder="Describe your project..."
                rows={4}
                value={form.message}
                onChange={set('message')}
                required
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm text-gray-700 transition-all resize-none"
              />

              <button type="submit" className="btn-primary w-full py-4 text-base">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
