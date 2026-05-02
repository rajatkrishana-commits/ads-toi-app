import { SampleAdForSale } from '../brand'

export function Row({ k, v, green }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ color: '#5e5045' }}>{k}</span>
      <b style={{ color: green ? '#3d5e1e' : '#1a1716', fontWeight: 700, textAlign: 'right', maxWidth: 180 }}>{v}</b>
    </div>
  )
}

export default function OrderSummary({ draft, compact }) {
  const subtotal = draft.subtotal || 0
  const discount = draft.discount || 0
  const gst = Math.round((subtotal - discount) * 0.05)
  const total = subtotal - discount + gst

  return (
    <aside style={{ background: '#fff', border: '1px solid #e8dcc4', borderRadius: 16, padding: 22, position: 'sticky', top: 96, fontSize: 13 }}>
      <div className="eyebrow" style={{ color: '#d8232a' }}>Your ad so far</div>
      <div style={{ marginTop: 16 }}>
        <div style={{ width: '100%', aspectRatio: '3/4', background: '#fbf3e3', border: '1px dashed #d8c7a3', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          {draft.previewAccent ? (
            <SampleAdForSale accent={draft.previewAccent} img="house" />
          ) : (
            <div style={{ textAlign: 'center', color: '#9b8c70', padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📰</div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>Your ad preview<br />builds as you go</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, color: '#3d342c' }}>
        <Row k="Category" v={draft.category || '—'} />
        <Row k="Format" v={draft.format || '—'} />
        <Row k="City" v={draft.city || '—'} />
        <Row k="Date" v={draft.date || '—'} />
        <Row k="Size" v={draft.size || '—'} />
      </div>
      {subtotal > 0 && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed #e8dcc4' }}>
          <Row k="Subtotal" v={`₹ ${subtotal}`} />
          {discount > 0 && <Row k={`${draft.promo} discount`} v={`− ₹ ${discount}`} green />}
          <Row k="GST (5%)" v={`+ ₹ ${gst}`} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10, paddingTop: 12, borderTop: '1px solid #1a1716' }}>
            <span style={{ fontWeight: 700, color: '#1a1716' }}>Total</span>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 800, color: '#d8232a', letterSpacing: '-0.02em' }}>₹ {total}</span>
          </div>
        </div>
      )}
      {!compact && (
        <div style={{ marginTop: 18, padding: 12, background: '#fbf3e3', borderRadius: 8, fontSize: 11, color: '#5e5045', lineHeight: 1.5 }}>
          <b style={{ color: '#1a1716' }}>💡 Tip:</b> You can come back to this draft from <i>My Bookings</i> for the next 7 days. We won't charge until you tap Pay.
        </div>
      )}
    </aside>
  )
}
