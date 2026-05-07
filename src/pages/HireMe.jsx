export default function HireMe() {
  return (
    <section className="panel hire-panel" id="hire">
      <div className="section-title">
        <p>Hire Me</p>
        <h2>Open to internships and production roles</h2>
      </div>

      <div className="hire-grid">
        <article className="hire-card hire-copy-card">
          <h3>Available for</h3>
          <p>Frontend engineering, UI implementation, motion design, and portfolio-grade product work.</p>
          <div className="hire-pills">
            <span>Internship</span>
            <span>Freelance</span>
            <span>Full-time</span>
          </div>
        </article>

        <article className="hire-card">
          <form className="hire-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Name</span>
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" placeholder="Your email" />
            </label>
            <label>
              <span>Message</span>
              <textarea rows="5" placeholder="Tell me about the role or project" />
            </label>
            <button type="submit" className="primary-btn submit-btn">
              Send Message →
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
