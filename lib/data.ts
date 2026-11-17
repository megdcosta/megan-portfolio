import { asset } from "./asset";

// All site copy lives here so it can be edited without touching layout code.

export const site = {
  name: "Megan D'Costa",
  email: "mdcosta@uoguelph.ca",
  github: "https://github.com/megdcosta",
  githubLabel: "github.com/megdcosta",
  linkedin: "https://linkedin.com/in/megdcosta",
  linkedinLabel: "linkedin.com/in/megdcosta",
  resume: asset("/Megan_DCosta_Resume.pdf"),
  intro:
    "Software Engineering student at the University of Guelph with co-op experience across cybersecurity, data, and quality assurance.",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const education = {
  school: "University of Guelph",
  degree: "Bachelor of Computing in Software Engineering (Co-op)",
  gpa: "82%",
  dates: "Sept 2022 – Apr 2027",
  location: "Guelph, ON",
  honors: "5× College of Engineering & Physical Sciences Dean's Honor List",
  honorTerms: ["F22", "W23", "F23", "W25", "F25"],
};

export type Role = {
  id: string;
  title: string;
  company: string;
  /** Logo file in public/logos/. */
  logo: string;
  dates: string;
  location: string;
  bullets: string[];
};

export const roles: Role[] = [
  {
    id: "cibc",
    logo: asset("/logos/cibc.jpeg"),
    title: "Information Security Coordinator Co-op",
    company: "CIBC",
    dates: "Jan 2026 – Apr 2026",
    location: "Toronto, ON",
    bullets: [
      "Triaged and investigated security alerts within an enterprise SOC environment at one of Canada's largest banks, analyzing phishing and social engineering threats to determine severity and escalate incidents.",
      "Conducted end-to-end incident investigations by correlating logs and security events, documenting findings and managing case lifecycles through a ticketing system.",
      "Monitored security event queues and applied structured analytical frameworks to distinguish false positives from credible threats.",
    ],
  },
  {
    id: "elh",
    logo: asset("/logos/elh.jpeg"),
    title: "Data Analyst Co-op",
    company: "Experiential Learning Hub, University of Guelph",
    dates: "May 2025 – Aug 2025",
    location: "Guelph, ON",
    bullets: [
      "Built an interactive Tableau dashboard visualizing student engagement and co-op program outcomes to support data-driven decisions.",
      "Cleaned and analyzed large co-op student salary datasets using Python, creating interactive visualizations to identify trends across industries and roles.",
      "Authored step-by-step Tableau documentation and maintained organized data repositories for team reproducibility.",
    ],
  },
  {
    id: "camis",
    logo: asset("/logos/camis.jpeg"),
    title: "Quality Assurance Co-op",
    company: "Camis Inc",
    dates: "Sept 2024 – Dec 2024",
    location: "Guelph, ON",
    bullets: [
      "Executed manual regression and exploratory testing on the Parks Canada Reservation System (PCRSV3), identifying and documenting critical defects across 700+ parks in North America.",
      "Authored comprehensive JIRA bug documentation with reproduction steps, screenshots, and root-cause analysis during UAT and client demos.",
      "Supported a Tableau-to-Power BI migration by validating data accuracy and reproducing test scenarios.",
    ],
  },
  {
    id: "deloitte",
    logo: asset("/logos/deloitte.jpeg"),
    title: "Cyber Security Risk Advisory Intern",
    company: "Deloitte",
    dates: "May 2024 – Aug 2024",
    location: "Kuwait City, Kuwait",
    bullets: [
      "Assessed information security controls for a major telecommunications company against ISO 27001 across endpoint security, vendor management, and security governance.",
      "Documented audit findings on control gaps and compliance risks, delivering prioritized remediation recommendations for executives and non-technical stakeholders.",
      "Researched vendor compliance requirements and regional cyber threats to inform risk assessments and security hardening.",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  award?: string;
  description: string;
  /** EDIT STACK BADGES HERE: one string per badge. */
  stack: string[];
  links: { label: string; href: string; kind: "live" | "github" }[];
  /** Path to a screenshot in /public, e.g. "/projects/frij.webp". */
  screenshot: string;
};

export const projects: Project[] = [
  {
    id: "frij",
    name: "frij.io",
    award: "Winner — Best AI App, Hack Canada (Feb 2025)",
    description:
      "A household food management app that keeps track of what's in the pantry, splits grocery costs, and suggests recipes with AI. Receipts are scanned with the Google Vision API, and Perplexity AI recommends recipes and tracks expiry dates. Built to help tackle food insecurity.",
    // ---- STACK BADGES (frij.io) ----
    stack: ["Next.js", "React", "TypeScript", "Firebase", "Firestore", "Google Vision API", "Perplexity AI"],
    links: [
      { label: "Live App", href: "https://frij.io", kind: "live" },
      { label: "GitHub", href: "https://github.com/megdcosta", kind: "github" },
    ],
    screenshot: asset("/projects/frij.webp"),
  },
];
