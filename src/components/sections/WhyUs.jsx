import { WHY_US, STATS } from '@/constants'
import { NetworkBg } from '@/components/ui'

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Dark card with stats */}
        <div className="relative rounded-3xl p-10 text-white overflow-hidden bg-navy">
          <NetworkBg />
          <div className="relative z-10">
            <p className="section-tag !text-blue-300 mb-4">Why GoUltraX.co?</p>
            <h2 className="text-4xl font-display font-black leading-tight mb-6">
              Big Agency Quality.
              <br />
              <span className="text-gradient">Indie Pricing.</span>
            </h2>
            <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
              We built GoUltraX.co because great digital services shouldn't cost a fortune.
              We combine human creativity with AI efficiency to deliver premium results
              at prices that make sense — for startups, small businesses, and creators.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-display font-black">{s.val}</div>
                  <div className="text-xs text-blue-300 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature points */}
        <div className="space-y-6">
          {WHY_US.map((point, i) => (
            <div key={i} className="flex gap-5 items-start group">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(37,99,235,0.08)' }}
              >
                {point.icon}
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-navy mb-1">{point.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{point.desc}</p>
              </div>
            </div>
          ))}

          <a href="#contact" className="btn-primary inline-flex mt-2">
            Work With Us →
          </a>
        </div>
      </div>
    </section>
  )
}
