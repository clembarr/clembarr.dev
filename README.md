# clembarr.dev - Portfolio & Blog

[![Built with React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-FF0055?style=flat)](https://www.framer.com/motion/)

> Personal portfolio and blog showcasing software development projects, research, and technical articles.

**Live Site**: [https://clembarr.dev](https://clembarr.dev)

---

## ✨ Features

### 🎨 Modern Design
- **Contemporary Digital Craft** aesthetic with refined minimalism
- Dual theme support (Light/Dark) with smooth transitions
- Fully responsive design (mobile-first approach)
- Custom color palette with CSS variables
- Glassmorphism UI elements

### 🚀 Performance Optimized
- **PWA (Progressive Web App)** with offline support
- **Code splitting** - Main bundle: 176 KB gzipped (81% reduction)
- **Lazy loading** for heavy components (Three.js 3D)
- **Service Worker** with intelligent caching strategies
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

### 📝 Blog System
- **Markdown-based** articles with frontmatter metadata
- **Syntax highlighting** for code blocks (rehype-highlight)
- **Auto-generated Table of Contents** with active section tracking
- **Search & Filter** by category, tags, keywords
- **Reading time estimation** (200 words/minute)
- **Related posts** algorithm
- **Multilingual ready** structure

### 🎬 Animations
- **Framer Motion** for smooth, spring-based animations
- **Scroll-triggered** reveals with Intersection Observer
- **Page transitions** with AnimatePresence
- **Hover effects** on interactive elements
- **prefers-reduced-motion** support for accessibility

### 📱 Enhanced UX
- **3D Project Carousel** with Three.js (React Three Fiber)
- **Image Gallery** with zoom (1x-3x), pan, keyboard navigation
- **Web Share API** with clipboard fallback
- **Contact Form** with honeypot, real-time validation, auto-save draft
- **Confetti celebrations** on successful actions
- **Deep linking** for projects and blog posts

### 🔍 SEO Optimized
- **Structured Data (JSON-LD)** for all pages
- **Dynamic meta tags** (Open Graph, Twitter Card)
- **Sitemap.xml** auto-generated
- **robots.txt** configuration
- **Canonical URLs** for all pages
- **Print-friendly** CSS stylesheets

---

## 🛠️ Tech Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.7.2** - Type safety
- **Vite 5.4.10** - Build tool & dev server
- **React Router 7.1.1** - Client-side routing

### Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS
- **@tailwindcss/vite** - Tailwind v4 Vite plugin
- **Custom CSS Variables** - Theming system

### Animation
- **Framer Motion 12.23** - Animation library
- **React Three Fiber 8.15** - Three.js React renderer
- **@react-three/drei 9.96** - Three.js helpers

### Blog & Content
- **gray-matter** - Frontmatter parsing
- **remark** - Markdown processor
- **rehype-highlight** - Code syntax highlighting
- **unified** - Content processing pipeline

### PWA & Performance
- **vite-plugin-pwa 1.2** - PWA plugin
- **workbox-window 7.4** - Service Worker management

### Forms & Validation
- **@emailjs/browser 4.4.1** - Contact form emails
- **DOMPurify 3.2.3** - XSS protection

### Deployment
- **gh-pages** - GitHub Pages deployment
- Custom bash scripts for build pipeline

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/B-a-r-r/clembarr.dev.git
cd clembarr.dev

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

---

## 🚀 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (with hot reload)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint

# SEO & Deployment
npm run sitemap      # Generate sitemap.xml
npm run deploy       # Deploy to GitHub Pages (with build)
npm run deploy:full  # Full deployment with checks and stats
```

### Project Structure

```
src/
├── assets/         # Data, types, constants, and static assets
├── components/     # Reusable React components
│   ├── animations/ # Animation components (ScrollReveal, PageTransition)
│   ├── blog/       # Blog components (BlogCard, ArticleLayout, TOC)
│   ├── effects/    # Visual effects (Confetti)
│   ├── seo/        # SEO components (StructuredData, MetaTags)
│   └── ...
├── content/        # Markdown content
│   └── blog/       # Blog articles
├── pages/          # Page components (Home, Projects, Blog, etc.)
├── utils/          # Utility functions (markdown, blogLoader, etc.)
└── main.tsx        # Application entry point
```

---

## 📝 Adding Blog Posts

Create a new Markdown file in `src/content/blog/`:

```markdown
---
title:
  0: "Your Article Title (English)"
  fr: "Votre Titre d'Article (Français)"
description:
  0: "Short description of the article"
  fr: "Courte description de l'article"
date: 2025-01-15
category: DEVELOPMENT
tags:
  - React
  - TypeScript
  - Web Development
published: true
coverImage: "/path/to/cover-image.jpg"
---

# Your Article Title

Your content here with **markdown** formatting, `code`, etc.

## Code Example

\`\`\`typescript
const example = () => {
  console.log("Hello, World!");
};
\`\`\`
```

The article will automatically appear on `/blog` with:
- Auto-generated Table of Contents
- Reading time estimation
- Syntax highlighting
- Related posts suggestions

---

## 🎨 Customization

### Themes

Themes are defined in `src/index.css` with CSS variables:

```css
.light {
  --color-primary: #f4f4f4;
  --color-secondary: #f1f1f1;
  --color-tertiary: #479561;
  --color-quaternary: #3D3E3C;
  --color-quinary: #4F4F4F;
}

.dark {
  --color-primary: #2F2F2F;
  --color-secondary: #282929;
  --color-tertiary: #7CFFC4;
  --color-quaternary: #71cbb3;
  --color-quinary: #3c3c3c;
}
```

### Tailwind Configuration

Tailwind v4 uses CSS-based configuration in `src/index.css`:

```css
@theme {
  --font-montserrat: "Montserrat", sans-serif;
  --font-hind_vadodara: "Hind Vadodara", sans-serif;
  --breakpoint-xs: 400px;
  --breakpoint-sm: 640px;
  /* ... */
}
```

### Centralized Styles

Common style combinations are in `src/style.tsx`:

```typescript
const styles = {
  page: `w-full h-full text-(--color-quaternary) bg-transparent`,
  heading2: `font-primary-bold 2xl:text-3xl xl:text-2xl ...`,
  flexCol: `flex flex-col`,
  // ...
};
```

---

## 🧪 Testing & QA

### Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify PWA installation works
- [ ] Test offline functionality
- [ ] Run Lighthouse audit (aim for 95+)
- [ ] Verify all links work
- [ ] Test contact form submission
- [ ] Validate HTML (W3C validator)
- [ ] Check accessibility (WAVE tool)

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Largest Contentful Paint**: < 2.5s
- **Total Bundle Size**: < 500 KB (gzipped)

---

## 📊 Build Stats

Current production build:

```
Main bundle:     686 KB  (176 KB gzipped)
CSS bundle:       64 KB   (11 KB gzipped)
vendor-three:    806 KB  (218 KB gzipped) - lazy loaded
vendor-animation: 118 KB  (39 KB gzipped)
vendor-react:    174 KB   (57 KB gzipped)
vendor-utils:     26 KB   (10 KB gzipped)
```

**Total improvement**: 81% reduction in initial load through code splitting.

---

## 🔐 Security

- **XSS Protection**: DOMPurify sanitization for user content
- **HTTPS Only**: Enforced via hosting configuration
- **Content Security Policy**: Set via meta tags
- **Honeypot Field**: Bot detection in contact form
- **Rate Limiting**: Form submission cooldowns
- **No Sensitive Data**: All API keys in environment variables

---

## ♿ Accessibility

- **WCAG 2.1 Level AA** compliant
- **Keyboard navigation**: Full support
- **Screen reader** friendly with ARIA labels
- **Color contrast**: Meets AA standards (4.5:1 minimum)
- **prefers-reduced-motion**: Respects user preference
- **Focus indicators**: Visible on all interactive elements
- **Semantic HTML**: Proper heading hierarchy

---

## 📄 License

This project is for portfolio purposes. All rights reserved.

---

## 👤 Author

**Clément Barrière**
Software Developer & Researcher

- Website: [clembarr.dev](https://clembarr.dev)
- GitHub: [@B-a-r-r](https://github.com/B-a-r-r)
- LinkedIn: [clement-barriere](https://www.linkedin.com/in/clement-barriere)

---

## 🙏 Acknowledgments

- **Icons**: [Boxicons](https://boxicons.com/)
- **Fonts**: Google Fonts (Montserrat, Hind Vadodara, Kanit)
- **3D Graphics**: Three.js community
- **Inspiration**: Modern web design trends and best practices

---

## 📝 Changelog

### v2.0.0 (2025-01)
- ✨ Added complete blog system with Markdown support
- ✨ Implemented Framer Motion animations throughout
- ✨ PWA support with offline functionality
- ✨ SEO optimization with structured data
- ⚡ Performance improvements (81% bundle reduction)
- 🎨 Enhanced contact form with validation
- 🎨 3D project carousel with Three.js
- 🔧 Deep linking for projects and blog posts
- 🔧 Web Share API integration
- 📱 Enhanced mobile responsiveness

### v1.0.0 (2024)
- 🎉 Initial portfolio release
- ✨ Project showcase
- ✨ Contact form
- ✨ Dual theme support
- ✨ Multilingual structure

---

**Built with ❤️ using modern web technologies**
