import { useState } from 'react'
import { PROJECTS, PROJECT_CATEGORIES } from '@/constants'
import { ProjectCard } from '@/components/ui'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Our Work</h2>
          <p className="text-gray-500 mt-4">Real projects. Real results.</p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'text-white shadow-md bg-brand-gradient'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            No projects in this category yet — check back soon!
          </p>
        )}

        
      </div>
    </section>
  )
}
