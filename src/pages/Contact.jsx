export default function Contact() {
  const cards = [
    { label: 'Email', value: 'itzzshashikant29@gmail.com', href: 'mailto:itzzshashikant29@gmail.com' },
    { label: 'GitHub', value: 'github.com/skshukla29', href: 'https://github.com/skshukla29' },
    { label: 'LinkedIn', value: 'linkedin.com/in/shashikant-s-483022298', href: 'https://linkedin.com/in/shashikant-s-483022298' },
    { label: 'Location', value: 'Bhopal, Madhya Pradesh, India' }
  ];

  return (
    <section className="panel contact-panel" id="contact">
      <div className="section-title">
        <p>Contact</p>
        <h2>Let’s Build Something Sharp</h2>
      </div>

      <div className="contact-grid">
        <article className="contact-card contact-hook-card">
          <div className="contact-keyboard" aria-hidden="true">
            ⌨️
          </div>
          <h3>Still not convinced?</h3>
          <p>
            Reach out for internships, freelance builds, or full-time frontend roles.
          </p>
        </article>

        <div className="contact-stack">
          {cards.map((card) => (
            <article key={card.label} className="contact-card">
              <span className="contact-card-label">{card.label}</span>
              {card.href ? (
                <a href={card.href} target="_blank" rel="noreferrer">
                  {card.value}
                </a>
              ) : (
                <p>{card.value}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
