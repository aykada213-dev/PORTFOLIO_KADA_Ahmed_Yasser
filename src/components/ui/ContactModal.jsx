import { X } from 'lucide-react'

const CONTACT_LINKS = [
  { label: 'Email', value: 'Ay.kada213@gmail.com', href: 'mailto:Ay.kada213@gmail.com' },
  { label: 'GitHub', value: 'github.com/aykada213-dev', href: 'https://github.com/aykada213-dev' },
  { label: 'LinkedIn', value: 'linkedin.com/in/kada-ahmed-yasser-b064b831a', href: 'https://www.linkedin.com/in/kada-ahmed-yasser-b064b831a' },
  { label: 'ORCID', value: 'orcid.org/0009-0001-9139-7917', href: 'https://orcid.org/0009-0001-9139-7917' }
]

export default function ContactModal({ isOpen, onClose, language, translations }) {
  if (!isOpen) return null

  const t = translations[language]

  return (
    <div className="contact-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div className="contact-modal">
        <button type="button" className="contact-modal-close" onClick={onClose} aria-label="Close contact modal">
          <X size={18} />
        </button>

        <div className="contact-modal-header">
          <p className="eyebrow">{t.contact.title.split(' / ')[0]}</p>
          <h3 id="contact-modal-title">{t.contact.headline}</h3>
        </div>

        <p className="contact-modal-subhead">{t.contact.subhead}</p>

        <div className="contact-modal-list">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="contact-modal-item"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="contact-modal-label">{link.label}</span>
              <span className="contact-modal-value">{link.value}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
