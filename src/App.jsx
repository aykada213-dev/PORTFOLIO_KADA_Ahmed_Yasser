import { motion } from 'framer-motion'
import { ArrowRight, Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import HeroNetwork from './components/hero/HeroNetwork'
import { HeroErrorBoundary, NetworkFallback } from './components/hero/HeroErrorBoundary'
import ContactModal from './components/ui/ContactModal'
import SectionTitle from './components/ui/SectionTitle'
import { useLanguage } from './context/LanguageContext'
import { translations } from './data/translations'
import './App.css'

const navItems = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'networkLab', href: '#network-lab' },
  { key: 'aiLab', href: '#ai-lab' },
  { key: 'research', href: '#research' },
  { key: 'education', href: '#education' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' }
]

const LogoBadge = ({ src, alt, variant = 'horizontal' }) => (
  <div className={`entry-logo logo--${variant}`}>
    <img src={src} alt={alt} />
  </div>
)

function App() {
  const { language, setLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const t = translations[language]

  const cvLinks = {
    en: '/files/CV_KADA_AHMED_YASSER_ENGLISH.pdf',
    fr: '/files/CV_KADA_AHMED_YASSER%20_FRENCH.pdf'
  }

  const cvHref = cvLinks[language]
  const openContactModal = () => setIsContactModalOpen(true)
  const closeCvModal = () => setIsCvModalOpen(false)

  useEffect(() => {
    if (!isCvModalOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCvModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isCvModalOpen])

  const handleCvButtonClick = (event) => {
    event.preventDefault()
    setIsCvModalOpen(true)
  }

  return (
    <>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        language={language}
        translations={translations}
      />

      {isCvModalOpen && (
        <div
          className="cv-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeCvModal()
            }
          }}
        >
          <div className="cv-modal">
            <button type="button" className="cv-modal-close" onClick={closeCvModal} aria-label={language === 'en' ? 'Close CV language selector' : 'Fermer le sélecteur de langue du CV'}>
              <X size={18} />
            </button>

            <div className="cv-modal-header">
              <p className="cv-modal-kicker">CV</p>
              <h3 id="cv-modal-title">{language === 'en' ? 'Choose your CV language' : 'Choisissez la langue de votre CV'}</h3>
            </div>

            <div className="cv-modal-actions">
              <a href={cvLinks.en} className="cv-language-btn" download onClick={closeCvModal}>
                🇬🇧 English
              </a>
              <a href={cvLinks.fr} className="cv-language-btn" download onClick={closeCvModal}>
                🇫🇷 Français
              </a>
            </div>

            <button type="button" className="cv-modal-close-btn" onClick={closeCvModal}>
              {language === 'en' ? 'Close' : 'Fermer'}
            </button>
          </div>
        </div>
      )}

      <div className="portfolio-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-name">YASSER</span>
        </div>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            if (item.key === 'contact') {
              return (
                <button key={item.key} type="button" className="nav-contact-trigger" onClick={openContactModal} aria-haspopup="dialog">
                  {t.nav[item.key]}
                </button>
              )
            }
            return (
              <a key={item.key} href={item.href}>
                {t.nav[item.key]}
              </a>
            )
          })}
        </nav>

        <div className="top-actions">
          <div className="lang-switch" aria-label="Language switcher">
            <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>
              EN
            </button>
            <span className="divider">|</span>
            <button type="button" className={language === 'fr' ? 'active' : ''} onClick={() => setLanguage('fr')}>
              FR
            </button>
          </div>

          <button type="button" className="menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Toggle navigation menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => {
            if (item.key === 'contact') {
              return (
                <button key={item.key} type="button" className="nav-contact-trigger mobile" onClick={() => {
                  setMobileOpen(false)
                  openContactModal()
                }} aria-haspopup="dialog">
                  {t.nav[item.key]}
                </button>
              )
            }
            return (
              <a key={item.key} href={item.href} onClick={() => setMobileOpen(false)}>
                {t.nav[item.key]}
              </a>
            )
          })}
        </nav>
      )}

      <main className="page-content">
        <section id="hero" className="hero-section">
          <div className="hero-visual">
            <div className="hero-network-wrap" aria-hidden="true">
              <HeroErrorBoundary fallback={<NetworkFallback />}>
                <HeroNetwork />
              </HeroErrorBoundary>
            </div>
            <img
              className="hero-portrait"
              src="/images/portfolio.jpg"
              alt="Kada Ahmed Yasser"
            />
          </div>

          <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="eyebrow">KADA AHMED YASSER</p>
            <h1>{t.hero.role}</h1>
            <h2>{t.hero.statement}</h2>
            <p className="lead">{t.hero.intro}</p>

            <div className="hero-actions">
              <a href="#projects" className="primary-btn">
                {t.hero.buttonExplore}
                <ArrowRight size={16} />
              </a>
              <a href={cvHref} className="secondary-btn" onClick={handleCvButtonClick}>
                <Download size={16} />
                {t.hero.buttonCv}
              </a>
            </div>

            <div className="status-panel">
              <div className="status-header">{t.hero.profileStatus}</div>
              <div className="status-grid">
                <div>
                  <span>{t.hero.roleLabel}</span>
                  <strong>{t.hero.role}</strong>
                </div>
                <div>
                  <span>{t.hero.focusLabel}</span>
                  <strong>{t.hero.focus}</strong>
                </div>
                <div>
                  <span>{t.hero.educationLabel}</span>
                  <strong>{t.hero.education}</strong>
                </div>
                <div>
                  <span>{t.hero.university}</span>
                  <strong>{t.hero.university}</strong>
                </div>
                <div>
                  <span>{t.hero.statusLabel}</span>
                  <strong>{t.hero.status}</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="content-section">
          <SectionTitle label={t.about.title.split(' / ')[0]} number="/ 01" />
          <div className="about-layout">
            <div className="about-copy">
              <p>{t.about.body}</p>
            </div>
            <div className="expertise-panel">
              <div className="panel-label">{t.about.expertise}</div>
              <div className="chip-grid">
                {t.about.items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="content-section">
          <SectionTitle label={t.experience.title.split(' / ')[0]} number="/ 02" />
          <div className="experience-card main-experience">
            <div className="experience-header">
              <div className="entity-header">
                <LogoBadge src={t.experience.companyLogo} alt="Samsung C&T Corporation logo" variant={t.experience.companyLogoVariant || 'horizontal'} />
                <div>
                  <p className="company">{t.experience.company}</p>
                  <h3>{t.experience.role}</h3>
                </div>
              </div>
              <div className="meta">
                <span>{t.experience.location}</span>
                <span>{t.experience.period}</span>
              </div>
            </div>
            <p className="experience-summary">{t.experience.description}</p>
            <ul className="responsibility-list">
              {t.experience.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="internships-wrap">
            <div className="internship-card">
              <div className="entity-header compact-header">
                <LogoBadge src={t.experience.schneiderLogo} alt="Schneider Electric logo" variant={t.experience.schneiderLogoVariant || 'horizontal'} />
                <div>
                  <p className="company">{t.experience.schneider}</p>
                </div>
              </div>
              <span>{t.experience.schneiderPeriod}</span>
              <p>{t.experience.schneiderText}</p>
            </div>
            <div className="internship-card">
              <div className="entity-header compact-header">
                <LogoBadge src={t.experience.udesLogo} alt="UDES logo" variant={t.experience.udesLogoVariant || 'circular'} />
                <div>
                  <p className="company">{t.experience.udes}</p>
                </div>
              </div>
              <span>{t.experience.udesPeriod}</span>
              <p>{t.experience.udesText}</p>
            </div>
          </div>
        </section>

        <section id="projects" className="content-section">
          <SectionTitle label={t.projects.title.split(' / ')[0]} number="/ 03" />
          <div className="projects-grid">
            {t.projects.cards.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-topbar">
                  <span className="project-badge">{project.categories.join(' · ')}</span>
                  <span className="project-view">{t.projects.detailLabel}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="stat-row">
                  {project.stats.map((stat) => (
                    <span key={stat}>{stat}</span>
                  ))}
                </div>
                <div className="tech-row">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="network-lab" className="content-section lab-section">
          <SectionTitle label={t.labs.networkTitle.split(' / ')[0]} number="/ 04" />
          <div className="lab-panel">
            <div className="lab-network-sim">
              {t.labs.networkNodes.map((node, index) => (
                <div key={node} className={`node ${['node-ai', 'node-data', 'node-router', 'node-security', 'node-scada'][index % 5]}`}>
                  {node}
                </div>
              ))}
            </div>
            <p>{t.labs.networkText}</p>
          </div>
        </section>

        <section id="ai-lab" className="content-section lab-section">
          <SectionTitle label={t.labs.aiTitle.split(' / ')[0]} number="/ 05" />
          <div className="lab-panel ai-panel">
            <div className="workflow">
              {t.labs.aiSteps.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
            <p>{t.labs.aiText}</p>
          </div>
        </section>

        <section id="research" className="content-section">
          <SectionTitle label={t.research.title.split(' / ')[0]} number="/ 06" />
          <div className="research-card">
            <p className="research-label">{t.research.publicationLabel}</p>
            <h3>{t.research.publication}</h3>
            <p>{t.research.journal}</p>
            <p>{t.research.doi}</p>
            <div className="conference-block">
              <p className="research-label">{t.research.conferenceLabel}</p>
              <h4>{t.research.conference}</h4>
              <p>{t.research.place}</p>
              <p>{t.research.topic}</p>
            </div>
          </div>
        </section>

        <section id="education" className="content-section">
          <SectionTitle label={t.education.title.split(' / ')[0]} number="/ 07" />
          <div className="education-list">
            {t.education.items.map((entry, index) => (
              <div key={`${entry.title}-${entry.period}-${index}`} className="education-item">
                <span className="period">{entry.period}</span>
                <div className="education-detail">
                  <div className="entity-header compact-header">
                    {entry.logo && (
                      <LogoBadge src={entry.logo} alt={`${entry.title} logo`} variant={entry.logoVariant || 'horizontal'} />
                    )}
                    <div>
                      <h3>{entry.title}</h3>
                      <p>{entry.subtitle}</p>
                    </div>
                  </div>
                  <ul>
                    {entry.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section">
          <SectionTitle label={t.skills.title.split(' / ')[0]} number="/ 08" />
          <div className="skills-grid">
            {Object.entries(t.skills.labels).map(([key, items], index) => (
              <div key={key} className="skill-cluster">
                <h3>{t.skills.categories[index]}</h3>
                <div className="skill-tags">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <SectionTitle label={t.contact.title.split(' / ')[0]} number="/ 09" />
          <div className="contact-box">
            <h3>{t.contact.headline}</h3>
            <p>{t.contact.subhead}</p>
            <div className="contact-actions">
              {t.contact.buttons.map((button) => {
                if (button === 'DOWNLOAD CV' || button === 'TÉLÉCHARGER LE CV' || button === 'TÉLÉCHARGER CV') {
                  return (
                    <a href={cvHref} key={button} className="contact-btn" onClick={handleCvButtonClick}>
                      {button}
                    </a>
                  )
                }

                return (
                  <button type="button" key={button} className="contact-btn" onClick={openContactModal} aria-haspopup="dialog">
                    {button}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p>{t.footer.line1}</p>
          <p>{t.footer.line2}</p>
        </div>
        <span>{t.footer.caption}</span>
        <div className="footer-lang">
          <button type="button" className={language === 'fr' ? 'active' : ''} onClick={() => setLanguage('fr')}>FR</button>
          <span>/</span>
          <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
