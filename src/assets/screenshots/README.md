# Project screenshots

Drop the **raw screenshot** of a project here (png / jpg / webp, any size - 16:10 such as 1600x1000 looks best).
No mockup, no background removal: the laptop frame is drawn in code (`LaptopMockup` in Projects.jsx).

Then add the project in `src/components/pages/projectsData.js`:

    {
      title: "My App",
      category: "Full Stack · SaaS",
      year: "2026",
      screenshot: shot("my-app.png"),   // <- file name from this folder
      description: "One or two lines.",
      tech: ["React", "Node.js"],
      live: "https://...",              // optional
      github: "https://github.com/...", // optional
    },
