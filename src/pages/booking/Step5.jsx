import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import FlowChrome from '../../components/flow/FlowChrome'
import OrderSummary from '../../components/flow/OrderSummary'
import FlowFooter from '../../components/flow/FlowFooter'

export default function Step5({ draft, setDraft, goStep, onHome, onConfirm, user, profile }) {
  const [promo, setPromo] = useState(draft.promo || '')
  const [applied, setApplied] = useState(!!draft.promo)
  const [tnc, setTnc] = useState(false)
  const [paying, setPaying] = useState(false)
  const [method, setMethod] = useState('upi')

  const subtotal = draft.subtotal || 990
  const discount = applied ? Math.round(subtotal * 0.05) : 0
  const gst = Math.round((subtotal - discount) * 0.05)
  const total = subtotal - discount + gst

  useEffect(() => { setDraft(d => ({ ...d, promo: applied ? promo : '', discount })) }, [applied, promo])

  const apply = () => { if (promo.trim().toUpperCase() === 'HIFIVE') setApplied(true) }

  const pay = async () => {
    setPaying(true)
    const orderId = 'B' + (5700000 + Math.floor(Math.random() * 99999))
    if (user) {
      const pub = [draft.pub, draft.edition].filter(Boolean).join(' · ')
      const { error } = await supabase.from('bookings').insert({
        order_id: orderId,
        user_id: user.id,
        status: 'placed',
        category: draft.cat || 'Property',
        design: draft.template || 'Property Template',
        publication: pub || 'Times of India',
        pub_date: draft.dates?.[0] || null,
        amount: total,
        subtotal,
        discount,
        gst,
        ad_text: draft.adText || '',
        promo_code: applied ? promo : null,
      })
      if (error) {
        setPaying(false)
        alert('Could not save booking: ' + error.message)
        return
      }
    }
    setDraft(d => ({ ...d, orderId }))
    onConfirm()
  }

  return (
    <FlowChrome stepIdx={4} goStep={goStep} onHome={onHome} draft={draft} profile={profile}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, padding: '36px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Step 5 of 5 · 30 sec</div>
          <h1 className="headline serif" style={{ fontSize: 56, color: '#1a1716', margin: '8px 0 6px' }}>Pay &amp; <i style={{ color: '#d8232a', fontWeight: 500 }}>publish.</i></h1>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 18, marginTop: 0 }}>Secure checkout via CC Avenue. Cards, UPI, net-banking and wallets accepted.</p>

          <div style={{ marginTop: 24, padding: 18, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 12 }}>
            <div className="eyebrow" style={{ color: '#d8232a' }}>Promo code</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <input value={promo} onChange={e => { setPromo(e.target.value.toUpperCase()); setApplied(false) }} placeholder="HIFIVE" style={{ flex: 1, padding: 14, border: '1.5px solid #d8c7a3', borderRadius: 10, fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.1em', background: '#fff' }} />
              <button onClick={apply} style={{ background: '#1a1716', color: '#fff', border: 'none', padding: '0 22px', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Apply</button>
            </div>
            {applied && <div style={{ marginTop: 10, color: '#3d5e1e', fontSize: 13, fontWeight: 700 }}>✓ HIFIVE applied · saved ₹ {discount}</div>}
            <div style={{ marginTop: 10, fontSize: 11, color: '#5e5045' }}>Try <b>HIFIVE</b> for 5% off your first booking.</div>
          </div>

          <div style={{ marginTop: 18, padding: 18, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 12 }}>
            <div className="eyebrow" style={{ color: '#5e5045' }}>Payment method</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 12 }}>
              {[['upi', 'UPI', '🇮🇳', 'Instant'], ['card', 'Card', '💳', 'Visa, Master, Rupay'], ['nb', 'Net banking', '🏦', '50+ banks'], ['wallet', 'Wallet', '👛', 'Paytm, PhonePe']].map(([k, l, e, s]) => (
                <button key={k} onClick={() => setMethod(k)} style={{ all: 'unset', cursor: 'pointer', padding: 14, borderRadius: 10, textAlign: 'center', border: '1.5px solid ' + (method === k ? '#d8232a' : '#e8dcc4'), background: method === k ? '#fbf3e3' : '#fff' }}>
                  <div style={{ fontSize: 22 }}>{e}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4 }}>{l}</div>
                  <div style={{ fontSize: 10, color: '#5e5045', marginTop: 2 }}>{s}</div>
                </button>
              ))}
            </div>

            {method === 'upi' && (
              <div style={{ marginTop: 16, padding: 14, background: '#fbf3e3', borderRadius: 10 }}>
                <div className="eyebrow" style={{ color: '#5e5045' }}>UPI ID</div>
                <input placeholder="yourname@upi" style={{ width: '100%', marginTop: 6, padding: 12, border: '1px solid #d8c7a3', borderRadius: 8, fontSize: 14 }} />
                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map(a => <span key={a} style={{ padding: '6px 12px', background: '#fff', borderRadius: 999, border: '1px solid #e8dcc4', fontSize: 12, fontWeight: 700 }}>{a}</span>)}
                </div>
              </div>
            )}
            {method === 'card' && (
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
                <input placeholder="Card number" style={{ padding: 14, border: '1px solid #d8c7a3', borderRadius: 8, fontFamily: 'monospace', fontSize: 14 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10 }}>
                  <input placeholder="Name on card" style={{ padding: 14, border: '1px solid #d8c7a3', borderRadius: 8, fontSize: 14 }} />
                  <input placeholder="MM/YY" style={{ padding: 14, border: '1px solid #d8c7a3', borderRadius: 8, fontFamily: 'monospace', fontSize: 14 }} />
                  <input placeholder="CVV" style={{ padding: 14, border: '1px solid #d8c7a3', borderRadius: 8, fontFamily: 'monospace', fontSize: 14 }} />
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-around', padding: 16, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 12, fontSize: 12, color: '#3d342c' }}>
            <span>🔒 256-bit SSL</span>
            <span>🛡 PCI-DSS compliant</span>
            <span>↩️ Free cancel before 9 PM</span>
            <span>📞 1800-1205-474</span>
          </div>

          <label style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#3d342c', cursor: 'pointer' }}>
            <input type="checkbox" checked={tnc} onChange={e => setTnc(e.target.checked)} style={{ marginTop: 2 }} />
            I accept the <a style={{ color: '#d8232a', fontWeight: 700, marginLeft: 4, marginRight: 4, cursor: 'pointer' }}>Terms &amp; Conditions</a> and Privacy Policy.
          </label>
        </div>

        <OrderSummary draft={{ ...draft, subtotal, discount }} />
      </div>

      <FlowFooter
        onBack={() => goStep(3)}
        onNext={pay}
        nextDisabled={!tnc || paying}
        nextLabel={paying ? 'Authorising…' : `Pay ₹ ${total}`}
        helperLeft={tnc ? '🔒 Secure payment via CC Avenue' : '☐ Accept terms to pay'}
      />
    </FlowChrome>
  )
}
