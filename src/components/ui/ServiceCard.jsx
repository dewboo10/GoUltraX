export default function ServiceCard({ service }) {
  const { icon: Icon, title, shortDesc, tag, features } = service

  return (
    <div className="group relative p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-card-gradient">
      {/* Popular badge */}
      {tag && (
        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full text-white bg-brand-gradient">
          {tag}
        </span>
      )}

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '1px solid #bfdbfe' }}
      >
        <Icon size={28} weight="duotone" color="#2563eb" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-display font-bold text-navy mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{shortDesc}</p>

      {/* Feature tags */}
      {features && (
        <div className="flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span key={f} className="px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100">
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Hover bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-brand-gradient" />
    </div>
  )
}