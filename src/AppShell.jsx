import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SelectedWork from './pages/SelectedWorkShell';

const AboutMe = lazy(() => import('./pages/AboutMe'));
const Contact = lazy(() => import('./pages/Contact'));
const HireMe = lazy(() => import('./pages/HireMe'));

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const timerId = window.setInterval(() => {
      current = Math.min(100, current + 7 + Math.floor(Math.random() * 9));
      setProgress(current);

      if (current >= 100) {
        window.clearInterval(timerId);
        window.setTimeout(onComplete, 350);
      }
    }, 90);

    return () => window.clearInterval(timerId);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-frame">
        <p className="loading-kicker">Shashikant Shukla Portfolio</p>
        <h1 className="loading-title">SHUKLA</h1>
        <div className="loading-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-meta">Booting selected work archive</p>
      </div>
    </div>
  );
}

function SkillTicker() {
  const skills = useMemo(
    () => ['React', 'JavaScript', 'Three.js', 'GSAP', 'Lenis', 'Node.js', 'MongoDB', 'Framer Motion'],
    []
  );

  return (
    <div className="skill-ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((loopIndex) => (
          <div key={loopIndex} className="ticker-group">
            {skills.map((skill) => (
              <span key={`${loopIndex}-${skill}`} className="ticker-item">
                <span className="ticker-dot">•</span>
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionFallback() {
  return (
    <div className="section-fallback" role="status" aria-live="polite">
      <div className="spinner" />
      <span>Loading section</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="global-footer">
      <p>Shashikant Shukla, 2026</p>
      <div className="footer-links">
        <a href="https://linkedin.com/in/shashikant-s-483022298" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/skshukla29" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}

function AppShell() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  const sections = useMemo(
    () => ({
      home: 'home',
      work: 'work',
      about: 'about',
      contact: 'contact',
      hire: 'hire'
    }),
    []
  );

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      duration: 1.2,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time))
    });

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const jump = useCallback(
    (key) => {
      const targetId = sections[key] ?? key;
      setActiveSection(key);
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [sections]
  );

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="app-shell">
      <Navbar active={activeSection} onJump={jump} />
      <main>
        <Home onJump={jump} />
        <SkillTicker />
        <SelectedWork />
        <SkillTicker />
        <Suspense fallback={<SectionFallback />}>
          <AboutMe />
          <Contact />
          <HireMe />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default AppShell;
