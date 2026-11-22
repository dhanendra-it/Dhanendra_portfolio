import Portfolio from "../../assets/mockup/portfolio.webp";
import Nick from "../../assets/mockup/nick.webp";
import Unisarthi from "../../assets/mockup/unisarthi.webp";
import ERP from "../../assets/mockup/bajajErp.webp";

/**
 * Naya project add karna ho to bas ek object niche add kar do — section apne aap
 * lamba ho jayega (scroll length, counter, progress bar sab auto adjust).
 *
 * {
 *   title:       "Project name",
 *   category:    "Full Stack · ERP",        // chhota label
 *   year:        "2026",                    // optional
 *   image:       importedImage,             // mockup/screenshot (1536×925 laptop mockups best lagte hain)
 *   description: "1–2 line summary",
 *   tech:        ["React", "Node.js"],
 *   live:        "https://...",             // optional — button tabhi dikhega jab link ho
 *   github:      "https://github.com/...",  // optional
 * }
 */
export const projects = [
  {
    title: "Coaching ERP",
    category: "Full Stack · ERP",
    year: "2026",
    image: ERP,
    description:
      "Complete coaching management system to manage students, fees, batches, attendance and reports with a powerful dashboard.",
    tech: ["React", "Node.js", "Express", "MySQL", "Tailwind"],
  },
  {
    title: "Portfolio",
    category: "Personal · Web",
    year: "2026",
    image: Portfolio,
    description: "Personal portfolio website showcasing my projects, skills and experience.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/dhanendra-it/Dhanendra_portfolio",
  },
  {
    title: "Nick Makeover's",
    category: "Client · Website",
    year: "2026",
    image: Nick,
    description: "Modern salon website with a clean UI and responsive design.",
    tech: ["React", "Tailwind", "JavaScript"],
  },
  {
    title: "Unisarthi",
    category: "Full Stack · Platform",
    image: Unisarthi,
    description: "Student-focused platform built using PHP and frontend technologies.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
  },
];
