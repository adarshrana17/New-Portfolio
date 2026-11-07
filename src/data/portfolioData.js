export const personalInfo = {
  name: "Adarsh Rana",
  firstName: "Adarsh",
  lastName: "Rana",
  initials: "AR",
  role: "Full Stack Engineer",
  subRole: "Full Stack Engineer | • React • Node.js",
  tagline: "I build responsive web applications, enterprise CRM platforms, and full-stack solutions using React, Node.js, Express, and Tailwind CSS. Specializing in component-driven UI architecture, REST API integrations, and robust user workflows.",
  greeting: "Hi, I'm",
  shortIntro: "Full Stack Engineer focused on building responsive web applications and backend services using React, Node.js, Express.js, MongoDB, and SQL, with an emphasis on clean architecture, reliable APIs, and maintainable code.",
  stats: [
    { label: "Years Experience", numericValue: 1, suffix: "+", value: "1+" },
    { label: "Projects Completed", numericValue: 7, suffix: "+", value: "7+" },
    { label: "Technologies & Tools", numericValue: 15, suffix: "+", value: "15+" }
  ],
  aboutHeading: "Engineering robust, data-driven platforms from UI components to backend APIs.",
  aboutDescription: [
    "On the frontend, I engineer modular user interfaces and data-heavy admin dashboards using React, JavaScript, and Tailwind CSS. My focus centers on architecting complex data grids, faceted filtering systems, dynamic form workflows, and role-based access controls for enterprise platforms.",
    "On the backend, I design resilient REST APIs and application services using Node.js and Express.js, backed by MongoDB and SQL databases. I implement end-to-end CRUD pipelines, structured data validation, authentication, and state management that ensure platform reliability and speed."
  ],
  highlights: [
    {
      title: "Admin Dashboards & Portals",
      desc: "Building role-based operational consoles with live data tables, filtering pipelines, and multi-step workflow modals."
    },
    {
      title: "REST APIs & Backend Logic",
      desc: "Developing secure RESTful endpoints in Node.js and Express with structured CRUD operations, error handling, and business rules."
    },
    {
      title: "Database Modeling & Persistence",
      desc: "Designing schemas and managing relational and document databases in MongoDB and SQL for fast, reliable data retrieval."
    },
    {
      title: "Component Systems & UI Polish",
      desc: "Creating reusable React component hierarchies, responsive layouts with Tailwind CSS, and resilient application state."
    }
  ],
  links: {
    github: "https://github.com/adarshrana17",
    linkedin: "https://www.linkedin.com/in/adarshrana17?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    twitter: "https://twitter.com/adarshrana",
    instagram: "https://www.instagram.com/adarshrana_17?exln=dWNvYWRxYnV0Z3di",
    email: "adarshrana540@gmail.com",
    location: "New Delhi, India",
    resume: "/resume.pdf"
  },
  images: {
    heroProfile: "/images/Profile4.png",
    aboutProfile: "/images/Profile4.png"
  }
};

export const experienceData = [
  {
    id: "the-code-yogi",
    company: "The Code Yogi",
    role: "Frontend Developer",
    period: "Sep 2025 - Present",
    status: "Current",
    isCurrent: true,
    location: "Remote / Hybrid",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "REST APIs",
      "WebSockets"
    ],
    highlights: [
      "Developed modular, reusable React component systems used across production client platforms and enterprise dashboards.",
      "Engineered core frontend workflows for TravelSync CRM, including lead management, dynamic quotation builders, and booking pipelines.",
      "Integrated real-time notification feeds and operational event streams using WebSockets, eliminating manual page reloads for team workflows.",
      "Built data-driven admin interfaces featuring faceted filtering, complex data grids, modal workflows, and role-based view permissions.",
      "Collaborated with backend engineers to integrate RESTful endpoints, ensuring type safety, graceful error states, and smooth UI feedback."
    ]
  },
  {
    id: "asyscraft-technologies",
    company: "Asyscraft Technologies",
    role: "Full Stack Developer",
    period: "May 2025 - Aug 2025",
    status: "Completed",
    isCurrent: false,
    location: "Onsite",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL",
      "REST APIs",
      "Git"
    ],
    highlights: [
      "Developed full-stack web applications and administrative consoles, implementing both client-facing React interfaces and server-side logic.",
      "Architected secure RESTful APIs in Node.js and Express.js supporting end-to-end CRUD operations, data validation, and error-handling middleware.",
      "Designed and managed database schemas across MongoDB and SQL, implementing structured queries, indexes, and reliable data persistence.",
      "Built administrative management modules with live data tables, status-tracking pipelines, and automated reporting workflows.",
      "Integrated authentication pipelines and role-based route guards to safeguard sensitive administrative data and user operations."
    ]
  }
];

export const projectsData = [
  {
    id: "traviante-website",
    title: "Traviante Website",
    subtitle: "Travel & Tourism Web Platform",
    category: "Travel & Tourism",
    featured: true,
    role: "Frontend Developer",
    description: "A luxury travel and private aviation exploration platform engineered to showcase curated international travel experiences, detailed day-by-day itineraries, signature trips, private jet/helicopter charters, and educational study programs. Built with React 19, Vite, and Tailwind CSS for exceptional responsiveness and smooth visual storytelling.",
    contributions: [
      "Built responsive SPA using React 19, Vite, and Tailwind CSS with smooth Framer Motion animations.",
      "Engineered interactive SVG destination maps with dynamic geo-centering and country hover effects.",
      "Developed a real-time live chat widget with WebSocket integration, lead intake, and session history.",
      "Implemented day-by-day itinerary modules, search filters, and WCAG 2.1 AA accessibility standards."
    ],
    keyFeatures: [
      "Curated Indian & international destination guides.",
      "Detailed day-to-day tour itineraries & schedules.",
      "Luxury signature trips & private flight charters."
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "Vite"],
    links: {
      live: "https://traviante.com/",
      liveLabel: "Live Website",
      admin: null
    }
  },
  {
    id: "travelsync",
    title: "TravelSync",
    subtitle: "Travel CRM & Operations Management Platform",
    category: "Enterprise CRM",
    featured: true,
    role: "Frontend Developer",
    description: "TravelSync is a dedicated CRM platform for travel agencies that centralizes lead pipelines, booking tracking, and payments. It resolves fragmented agency workflows through real-time customer messaging and automated SLA monitoring.",
    contributions: [
      "Developed responsive dashboard interfaces using React 19, Tailwind CSS, and Radix UI primitives.",
      "Integrated STOMP WebSocket protocols and audio alerts for real-time customer chat notifications.",
      "Implemented robust JWT authentication flows with silent token refresh queues via Axios interceptors.",
      "Designed intuitive management views for lead pipelines, bookings, payments, and document tracking."
    ],
    keyFeatures: [
      "Real-time live chat with STOMP WebSockets and sound alerts.",
      "End-to-end lead tracking and travel booking management.",
      "Role-based access control with automated SLA alert systems."
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Radix UI",
      "STOMP.js",
      "SockJS",
      "Framer Motion",
      "Recharts",
    ],
    links: {
      live: "https://crm.traviante.com/",
      liveLabel: "Live CRM Platform",
      admin: null
    }
  },
  {
    id: "restaurant-management",
    title: "Restaurant Management Application",
    subtitle: "Restaurant Operations & POS Administration Platform",
    category: "Food Tech & Operations",
    featured: false,
    role: "Frontend Developer",
    description: "A restaurant management web application designed to streamline digital food ordering, kitchen operations, and delivery logistics. It resolves operational delays with real-time order tracking, an interactive kitchen display system, multi-tier menu management, and comprehensive sales analytics.",
    contributions: [
      "Developed the interactive Kitchen Display System with live Kanban order stages and elapsed timers.",
      "Implemented real-time Hindi voice soundbox notifications using Web Speech API and synthesized chimes.",
      "Integrated end-to-end delivery dispatching for in-house driver fleets and third-party Rapido logistics.",
      "Designed the analytics dashboard with Recharts to visualize revenue, order metrics, and sales trends."
    ],
    keyFeatures: [
      "Real-time Kitchen Display System with receipt printing",
      "Voice soundbox alerts in Hindi for live incoming orders",
      "Multi-fleet delivery dispatching with Rapido integration"
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Web Audio API",
      "Web Speech API",
      "Server-Sent Events",
      "Razorpay API"
    ],
    links: {
      live: null,
      admin: null
    }
  },
  {
    id: "recruitment-pro",
    title: "Recruitment Pro",
    subtitle: "Talent Acquisition & Recruitment Platform",
    category: "HR Tech",
    featured: false,
    role: "Frontend Developer",
    description: "Recruitment Pro is a multi-tenant hiring platform that streamlines candidate sourcing, job matching, and interview tracking. It eliminates recruiter inefficiencies by centralizing talent acquisition, candidate evaluations, and stage progression into an intuitive, unified workspace.",
    contributions: [
      "Developed an interactive Kanban recruitment pipeline using @dnd-kit and Framer Motion for candidates.",
      "Implemented AI-assisted candidate matching, talent sourcing filters, and dynamic custom field forms.",
      "Integrated WebSocket session sync via STOMP and enforced role-based access guards for Super Admins.",
      "Designed responsive analytics dashboards with Recharts, custom slide-over drawers, and modal flows."
    ],
    keyFeatures: [
      "Interactive Kanban board for candidate stage tracking",
      "AI-driven candidate matching and talent pool sourcing",
      "Automated interview scheduling with Google Meet links"
    ],
    technologies: [
      "React",
      "@dnd-kit",
      "Framer Motion",
      "Recharts",
      "WebSockets (STOMP / SockJS)",
      "jsPDF",
      "SheetJS (XLSX)"
    ], links: {
      live: null,
      admin: null
    }
  },
  {
    id: "byb-admin-panel",
    title: "BYB Admin Panel",
    subtitle: "Operations & Platform Administration Dashboard",
    category: "Admin Dashboard",
    featured: false,
    role: "Frontend Developer",
    description: "An administrative management platform for the BYB Cult fitness ecosystem, designed to oversee user subscriptions, trainer scheduling, and personalized diet charts. It streamlines club operations through automated session approvals, workout content delivery, and centralized member progress tracking.",
    contributions: [
      "Developed responsive admin dashboards and multi-step modal workflows for member and diet management.",
      "Implemented dynamic data tables with server-side pagination, search filters, and schema validations.",
      "Integrated RESTful APIs via Axios and React Query for real-time session approvals and media uploads.",
      "Optimized frontend state handling to prevent cross-tab data leakage and reduced modal render delays."
    ],
    keyFeatures: [
      "Interactive diet chart and nutritional macro builder",
      "Trainer slot scheduling and 1-on-1 session approvals",
      "Member subscription plans and workout media assignments"
    ],
    technologies: [
      "React",
      "TanStack React Query",
      "React Hook Form",
      "Zod",
      "Radix UI",
      "Framer Motion",
      "Lucide React"
    ], links: {
      live: "https://bybcult.com/",
      liveLabel: "BYB Website",
      admin: "https://admin.bybcult.com/",
      playStore: "https://play.google.com/store/apps/details?id=com.tcy.bybcult&pli=1",
      appStore: "https://apps.apple.com/in/app/byb-cult/id6756060978"
    }
  },
  {
    id: "helpmonk-disaster-response",
    title: "HelpMonk – Disaster Response System",
    subtitle: "Disaster Relief & Volunteer Coordination Platform",
    category: "Crisis Response & PWA",
    featured: false,
    role: "Frontend Developer",
    description: "A disaster response and humanitarian volunteer management platform connecting crisis response organizations, relief donors, NGOs, grassroots helping groups, and emergency volunteer coordinators.",
    contributions: [
      "Built mobile-first Progressive Web Application (PWA) interfaces optimized for rapid field coordination.",
      "Developed administrative workflows for volunteer dispatch, relief request approvals, and donation coordination.",
      "Engineered resilient frontend states, offline-friendly caching, and lightweight responsive UI flows.",
      "Implemented intuitive donor and organization management interfaces with clear status visualizations."
    ],
    keyFeatures: [
      "PWA field application engineered for fast loading and low-bandwidth resilience.",
      "Multi-stakeholder coordination hub for NGOs, corporate donors, and volunteer teams.",
      "Emergency relief request tracking, resource allocation, and dispatch management."
    ],
    technologies: ["React", "PWA", "JavaScript", "Tailwind CSS", "REST APIs", "Offline Storage"],
    links: {
      live: "https://helpmonk.in/",
      liveLabel: "Live Website",
      admin: "https://portal.helpmonk.in/login"
    }
  },
  {
    id: "pridecoop",
    title: "Pridecoop",
    subtitle: "Cooperative Administration & Quality Assurance",
    category: "Quality Assurance & Admin",
    featured: false,
    role: "Frontend Developer & QA Contributor",
    description: "Pridecoop Admin Panel is an operations portal for a waste recycling platform. It streamlines scrap pickup logistics, regional hub coverage, field staff operations, waste catalog pricing, and coin-to-voucher reward campaigns to manage end-to-end circular economy workflows efficiently.",
    contributions: [
      "Developed responsive role-based admin dashboards for Master and Hub Admins using React and PrimeReact.",
      "Implemented Axios request/response interceptors for silent JWT refresh and automated token recovery.",
      "Integrated interactive analytics charts using Recharts to track pickup trends and recycling metrics.",
      "Optimized client-side error handling by sanitizing raw database exceptions into readable user alerts."
    ],
    keyFeatures: [
      "Pickup order lifecycle tracking and staff reassignment",
      "Scrap material catalog pricing and coin conversion rules",
      "Voucher reward campaigns with bulk coupon code uploads"
    ],
    technologies: [
      "React",
      "PrimeReact",
      "Recharts",
      "Axios",
      "Lucide React",
      "CSS3",
      "REST APIs"
    ], links: {
      live: "https://pridecoop.com/",
      liveLabel: "Live Website",
      admin: "https://admin-panel.pridecoop.com/login"
    }
  }
];

export const skillsData = {
  frontend: {
    title: "Frontend Architecture",
    category: "frontend",
    skills: [
      { name: "React.js", level: "Proficient", icon: "Atom", isCore: true },
      { name: "JavaScript (ES6+)", level: "Proficient", icon: "FileCode2", isCore: true },
      { name: "Tailwind CSS", level: "Proficient", icon: "Flame", isCore: true },
      { name: "HTML5 & Semantic UI", level: "Proficient", icon: "Code2", isCore: true },
      { name: "CSS3 & Modern Layouts", level: "Proficient", icon: "Palette", isCore: true },
      { name: "Redux Toolkit", level: "Working Knowledge", icon: "Layers" }
    ]
  },
  backend: {
    title: "Backend & APIs",
    category: "backend",
    skills: [
      { name: "Node.js", level: "Proficient", icon: "Server", isCore: true },
      { name: "Express.js", level: "Proficient", icon: "Cpu", isCore: true },
      { name: "RESTful APIs", level: "Proficient", icon: "Network", isCore: true },
      { name: "CRUD Architecture", level: "Proficient", icon: "Boxes", isCore: true }
    ]
  },
  database: {
    title: "Databases & Storage",
    category: "database",
    skills: [
      { name: "MongoDB", level: "Proficient", icon: "HardDrive", isCore: true },
      { name: "SQL / MySQL", level: "Proficient", icon: "Database", isCore: true },
      { name: "Data Modeling", level: "Working Knowledge", icon: "Table2" }
    ]
  },
  tools: {
    title: "Tools & Workflows",
    category: "tools",
    skills: [
      { name: "Git & GitHub", level: "Proficient", icon: "GitBranch", isCore: true },
      { name: "Postman", level: "Proficient", icon: "Send", isCore: true },
      { name: "Vite", level: "Proficient", icon: "Zap", isCore: true },
      { name: "VS Code", level: "Proficient", icon: "Terminal", isCore: true },
    ]
  },
  learning: {
    title: "Currently Learning & Exploring",
    category: "learning",
    skills: [
      { name: "Next.js (App Router)", level: "Learning", icon: "Globe" },
      { name: "TypeScript", level: "Learning", icon: "FileCode" },
      { name: "System Design Concepts", level: "Learning", icon: "Workflow" },
      { name: "React Native", level: "Learning", icon: "Phone" }
    ]
  }
};

export const educationData = [
  {
    id: "btech-cse",
    degree: "Master of Computer Applications (MCA)",
    institution: "Chaudhary Charan Singh University, Meerut",
    duration: "2021 - 2023",
    location: "Meerut, Uttar Pradesh",
    score: "First Class with Distinction",
    highlights: [
      "Core coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Software Engineering.",
    ]
  },
  {
    id: "high-school",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Sachdeva Institute of Management and Technology",
    duration: "2018 - 2021",
    location: "Patel Nagar, Delhi",
    score: "First Class with Distinction",
    highlights: [
      "Focused on Programming and Computer Science Fundamentals",
    ]
  }
];

export const navItems = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "about", label: "About Me", icon: "User" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "projects", label: "Projects", icon: "FolderGit2" },
  { id: "skills", label: "Skills", icon: "Cpu" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "contact", label: "Contact", icon: "Mail" }
];