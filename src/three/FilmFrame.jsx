const buttonBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.35rem",
  padding: "0.5rem 0.85rem",
  border: "1px solid #ffffff",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  textDecoration: "none",
  transition: "transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
  clipPath: "polygon(8% 0, 100% 0, 100% 72%, 92% 100%, 0 100%, 0 28%)"
};

const liveButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#e8ff47",
  borderColor: "#e8ff47",
  color: "#08090a"
};

const githubButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "transparent",
  borderColor: "#ffffff",
  color: "#ffffff"
};

const badgeStyle = {
  position: "absolute",
  top: "0.7rem",
  right: "0.7rem",
  padding: "0.28rem 0.55rem",
  border: "1px solid #c9b74a",
  color: "#e8ff47",
  background: "rgba(120, 96, 12, 0.25)",
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  borderRadius: "6px",
  zIndex: 4
};

const overlayStyle = {
  marginTop: "0.85rem",
  padding: "0.9rem",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  borderRadius: "10px",
  background: "rgba(10, 12, 16, 0.72)",
  backdropFilter: "blur(4px)"
};

function FrameButtons({ project }) {
  const hasLiveDemo = typeof project.live === "string" && project.live.trim() !== "" && project.live !== "#";

  const onButtonHover = (event) => {
    event.currentTarget.style.transform = "translateY(-2px)";
  };

  const onButtonLeave = (event) => {
    event.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <div className="frame-actions" style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
      <a
        href={hasLiveDemo ? project.live : undefined}
        target="_blank"
        rel={hasLiveDemo ? "noreferrer" : undefined}
        style={liveButtonStyle}
        onMouseEnter={onButtonHover}
        onMouseLeave={onButtonLeave}
        onClick={(event) => {
          event.stopPropagation();
          if (!hasLiveDemo) {
            event.preventDefault();
          }
        }}
        aria-disabled={!hasLiveDemo}
        title={hasLiveDemo ? "Open live demo" : "Live demo not available yet"}
      >
        Live Demo -&gt;
      </a>
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        style={githubButtonStyle}
        onMouseEnter={onButtonHover}
        onMouseLeave={onButtonLeave}
        onClick={(event) => event.stopPropagation()}
      >
        GitHub
      </a>
    </div>
  );
}

export default function FilmFrame({ project, isActive = false, onSelect, style = {} }) {
  return (
    <article
      className={`frame ${isActive ? "active" : ""}`}
      onClick={onSelect}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: "14px",
        background: `linear-gradient(180deg, ${project.frameColor}, #05070a)`,
        position: "relative",
        overflow: "hidden",
        minHeight: "280px",
        cursor: "pointer",
        ...style
      }}
    >
      <div className="frame-inner" style={{ padding: "1rem", display: "grid", gap: "0.7rem" }}>
        <div className="frame-number" style={{ fontSize: "0.8rem", opacity: 0.72 }}>
          {project.number}
        </div>

        {project.hackathon ? (
          <span style={badgeStyle}>🏆 {project.hackathonLabel || "Hackathon Finalist"}</span>
        ) : null}

        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{project.title}</h3>
        <p style={{ margin: 0, fontSize: "0.82rem", opacity: 0.85 }}>{project.tech}</p>
        <p
          style={{
            margin: 0,
            fontSize: "0.86rem",
            lineHeight: 1.45,
            opacity: 0.9,
            display: "-webkit-box",
            WebkitLineClamp: isActive ? "unset" : 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {project.desc}
        </p>

        <FrameButtons project={project} />

        {isActive ? (
          <div className="frame-spotlight-content" style={overlayStyle}>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.9rem", lineHeight: 1.55 }}>{project.desc}</p>
            <FrameButtons project={project} />
          </div>
        ) : null}
      </div>

      <div className="sprocket-top" />
      <div className="sprocket-bottom" />
    </article>
  );
}
