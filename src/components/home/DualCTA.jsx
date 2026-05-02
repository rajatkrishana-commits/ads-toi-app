export default function DualCTA({ onBook }) {
  return (
    <section style={{ background: 'var(--toi-paper)', padding: '40px 28px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
        <h2 className="headline serif" style={{ fontSize: 44, color: 'var(--toi-ink)', margin: 0 }}>What kind of ad <span style={{ fontStyle: 'italic', fontWeight: 400 }}>are you running?</span></h2>
        <span className="eyebrow" style={{ color: '#5e5045' }}>Pick one to begin →</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <button onClick={onBook} style={{ all: 'unset', cursor: 'pointer', background: 'var(--toi-cream)', border: '1px solid #e8dcc4', borderRadius: 12, padding: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--toi-red)' }}>Most popular</div>
              <div className="serif" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, color: 'var(--toi-ink)', marginTop: 6, letterSpacing: '-0.02em' }}>Book a Classified Ad</div>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#3d342c', marginTop: 8, fontSize: 16 }}>Property · Vehicles · Recruitment · Personal · Obituary &amp; more</div>
            </div>
            <span style={{ display: 'inline-flex', width: 50, height: 50, borderRadius: '50%', background: 'var(--toi-red)', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>→</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 24 }}>
            {[['#1d4d8c', 'PROPERTY'], ['#d8232a', 'SOULMATE'], ['#e8b94a', 'EDUCATION'], ['#6b8e3d', 'VEHICLES']].map(([c, l]) => (
              <div key={l} style={{ background: '#fff', border: '1px solid #e8dcc4', padding: 10, borderRadius: 6, textAlign: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: c, margin: '0 auto 6px' }} />
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', color: '#3d342c' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: '#5e5045' }}>
            <span>Starts at <strong style={{ color: 'var(--toi-ink)', fontSize: 14 }}>₹495</strong> per ad</span>
            <span style={{ fontWeight: 700, color: 'var(--toi-red)' }}>13 categories →</span>
          </div>
        </button>

        <button style={{ all: 'unset', cursor: 'pointer', background: 'var(--toi-ink)', color: 'var(--toi-paper)', borderRadius: 12, padding: 28, position: 'relative', overflow: 'hidden' }}>
          <div className="halftone" style={{ position: 'absolute', inset: 0, color: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative' }}>
            <div className="eyebrow" style={{ color: 'var(--toi-mustard)' }}>Premium reach</div>
            <div className="serif" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, marginTop: 6, letterSpacing: '-0.02em' }}>Book a Display Ad</div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#d8c7a3', marginTop: 8, fontSize: 16 }}>Inside pages · half-page · full-page editorial spreads</div>
            <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: '#fbf3e3', height: 90, borderRadius: 4, padding: 8, color: '#1a1716' }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 14, lineHeight: 1 }}>The gift that<br />sends you back<br />in time</div>
                <div style={{ fontSize: 6, marginTop: 4, color: '#5e5045' }}>Heritage Watches · Special Edition</div>
              </div>
              <div style={{ flex: 1, background: 'var(--toi-mustard)', height: 90, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1716', fontFamily: "'Fraunces', Georgia, serif", fontWeight: 900, fontSize: 18, lineHeight: 1, textAlign: 'center' }}>UNMATCHED<br />OFFERS</div>
              <div style={{ flex: 1, background: '#f3e3da', height: 90, borderRadius: 4, padding: 8, color: '#1a1716' }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 11, lineHeight: 1.05 }}>Education<br />Special</div>
                <div style={{ fontSize: 6, marginTop: 4 }}>Top engineering colleges 2026</div>
              </div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: '#d8c7a3' }}>
              <span>Custom quotes · talk to a planner</span>
              <span style={{ fontWeight: 700, color: 'var(--toi-mustard)' }}>Get a quote →</span>
            </div>
          </div>
        </button>
      </div>
    </section>
  )
}
