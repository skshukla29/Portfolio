import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import projects from '../data/projects';
import FilmFrame from './FilmFrameShell';

const totalProjects = 9;
const radius = 7;
const angleStep = (2 * Math.PI) / 9;

function wrapAngle(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function normalizeIndex(index) {
  return ((index % totalProjects) + totalProjects) % totalProjects;
}

function getNearestIndex(rotation) {
  return normalizeIndex(Math.round(-rotation / angleStep));
}

function FilmStrip() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayProject, setOverlayProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const rotationRef = useRef({ current: 0 });
  const pointerState = useRef({ active: false, pointerId: null, startX: 0, startRotation: 0, moved: false });
  const suppressClickRef = useRef(false);
  const mobilePointerState = useRef({ active: false, pointerId: null, startX: 0, moved: false });

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateMedia = () => setIsMobile(mediaQuery.matches);

    updateMedia();
    mediaQuery.addEventListener('change', updateMedia);

    return () => mediaQuery.removeEventListener('change', updateMedia);
  }, []);

  const updateFramePositions = useCallback(() => {
    const current = rotationRef.current.current;
    setRotation(current);
    setActiveIndex(getNearestIndex(current));
  }, []);

  const animateToRotation = useCallback(
    (targetRotation) => {
      gsap.to(rotationRef.current, {
        current: targetRotation,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: updateFramePositions
      });
    },
    [updateFramePositions]
  );

  const focusIndex = useCallback(
    (index) => {
      const currentRotation = rotationRef.current.current;
      const baseTarget = -index * angleStep;
      const targetRotation = currentRotation + wrapAngle(baseTarget - currentRotation);
      animateToRotation(targetRotation);
    },
    [animateToRotation]
  );

  const stepLeft = useCallback(() => {
    animateToRotation(rotationRef.current.current - angleStep);
  }, [animateToRotation]);

  const stepRight = useCallback(() => {
    animateToRotation(rotationRef.current.current + angleStep);
  }, [animateToRotation]);

  const snapToNearest = useCallback(() => {
    const nearestIndex = getNearestIndex(rotationRef.current.current);
    focusIndex(nearestIndex);
  }, [focusIndex]);

  const handleDesktopPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    pointerState.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotationRef.current.current,
      moved: false
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handleDesktopPointerMove = useCallback((event) => {
    const state = pointerState.current;
    if (!state.active || state.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - state.startX;
    if (Math.abs(deltaX) > 6) {
      state.moved = true;
    }

    rotationRef.current.current = state.startRotation + deltaX * 0.012;
    updateFramePositions();
  }, [updateFramePositions]);

  const releaseDesktopPointer = useCallback((event) => {
    const state = pointerState.current;
    if (!state.active || state.pointerId !== event.pointerId) {
      return;
    }

    pointerState.current.active = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore release errors on already-detached pointers
    }

    if (state.moved) {
      suppressClickRef.current = true;
      snapToNearest();
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  }, [snapToNearest]);

  const handleDesktopFrameNavigate = useCallback(
    (project) => {
      if (suppressClickRef.current) {
        return;
      }

      const projectIndex = projects.findIndex((item) => item.id === project.id);
      if (projectIndex >= 0) {
        focusIndex(projectIndex);
      }
    },
    [focusIndex]
  );

  const handleDesktopFrameOpen = useCallback((project) => {
    if (suppressClickRef.current) {
      return;
    }

    setOverlayProject(project);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayProject(null);
  }, []);

  useEffect(() => {
    if (!overlayProject) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [overlayProject, closeOverlay]);

  const frameStates = useMemo(() => {
    return projects.map((project, index) => {
      const angle = index * angleStep + rotation;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;
      const normalizedZ = (z + radius) / (radius * 2);
      const scale = 0.5 + normalizedZ * 0.7;
      const opacity = 0.2 + normalizedZ * 0.8;
      const wrappedAngle = wrapAngle(angle);
      const isFront = Math.abs(wrappedAngle) <= angleStep * 0.42;
      const depthClass = normalizedZ > 0.7 ? 'front' : normalizedZ > 0.35 ? 'side' : 'back';

      return {
        angle,
        x,
        z,
        scale,
        opacity,
        isFront,
        depthClass,
        transform: `translate3d(${x}rem, 0, ${z}rem) rotateY(${angle}rad) scale(${scale})`
      };
    });
  }, [rotation]);

  const activeProject = projects[activeIndex] ?? projects[0];
  const overlayToShow = isMobile ? null : overlayProject;

  const handleMobilePointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    mobilePointerState.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      moved: false
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handleMobilePointerMove = useCallback((event) => {
    const state = mobilePointerState.current;
    if (!state.active || state.pointerId !== event.pointerId) {
      return;
    }

    if (Math.abs(event.clientX - state.startX) > 12) {
      state.moved = true;
    }
  }, []);

  const handleMobilePointerUp = useCallback(
    (event) => {
      const state = mobilePointerState.current;
      if (!state.active || state.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - state.startX;
      mobilePointerState.current.active = false;

      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // ignore pointer capture release errors
      }

      if (deltaX < -50) {
        setActiveIndex((current) => normalizeIndex(current + 1));
        return;
      }

      if (deltaX > 50) {
        setActiveIndex((current) => normalizeIndex(current - 1));
      }
    },
    []
  );

  useEffect(() => {
    if (!isMobile) {
      return undefined;
    }

    rotationRef.current.current = -activeIndex * angleStep;
    setRotation(rotationRef.current.current);
  }, [activeIndex, isMobile]);

  return (
    <div className="film-strip-shell">
      {isMobile ? (
        <div
          className="film-strip-mobile"
          onPointerDown={handleMobilePointerDown}
          onPointerMove={handleMobilePointerMove}
          onPointerUp={handleMobilePointerUp}
          onPointerCancel={handleMobilePointerUp}
          style={{ touchAction: 'pan-y' }}
        >
          <FilmFrame
            project={activeProject}
            variant="mobile"
            onSelect={() => setOverlayProject(activeProject)}
          />

          <div className="mobile-dots" aria-label="Project navigation">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={index === activeIndex ? 'mobile-dot active' : 'mobile-dot'}
                aria-label={`Go to ${project.title}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <p className="mobile-swipe-hint">Swipe left or right to navigate the archive.</p>
        </div>
      ) : (
        <div className="film-strip-desktop">
          <div className="film-controls">
            <button className="film-arrow film-arrow-left" type="button" aria-label="Previous project" onClick={stepLeft}>
              ←
            </button>
            <div className="film-legend">
              <span>{activeProject.number}</span>
              <strong>{activeProject.title}</strong>
            </div>
            <button className="film-arrow film-arrow-right" type="button" aria-label="Next project" onClick={stepRight}>
              →
            </button>
          </div>

          <div
            className="film-carousel"
            onPointerDown={handleDesktopPointerDown}
            onPointerMove={handleDesktopPointerMove}
            onPointerUp={releaseDesktopPointer}
            onPointerCancel={releaseDesktopPointer}
          >
            <div className="film-carousel-scene">
              {frameStates.map((frameState, index) => {
                const project = projects[index];
                const isFront = frameState.isFront;

                return (
                  <FilmFrame
                    key={project.id}
                    project={project}
                    frameState={frameState}
                    onNavigate={handleDesktopFrameNavigate}
                    onOpenOverlay={(selectedProject) => {
                      if (suppressClickRef.current) {
                        return;
                      }

                      if (isFront) {
                        handleDesktopFrameOpen(selectedProject);
                        return;
                      }

                      handleDesktopFrameNavigate(selectedProject);
                    }}
                    style={{
                      opacity: frameState.opacity,
                      transform: `translate(-50%, -50%) ${frameState.transform}`,
                      zIndex: Math.round(frameState.opacity * 100),
                      filter: isFront ? 'drop-shadow(0 0 28px rgba(232, 255, 71, 0.35))' : 'none'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {overlayToShow ? (
        <div className="project-overlay" role="dialog" aria-modal="true" aria-labelledby="project-overlay-title" onClick={closeOverlay}>
          <div className="project-overlay-panel" onClick={(event) => event.stopPropagation()}>
            {overlayToShow.hackathon ? <span className="overlay-badge">🏆 Hackathon Finalist</span> : null}
            <p className="overlay-number">{overlayToShow.number}</p>
            <h3 id="project-overlay-title" className="overlay-title">
              {overlayToShow.title}
            </h3>
            <p className="overlay-desc">{overlayToShow.desc}</p>
            <div className="overlay-tags">
              {String(overlayToShow.tech)
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span key={tag} className="overlay-tag">
                    {tag}
                  </span>
                ))}
            </div>
            <div className="overlay-actions">
              {overlayToShow.live ? (
                <a href={overlayToShow.live} target="_blank" rel="noreferrer" className="frame-btn frame-btn--live">
                  Live Demo →
                </a>
              ) : (
                <span className="frame-btn frame-btn--live is-disabled" aria-disabled="true">
                  Live Demo →
                </span>
              )}
              <a href={overlayToShow.github} target="_blank" rel="noreferrer" className="frame-btn frame-btn--github">
                GitHub →
              </a>
            </div>
            <button type="button" className="overlay-back" onClick={closeOverlay}>
              ← Back
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default memo(FilmStrip);
