export default function SectionTitle({ label, number, className = '' }) {
  return (
    <div className={`section-title ${className}`.trim()}>
      <span className="section-kicker">{label}</span>
      <span className="section-number">{number}</span>
    </div>
  )
}
