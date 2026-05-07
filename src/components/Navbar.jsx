import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar({ active, onJump }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'work', label: 'Selected Work' },
      { id: 'about', label: 'About Me' },
      { id: 'contact', label: 'Contact' },
      { id: 'hire', label: 'Hire Me' }
    ],
    []
  );

  useEffect(() => {
    if (menuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    return undefined;
  }, [menuOpen]);

  const handleNavigate = (id) => {
    setMenuOpen(false);
    onJump(id);
  };

  return (
    <>
      <header className="nav-shell">
        <button className="brand" type="button" onClick={() => handleNavigate('home')}>
          <span className="brand-mark">◉</span>
          <span>SHASHIKANT</span>
        </button>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className={active === link.id ? 'nav-link active' : 'nav-link'}
              onClick={() => handleNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={menuOpen ? 'nav-toggle is-open' : 'nav-toggle'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.aside
            id="mobile-nav"
            className="nav-overlay"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <div className="nav-overlay-inner">
              <button
                type="button"
                className="nav-overlay-close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>

              <div className="nav-overlay-links">
                {links.map((link) => (
                  <button key={link.id} type="button" onClick={() => handleNavigate(link.id)}>
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
