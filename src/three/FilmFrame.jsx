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
    <article className={`frame ${isActive ? "active" : ""}`} style={style} onClick={onSelect}>
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
      </div>
    </article>
  );
}
