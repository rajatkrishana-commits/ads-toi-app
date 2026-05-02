const steps = [
  { n: '01', t: 'Pick your category', d: 'Property, Vehicles, Soulmate, Obituary — 14 categories with curated templates for each.' },
  { n: '02', t: 'Design your ad', d: 'Choose a template or upload your own. Add text, image, contact. Live preview as you type.' },
  { n: '03', t: 'Schedule & cities', d: 'Pick publication dates, language (EN/HI/MR/GU…) and editions across 30+ cities.' },
  { n: '04', t: 'Pay & publish', d: 'Apply your promo code, pay securely, get an instant order ID. Print runs the next morning.' },
]

export default function HowItWorks() {
  return (
    <section style={{ background: 'var(--toi-paper)', padding: '80px 28px', borderTop: '1px solid #e8dcc4' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--toi-red)' }}>Section 03 · How it works</div>
          <h2 className="headline serif" style={{ fontSize: 56, margin: '8px 0 0', color: 'var(--toi-ink)' }}>From idea to ink, in <span style={{ fontStyle: 'italic', fontWeight: 400 }}>four steps.</span></h2>
        </div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: '#5e5045', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700 }}>
          ⏱ avg time · 6 min
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--toi-ink)' }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ padding: '32px 24px 24px', borderRight: i < 3 ? '1px solid #d8c7a3' : 'none', position: 'relative' }}>
            <div className="serif" style={{ fontSize: 64, fontWeight: 300, color: 'var(--toi-red)', lineHeight: 0.9, fontStyle: 'italic' }}>{s.n}</div>
            <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: 'var(--toi-ink)', marginTop: 16, letterSpacing: '-0.01em' }}>{s.t}</div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 15, color: '#3d342c', marginTop: 8, lineHeight: 1.45 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
