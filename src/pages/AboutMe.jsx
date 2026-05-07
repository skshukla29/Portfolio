export default function AboutMe() {
  const skills = [
    { label: 'React', value: 92 },
    { label: 'JavaScript', value: 90 },
    { label: 'GSAP', value: 86 },
    { label: 'Node.js', value: 78 },
    { label: 'MongoDB', value: 74 },
    { label: 'Accessibility', value: 84 }
  ];

  const certifications = ['Microsoft AI', 'HackerRank Java', 'Web + DSA', 'Sheryians'];

  const code = `public class ShashikantShukla {
    String name = "Shashikant Shukla";
    String title = "Frontend Developer | React Specialist | Java Developer";
    String college = "IES College of Technology, Bhopal";
    String batch = "B.Tech CSE (AI & ML) | 2027";
    String[] skills = {"React", "JavaScript", "GSAP", "Node.js", "MongoDB"};

    boolean hireable() {
        return skills.length >= 5;
    }
}`;

  return (
    <section className="panel about-panel" id="about">
      <div className="section-title">
        <p>About Me</p>
        <h2>Shashikant Shukla</h2>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <p className="about-lead">
            Frontend developer focused on polished interfaces, motion systems, and practical builds that hold up in production.
          </p>

          <div className="about-details">
            <div>
              <span>Name</span>
              <strong>Shashikant Shukla</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>Frontend Developer | React Specialist | Java Developer</strong>
            </div>
            <div>
              <span>College</span>
              <strong>IES College of Technology, Bhopal</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>Bhopal, Madhya Pradesh, India</strong>
            </div>
          </div>
        </article>

        <article className="about-card code-card">
          <div className="code-window">
            <div className="code-window-header">
              <span />
              <span />
              <span />
            </div>
            <pre className="code-block">{code}</pre>
          </div>
        </article>
      </div>

      <div className="about-bottom-grid">
        <article className="about-card">
          <h3>Skills</h3>
          <div className="skill-bars">
            {skills.map((skill) => (
              <div key={skill.label} className="skill-row">
                <div className="skill-row-head">
                  <span>{skill.label}</span>
                  <strong>{skill.value}%</strong>
                </div>
                <div className="skill-track">
                  <span style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="about-card">
          <h3>Certifications</h3>
          <div className="cert-list">
            {certifications.map((certification) => (
              <span key={certification}>{certification}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
