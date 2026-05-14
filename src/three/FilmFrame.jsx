import fallbackThumb from "../assets/hero.png";
import { useEffect, useRef } from "react";

function FrameButtons({ project }) {
  const hasLiveDemo = typeof project.live === "string" && project.live.trim() !== "" && project.live !== "#";

  return (
    <div className="frame-actions">
      {hasLiveDemo ? (
        <a
          className="frame-btn frame-btn-live"
          href={project.live}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          LIVE DEMO
        </a>
      ) : (
        <button
          type="button"
          className="frame-btn frame-btn-live is-disabled"
          onClick={(e) => e.stopPropagation()}
          aria-disabled="true"
          disabled
        >
          LIVE DEMO
        </button>
      )}

      <a
        className="frame-btn frame-btn-code"
        href={project.github}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        GITHUB
      </a>
    </div>
  );
}

export default function FilmFrame({ project, isActive = false, expanded = false, onSelect, style = {} }) {
  const thumbnail = project.thumbnail || fallbackThumb;
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!expanded) return;

    const overlay = overlayRef.current;
    const closeBtn = closeBtnRef.current;

    // focus the close button when expanded
    if (closeBtn && typeof closeBtn.focus === "function") {
      closeBtn.focus({ preventScroll: true });
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        if (typeof onSelect === "function") onSelect();
        return;
      }

      if (e.key === "Tab" && overlay) {
        const focusable = overlay.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [expanded, onSelect]);

  return (
    <article
      className={`frame ${isActive ? "active" : ""} ${expanded ? 'expanded' : ''}`}
      style={style}
      onClick={(e) => {
        // clicking the frame should select/expand, not trigger links
        if (typeof onSelect === 'function') onSelect();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (typeof onSelect === 'function') onSelect(); } }}
    >
      <div className="frame-inner">
        <div className="film-thumb-wrap">
          <img
            src={thumbnail}
            alt={`${project.title} thumbnail`}
            className="film-thumb"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <span className="frame-number">{project.number}</span>
          {project.hackathon ? <span className="frame-badge">{project.hackathonLabel || "Finalist"}</span> : null}
        </div>

        <div className="frame-body">
          <h3>{project.title}</h3>
          <p className="frame-tech">{project.tech}</p>
          <p className="frame-desc">{project.desc}</p>
          <FrameButtons project={project} />
        </div>

        {/* Expanded detail overlay */}
        {expanded ? (
          <div className="frame-expanded" ref={overlayRef} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="expanded-close" ref={closeBtnRef} onClick={(e) => { e.stopPropagation(); onSelect(); }} aria-label="Close project details">
              ✕
            </button>
            <h3 className="expanded-title">{project.title}</h3>
            <p className="expanded-desc">{project.desc}</p>
            <p className="expanded-tech">{project.tech}</p>
            <div className="expanded-actions">
              <a
                className={`frame-btn frame-btn-live ${project.live && project.live !== '#' ? '' : 'is-disabled'}`}
                href={project.live && project.live !== '#' ? project.live : undefined}
                target={project.live && project.live !== '#' ? '_blank' : undefined}
                rel={project.live && project.live !== '#' ? 'noreferrer' : undefined}
                onClick={(e) => { e.stopPropagation(); if (!project.live || project.live === '#') e.preventDefault(); }}
              >
                LIVE DEMO
              </a>
              <a
                className="frame-btn frame-btn-code"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                GITHUB
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
