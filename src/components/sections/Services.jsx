import { SERVICES } from '@/constants'
import { ServiceCard } from '@/components/ui'

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">Services Built for Results</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Every service is crafted to maximise impact — at a price that makes sense
            for your business stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary inline-flex">
            Get a Custom Quote →
          </a>
        </div>
      </div>
    </section>
  )
}
