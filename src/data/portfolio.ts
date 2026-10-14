/**
 * All editable portfolio content lives here. Update this file to change
 * copy, links, projects, videos, Figma embeds, and contact details — you
 * should not need to edit React components for routine updates.
 */

import { publicUrl } from '@/lib/publicUrl'

export type NavItem = { label: string; href: string }

export type SocialLink = {
  label: string
  href: string
  /** phosphor icon id used by Contact / Footer */
  network: 'linkedin' | 'github'
}

export type Stat = { value: string; label: string }

export type EducationItem = {
  school: string
  location?: string
  credential: string
  dates: string
  note?: string
}

export type ExperienceItem = {
  role: string
  organization: string
  dates: string
  bullets: string[]
}

export type ProjectCategory = 'systems' | 'dashboards' | 'figma'

export type Project = {
  id: string
  category: ProjectCategory
  title: string
  description: string
  techStack: string[]
  role: string
  problem?: string
  solution?: string
  features?: string[]
  insights?: string
  /** HTML5 video in /public, YouTube, or Google Drive preview URL */
  videoUrl?: string
  poster: string
  screenshots: { src: string; alt: string }[]
  liveUrl?: string
  githubUrl?: string
  figmaUrl?: string
  award?: string
  date?: string
}

export type SkillGroup = { title: string; items: string[] }

export type Certification = {
  title: string
  issuer: string
  date: string
  duration?: string
  trainer?: string
  description?: string
}

export type Award = {
  title: string
  detail: string
  date?: string
}

export const site = {
  title: 'Nikka Mae D. Caldito | IT Graduate & Business Analytics',
  description:
    'Detail-oriented BS Information Technology graduate (Cum Laude) specializing in business analytics, documentation, data, and junior web development. Based in San Jose, Batangas, Philippines.',
  url: 'https://nikkacaldto.github.io/Portfolio_Caldito',
  ogImage: publicUrl('/og-image.svg'),
  author: 'Nikka Mae D. Caldito',
  locale: 'en_PH',
}

export const profile = {
  name: 'Nikka Mae D. Caldito',
  shortName: 'Nikka Caldito',
  firstName: 'Nikka',
  title: 'BS Information Technology Graduate (Cum Laude) | Business Analytics',
  tagline: 'Detail-oriented IT graduate turning data and documentation into clear, actionable insights.',
  location: 'San Jose, Batangas, Philippines',
  email: 'nikkacaldito6@gmail.com',
  phone: '09385319012',
  phoneDisplay: '+63 938 531 9012',
  telHref: 'tel:+639385319012',
  cvHref: publicUrl('/Nikka_Mae_Caldito_CV.pdf'),
  cvDownloadName: 'Nikka_Mae_Caldito_CV.pdf',
  cvLabel: 'Download CV',
}

export const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nikka-mae-caldito-b1a11b31a/?isSelfProfile=true',
    network: 'linkedin',
  },
  { label: 'GitHub', href: 'https://github.com/nikkacaldto', network: 'github' },
]

export const about = {
  body: 'Detail-oriented BS Information Technology graduate, majoring in Business Analytics, with experience in documentation, data management, administrative support, and Microsoft Office applications. Skilled in organizing information, preparing and maintaining documents, managing data, and providing accurate administrative assistance. A highly organized, adaptable, and responsible individual with strong communication, time management, attention to detail, and problem-solving skills. A fast learner who is willing to learn new processes, tools, and responsibilities, with a positive attitude toward professional development.',
}

export const stats: Stat[] = [
  { value: 'Cum Laude', label: 'BSIT, Business Analytics' },
  { value: '7', label: "Dean's Lister semesters" },
  { value: '2', label: 'Internships' },
  { value: '7', label: 'Certifications' },
]

export const education: EducationItem[] = [
  {
    school: 'Batangas State University – The National Engineering University',
    location: 'Marawoy, Lipa City, Batangas',
    credential: 'Bachelor of Science in Information Technology, Major in Business Analytics',
    dates: '2022–2026',
    note: 'Cum Laude (July 2026)',
  },
  {
    school: 'Taysan San Jose Integrated National High School',
    credential: 'Grade 11–12, STEM Track',
    dates: 'Senior High School',
    note: 'With Honors',
  },
]

export const experience: ExperienceItem[] = [
  {
    role: 'IT Officer',
    organization: 'Rancho Blanco',
    dates: 'Oct 15, 2026 – Present',
    bullets: [
      'Assist in maintaining and monitoring the company website, including form and feature checks',
      'Perform website quality assurance covering form functionality, mobile responsiveness, and basic SEO structure',
      'Identify, document, and report website issues, bugs, and inconsistencies',
      'Help manage and update product images and website content as needed',
      'Assist in monitoring website performance and coordinating technical improvements',
      'Support other IT-related tasks and technical operations as assigned',
    ],
  },
  {
    role: 'Compliance Intern',
    organization: 'QNE Software Philippines Inc.',
    dates: 'Feb 9, 2026 – May 13, 2026',
    bullets: [
      'Assisted the team in the documentation and organization of compliance requirements',
      'Supported the customization of requirements to align with regulatory standards',
      'Collaborated with the team to ensure accuracy and completeness of compliance documents',
      'Tested accounting and business software systems to identify errors, bugs, and inconsistencies',
    ],
  },
  {
    role: 'Research & Impact Associate Intern',
    organization: 'Tech Executive Labs I.T Solutions',
    dates: 'Feb 2025 – Feb 2026',
    bullets: [
      'Conducted research on industry trends, markets, and competitors to support business growth',
      'Assisted in tracking and analyzing data to measure organizational impact',
    ],
  },
  {
    role: 'Service Crew',
    organization: "McDonald's JP Laurel",
    dates: 'April 2023 – 2023',
    bullets: [
      'Delivered quick and friendly customer service',
      'Kept dining and kitchen areas clean',
      'Assisted in food preparation and safety',
      'Worked with team members to ensure smooth operations',
    ],
  },
]

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'systems', label: 'Systems' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'figma', label: 'UI/UX (Figma)' },
]

const projectEntries: Project[] = [
  {
    id: 'system-coal-combustion',
    category: 'systems',
    title: 'ES - COAL COMBUSTION ON POWERPLANTS',
    description:
      'Academic system project on coal combustion in power plants, with a project archive and a recorded walkthrough hosted on Google Drive.',
    techStack: [],
    role: 'Developer',
    poster: '/projects/system-coal-combustion.svg?v=2',
    screenshots: [],
    liveUrl: 'https://drive.google.com/drive/folders/1-zmovihZBIUC3FaY18wb8Q0dNRJWMnFW',
  },
  {
    id: 'system-cinema-buz',
    category: 'systems',
    title: "Niki's Cinema Buz",
    description:
      'Cinema-related system documented with a short recorded walkthrough on Google Drive.',
    techStack: [],
    role: 'Developer',
    videoUrl: 'https://drive.google.com/file/d/1Gd9CykEw9Irhj0KlsRPINoEVVF2DMw5h/view?usp=sharing',
    poster: '/projects/system-cinema-buz.svg?v=2',
    screenshots: [],
    liveUrl: 'https://drive.google.com/file/d/1Gd9CykEw9Irhj0KlsRPINoEVVF2DMw5h/view?usp=sharing',
  },
  {
    id: 'system-healthcare-appointment',
    category: 'systems',
    title: 'HealthCare Appointment System',
    description:
      'Healthcare appointment system documented with a group project archive and a recorded walkthrough on Google Drive.',
    techStack: [],
    role: 'Developer',
    poster: '/projects/system-healthcare-appointment.svg?v=2',
    screenshots: [],
    liveUrl: 'https://drive.google.com/drive/folders/1EJiY4TlMxOtuxm7Oi9bZYxFWAtdXbNu0?usp=sharing',
  },
  {
    id: 'pbi-e2e',
    category: 'dashboards',
    title: 'Business Intelligence with Power BI (End-to-End Solution)',
    description:
      'Training capstone: a functional Power BI dashboard from data prep through visuals and insight storytelling.',
    techStack: ['Power BI', 'Microsoft Excel', 'DAX'],
    role: 'Analyst (training project)',
    problem:
      'Raw operational tables did not answer basic questions about performance, mix, or exceptions without manual slicing.',
    solution:
      'An end-to-end Power BI model with cleaned tables, measures, and a page layout that highlights trends, drivers, and outliers.',
    features: [
      'Data cleaning and model relationships',
      'KPI cards and trend visuals',
      'Slicers for period, category, and region',
      'Insight callouts for decision-makers',
    ],
    insights:
      'Replace this sentence with 2–3 findings from your dashboard (e.g. which segment drove growth, where exceptions clustered).',
    poster: '/projects/dashboard-pbi-e2e.jpg',
    screenshots: [
      { src: '/projects/dashboard-pbi-e2e.jpg', alt: 'Power BI Financial Report dashboard with KPI cards, revenue trend, map, and product table' },
    ],
  },
  {
    id: 'pbi-capstone',
    category: 'dashboards',
    title: 'Business Intelligence Power BI Desktop with Capstone Project',
    description:
      'July 2024 capstone dashboard that turns Adventure Works sales data into executive KPIs, geographic mix, and category performance.',
    techStack: ['Power BI', 'Microsoft Excel', 'DAX'],
    role: 'Analyst (training capstone)',
    date: 'July 2024',
    problem:
      'Sales, units, cost, and profit lived in separate views, so leadership could not see year-over-year growth, country mix, or category contribution in one place.',
    solution:
      'An executive Power BI page with KPI cards, fiscal-year trends, a units-by-country map, category and country tables, slicers, and written insights for decision-makers.',
    features: [
      'KPI cards for revenue, units, ASP, cost, profit, and margin',
      'Revenue by fiscal year and units sold by country',
      'Category and country breakdown tables',
      'Fiscal year and country slicers with insight callouts',
    ],
    insights:
      'FY2020 delivered the highest sales at $51.88M (47.24% of total) and was 117.42% above FY2018. Bikes drove nearly all revenue versus Accessories.',
    poster: '/projects/dashboard-pbi-capstone.jpg',
    screenshots: [
      {
        src: '/projects/dashboard-pbi-capstone.jpg',
        alt: 'Adventure Works Executive Dashboard in Power BI showing KPIs, map, and sales tables',
      },
    ],
  },
  {
    id: 'figma-creative-clicks',
    category: 'figma',
    title: 'Creative Clicks: UI/UX Design Challenge',
    description:
      'Participant project for the 2024 Talent & Creativity UI/UX Design Challenge.',
    techStack: ['Figma', 'UI/UX'],
    role: 'Participant',
    date: '2024',
    problem: 'Challenge brief: design a clear, usable interface under time and creativity constraints.',
    solution: 'A Figma prototype focused on hierarchy, readable type, and a calm visual system recruiters can scan quickly.',
    features: ['User flow', 'High-fidelity screens', 'Interactive prototype'],
    poster: '/projects/figma-creative-clicks.png?v=1',
    screenshots: [
      {
        src: '/projects/figma-creative-clicks.png?v=1',
        alt: 'Youth Empowerment Hub Website screens from the Creative Clicks UI/UX Design Challenge',
      },
    ],
    figmaUrl:
      'https://www.figma.com/design/ptsifHmxqMZPM5xX4W1K18/lofi-figma-ui-ux?node-id=15-58&t=awgMcgt3ZhoTOGn6-1',
    award: 'Participant, 2024',
  },
  {
    id: 'figma-sustainovative',
    category: 'figma',
    title: 'Sustainovative: CICS SDG Pitch Challenge',
    description:
      'Pitch and UI concept for a sustainability-focused solution. 3rd Place, November 2025.',
    techStack: ['Figma', 'UI/UX', 'Pitch'],
    role: 'Designer & presenter',
    problem: 'Communicate an SDG-aligned idea that is both visually clear and operationally believable.',
    solution: 'A Figma prototype and pitch narrative that pair the problem, users, and a simple product path.',
    features: ['Problem framing', 'Key screens', 'Prototype for demo'],
    poster: '/projects/sustainovative-sdg-pitch.jpg',
    screenshots: [
      {
        src: '/projects/sustainovative-sdg-pitch.jpg',
        alt: 'Sustainovative team receiving 3rd Place at the CICS SDG Pitch Challenge',
      },
    ],
    figmaUrl: 'https://www.figma.com/proto/YOUR_SUSTINOVATIVE_FILE',
    award: '3rd Place, Nov 2025',
  },
]

export const projects: Project[] = projectEntries.map((project) => ({
  ...project,
  poster: publicUrl(project.poster),
  screenshots: project.screenshots.map((shot) => ({ ...shot, src: publicUrl(shot.src) })),
}))

export const skillGroups: SkillGroup[] = [
  { title: 'Programming & Web Dev', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'] },
  { title: 'Data Visualization & Analysis', items: ['Power BI', 'Microsoft Excel'] },
  { title: 'UI/UX Design', items: ['Figma'] },
  { title: 'Project Management & Collaboration', items: ['Documentation', 'Team coordination', 'Requirement tracking'] },
  { title: 'Basic Troubleshooting & Problem-Solving', items: ['Software testing', 'Issue logging', 'Root-cause notes'] },
  { title: 'Soft skills', items: ['Communication', 'Time Management', 'Attention to Detail', 'Adaptability'] },
  { title: 'Tools', items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'] },
]

export const certifications: Certification[] = [
  {
    title: 'Receiving and Responding to Workplace Communication',
    issuer: 'TESDA Online Program',
    date: 'Aug 2026',
  },
  {
    title: 'Cum Laude, BSIT Major in Business Analytics',
    issuer: 'Batangas State University',
    date: 'July 2026',
  },
  {
    title: 'Step-by-step Road Map to Land a Data Analyst',
    issuer: 'Professional training',
    date: 'Dec 2025',
  },
  {
    title: 'Microsoft Power BI Desktop End-to-End Solution for Freelancers',
    issuer: 'DataSense Analytics',
    date: 'February 4, 2025',
    duration: '4 hours',
    trainer: 'Coach Abraham Avila Jr.',
    description:
      'Completed a 4-hour training session covering the fundamentals of Microsoft Power BI Desktop, including transforming raw data into meaningful visualizations and actionable business insights.',
  },
  {
    title: 'Business Intelligence Power BI Desktop with Capstone Project',
    issuer: 'Professional training',
    date: 'July 2024',
  },
  {
    title: 'Querying Fundamentals with MySQL Essentials for Beginners',
    issuer: 'Professional training',
    date: 'July 2024',
  },
  {
    title: 'Fundamentals of Statistics with Microsoft Excel',
    issuer: 'Professional training',
    date: 'July 2024',
  },
]

export const awards: Award[] = [
  {
    title: "Dean's Lister, BatStateU",
    detail:
      '1st Year (1st & 2nd Sem), 2nd Year (1st Sem), 3rd Year (1st & 2nd Sem), 4th Year (1st & 2nd Sem)',
  },
  {
    title: 'With Honors',
    detail: 'Taysan San Jose Integrated National High School (Grade 11–12, STEM)',
  },
  {
    title: 'Sustainovative: The CICS SDG Pitch Challenge',
    detail: '3rd Place',
    date: 'Nov 2025',
  },
  {
    title: 'Creative Clicks: UI/UX Design Challenge',
    detail: 'Participant — Talent & Creativity',
    date: '2024',
  },
  {
    title: 'Business Intelligence with Power BI (End-to-End Solution)',
    detail: 'Training project — created a functional dashboard',
  },
  {
    title: 'TechSynergy 2023',
    detail: 'BatStateU JPCS',
    date: '2023',
  },
  {
    title: 'Infographics Contest on Disaster Resilience',
    detail: 'BatStateU',
    date: 'Oct 2023',
  },
  {
    title: 'Digital tech seminar',
    detail: 'Bridging concepts and emerging technologies',
    date: 'Dec 2023',
  },
]

export const footer = {
  copyright: '© 2026 Nikka Mae D. Caldito',
}

export function figmaEmbedSrc(figmaUrl: string): string {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`
}

export function isPlaceholderLink(href: string | undefined): boolean {
  if (!href) return true
  return /your-|YOUR_|placeholder|example\.com/i.test(href)
}
