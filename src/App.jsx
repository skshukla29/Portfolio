import { useMemo, useState, useEffect } from 'react';
import SelectedWork from './pages/SelectedWork';
import projects from './data/projects';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 500); // Wait a half second at 100%
      }
      setProgress(current);
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Create segments for the progress bar (e.g. 20 segments total)
  const totalSegments = 20;
  const activeSegments = Math.floor((progress / 100) * totalSegments);

  return (
    <div className="loading-screen">
      <div className="crt-overlay"></div>
      <div className="loading-content">
        <div className="loading-logo-box">
          <div className="retro-stripes">
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
          <h1 className="retro-title">SHUKLA</h1>
        </div>
        
        <div className="loading-text text-center">
          <p>Shashikant Shukla Portfolio, Website</p>
          <p>Version 1.0.0</p>
        </div>

        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            {Array.from({ length: totalSegments }).map((_, i) => (
              <div 
                key={i} 
                className={`progress-segment ${i < activeSegments ? 'filled' : ''}`}
              ></div>
            ))}
          </div>
        </div>

        <footer className="loading-footer">
          <p>Copyright (c) Shashikant Shukla, 2026. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// Use canonical project list from `src/data/projects.js`

const experience = [
  {
    role: 'Java Intern',
    company: 'CodeAlpha',
    period: 'Mar – Oct 2025',
    mode: 'Virtual'
  },
  {
    role: 'Web Dev Intern',
    company: 'Codec Technologies',
    period: 'Jun – Jul 2025',
    mode: 'Remote'
  }
];

const skills = [
  ['ReactJS', 90],
  ['HTML/CSS', 93],
  ['JavaScript', 88],
  ['Java', 85],
  ['Tailwind/GSAP', 82],
  ['Node.js', 78],
  ['DSA', 80],
  ['MongoDB', 75]
];

const certs = ['Microsoft AI', 'HackerRank Java', 'Web+DSA', 'Sheryians'];

const javaCode = `public class ShashikantShukla {
    String name     = "Shashikant Shukla";
    String title    = "Frontend Dev | React | Java";
    String college  = "IES College of Tech, Bhopal";
    String batch    = "B.Tech CSE (AI & ML) | 2027";
    int    yearsExp = 2;
    String[] skills = {
        "ReactJS","Java","Node.js","Tailwind",
        "GSAP","MongoDB","DSA","UI/UX","Git"
    };
    boolean hardWorker    = true;
    boolean quickLearner  = true;
    boolean problemSolver = true;
    boolean hireable() {
        return this.hardWorker && this.problemSolver
            && this.skills.length >= 5 && this.yearsExp >= 1;
    }
}`;

function highlightJava(code) {
  // Basic HTML escape
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let out = esc(code);

  // Strings (light blue)
  out = out.replace(/(".*?"|'.*?')/g, '<span class="tok-string">$1</span>');

  // Booleans (purple)
  out = out.replace(/\b(true|false)\b/g, '<span class="tok-boolean">$1</span>');

  // Method names (yellow) - match name before parentheses
  out = out.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="tok-method">$1</span>');

  // Keywords (orange)
  const keywords = ['public','class','int','boolean','return','new','String','void'];
  const kwRegex = new RegExp('\\\b(' + keywords.join('|') + ')\\\b', 'g');
  out = out.replace(kwRegex, '<span class="tok-keyword">$1</span>');

  return out;
}

function Navbar({ active, onJump }) {
  const links = [
    ['home', 'Home'],
    ['work', 'Selected Work'],
    ['about', 'About Us'],
    ['contact', 'Contact']
  ];

  return (
    <header className="nav-shell">
      <button className="brand" onClick={() => onJump('home')} type="button">
        <span className="brand-mark">◉</span>
        <span>SHASHIKANT</span>
      </button>

      <nav className="nav-links" aria-label="Primary">
        {links.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={active === key ? 'nav-link active' : 'nav-link'}
            onClick={() => onJump(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <button className="call-btn" type="button" onClick={() => onJump('contact')}>
        <span className="phone-icon">☎</span>
        Hire Me
      </button>
    </header>
  );
}

function Hero({ onJump }) {
  const [isDiving, setIsDiving] = useState(false);

  const handleMonitorMove = (e) => {
    if (isDiving) return;
    
    // Calculate movement or simply trigger dive on hover/move
    // A nice fluid interaction: when they move intentionally over it, trigger the dive
    setIsDiving(true);
    
    setTimeout(() => {
      onJump('work');
      // Optional: reset dive state after a bit if they scroll back
      setTimeout(() => setIsDiving(false), 1000);
    }, 1200); // 1.2s dive animation
  };

  return (
    <section className={`panel home-panel ${isDiving ? 'diving' : ''}`} id="home">
      <div className="hero-copy">
        <p className="kicker">Frontend Developer · React Specialist · Java Developer</p>
        <h1>
          <span>A Frontend</span>
          <span>Developer,</span>
          <span className="outline">Plugged into</span>
          <span>the Future.</span>
        </h1>
        <p className="lede">
          Name: Shashikant Shukla · College: IES College of Technology, Bhopal (M.P) · Degree: B.Tech CSE (AI & ML) — 2023–2027
        </p>
        <div className="hero-meta">
          <span>Location: Bhopal, Madhya Pradesh, India</span>
          <span>Email: itzzshashikant29@gmail.com</span>
          <span>LinkedIn: linkedin.com/in/shashikant-s-483022298</span>
          <span>GitHub: github.com/skshukla29</span>
        </div>
        <div className="hero-actions">
          <button type="button" className="primary-btn" onClick={() => onJump('work')}>
            View Selected Work
          </button>
          <button type="button" className="ghost-btn" onClick={() => onJump('about')}>
            About Me
          </button>
        </div>
        <p className="scroll-hint">Scroll to Inspect My Work</p>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="monitor-wrap" onMouseMove={handleMonitorMove}>
          <div className="monitor-screen">
            <div className="screen-core" />
            <div className="screen-ripple" />
            <div className="screen-text">SK.DEV</div>
          </div>
          <div className="computer-body">
            <div className="body-badge">SK.DEV</div>
            <div className="keyboard">
              {Array.from({ length: 36 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [active, setActive] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const current = projects[active];

  const total = projects.length;

  const previous = () => setActive((value) => (value - 1 + total) % total);
  const next = () => setActive((value) => (value + 1) % total);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      next();
    }, 3000); // 3 seconds interval for the loop
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="panel work-panel" id="work">
      <div className="work-top">
        <h2>{current.title}</h2>
        <p>Portfolio • {current.number} / 0{total}</p>
      </div>

      <div 
        className="film-stage"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="arrow arrow-left" type="button" aria-label="Previous project" onClick={previous}>
          ←
        </button>
        <div className="film-strip">
          {projects.map((project, index) => {
            // Calculate circular offset
            let offset = (index - active) % total;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isActive = offset === 0;
            const distance = Math.abs(offset);

            return (
              <article
                key={project.id}
                className={`frame ${isActive ? 'active' : ''}`}
                onClick={() => setActive(index)}
                style={{
                  '--offset': offset,
                  '--abs-offset': distance,
                  '--frame-color': project.frameColor,
                  '--frame-z': Math.max(0, 1 - distance * 0.25),
                  '--frame-scale': isActive ? 1.05 : 0.84, /* Spotlight scale */
                  '--frame-opacity': isActive ? 1 : 0.6
                }}
              >
                <div className="frame-inner">
                  <div className="frame-number">{project.number}</div>
                  
                  {isActive ? (
                    // Center Spotlight Detail View
                    <div className="frame-spotlight-content fade-in">
                      <h3 className="spotlight-title">{project.title}</h3>
                      <p className="frame-desc spotlight-desc">{project.desc}</p>
                      <p className="frame-tech spotlight-tech">{project.tech}</p>
                      
                      <div className="frame-actions">
                        <a
                          href={project.live || '#'}
                          className="primary-btn small-btn spotlight-btn"
                          onClick={(e) => { if (!project.live || project.live === '#') e.preventDefault(); }}
                          target={project.live && project.live !== '#' ? "_blank" : undefined}
                          rel={project.live && project.live !== '#' ? "noreferrer" : undefined}
                        >
                          Live Demo
                        </a>
                        <a href={project.github || 'https://github.com/skshukla29'} target="_blank" rel="noreferrer" className="ghost-btn small-btn spotlight-btn">GitHub Repo</a>
                      </div>
                    </div>
                  ) : (
                    // Thumbnail View
                    <>
                      <h3>{project.title}</h3>
                      <p className="frame-tech">{project.tech}</p>
                    </>
                  )}
                </div>
                <div className="sprocket-top" />
                <div className="sprocket-bottom" />
              </article>
            );
          })}
        </div>
        <button className="arrow arrow-right" type="button" aria-label="Next project" onClick={next}>
          →
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="panel about-panel" id="about">
      <div className="section-title">
        <p>About Us</p>
        <h2>Shashikant Shukla</h2>
      </div>
      <div className="about-grid">
        <div className="about-card bio-card">
          <p className="about-lead">
            Frontend Developer, React Specialist, and Java Developer focused on polished interfaces, animation, and practical problem solving.
          </p>
          <div className="details-grid">
            <div><span>Name</span><strong>Shashikant Shukla</strong></div>
            <div><span>Role</span><strong>Frontend Developer | React Specialist | Java Developer</strong></div>
            <div><span>College</span><strong>IES College of Technology, Bhopal (M.P)</strong></div>
            <div><span>Degree</span><strong>B.Tech CSE (AI & ML) — 2023–2027</strong></div>
            <div><span>Location</span><strong>Bhopal, Madhya Pradesh, India</strong></div>
            <div><span>Email</span><strong>itzzshashikant29@gmail.com</strong></div>
            <div><span>LinkedIn</span><strong>linkedin.com/in/shashikant-s-483022298</strong></div>
            <div><span>GitHub</span><strong>github.com/skshukla29</strong></div>
            <div><span>Phone</span><strong>+91 7389643854</strong></div>
          </div>
        </div>
        <div className="about-card code-card">
          <div className="laptop-mockup">
            <div className="lap-frame">
              <div className="traffic-lights">
                <span className="light red" />
                <span className="light yellow" />
                <span className="light green" />
              </div>
              <div className="mac-screen">
                <pre className="code" dangerouslySetInnerHTML={{ __html: highlightJava(javaCode) }} />
              </div>
              <div className="lap-base">
                <div className="keyboard">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="experience-grid">
        <div>
          <h3>Experience</h3>
          <div className="timeline">
            {experience.map((entry) => (
              <article key={entry.role}>
                <h4>{entry.role}</h4>
                <p>{entry.company} | {entry.period} | {entry.mode}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <h3>Certifications</h3>
          <div className="cert-list">
            {certs.map((cert) => (
              <span key={cert}>{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="panel contact-panel" id="contact">
      <div className="contact-split">
        {/* Section A: Playful Hook */}
        <div className="contact-section-a">
          <div className="playful-hook">
            <h2 className="hook-line">Still not convinced I can ship?</h2>
            
            <div className="shaking-hands-container">
              <video 
                src="/contact-video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="contact-video"
              />
              <div className="glow-orb"></div>
            </div>

            <h3 className="hook-line highlight">Check out this golden keyboard—</h3>
            <p className="hook-line sub">You scrolled this far. You deserve a key-break.</p>
          </div>
        </div>

        {/* Section B: Formal Info Zone */}
        <div className="contact-section-b">
          <div className="wordplay-header">
            <span className="strike">Hello.</span>
            <span className="reveal">Good hire.</span>
          </div>

          <div className="info-grid">
            <div className="info-block">
              <h4>General Enquiries</h4>
              <a href="mailto:itzzshashikant29@gmail.com" className="email-link">itzzshashikant29@gmail.com</a>
              <button type="button" className="primary-btn small-btn">Hire Me</button>
            </div>
            
            <div className="info-block">
              <h4>New Opportunity</h4>
              <a href="mailto:itzzshashikant29@gmail.com" className="email-link">itzzshashikant29@gmail.com</a>
              <p className="phone-text">+91 7389643854</p>
            </div>

            <div className="info-block">
              <h4>Find Me</h4>
              <p>Bhopal, Madhya Pradesh</p>
              <p>India</p>
            </div>
            
            <div className="info-block">
              <h4>Social</h4>
              <a href="https://linkedin.com/in/shashikant-s-483022298" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/skshukla29" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hire() {
  return (
    <section className="panel hire-panel" id="hire">
      <div className="hire-split">
        
        {/* Left Side: Bold Hook & Subtext */}
        <div className="hire-left">
          <h2 className="hire-headline">Let's Build Something.</h2>
          <p className="hire-subtext">Open to internships, freelance & full-time roles.</p>
        </div>

        {/* Right Side: Clean Contact Form */}
        <div className="hire-right">
          <form className="hire-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="Name" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="4" required></textarea>
            </div>
            <button type="submit" className="primary-btn submit-btn">
              Send Message →
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

function SkillTicker() {
  const skills = ["ReactJS", "Java", "Node.js", "Tailwind CSS", "GSAP", "MongoDB", "Express.js", "MySQL", "Redux", "Git"];
  
  return (
    <div className="skill-ticker">
      <div className="ticker-track">
        {[1, 2].map((loopIndex) => (
          <div key={loopIndex} className="ticker-group" aria-hidden={loopIndex === 2}>
            {skills.map((skill, idx) => (
              <span key={idx} className="ticker-item">
                <span className="ticker-dot">●</span> {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="spinning-globe">🌎</div>
          <span className="tagline">SK — High-Performance Frontend Developer</span>
        </div>
        
        <div className="footer-info">
          <span>Bhopal, Madhya Pradesh</span>
          <div className="footer-socials">
            <a href="https://linkedin.com/in/shashikant-s-483022298" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/skshukla29" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [active, setActive] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const sections = useMemo(() => ({ home: 'home', work: 'work', about: 'about', contact: 'contact' }), []);

  const jump = (key) => {
    setActive(key);
    document.getElementById(sections[key])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-shell">
      <Navbar active={active} onJump={jump} />
      <main>
        <Hero onJump={jump} />
        <SkillTicker />
        <SelectedWork />
        <SkillTicker />
        <About />
        <Contact />
        <Hire />
      </main>
      <Footer />
    </div>
  );
}

export default App;
