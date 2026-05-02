const cats = [
  ['Property', '#1d4d8c', '4.2k'],
  ['Soulmate', '#d8232a', '1.8k'],
  ['Education', '#e8b94a', '320'],
  ['Recruitment', '#f3a13a', '910'],
  ['Vehicles', '#6b8e3d', '670'],
  ['Personal', '#5b8a72', '440'],
  ['Obituary', '#6e6e6e', '—'],
  ['Tenders', '#7a5230', '88'],
  ['Business', '#2c5d72', '210'],
  ['Shopping', '#e85a4f', '530'],
  ['Travel', '#3a7d8c', '180'],
  ['Services', '#bb6b3e', '290'],
]

export default function Categories({ onBook }) {
  return (
    <section style={{ background: 'var(--toi-cream)', padding: '72px 28px', borderTop: '1px solid #e8dcc4' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--toi-red)' }}>Section 02 · Categories</div>
          <h2 className="headline serif" style={{ fontSize: 56, margin: '8px 0 0', color: 'var(--toi-ink)' }}>14 ways to be <span style={{ fontStyle: 'italic', fontWeight: 400 }}>seen.</span></h2>
        </div>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, color: '#5e5045', maxWidth: 360 }}>
          From a 3-line classified to a full-page tribute — pick a category and we'll show you templates that fit.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {cats.map(([n, c, count]) => (
          <button key={n} onClick={onBook} style={{ all: 'unset', cursor: 'pointer', background: '#fff', borderRadius: 18, padding: 22, border: '1px solid #e8dcc4', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: c, opacity: 0.12, borderRadius: '0 18px 0 60px' }} />
            <div style={{ width: 44, height: 44, background: c, borderRadius: 12, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 18 }}>{n[0]}</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: 'var(--toi-ink)', letterSpacing: '-0.01em', lineHeight: 1 }}>{n}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: '#5e5045', fontWeight: 600 }}>
              <span>{count} live</span><span style={{ color: c, fontWeight: 800 }}>Book →</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
