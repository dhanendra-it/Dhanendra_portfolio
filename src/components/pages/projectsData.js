import Portfolio from "../../assets/mockup/portfolio.webp";
import Nick from "../../assets/mockup/nick.webp";
import Unisarthi from "../../assets/mockup/unisarthi.webp";
import ERP from "../../assets/mockup/bajajErp.webp";

// raw screenshots live in src/assets/screenshots/ and are looked up by file name: screenshot: shot("my-app.png")
const shots = import.meta.glob("../../assets/screenshots/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" });
export const shot = (name) => {
  const hit = Object.entries(shots).find(([path]) => path.endsWith(`/${name}`));
  if (!hit && import.meta.env.DEV) console.warn(`[projects] screenshot "${name}" not found in src/assets/screenshots/`);
  return hit ? hit[1] : undefined;
};

/**
 * Naya project add karna ho to bas ek object niche add kar do — section apne aap
 * lamba ho jayega (scroll length, counter, progress bar sab auto adjust).
 *
 * Easiest: raw screenshot ko src/assets/screenshots/ mein daalo, aur
 *   screenshot: shot("file-name.png")
 * likho. Laptop mockup code se apne aap ban jayega (no Mockuuups, no background removal).
 *
 * {
 *   title:       "Project name",
 *   category:    "Full Stack · ERP",        // chhota label
 *   year:        "2026",                    // optional
 *   screenshot:  shot("my-app.png"),        // raw screenshot -> laptop mockup auto
 *   // image:    importedImage,             // (purana tarika) ready-made mockup PNG/WebP, jaisa hai waisa dikhega
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
