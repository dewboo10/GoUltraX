import { Routes, Route } from 'react-router-dom'
import { NavBar, Footer } from '@/components/layout'
import { ChatBot } from '@/components/ui'
import Home from '@/pages/Home'

/**
 * App — root component.
 *
 * Adding new pages:
 *   1. Create src/pages/YourPage.jsx
 *   2. Add a <Route path="/your-path" element={<YourPage />} /> below
 *   3. Add the link to NAV_LINKS in src/constants/index.js
 */
export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future routes — uncomment & create pages as needed:
        <Route path="/services"   element={<ServicesPage />} />
        <Route path="/projects"   element={<ProjectsPage />} />
        <Route path="/blog"       element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/pricing"    element={<Pricing />} />
        <Route path="*"           element={<NotFound />} />
        */}
      </Routes>
      <Footer />
      <ChatBot />
    </>
  )
}
