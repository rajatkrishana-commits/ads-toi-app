import { SampleAdForSale } from '../brand'

export default function Hero({ onBook }) {
  return (
    <section style={{ background: 'var(--toi-paper)', padding: '40px 28px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '3px double var(--toi-ink)', borderBottom: '1px solid var(--toi-ink)', padding: '8px 0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--toi-ink)' }}>
        <span>Classifieds · Display · Inside Pages</span>
        <span>Reaching 30+ Cities · 70 mn Readers Daily</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, padding: '64px 0 40px', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--toi-mustard)', color: 'var(--toi-ink)', padding: '6px 14px', borderRadius: 999, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.04em' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--toi-red)' }} />
            Limited offer · Buy 4 ads, get 1 free
          </div>
          <h1 className="headline serif" style={{ fontSize: 96, margin: '20px 0 8px', color: 'var(--toi-ink)' }}>
            Let your ad<br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--toi-red)' }}>speak</span>
            <span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--toi-red)', borderRadius: '50%', margin: '0 6px 12px', verticalAlign: 'middle' }} />
            like you do.
          </h1>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, lineHeight: 1.45, color: '#3d342c', maxWidth: 540, margin: '12px 0 32px', fontWeight: 400 }}>
            Compose a classified or display ad in minutes. Pick a template, choose your cities, hit publish — your story runs in The Times of India tomorrow morning.
          </p>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button onClick={onBook} style={{ background: 'var(--toi-red)', color: '#fff', border: 'none', padding: '20px 32px', borderRadius: 999, fontWeight: 800, fontSize: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'inline-flex', alignItems: 'center', gap: 12, boxShadow: '0 14px 30px rgba(216,35,42,0.28)', cursor: 'pointer' }}>
              Start booking now <span style={{ display: 'inline-flex', width: 28, height: 28, borderRadius: '50%', background: '#fff', color: 'var(--toi-red)', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>→</span>
            </button>
            <button style={{ background: 'transparent', color: 'var(--toi-ink)', border: '1.5px solid var(--toi-ink)', padding: '18px 24px', borderRadius: 999, fontWeight: 700, fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer' }}>See sample ads</button>
          </div>

          <div style={{ display: 'flex', gap: 32, marginTop: 44, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {[['30+', 'cities live'], ['12k', 'ads booked / month'], ['4.8★', 'avg booking rating']].map(([n, l]) => (
              <div key={l}>
                <div className="serif" style={{ fontSize: 38, fontWeight: 700, color: 'var(--toi-ink)', letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: 12, color: '#5e5045', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', height: 560 }}>
          <div style={{ position: 'absolute', right: 0, top: 18, width: 380, height: 480, background: 'var(--toi-mustard)', borderRadius: 4, transform: 'rotate(2.5deg)' }}>
            <div className="halftone" style={{ position: 'absolute', inset: 0, color: 'rgba(0,0,0,0.07)', borderRadius: 4 }} />
          </div>
          <div style={{ position: 'absolute', right: 60, top: 0, width: 320, height: 440, background: '#f6efe1', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', transform: 'rotate(-3deg)', padding: 16, fontFamily: "'Fraunces', Georgia, serif" }}>
            <div style={{ borderTop: '2px solid #1a1716', borderBottom: '0.5px solid #1a1716', padding: '6px 0', display: 'flex', justifyContent: 'space-between', fontSize: 8, letterSpacing: '0.08em', fontWeight: 700 }}>
              <span>THE TIMES OF INDIA</span>
              <span>CLASSIFIEDS</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 0.95, marginTop: 10, letterSpacing: '-0.01em' }}>
              Property for sale —<br />Mumbai &amp; Pune
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ fontSize: 7, lineHeight: 1.35, color: '#2a251f' }}>
                  <div style={{ fontWeight: 800, fontSize: 8, marginBottom: 2 }}>WORLI · 2BHK</div>
                  Newly constructed 2 floor building, carpet area 1200 sq.ft, parking in basement. Near ABC mall, walking distance from metro station. Owner sale, no broker.
                  <div style={{ fontWeight: 700, marginTop: 2 }}>+91 98XXX XXXXX</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 20, width: 200, transform: 'rotate(-6deg)' }}>
            <SampleAdForSale accent="#1d4d8c" img="house" />
          </div>
          <div style={{ position: 'absolute', right: -8, top: 220, background: 'var(--toi-red)', color: '#fff', padding: '14px 18px', borderRadius: '50%', width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 11, lineHeight: 1.15, transform: 'rotate(8deg)', boxShadow: '0 10px 24px rgba(216,35,42,0.3)' }}>
            5% OFF<br />Code<br />HIFIVE
          </div>
        </div>
      </div>
    </section>
  )
}
