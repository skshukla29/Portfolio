import { memo, useEffect, useMemo, useRef } from 'react';

function Computer() {
  const canvasRef = useRef(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        x: ((Math.sin((index + 1) * 97) + 1) / 2),
        y: ((Math.sin((index + 1) * 173) + 1) / 2),
        radius: 0.8 + (index % 5) * 0.25,
        speed: 0.15 + (index % 4) * 0.06,
        phase: index * 0.35
      })),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let animationFrame = 0;

    const resize = () => {
      if (mobileQuery.matches) {
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time) => {
      if (mobileQuery.matches) {
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(232, 255, 71, 0.16)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(255, 174, 88, 0.12)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      context.lineWidth = 1;

      for (let row = 0; row < 18; row += 1) {
        const y = (height / 18) * row;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      stars.forEach((star) => {
        const sway = Math.sin(time * 0.0006 * star.speed + star.phase) * 10;
        const twinkle = 0.45 + Math.sin(time * 0.0014 + star.phase) * 0.35;
        const x = (star.x * width + sway) % width;
        const y = (star.y * height + Math.cos(time * 0.0005 + star.phase) * 6) % height;

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${Math.max(0.15, twinkle)})`;
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.fillStyle = 'rgba(8, 9, 10, 0.3)';
      context.fillRect(0, height * 0.68, width, height * 0.02);
      context.fillStyle = 'rgba(232, 255, 71, 0.6)';
      context.fillRect(0, height * 0.68, width, height * 0.002);

      animationFrame = window.requestAnimationFrame(draw);
    };

    const onResize = () => resize();
    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener('resize', onResize);
    mobileQuery.addEventListener('change', onResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', onResize);
      mobileQuery.removeEventListener('change', onResize);
    };
  }, [stars]);

  return (
    <div className="computer-shell">
      <canvas ref={canvasRef} className="monitor-canvas" aria-hidden="true" />
      <div className="retro-monitor" aria-hidden="true">
        <div className="retro-screen">
          <div className="screen-grid" />
          <div className="screen-orb screen-orb-a" />
          <div className="screen-orb screen-orb-b" />
          <div className="screen-orb screen-orb-c" />
          <div className="screen-label">SK.DEV</div>
        </div>
        <div className="monitor-base">
          <div className="monitor-keyboard">
            {Array.from({ length: 28 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const MemoComputer = memo(Computer);

function Home({ onJump }) {
  const stats = useMemo(
    () => [
      { label: 'Projects', value: '09' },
      { label: 'Internships', value: '02' },
      { label: 'Hackathon Finalist', value: '02' },
      { label: 'Focus', value: 'Frontend' }
    ],
    []
  );

  return (
    <section className="panel home-panel" id="home">
      <div className="hero-copy">
        <p className="kicker">Frontend Developer · React Specialist · Java Developer</p>
        <h1>
          <span>A Frontend</span>
          <span>Developer,</span>
          <span className="outline">Plugged into</span>
          <span>the Future.</span>
        </h1>
        <p className="lede">
          I design sharp interfaces, motion-rich experiences, and production-ready portfolio systems with a retro-futuristic edge.
        </p>

        <div className="hero-stats">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>

        <div className="hero-actions">
          <button type="button" className="primary-btn" onClick={() => onJump('work')}>
            View Selected Work
          </button>
          <button type="button" className="ghost-btn" onClick={() => onJump('about')}>
            About Me
          </button>
          <button type="button" className="ghost-btn" onClick={() => onJump('hire')}>
            Hire Me
          </button>
        </div>
      </div>

      <div className="hero-art">
        <MemoComputer />
      </div>
    </section>
  );
}

export default Home;
