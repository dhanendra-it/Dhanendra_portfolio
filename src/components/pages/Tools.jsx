import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./tools.css";

const tools = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "Blender", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "MongoDB Compass", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "DeepSeek", logo: "https://cdn.simpleicons.org/deepseek" },
  { name: "Antigravity", logo: "https://cdn.simpleicons.org/google" },
  { name: "Claude Code", logo: "https://cdn.simpleicons.org/claude" },
  { name: "Codex", logo: "https://cdn.simpleicons.org/openai" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "MariaDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Gemini", logo: "https://cdn.simpleicons.org/googlegemini" },
  { name: "Android Studio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
];

const EASE = [0.16, 1, 0.3, 1];

const Tools = () => {
  const headingRef = useRef(null);
  const seen = useInView(headingRef, { once: true, amount: 0.6 });

  return (
    <section id="tools" className="tools-section" aria-label="Tools and technologies">
      <div className="tools-section__grid">
        <aside className="tools-section__side">
          <p className="tools-section__eyebrow">(Tools I Use)</p>
          <h2 ref={headingRef} className="tools-section__title">
            <span className="tools-section__line">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: seen ? 0 : "110%" }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                Tools &amp;
              </motion.span>
            </span>
            <span className="tools-section__line">
              <motion.em
                initial={{ y: "110%" }}
                animate={{ y: seen ? 0 : "110%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
              >
                Workflow
              </motion.em>
            </span>
          </h2>
          <motion.p
            className="tools-section__lead"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            Technologies, development tools and AI assistants I use to build, design and ship projects.
          </motion.p>
          <motion.dl
            className="tools-section__stat"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <div>
              <dt>22</dt>
              <dd>Tools &amp; technologies</dd>
            </div>
          </motion.dl>
        </aside>

        <div className="tools-section__main">
          <div className="tools-section__list">
            {tools.map((tool, index) => (
              <motion.div
                className="tools-section__item"
                key={tool.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE, delay: (index % 6) * 0.045 }}
              >
                <img src={tool.logo} alt="" loading="lazy" />
                <span>{tool.name}</span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
