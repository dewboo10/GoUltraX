
import { Globe, Robot, PenNib, Palette, Image, Database } from '@phosphor-icons/react'


export const SERVICES = [
  {
    id: 'web-dev',
    icon: Globe,
    Image: '/services/web-dev.png',
    title: 'Website Development',
    shortDesc: 'Blazing-fast, mobile-first websites and web apps tailored to your brand — delivered at a fraction of agency cost.',
    fullDesc: 'We design and develop custom websites from scratch using modern frameworks like React, Next.js, and more. Every site is mobile-first, SEO-optimised, and built to convert.',
    tag: 'Most Popular',
    features: ['Custom Design', 'Mobile Responsive', 'SEO Optimised', '30-day Support'],
  },
  {
    id: 'ai-tools',
    icon: Robot,
    title: 'AI Tools & Automation',
    shortDesc: 'Custom AI workflows, chatbots, and automation pipelines that save time and supercharge productivity.',
    fullDesc: 'We build AI-powered chatbots, document processors, lead gen bots, and workflow automations using OpenAI, LangChain, and more.',
    tag: '',
    features: ['Custom Chatbots', 'Workflow Automation', 'API Integrations', 'Ongoing Maintenance'],
  },
  {
    id: 'prompt-engineering',
    icon: PenNib,
    title: 'Prompt Engineering',
    shortDesc: 'Expert-crafted prompts for ChatGPT, Midjourney, and more — get the outputs you actually need.',
    fullDesc: 'Stop wasting time on bad AI outputs. We engineer precision prompts for content creation, image generation, coding assistants, and more.',
    tag: '',
    features: ['Custom Prompt Sets', 'Model-Specific Tuning', 'Documentation', 'Iteration Support'],
  },
  {
    id: 'logo-branding',
    icon: Palette,
    title: 'Logo & Brand Design',
    shortDesc: 'Memorable logos, brand kits, and visual identities that make your business stand out.',
    fullDesc: 'From a single logo to a complete brand identity system — colours, typography, guidelines, and social assets — we build brands that stick.',
    tag: '',
    features: ['Logo Design', 'Brand Guidelines', 'Colour Palette', 'Social Kit'],
  },
  {
  id: 'marketing-advertising',
  icon: Image,
  title: 'Digital Marketing & Ads',
  shortDesc: 'Performance-driven marketing including Google Ads, social media ads, and eCommerce growth strategies.',
  fullDesc: 'We create and manage high-converting Google Ads, Facebook & Instagram campaigns, eCommerce product listings, and complete digital marketing strategies to drive traffic, leads, and sales.',
  tag: '',
  features: ['Google Ads Management', 'Meta Ads','Product Listing & Optimization','Campaign Strategy & Analytics'],
},
  {
    id: 'data-cleaning',
    icon: Database,
    title: 'Data Cleaning',
    shortDesc: 'Transform messy, inconsistent datasets into clean, analysis-ready data with speed and accuracy.',
    fullDesc: 'We handle deduplication, normalisation, format standardisation, and enrichment for spreadsheets, CRMs, and databases of any size.',
    tag: '',
    features: ['Deduplication', 'Normalisation', 'CSV / Excel / SQL', 'Fast Delivery'],
  },
]
