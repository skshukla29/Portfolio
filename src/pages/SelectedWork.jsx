import { useEffect, useState } from "react";
import projects from "../data/projects";
import FilmFrame from "../three/FilmFrame";

export default function SelectedWork() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const total = projects.length;
  const current = projects[active];

  const previous = () => {
    setActive((value) => (value - 1 + total) % total);
  };

  const next = () => {
    setActive((value) => (value + 1) % total);
  };

  useEffect(() => {
    if (isHovered || total <= 1) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setActive((value) => (value + 1) % total);
    }, 3200);

    return () => clearInterval(timerId);
  }, [isHovered, total]);

  return (
    <section className="panel work-panel" id="work">
      <div className="work-top">
        <h2>{current.title}</h2>
        <p>
          Portfolio - {current.number} / {String(total).padStart(2, "0")}
        </p>
      </div>

      <div
        className="film-stage"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="arrow arrow-left"
          type="button"
          aria-label="Previous project"
          onClick={previous}
        >
          ←
        </button>

        <div
          className="film-strip"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            width: "100%"
          }}
        >
          {projects.map((project, index) => {
            const isActive = index === active;
            const distance = Math.abs(index - active);

            return (
              <FilmFrame
                key={project.id}
                project={project}
                isActive={isActive}
                onSelect={() => setActive(index)}
                style={{
                  opacity: isActive ? 1 : 0.72,
                  transform: isActive ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                  zIndex: Math.max(1, 12 - distance)
                }}
              />
            );
          })}
        </div>

        <button
          className="arrow arrow-right"
          type="button"
          aria-label="Next project"
          onClick={next}
        >
          →
        </button>
      </div>
    </section>
  );
}
