import { memo, useMemo } from 'react';

function FilmFrameShell({
  project,
  variant = 'desktop',
  frameState = {},
  onSelect,
  onOpenOverlay,
  onNavigate,
  style = {}
}) {
  const techTags = useMemo(
    () =>
      String(project.tech)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    [project.tech]
  );

  const hasLiveDemo = typeof project.live === 'string' && project.live.trim() !== '' && project.live !== '#';
  const isMobile = variant === 'mobile';
  const frameClassName = [
    'film-frame',
    isMobile ? 'film-frame--mobile' : 'film-frame--desktop',
    frameState.depthClass ? `film-frame--${frameState.depthClass}` : '',
    frameState.isFront ? 'film-frame--front' : ''
  ]
    .filter(Boolean)
    .join(' ');

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const renderActions = () => (
    <div className="frame-actions">
      <a
        href={hasLiveDemo ? project.live : undefined}
        target="_blank"
        rel={hasLiveDemo ? 'noreferrer' : undefined}
        className={hasLiveDemo ? 'frame-btn frame-btn--live' : 'frame-btn frame-btn--live is-disabled'}
        aria-disabled={!hasLiveDemo}
        tabIndex={hasLiveDemo ? 0 : -1}
        onClick={(event) => {
          stopPropagation(event);
          if (!hasLiveDemo) {
            event.preventDefault();
          }
        }}
      >
        Live Demo →
      </a>
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="frame-btn frame-btn--github"
        onClick={stopPropagation}
      >
        GitHub →
      </a>
    </div>
  );

  return (
    <article
      className={frameClassName}
      style={style}
      onClick={() => {
        if (isMobile) {
          onSelect?.(project);
          return;
        }

        if (frameState.isFront) {
          onOpenOverlay?.(project);
          return;
        }

        onNavigate?.(project);
      }}
    >
      <div className="film-frame-inner">
        {project.hackathon ? <span className="frame-badge">🏆 Hackathon Finalist</span> : null}

        <div className="frame-topline">
          <span className="frame-number">{project.number}</span>
          <span className="frame-icon" aria-hidden="true">
            {project.icon || '◉'}
          </span>
        </div>

        <h3 className="frame-title">{project.title}</h3>
        <p className="frame-desc">{project.desc}</p>

        <div className="frame-tags">
          {techTags.map((tag) => (
            <span key={tag} className="frame-tag">
              {tag}
            </span>
          ))}
        </div>

        {renderActions()}
      </div>
    </article>
  );
}

export default memo(FilmFrameShell);
