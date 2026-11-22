import {
  SiBlender,
  SiCss3,
  SiElectron,
  SiExpress,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  BrainCircuit,
  Code2,
  Container,
  Database,
  GitBranch,
  Github,
  Orbit,
  PenTool,
  Plug,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Compass } from "lucide-react";

/**
 * Naya skill/tool add karna ho to bas us group ke `items` me ek line add kar do:
 *   { name: "Docker", icon: SiDocker }
 * Icons: https://react-icons.github.io/react-icons/icons/si/ (SiXxx) ya lucide-react.
 */
export const skillGroups = [
  {
    name: "Frontend",
    items: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "React.js", icon: SiReact },
      { name: "Redux", icon: SiRedux },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: Plug },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "SQL", icon: Database },
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    name: "Desktop",
    items: [{ name: "Electron", icon: SiElectron }],
  },
  {
    name: "Design",
    items: [
      { name: "UI / UX", icon: PenTool },
      { name: "Figma", icon: SiFigma },
      { name: "Blender", icon: SiBlender },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "VS Code", icon: VscVscode },
      { name: "Postman", icon: SiPostman },
      { name: "Vite", icon: SiVite },
      { name: "MongoDB Compass", icon: Compass },
      { name: "DeepSeek", icon: BrainCircuit },
      { name: "Antigravity", icon: Orbit },
      { name: "Claude Code", icon: Terminal },
      { name: "Codex", icon: Code2 },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
      { name: "MariaDB", icon: Database },
      { name: "Docker", icon: Container },
      { name: "Gemini", icon: Sparkles },
      { name: "Android Studio", icon: Smartphone },
    ],
  },
];

export const experience = [
  {
    role: "Full Stack Developer",
    period: "2025 — Present",
    text: "Building MERN stack applications with authentication, REST APIs, state management using Redux and deploying projects on hosting platforms.",
  },
  {
    role: "Frontend Developer",
    period: "2024",
    text: "Developed responsive UI using React and Tailwind CSS. Focused on animations, UI/UX, and performance optimization.",
  },
];

export const stats = [
  { value: "10+", label: "Projects completed" },
  { value: "2+", label: "Years experience" },
];
