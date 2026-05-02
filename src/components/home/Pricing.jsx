export default function Pricing() {
  return (
    <section style={{ background: 'var(--toi-ink)', color: 'var(--toi-paper)', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="halftone" style={{ position: 'absolute', inset: 0, color: 'rgba(255,255,255,0.04)' }} />
      <div style={{ position: 'relative' }}>
        <div className="eyebrow" style={{ color: 'var(--toi-mustard)' }}>Section 04 · Offers</div>
        <h2 className="headline serif" style={{ fontSize: 56, margin: '8px 0 32px' }}>Stack the <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--toi-mustard)' }}>savings.</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 18 }}>
          <div style={{ background: 'var(--toi-mustard)', color: 'var(--toi-ink)', borderRadius: 12, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div className="eyebrow" style={{ color: 'var(--toi-red)' }}>Most loved</div>
            <div className="serif" style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginTop: 8 }}>Buy 4<br />get 1 <span style={{ fontStyle: 'italic', fontWeight: 400 }}>free</span></div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, marginTop: 16, maxWidth: 320 }}>Run 4 classifieds across any cities &amp; the 5th is on us. Auto-applied at checkout.</div>
            <div style={{ position: 'absolute', right: -20, bottom: -20, width: 160, height: 160, border: '8px solid var(--toi-red)', borderRadius: '50%', opacity: 0.4 }} />
            <div style={{ position: 'absolute', right: 20, bottom: 28, fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontSize: 13, fontWeight: 600, color: 'var(--toi-red)' }}>Save up to ₹4,200</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 28, border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="eyebrow" style={{ color: '#d8c7a3' }}>Promo code</div>
            <div className="serif" style={{ fontSize: 56, fontWeight: 800, color: 'var(--toi-mustard)', letterSpacing: '0.04em', marginTop: 8 }}>HIFIVE</div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, color: '#d8c7a3', marginTop: 8 }}>Flat 5% off any first order ≥ ₹1,000.</div>
            <div style={{ marginTop: 18, padding: '8px 12px', border: '1px dashed rgba(255,255,255,0.4)', borderRadius: 6, fontFamily: 'monospace', fontSize: 12, color: '#fff' }}>HIFIVE · expires 30 Jun</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 28, border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="eyebrow" style={{ color: '#d8c7a3' }}>Heritage tribute</div>
            <div className="serif" style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginTop: 8, lineHeight: 1.05 }}>Free obituary listing</div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 15, color: '#d8c7a3', marginTop: 8 }}>One complimentary 3-line obituary in your home edition for verified families.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
