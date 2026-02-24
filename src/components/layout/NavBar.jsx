import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrolled } from '@/hooks/useScrolled'
import { Logo } from '@/components/ui'
import { NAV_LINKS } from '@/constants'

export default function NavBar() {
  const scrolled   = useScrolled(40)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const isHome = pathname === '/'

  // On non-home pages the nav is always "scrolled" (light bg)
  const solidBg = scrolled || !isHome

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo light={!solidBg} />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                solidBg ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {label}
            </a>
          ))}
          <a href="/#contact" className="btn-primary !px-5 !py-2">
            Get a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden text-2xl transition-colors ${solidBg ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${
          open ? 'max-h-screen shadow-xl' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 space-y-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-700 font-medium border-b border-gray-100 hover:text-blue-600 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="btn-primary block text-center mt-4"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  )
}
