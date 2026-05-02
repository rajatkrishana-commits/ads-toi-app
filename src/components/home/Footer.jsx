import { AdsTOIWordmark } from '../brand'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--toi-paper)', padding: '60px 28px 28px', borderTop: '3px double var(--toi-ink)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 40 }}>
        <div>
          <AdsTOIWordmark />
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, color: '#3d342c', marginTop: 14, fontStyle: 'italic', maxWidth: 320 }}>
            The official advertisement booking platform of The Times of India, Bennett &amp; Coleman.
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
            {['EN', 'हि', 'म', 'ગુ', 'বা', 'த'].map(l => (
              <span key={l} style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid #d8c7a3', fontSize: 12, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600 }}>{l}</span>
            ))}
          </div>
        </div>
        {[
          ['Book', ['Classifieds', 'Display ads', 'Inside pages', 'Regional language ads']],
          ['Account', ['Sign in', 'My orders', 'Wallet', 'Promo codes']],
          ['Support', ['Help center', 'Contact us', 'Booking guide', 'Refund policy']],
          ['Company', ['About TOI', 'Bennett & Coleman', 'Press', 'Careers']],
        ].map(([t, items]) => (
          <div key={t}>
            <div className="eyebrow" style={{ color: 'var(--toi-red)' }}>{t}</div>
            {items.map(i => (
              <div key={i} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: '#3d342c', marginTop: 10, fontWeight: 500, cursor: 'pointer' }}>{i}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e8dcc4', paddingTop: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: '#5e5045' }}>
        <span>© 2026 Bennett, Coleman &amp; Co. Ltd. All rights reserved.</span>
        <span>1800-1205-474 · Mon–Sun · 7am–10pm</span>
      </div>
    </footer>
  )
}
