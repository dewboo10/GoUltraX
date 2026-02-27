import { Logo } from '@/components/ui'
import { NAV_LINKS, BRAND } from '@/constants'

export default function Footer() {
  return (
    <footer className="bg-navy py-12 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Logo light showText />
            <p className="mt-4 text-sm text-blue-200/60 leading-relaxed max-w-xs">
              Big-agency quality digital services at startup-friendly prices.
              Let's build something great together.
            </p>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-blue-300 hover:text-white transition-colors"
            >
              📸 @GoUltraX.co
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-blue-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-blue-200/60 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-blue-300 mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-blue-200/60">
              <p>
                📸{' '}
                <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </p>
              <p>
                🔗{' '}
                <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </p>
              <p>
                🚀{' '}
                <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </p>
            {/* </div> */}
              <p className="pt-2">Response within a few hours.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-200/40">
            © {new Date().getFullYear()} GoUltraX.com · All rights reserved
          </p>
          <p className="text-xs text-blue-200/40">
            Built with ❤️ by GoUltraX
          </p>
        </div>
      </div>
    </footer>
  )
}
