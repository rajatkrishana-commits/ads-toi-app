export default function FlowFooter({ onBack, onNext, nextLabel = 'Continue', nextDisabled, helperLeft }) {
  return (
    <div style={{ position: 'sticky', bottom: 0, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', borderTop: '1px solid #e8dcc4', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
      <div style={{ fontSize: 12, color: '#5e5045' }}>{helperLeft}</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: '1.5px solid #1a1716', color: '#1a1716', padding: '12px 26px', borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>← Back</button>
        <button onClick={onNext} disabled={nextDisabled} style={{ background: nextDisabled ? '#c5b491' : '#d8232a', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: 999, fontWeight: 800, fontSize: 14, boxShadow: nextDisabled ? 'none' : '0 8px 20px rgba(216,35,42,0.3)', cursor: nextDisabled ? 'not-allowed' : 'pointer' }}>{nextLabel} →</button>
      </div>
    </div>
  )
}
