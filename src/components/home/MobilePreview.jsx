import { AdsTOIWordmark, PhoneFrame } from '../brand'

export default function MobilePreview({ onBook }) {
  return (
    <PhoneFrame>
      <div style={{ background: '#faf6ee', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingTop: 36 }}>
        <div style={{ background: '#1a1716', color: '#faf6ee', padding: '6px 14px', fontSize: 9, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between' }}>
          <span>VOL.CXIII · TUE APR 28</span><span>EN · हि · म</span>
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e8dcc4' }}>
          <AdsTOIWordmark />
          <span style={{ fontSize: 18 }}>☰</span>
        </div>
        <div style={{ padding: '20px 16px' }}>
          <div style={{ display: 'inline-block', background: '#e8b94a', color: '#1a1716', padding: '4px 10px', borderRadius: 999, fontSize: 9, fontWeight: 800, letterSpacing: '0.04em' }}>BUY 4, GET 1 FREE</div>
          <h1 className="headline serif" style={{ fontSize: 44, lineHeight: 0.95, margin: '12px 0 8px', color: '#1a1716' }}>Let your ad <span style={{ fontStyle: 'italic', color: '#d8232a', fontWeight: 500 }}>speak</span> like you do.</h1>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 14, lineHeight: 1.4, color: '#3d342c' }}>Compose a Times of India ad in minutes. Templates, cities, dates — all in one flow.</p>
          <button onClick={onBook} style={{ width: '100%', background: '#d8232a', color: '#fff', border: 'none', padding: '14px', borderRadius: 999, fontWeight: 800, fontSize: 14, marginTop: 14, cursor: 'pointer' }}>Start booking →</button>
        </div>
        <div style={{ padding: '0 16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: '#fbf3e3', borderRadius: 10, padding: 14, border: '1px solid #e8dcc4' }}>
            <div className="eyebrow" style={{ color: '#d8232a', fontSize: 9 }}>POPULAR</div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 700, marginTop: 4, lineHeight: 1 }}>Classified</div>
            <div style={{ fontSize: 10, color: '#5e5045', marginTop: 4 }}>From ₹495</div>
          </div>
          <div style={{ background: '#1a1716', color: '#fff', borderRadius: 10, padding: 14 }}>
            <div className="eyebrow" style={{ color: '#e8b94a', fontSize: 9 }}>PREMIUM</div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 700, marginTop: 4, lineHeight: 1 }}>Display</div>
            <div style={{ fontSize: 10, color: '#d8c7a3', marginTop: 4 }}>Quote-based</div>
          </div>
        </div>
        <div style={{ background: '#fbf3e3', padding: '20px 16px', borderTop: '1px solid #e8dcc4' }}>
          <div className="eyebrow" style={{ color: '#d8232a' }}>Categories</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 10 }}>
            {[['Property', '#1d4d8c'], ['Soulmate', '#d8232a'], ['Education', '#e8b94a'], ['Vehicles', '#6b8e3d'], ['Recruit', '#f3a13a'], ['Obit.', '#6e6e6e']].map(([n, c]) => (
              <div key={n} style={{ background: '#fff', border: '1px solid #e8dcc4', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: c, margin: '0 auto 4px' }} />
                <div style={{ fontSize: 10, fontWeight: 700 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
