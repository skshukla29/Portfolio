function createThumbnail({ title, number, frameColor, accent = "#f4deb0" }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${frameColor}" />
          <stop offset="100%" stop-color="#05070b" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.42" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#bg)" />
      <rect width="1200" height="675" fill="url(#glow)" />
      <circle cx="980" cy="110" r="160" fill="${accent}" fill-opacity="0.06" />
      <circle cx="170" cy="555" r="220" fill="#ffffff" fill-opacity="0.05" />
      <rect x="82" y="72" width="1036" height="531" rx="42" fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="6" />
      <text x="102" y="168" fill="#f8f1e3" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" letter-spacing="4">${number}</text>
      <text x="102" y="294" fill="#ffffff" font-family="Georgia, serif" font-size="70" font-weight="700">${title}</text>
      <rect x="102" y="338" width="420" height="12" rx="6" fill="${accent}" fill-opacity="0.9" />
      <text x="102" y="438" fill="rgba(255,255,255,0.76)" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="3">PROJECT REEL</text>
      <text x="102" y="492" fill="rgba(255,255,255,0.56)" font-family="Arial, Helvetica, sans-serif" font-size="24">PORTFOLIO FRAME</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

const projects = [
  {
    id: "speech-to-text",
    number: "01",
    title: "STT Converter",
    desc: "Full-stack speech-to-text app with live recording, Whisper transcription, GPT summaries, task extraction, and TTS playback.",
    tech: "React, Node.js, Express, Python, Whisper, GPT",
    github: "https://github.com/skshukla29/STT-converter",
    live: "",
    frameColor: "#1a0533",
    thumbnail: createThumbnail({ title: "STT Converter", number: "01", frameColor: "#1a0533" })
  },
  {
    id: "portfolio-showcase",
    number: "02",
    title: "Project Portfolio Showcase",
    desc: "Responsive React SPA with custom hooks, scroll animations, Jest tests, clean UI/UX design.",
    tech: "React, JavaScript, CSS, Jest, RTL",
    github: "https://github.com/skshukla29/Portfolio",
    live: "https://itzzshashikant-portfolio.netlify.app/",
    frameColor: "#001a2e",
    thumbnail: createThumbnail({ title: "Project Portfolio", number: "02", frameColor: "#001a2e", accent: "#ffe8b8" })
  },
  {
    id: "basketball-landing",
    number: "03",
    title: "Basketball Landing Page",
    desc: "Responsive basketball-themed site showcasing history, rules, and famous players. Clean HTML/CSS.",
    tech: "HTML5, CSS3, Responsive Design",
    github: "https://github.com/skshukla29/basketball-Landingpage",
    live: "https://skshukla29.github.io/basketball-Landingpage/",
    frameColor: "#0a1a00",
    thumbnail: createThumbnail({ title: "Basketball Landing", number: "03", frameColor: "#0a1a00", accent: "#c8ff8a" })
  },
  {
    id: "flashcard-quiz",
    number: "04",
    title: "Flashcard Quiz App",
    desc: "CodeAlpha Internship project. Flip-card UI, score tracking, multiple question sets, responsive.",
    tech: "React, JavaScript, CSS Animations",
    github: "https://github.com/skshukla29/CodeAlpha_FlashcardQuizApp",
    live: "https://skshukla29.github.io/CodeAlpha_FlashcardQuizApp/",
    frameColor: "#1a0a00",
    thumbnail: createThumbnail({ title: "Flashcard Quiz", number: "04", frameColor: "#1a0a00", accent: "#ffcf99" })
  },
  {
    id: "chaplin-chuckles",
    number: "05",
    title: "Chaplin Chuckles",
    desc: "Fun joke app with English & Hindi language toggle, real-time API integration, clean UI.",
    tech: "HTML, CSS, JavaScript, API Integration",
    github: "https://github.com/skshukla29/Chaplin--Chuckles",
    live: "https://skshukla29.github.io/Chaplin--Chuckles/",
    frameColor: "#1a001a",
    thumbnail: createThumbnail({ title: "Chaplin Chuckles", number: "05", frameColor: "#1a001a", accent: "#ffd1f1" })
  },
  {
    id: "safalta-setu",
    number: "06",
    title: "SafaltaSetu",
    desc: "Hackathon Finalist - Career guidance & mentorship platform bridging students with opportunities through structured roadmaps, resources, and mentor connect.",
    tech: "React, Node.js, MongoDB, Vercel",
    github: "https://github.com/skshukla29/SafaltaSetu",
    live: "https://safalta-setu-eta.vercel.app/",
    frameColor: "#001a10",
    hackathon: true,
    hackathonLabel: "Hackathon Finalist",
    thumbnail: createThumbnail({ title: "SafaltaSetu", number: "06", frameColor: "#001a10", accent: "#b9ffdf" })
  },
  {
    id: "healthcare-governance",
    number: "07",
    title: "Healthcare Governance Platform",
    desc: "Hackathon Finalist - Healthcare governance platform improving transparency in medical services with patient management, dashboards, and data-driven insights.",
    tech: "React, Node.js, MongoDB, Vercel",
    github: "https://github.com/skshukla29/healthcare",
    live: "https://frontend-ten-cyan-74.vercel.app/",
    frameColor: "#001a2e",
    hackathon: true,
    hackathonLabel: "Hackathon Finalist",
    thumbnail: createThumbnail({ title: "Healthcare Governance", number: "07", frameColor: "#001a2e", accent: "#9fd4ff" })
  },
  {
    id: "aquastore",
    number: "08",
    title: "AquaScore Prototype",
    desc: "Next.js prototype with localStorage-backed dashboard CRUD, working auth flows, serverless API routes, and responsive marketing pages.",
    tech: "Next.js, TypeScript, Tailwind CSS, Vercel",
    github: "https://github.com/skshukla29/aquastore",
    live: "https://aquascore.vercel.app/",
    frameColor: "#00263a",
    thumbnail: createThumbnail({ title: "AquaScore", number: "08", frameColor: "#00263a", accent: "#9ce8ff" })
  },
  {
    id: "citydemo",
    number: "09",
    title: "CitySorter Civic Platform",
    desc: "Civic reporting platform for routing complaints, location-aware tracking, rewards, and multi-language support across devices.",
    tech: "React, TypeScript, Tailwind CSS, Vercel",
    github: "https://github.com/skshukla29/citydemo",
    live: "https://citydemo-two.vercel.app/",
    frameColor: "#1a2a14",
    thumbnail: createThumbnail({ title: "CitySorter", number: "09", frameColor: "#1a2a14", accent: "#d8ff9a" })
  }
];

export default projects;
export { projects };
