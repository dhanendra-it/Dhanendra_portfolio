import ExcelR from "../../assets/certificate/ExcelR.webp";
import FreeCodeCamp from "../../assets/certificate/free_code.webp";
import Sololearn from "../../assets/certificate/sololearn.webp";
import SkillUp from "../../assets/certificate/skillup.webp";
import IBM from "../../assets/certificate/IBM.webp";
import Forage from "../../assets/certificate/forage.webp";
import CompleteCoding from "../../assets/certificate/Prashant.webp";

/**
 * Naya certificate add karne ke liye image `src/assets/certificate/` me daalo,
 * upar import karo aur yahan ek object add kar do (naya sabse upar rakho — list date ke hisaab se dikhti hai).
 * `verify` optional hai — link ho to "Verify" button dikhega.
 */
export const certificates = [
  {
    title: "MERN Stack",
    issuer: "ExcelR",
    date: "Nov 2026",
    image: ExcelR,
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Oct 2026",
    image: FreeCodeCamp,
    verify: "https://freecodecamp.org/certification/dhanendra/responsive-web-design-v9",
  },
  {
    title: "Web Development",
    issuer: "Sololearn",
    date: "Mar 2026",
    image: Sololearn,
  },
  {
    title: "Introduction to MERN Stack",
    issuer: "Simplilearn SkillUP",
    date: "Nov 2025",
    image: SkillUp,
  },
  {
    title: "Web Development Basics",
    issuer: "IBM SkillsBuild",
    date: "Nov 2025",
    image: IBM,
  },
  {
    title: "GenAI Powered Data Analytics",
    issuer: "Tata · Forage job simulation",
    date: "Nov 2025",
    image: Forage,
  },
  {
    title: "C Programming",
    issuer: "Complete Coding",
    date: "Oct 2024",
    image: CompleteCoding,
  },
];
