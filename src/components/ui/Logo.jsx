/**
 * Goultra.co logo icon — SVG recreation of the network node mark.
 * Props:
 *   size    – pixel size (default 36)
 *   light   – renders white + blue for dark backgrounds
 *   showText – renders the wordmark alongside the icon
 */
export default function Logo({ size = 36, light = false, showText = true }) {
  const center    = light ? 'white'   : '#0d1f3c'
  const spoke     = light ? 'white'   : '#0d1f3c'
  const nodeColor = '#2563eb'

  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="GoUltraX.co logo icon"
      >
        {/* Centre hub */}
        <circle cx="20" cy="20" r="4" fill={center} />

        {/* Outer nodes */}
        <circle cx="20" cy="6"  r="3" fill={nodeColor} />
        <circle cx="34" cy="14" r="3" fill={nodeColor} />
        <circle cx="34" cy="28" r="3" fill={nodeColor} />
        <circle cx="20" cy="34" r="3" fill={nodeColor} />
        <circle cx="6"  cy="28" r="3" fill={nodeColor} />
        <circle cx="6"  cy="14" r="3" fill={nodeColor} />

        {/* Spoke lines */}
        <line x1="20" y1="20" x2="20" y2="6"  stroke={spoke} strokeWidth="1.5" />
        <line x1="20" y1="20" x2="34" y2="14" stroke={spoke} strokeWidth="1.5" />
        <line x1="20" y1="20" x2="34" y2="28" stroke={spoke} strokeWidth="1.5" />
        <line x1="20" y1="20" x2="20" y2="34" stroke={spoke} strokeWidth="1.5" />
        <line x1="20" y1="20" x2="6"  cy="28" stroke={spoke} strokeWidth="1.5" />
        <line x1="20" y1="20" x2="6"  y2="14" stroke={spoke} strokeWidth="1.5" />

        {/* Dashed perimeter accents */}
        <line x1="20" y1="6"  x2="34" y2="14" stroke={nodeColor} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
        <line x1="6"  y1="14" x2="20" y2="34" stroke={nodeColor} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      </svg>

      {showText && (
        <span
          className={`font-display font-black text-xl tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}
        >
          GoUltraX
        </span>
      )}
    </div>
  )
}
