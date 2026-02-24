import { Hero, Services, Projects, WhyUs, FAQ, Contact } from '@/components/sections'

/**
 * Home — landing page composed of section components.
 * To add a new section: create it in src/components/sections, export it, and add here.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <WhyUs />
      <FAQ />
      <Contact />
    </main>
  )
}
