import { useEffect, useMemo, useState } from "react";
import projects from "../data/projects";
import FilmFrame from "../three/FilmFrame";

export default function SelectedWork() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(-1);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (expandedIndex === null) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setExpandedIndex(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [expandedIndex]);

  const total = projects.length;
  const step = 360 / total;

  const normalizedAngles = useMemo(
    () =>
      projects.map((_, index) => {
        const angle = index * step + rotation;
        return ((angle % 360) + 360) % 360;
      }),
    [rotation, step]
  );

  const active = useMemo(() => {
    let candidate = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    normalizedAngles.forEach((angle, index) => {
      const distance = Math.min(Math.abs(angle), Math.abs(360 - angle));
      if (distance < minDistance) {
        minDistance = distance;
        candidate = index;
      }
    });

    return candidate;
  }, [normalizedAngles]);

  const current = projects[active];

  const rotateLeft = () => {
    setDirection(1);
    setRotation((value) => value + step);
  };

  const rotateRight = () => {
    setDirection(-1);
    setRotation((value) => value - step);
  };

  useEffect(() => {
    if (isHovered || total <= 1) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setRotation((value) => value + direction * 0.65);
    }, 16);

    return () => clearInterval(timerId);
  }, [direction, isHovered, total]);

  return (
    <section className="panel work-panel" id="work">
      <div className="work-top">
        <h2>{current.title}</h2>
        <p>Portfolio - {current.number} / {String(total).padStart(2, "0")}</p>
      </div>

      <div
        className="film-stage"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="arrow arrow-left"
          type="button"
          aria-label="Rotate reel left"
          onClick={rotateLeft}
        >
          &lt;
        </button>

        <div className={`film-strip-shell ${expandedIndex !== null ? "has-expanded-frame" : ""}`}>
          <div className="film-strip" style={{ "--rotation": `${rotation}deg`, "--ring-radius": "490px" }}>
            {projects.map((project, index) => {
              const isActive = index === active;
              const angle = normalizedAngles[index];
              const radians = (angle * Math.PI) / 180;
              const depth = (Math.cos(radians) + 1) / 2;

              return (
                <FilmFrame
                  key={project.id}
                  project={project}
                  isActive={isActive}
                  expanded={expandedIndex === index}
                  onSelect={() => {
                    if (expandedIndex === index) {
                      setExpandedIndex(null);
                      return;
                    }

                    setRotation((value) => value - angle);
                    setExpandedIndex(index);
                  }}
                  style={{
                    "--angle": `${index * step}deg`,
                    opacity: 0.3 + depth * 0.8,
                    zIndex: Math.round(depth * 100)
                  }}
                />
              );
            })}
          </div>
        </div>

        <button
          className="arrow arrow-right"
          type="button"
          aria-label="Rotate reel right"
          onClick={rotateRight}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
