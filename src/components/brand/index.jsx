export const AdsTOIWordmark = ({ color = '#d8232a', textColor = '#1a1716' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, letterSpacing: '-0.02em', fontSize: 22, color: textColor, lineHeight: 1 }}>
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', background: color, color: '#fff', marginRight: 4, position: 'relative', top: 2 }}>
      <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 800, fontSize: 16, lineHeight: 1, transform: 'translateY(-1px)' }}>A</span>
    </span>
    <span>ds<span style={{ color }}>.</span>timesofindia<span style={{ color }}>.</span>com</span>
  </span>
)

export const TOIMasthead = ({ size = 36, color = '#1a1716' }) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', color, lineHeight: 1, fontFamily: "'Fraunces', Georgia, serif" }}>
    <svg width={size * 1.4} height={size * 0.4} viewBox="0 0 60 18" fill="none" style={{ marginBottom: 1 }}>
      <path d="M30 2c-3 0-5 2-5 4s1 3 2 3-1 1-1 3 2 4 4 4 4-2 4-4-1-3-1-3 2 0 2-3-2-4-5-4z" stroke={color} strokeWidth="0.6" fill="none" />
      <path d="M22 8h-3M41 8h-3M30 14v2" stroke={color} strokeWidth="0.5" />
      <path d="M14 14c4-1 8-1 16-1s12 0 16 1" stroke={color} strokeWidth="0.5" fill="none" />
    </svg>
    <div style={{ fontSize: size * 0.18, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.05em', fontWeight: 600, marginBottom: 2 }}>Bennett &amp; Coleman</div>
    <div style={{ fontSize: size * 0.32, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, letterSpacing: '0.02em', borderTop: `1px solid ${color}`, borderBottom: `1px solid ${color}`, padding: '1px 6px' }}>
      THE TIMES OF INDIA
    </div>
  </div>
)

export const SampleAdForSale = ({ accent = '#1d4d8c', img = 'house' }) => (
  <div style={{ background: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', borderRadius: 6, overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif", aspectRatio: '3/4' }}>
    <div style={{ background: accent, color: '#fff', padding: '14px 16px', fontFamily: "'Fraunces', Georgia, serif", fontWeight: 900, fontSize: 32, lineHeight: 0.92, letterSpacing: '-0.01em' }}>FOR<br />SALE</div>
    <div style={{ height: '50%', background: img === 'house' ? 'linear-gradient(180deg,#bfd9ea,#7ea4c2)' : 'linear-gradient(180deg,#f4d6a3,#c79257)', position: 'relative' }}>
      {img === 'house' && (
        <svg viewBox="0 0 100 60" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <polygon points="20,30 50,12 80,30 80,55 20,55" fill="#a47148" />
          <polygon points="20,30 50,12 80,30" fill="#7d4f2a" />
          <rect x="44" y="38" width="12" height="17" fill="#3a2a1d" />
          <rect x="28" y="38" width="8" height="8" fill="#cce4ff" />
          <rect x="64" y="38" width="8" height="8" fill="#cce4ff" />
          <rect x="0" y="55" width="100" height="5" fill="#5d7c3a" />
        </svg>
      )}
    </div>
    <div style={{ background: '#7d9b3f', color: '#fff', padding: 12, fontSize: 9, lineHeight: 1.3, textAlign: 'center', fontWeight: 600 }}>
      Newly constructed 2 floor building. 1200 sq.ft. Parking, near metro.
      <div style={{ marginTop: 6, color: '#1a3056', fontWeight: 800 }}>+91 98XXX XXXXX</div>
    </div>
  </div>
)

export const PhoneFrame = ({ children, w = 320, h = 660 }) => (
  <div style={{ width: w, height: h, background: '#1a1716', borderRadius: 36, padding: 10, boxShadow: '0 30px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)' }}>
    <div style={{ width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', background: '#fff', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 90, height: 22, background: '#1a1716', borderRadius: 14, zIndex: 50 }} />
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }} className="no-scrollbar">
        {children}
      </div>
    </div>
  </div>
)
