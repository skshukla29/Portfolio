import fallbackThumb from "../assets/hero.png";

function FrameButtons({ project }) {
  const hasLiveDemo = typeof project.live === "string" && project.live.trim() !== "" && project.live !== "#";

  return (
    <div className="frame-actions">
      <a
        className={`frame-btn frame-btn-live ${hasLiveDemo ? "" : "is-disabled"}`}
        href={hasLiveDemo ? project.live : undefined}
        target={hasLiveDemo ? "_blank" : undefined}
        rel={hasLiveDemo ? "noreferrer" : undefined}
        onClick={(event) => {
          event.stopPropagation();
          if (!hasLiveDemo) {
            event.preventDefault();
          }
        }}
      >
        LIVE DEMO
      </a>
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

export default function FilmFrame({ project, isActive = false, onSelect, style = {} }) {
  const thumbnail = project.thumbnail || fallbackThumb;

  return (
    <article className={`frame ${isActive ? "active" : ""} ${style && style.zIndex === 9999 ? 'expanded' : ''}`} style={style} onClick={onSelect}>
      <div className="frame-inner">
        <div className="film-thumb-wrap">
          <img src={thumbnail} alt={`${project.title} thumbnail`} className="film-thumb" loading="lazy" />
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
        {style && style.zIndex === 9999 ? (
          <div className="frame-expanded" onClick={(e) => e.stopPropagation()}>
            <button className="expanded-close" onClick={(e) => { e.stopPropagation(); onSelect(); }}>✕</button>
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
