import { useState } from 'react'
import { FAQS } from '@/constants'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 bg-blue-50/50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Common Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between font-display font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={`text-blue-500 text-xl transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
          <a href="#contact" className="btn-primary inline-flex">Ask Us Directly →</a>
        </div>
      </div>
    </section>
  )
}
