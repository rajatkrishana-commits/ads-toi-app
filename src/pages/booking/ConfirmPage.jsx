import FlowChrome from '../../components/flow/FlowChrome'

export default function ConfirmPage({ draft, onAdmin, onHome }) {
  return (
    <FlowChrome stepIdx={5} goStep={() => {}} onHome={onHome} draft={draft} hideStepper>
      <div style={{ padding: '60px 28px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div style={{ width: 96, height: 96, background: '#dde8d6', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#3d5e1e' }}>✓</div>
        <h1 className="headline serif" style={{ fontSize: 64, color: '#1a1716', margin: '20px 0 8px' }}>You're <i style={{ color: '#d8232a', fontWeight: 500 }}>booked!</i></h1>
        <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 18 }}>Order ID <b style={{ color: '#1a1716' }}>B5745325</b> · receipt sent to <b>rajat@example.com</b></p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
          {['📥 Download receipt', '🗓 Add to calendar', '📲 Send to WhatsApp', '🔔 Notify me when live'].map(l => (
            <button key={l} style={{ background: '#fff', border: '1px solid #e8dcc4', borderRadius: 999, padding: '10px 18px', fontSize: 13, fontWeight: 700, color: '#1a1716', cursor: 'pointer' }}>{l}</button>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 24, background: '#fff', borderRadius: 14, border: '1px solid #e8dcc4', textAlign: 'left' }}>
          <div className="eyebrow" style={{ color: '#d8232a' }}>What happens next</div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['1', 'Admin review', 'Your ad is queued for moderation. ~ 2 hours.', '#f3a13a'],
              ['2', 'Sent to press', 'Once approved, scheduled in SAP for the press run.', '#1d4d8c'],
              ['3', `Prints ${draft.date || '28-04-2026'}`, `${draft.edition || 'Times of India · Mumbai'}, morning edition.`, '#6b8e3d'],
            ].map(([n, t, d, c]) => (
              <div key={n} style={{ background: '#fbf3e3', borderRadius: 10, padding: 16, borderLeft: `4px solid ${c}` }}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 800, color: c, fontStyle: 'italic', lineHeight: 1 }}>{n}</div>
                <div style={{ fontWeight: 800, marginTop: 6, color: '#1a1716', fontSize: 14 }}>{t}</div>
                <div style={{ color: '#5e5045', marginTop: 4, fontSize: 12 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#fff5e8', border: '1px solid #f3a13a', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, textAlign: 'left' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#1a1716' }}>Track your booking</div>
            <div style={{ fontSize: 12, color: '#5e5045', marginTop: 2 }}>Get SMS + WhatsApp updates as your ad moves through approval and press.</div>
          </div>
          <input placeholder="+91 98XXX XXXXX" style={{ padding: 10, border: '1px solid #f3a13a', borderRadius: 8, fontSize: 13 }} />
          <button style={{ background: '#1a1716', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Subscribe</button>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
          <button onClick={onHome} style={{ background: 'transparent', border: '1.5px solid #1a1716', color: '#1a1716', padding: '12px 24px', borderRadius: 999, fontWeight: 700, cursor: 'pointer' }}>← Back to home</button>
          <button onClick={onAdmin} style={{ background: '#1a1716', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 999, fontWeight: 800, cursor: 'pointer' }}>Peek admin view →</button>
        </div>
      </div>
    </FlowChrome>
  )
}
