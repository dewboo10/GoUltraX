// Re-export from sub-files so components can import from '@/constants'
export { SERVICES } from './services'
export { PROJECTS, PROJECT_CATEGORIES } from './projects'

export const FAQS = [
  {
    q: 'How affordable are your services really?',
    a: 'We offer prices 60–80% below traditional agencies by leveraging smart AI workflows and lean delivery — without sacrificing quality.',
  },
  {
    q: "What's included in website development?",
    a: 'Design, development, mobile optimisation, basic SEO, and 30 days of free support after launch.',
  },
  {
    q: 'Do you work with startups and individuals?',
    a: 'Absolutely. Most of our clients are early-stage startups, freelancers, and small businesses looking for big-agency results at startup-friendly prices.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Most projects turn around in 48–72 hours. Larger projects like full websites are typically delivered within 5–7 business days.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Yes — all projects include at least 2 revision rounds, and we work with you until you are satisfied.',
  },
  {
    q: 'How do I get started?',
    a: "Just reach out via the contact form or DM us on Instagram @goultra.co. We'll respond within a few hours.",
  },
]

export const STATS = [
  { val: '500+', label: 'Projects Delivered' },
  { val: '98%',  label: 'Client Satisfaction' },
  { val: '80%',  label: 'Cost Savings vs Agencies' },
  { val: '48hr', label: 'Avg Turnaround' },
]

export const WHY_US = [
  {
    icon: '💰',
    title: '60–80% Cheaper',
    desc: 'We use lean AI-powered workflows that cut costs without cutting corners.',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    desc: 'Most projects delivered in 48–72 hours. We move at startup speed.',
  },
  {
    icon: '🎯',
    title: 'Tailored Solutions',
    desc: 'No templates, no cookie-cutter. Every output is built specifically for your needs.',
  },
  {
    icon: '🤝',
    title: 'Long-Term Partner',
    desc: 'We grow with you — from your first logo to your 100th landing page.',
  },
]

export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'About',    href: '/#about' },
  { label: 'FAQ',      href: '/#faq' },
  { label: 'Contact',  href: '/#contact' },
]

export const BRAND = {
  name: 'GoUltraX.com',
  tagline: 'Digital Solutions, Smarter Pricing',
  instagram: 'https://www.instagram.com/goUltraX',
  email: 'hello@goUltraX.co',
}
