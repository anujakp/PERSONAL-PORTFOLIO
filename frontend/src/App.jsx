import { useEffect, useState } from "react"
import { profile, skills, projects } from "./personal-portfolio"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState("")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  useEffect(() => {
    document.title = `${profile.name} | Portfolio`
  }, [])

  const submitForm = async (e) => {
    e.preventDefault()
    setStatus("Sending...")
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong")
      setStatus("Message sent successfully.")
      setForm({ name: "", email: "", message: "" })
    } catch (err) {
      setStatus(err.message || "Could not send message.")
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <nav className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>YN<span>.</span></a>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["home", "about", "skills", "projects", "contact"].map(item => (
            <a key={item} href={`#${item}`} onClick={closeMenu}>{item}</a>
          ))}
        </div>
      </nav>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">HELLO, I'M</p>
            <h1>{profile.name}<span>.</span></h1>
            <h2>{profile.role}</h2>
            <p className="hero-text">{profile.tagline}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">View Projects</a>
              <a className="btn secondary" href="#contact">Contact Me</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="avatar">YN</div>
            <div className="code-card">
              <span>const</span> developer = &#123;<br />
              &nbsp;&nbsp;skills: ["web", "ML"],<br />
              &nbsp;&nbsp;mindset: "build + learn"<br />
              &#125;
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading">
            <p className="eyebrow">01 — ABOUT</p>
            <h2>Building with purpose.</h2>
          </div>
          <div className="about-grid">
            <p>{profile.about}</p>
            <div className="facts">
              <div><strong>Education</strong><span>Integrated BCA + MCA</span></div>
              <div><strong>Focus</strong><span>Web Development & ML</span></div>
              <div><strong>Location</strong><span>{profile.location}</span></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading">
            <p className="eyebrow">02 — SKILLS</p>
            <h2>Tools I work with.</h2>
          </div>
          <div className="skills-grid">
            {skills.map(skill => (
              <div className="skill" key={skill.name}>
                <div className="skill-top"><span>{skill.name}</span><span>{skill.level}%</span></div>
                <div className="bar"><div style={{ width: `${skill.level}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <p className="eyebrow">03 — PROJECTS</p>
            <h2>Selected work.</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project" key={project.title}>
                <div className="project-number">0{index + 1}</div>
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">{project.tech.map(t => <span key={t}>{t}</span>)}</div>
                <a href={project.github} className="project-link">GitHub ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading">
            <p className="eyebrow">04 — CONTACT</p>
            <h2>Let's build something.</h2>
            <p>Have a project, internship opportunity or idea? Send a message.</p>
          </div>
          <form className="contact-form" onSubmit={submitForm}>
            <input required placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input required type="email" placeholder="Your email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <textarea required rows="6" placeholder="Your message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            <button className="btn primary" type="submit">Send Message →</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React + Node.js + MongoDB</span>
      </footer>
    </div>
  )
}

export default App