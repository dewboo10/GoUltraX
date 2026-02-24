# Goultra.co — Website

A production-ready React + Vite + Tailwind CSS website for **Goultra.co**, a digital marketing agency offering affordable services.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📁 Project Structure

```
goultra-co/
├── public/                   # Static assets (favicon, OG images)
├── src/
│   ├── assets/               # Images, logos (import in components)
│   ├── components/
│   │   ├── layout/           # NavBar, Footer (wraps every page)
│   │   ├── sections/         # Page sections (Hero, Services, …)
│   │   └── ui/               # Reusable atoms (Logo, ServiceCard, …)
│   ├── constants/            # All content data (services, projects, …)
│   │   ├── index.js          # Re-exports + FAQs, Stats, Nav links, Brand
│   │   ├── services.js       # SERVICES array
│   │   └── projects.js       # PROJECTS array + categories
│   ├── hooks/
│   │   └── useScrolled.js    # Scroll-position hook for NavBar
│   ├── pages/
│   │   └── Home.jsx          # Landing page (composes sections)
│   ├── styles/
│   │   └── index.css         # Tailwind directives + global utilities
│   ├── App.jsx               # Router + layout shell
│   └── main.jsx              # React entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ✏️ Customising Content

All site content lives in **`src/constants/`** — no need to touch component files.

| File | What to edit |
|------|-------------|
| `constants/index.js` | Brand name, email, Instagram, nav links, FAQs, stats, Why Us points |
| `constants/services.js` | Service cards (title, icon, description, price) |
| `constants/projects.js` | Portfolio items (title, category, image, description, tags) |

### Replacing project images
1. Drop your images into `src/assets/projects/`
2. Import them in `constants/projects.js`:
   ```js
   import alphaImg from '@/assets/projects/alpha.jpg'
   // then use: image: alphaImg
   ```

---

## 🎨 Theming

All brand colours are in `tailwind.config.js`:

```js
colors: {
  navy:  { DEFAULT: '#0d1f3c', ... },
  brand: { blue: '#2563eb', lightBlue: '#3b82f6', sky: '#60a5fa' },
}
```

Global utility classes (`.btn-primary`, `.section-title`, `.text-gradient`, etc.) are in `src/styles/index.css`.

---

## 📄 Adding New Pages

1. Create `src/pages/YourPage.jsx`
2. Add a route in `src/App.jsx`:
   ```jsx
   <Route path="/your-page" element={<YourPage />} />
   ```
3. Add a link to `NAV_LINKS` in `src/constants/index.js`

---

## 🤖 AI Chatbot (Aria)

The site includes a floating AI assistant called **Aria** that knows all about Goultra.co's services, pricing, and how to get started.

### Setup (Local Development)

**Step 1 — Get an API key**
- Sign up at [console.anthropic.com](https://console.anthropic.com/)
- Create an API key

**Step 2 — Configure your environment**
```bash
cp .env.example .env
# Edit .env and add your key:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Step 3 — Install new deps and run both servers**
```bash
npm install
npm run dev:full      # starts API server (port 3001) + Vite (port 5173) together
```

Or run them separately in two terminals:
```bash
# Terminal 1
node server.js

# Terminal 2
npm run dev
```

### Deployment (Vercel)

1. Push your code to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. In **Settings → Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-your-key-here`
4. Deploy — the `api/chat.js` serverless function handles all requests securely

### Customising the Chatbot

The system prompt (Aria's personality + knowledge) lives in **`api/chat.js`** (and mirrored in `server.js` for local dev). Edit the `SYSTEM_PROMPT` constant to:
- Update pricing
- Add/remove services
- Change the bot's personality or name
- Add FAQs or canned answers

---



The contact form in `src/components/sections/Contact.jsx` logs to console by default.
To wire it up, replace the `handleSubmit` function with:

- **Formspree**: `fetch('https://formspree.io/f/YOUR_ID', ...)`
- **EmailJS**: `emailjs.send(...)`
- **Your own API**: `fetch('/api/contact', ...)`

---

## 🌐 Deployment

Works with any static host:

- **Vercel**: `vercel deploy`
- **Netlify**: drag the `dist/` folder
- **GitHub Pages**: use `vite-plugin-gh-pages`

---

## 📦 Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| React Router | 6 |
| Vite | 5 |
| Tailwind CSS | 3 |

---

Built with ❤️ by **Goultra.co**
