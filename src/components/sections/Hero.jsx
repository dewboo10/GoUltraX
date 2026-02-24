import { NetworkBg } from '@/components/ui'
import { STATS } from '@/constants'

const SERVICE_ICONS = ['🌐', '🤖', '🎨', '📊', '✍️', '🖼️']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero"
    >
      <NetworkBg />

      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border"
            style={{ borderColor: 'rgba(59,130,246,0.4)', background: 'rgba(37,99,235,0.15)', color: '#93c5fd' }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Digital Solutions at Unbeatable Cost
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-none mb-6">
            Grow Smarter,
            <br />
            <span className="text-gradient">Spend Less.</span>
          </h1>

          <p className="text-lg text-blue-100/80 leading-relaxed mb-8 max-w-md">
            GoUltraX.co is your all-in-one digital partner — websites, AI tools, branding,
            design & more. Big-agency quality. Startup-friendly prices.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">Start Your Project →</a>
            <a href="#services" className="btn-outline">Explore Services</a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-14 pt-8 border-t border-white/10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-display font-black text-white">{s.val}</div>
                <div className="text-xs text-blue-200/70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual — orbit card */}
        <div className="hidden md:flex items-center justify-center">
          <div
            className="relative w-80 h-80 rounded-3xl flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(59,130,246,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Center hub */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-display font-black text-white z-10 glow-blue"
              style={{ background: 'linear-gradient(135deg,#2563eb,#1e3a8a)' }}
            >
              G
            </div>

            {/* Orbiting icon nodes */}
            {SERVICE_ICONS.map((icon, i) => {
              const angle = (i / SERVICE_ICONS.length) * 2 * Math.PI - Math.PI / 2
              const r = 110
              const x = Math.cos(angle) * r
              const y = Math.sin(angle) * r
              return (
                <div
                  key={i}
                  className="absolute w-11 h-11 rounded-full flex items-center justify-center text-lg node-float"
                  style={{
                    left:  `calc(50% + ${x}px - 22px)`,
                    top:   `calc(50% + ${y}px - 22px)`,
                    background: 'rgba(37,99,235,0.2)',
                    border: '1px solid rgba(59,130,246,0.4)',
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {icon}
                </div>
              )
            })}

            {/* SVG connector lines */}
            <svg className="absolute inset-0 w-full h-full" aria-hidden>
              {SERVICE_ICONS.map((_, i) => {
                const angle = (i / SERVICE_ICONS.length) * 2 * Math.PI - Math.PI / 2
                const r = 110
                const x = 160 + Math.cos(angle) * r
                const y = 160 + Math.sin(angle) * r
                return (
                  <line
                    key={i}
                    x1="160" y1="160" x2={x} y2={y}
                    stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 4" opacity="0.4"
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80V40C240 0 480 80 720 60C960 40 1200 0 1440 40V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
