/**
 * ProjectCard
 * Displays a portfolio project with image, category badge, title, and tags.
 */
export default function ProjectCard({ project }) {
  const { title, category, image, desc, liveUrl, tags } = project

  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full text-white"
          style={{ background: 'rgba(37,99,235,0.85)' }}>
          {category}
        </span>

        {/* Live link on hover */}
        {liveUrl && liveUrl !== '#' && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 px-4 py-1.5 text-xs font-bold text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-brand-gradient"
          >
            View →
          </a>
        )}
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg mb-1 text-navy">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{desc}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
