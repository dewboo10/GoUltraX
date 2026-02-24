/**
 * Decorative animated network node background SVG.
 * Matches the Goultra.co logo visual language.
 */
export default function NetworkBg({ className = '' }) {
  const nodes = [
    [100, 80], [350, 200], [600, 100], [800, 250], [400, 400],
    [700, 450], [900, 350], [1100, 200], [200, 300], [50, 450], [1200, 400],
  ]

  const lines = [
    [100, 80, 350, 200], [350, 200, 600, 100], [350, 200, 400, 400],
    [600, 100, 800, 250], [800, 250, 700, 450], [400, 400, 700, 450],
    [700, 450, 900, 350], [900, 350, 1100, 200], [1100, 200, 1200, 400],
    [200, 300, 400, 400], [200, 300, 50, 450],
  ]

  return (
    <svg
      className={`absolute inset-0 w-full h-full opacity-10 pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="netGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stopColor="#2563eb" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0d1f3c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#netGrad)" />

      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
      ))}

      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx} cy={cy}
          r={i % 3 === 0 ? 7 : 4}
          fill="#2563eb"
          opacity="0.8"
        />
      ))}
    </svg>
  )
}
