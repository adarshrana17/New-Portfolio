# Adarsh Rana — Frontend Developer Portfolio

A modern, production-grade personal portfolio website engineered with **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Designed with a high-end dark SaaS product design aesthetic, tailored specifically for job applications and client opportunities.

---

## 🚀 Quick Start

From the `my-react-app` directory:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

The dev server will run locally at `http://localhost:5173/` (or `http://localhost:5174/`).

---

## 🎨 Design System & Aesthetics

- **Primary Theme**: Deep charcoal/near-black canvas (`#08090d`, `#0e121b`)
- **Accent Palette**: Electric indigo/violet (`#6366F1`, `#818CF8`) with cyan highlights
- **Typography**: Google Fonts — *Plus Jakarta Sans* (headlines & body) and *JetBrains Mono* (code, tags, specs)
- **Visual Polish**: Subtle dot/grid matrix overlays, glassmorphic panels (`backdrop-blur-xl`), glowing borders, micro-interactions
- **Interactivity**: Smooth spring physics cursor trailer, active section navigation spy, interactive category filters, and animated modals

---

## 📸 Adding Your Photos & Screenshots

All images use the **`<ImagePlaceholder />`** component. If an image file hasn't been placed in the folder yet, the website displays an engineered, high-tech preview container showing the exact filename, target aspect ratio, and recommended dimensions.

To add your own real photos, simply place your files into `public/images/`:

| Asset File | Section / Purpose | Recommended Specs |
|---|---|---|
| `profile.jpg` | Hero Profile Photo | 600 × 600 px (1:1 square) |
| `about-profile.jpg` | About Section Portrait | 600 × 750 px (4:5 portrait) |
| `project-travelsync.jpg` | TravelSync Project Card | 1200 × 750 px (16:10) |
| `project-youtube.jpg` | YouTube Clone Project Card | 1200 × 750 px (16:10) |
| `project-shoppyglobe.jpg` | ShoppyGlobe Project Card | 1200 × 750 px (16:10) |
| `project-oauth-search.jpg` | MERN OAuth Image Search Card | 1200 × 750 px (16:10) |
| `travelsync-dashboard.jpg` | TravelSync Browser Showcase (Dashboard Tab) | 1400 × 850 px |
| `travelsync-leads.jpg` | TravelSync Browser Showcase (Leads Tab) | 1400 × 850 px |
| `travelsync-bookings.jpg` | TravelSync Browser Showcase (Bookings Tab) | 1400 × 850 px |
| `travelsync-analytics.jpg` | TravelSync Browser Showcase (Analytics Tab) | 1400 × 850 px |

Your resume PDF can be placed at `public/resume.pdf`.

---

## 🛠️ Project Structure

```
my-react-app/
├── public/
│   ├── images/              # Drop your images & screenshots here
│   │   └── README.md
│   └── resume.pdf           # Drop your resume PDF here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky glassmorphic navbar with active section indicator
│   │   ├── Hero.jsx            # Headline, introduction, CTAs, floating UI badges
│   │   ├── About.jsx           # Concise bio, 4 engineering pillars, portrait frame
│   │   ├── Skills.jsx          # Interactive category tabs & modern tech cards
│   │   ├── Experience.jsx      # Animated timeline for TCY Pvt. Ltd. & TravelSync
│   │   ├── ProjectShowcase.jsx # Flagship browser mockup with multi-tab preview
│   │   ├── Projects.jsx        # Grid of 4 featured projects with quick actions
│   │   ├── ProjectModal.jsx    # Fullscreen deep-dive modal for project architecture
│   │   ├── Contact.jsx         # Message form, one-click email copy & social links
│   │   ├── Footer.jsx          # Semantic footer with back-to-top button
│   │   ├── ImagePlaceholder.jsx# Smart placeholder with fallback styling
│   │   ├── CustomCursor.jsx    # Ambient glow follower (desktop only)
│   │   └── SocialIcons.jsx     # High-fidelity SVG icons for GitHub & LinkedIn
│   ├── data/
│   │   └── portfolioData.js    # Single centralized file for all personal & project data
│   ├── index.css               # Design system tokens, grid patterns, custom scrollbars
│   ├── App.jsx                 # App layout & modal state management
│   └── main.jsx
├── index.html                  # SEO tags, Open Graph meta, Google Fonts
├── vite.config.js              # Vite config with React & Tailwind CSS plugins
└── package.json
```

---

## ✏️ Customizing Content & Links

All portfolio content is decoupled from UI code and centralized in [`src/data/portfolioData.js`](src/data/portfolioData.js). To update your GitHub URL, LinkedIn URL, email, project descriptions, or add new skills, simply update that file!
