import { AdsTOIWordmark, TOIMasthead } from '../brand'

export default function Header({ onBook, onRegister, onSignIn }) {
  return (
    <header style={{ background: 'var(--toi-paper)', borderBottom: '1px solid #e8dcc4' }}>
      <div style={{ background: 'var(--toi-ink)', color: 'var(--toi-paper)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, padding: '6px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', letterSpacing: '0.04em' }}>
        <span>VOL. CXIII · NO. 87 · NEW DELHI · TUESDAY, APRIL 28, 2026 · ₹ 6.00</span>
        <span style={{ display: 'flex', gap: 14 }}>
          <span>EN</span><span style={{ opacity: 0.5 }}>·</span><span>हिन्दी</span><span style={{ opacity: 0.5 }}>·</span><span>मराठी</span><span style={{ opacity: 0.5 }}>·</span><span>ગુજરાતી</span>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <AdsTOIWordmark />
          <div style={{ width: 1, height: 36, background: '#d8c7a3' }} />
          <TOIMasthead size={32} />
          <div style={{ width: 1, height: 36, background: '#d8c7a3' }} />
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 500, fontSize: 14, color: '#5e5045' }}>
            The official ad<br />booking platform
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--toi-ink)' }}>
          <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Book an Ad ▾</a>
          <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Pricing</a>
          <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>How it works</a>
          <a style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Help</a>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--toi-red)', fontWeight: 700 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--toi-red)', boxShadow: '0 0 0 4px rgba(216,35,42,0.18)' }} />
            1800-1205-474
          </span>
          <button onClick={onSignIn} style={{ background: 'transparent', color: 'var(--toi-ink)', border: 'none', padding: '10px 14px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Sign in</button>
          <button onClick={onRegister} style={{ background: 'var(--toi-ink)', color: 'var(--toi-paper)', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Register</button>
        </nav>
      </div>
    </header>
  )
}
