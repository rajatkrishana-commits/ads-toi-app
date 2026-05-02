import { useState, useEffect } from 'react'
import FlowChrome from '../../components/flow/FlowChrome'
import OrderSummary from '../../components/flow/OrderSummary'
import { Row } from '../../components/flow/OrderSummary'
import FlowFooter from '../../components/flow/FlowFooter'

const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore']

const fieldStyle = { width: '100%', padding: '12px 14px', border: '1px solid #e8dcc4', borderRadius: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, background: '#fff' }

const Field = ({ label, children }) => (
  <div>
    <div className="eyebrow" style={{ color: '#5e5045', marginBottom: 6 }}>{label}</div>
    {children}
  </div>
)

export default function Step4({ draft, setDraft, goStep, onHome, profile }) {
  const [city, setCity] = useState(draft.city || 'Mumbai')
  const [edition, setEdition] = useState(draft.edition || 'Times of India · Mumbai')
  const [date, setDate] = useState(draft.date || '28-04-2026')
  const [combo, setCombo] = useState(draft.combo || false)
  const [adsCount, setAdsCount] = useState(draft.adsCount || 1)
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    setDraft(d => ({ ...d, city, edition, date, combo, adsCount }))
  }, [city, edition, date, combo, adsCount])

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(2026, 3, 28 + i)
    return { date: d, label: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }), dow: d.toLocaleDateString('en-IN', { weekday: 'short' }), iso: d.toLocaleDateString('en-GB').replace(/\//g, '-') }
  })

  const accent = draft.templateAccent || draft.categoryColor || '#1d4d8c'

  return (
    <FlowChrome stepIdx={3} goStep={goStep} onHome={onHome} draft={draft} profile={profile}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, padding: '36px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Step 4 of 5 · 1 min</div>
          <h1 className="headline serif" style={{ fontSize: 56, color: '#1a1716', margin: '8px 0 6px' }}>When &amp; <i style={{ color: '#d8232a', fontWeight: 500 }}>where?</i></h1>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 18, marginTop: 0 }}>Pick your city, edition and the day you'd like it to print.</p>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="City">
              <select value={city} onChange={e => setCity(e.target.value)} style={fieldStyle}>{CITIES.map(c => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Edition">
              <select value={edition} onChange={e => setEdition(e.target.value)} style={fieldStyle}>
                <option>Times of India · {city}</option>
                <option>Navbharat Times · {city}</option>
                <option>Maharashtra Times · {city}</option>
                <option>Mumbai Mirror</option>
              </select>
            </Field>
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 10, padding: 14, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 10 }}>
            {[[false, 'Individual edition', 'Just this paper'], [true, 'Combo (3 papers)', 'Same ad, three editions · save up to 18%']].map(([v, l, sub]) => (
              <button key={String(v)} onClick={() => setCombo(v)} style={{ all: 'unset', cursor: 'pointer', flex: 1, padding: 14, border: '1.5px solid ' + (combo === v ? '#d8232a' : '#e8dcc4'), borderRadius: 10, background: combo === v ? '#fbf3e3' : '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid ' + (combo === v ? '#d8232a' : '#c5b491'), background: combo === v ? '#d8232a' : 'transparent' }} />
                  <span style={{ fontWeight: 800, color: '#1a1716', fontSize: 14 }}>{l}</span>
                </div>
                <div style={{ fontSize: 12, color: '#5e5045', marginTop: 6, marginLeft: 24 }}>{sub}</div>
              </button>
            ))}
          </div>

          <div className="eyebrow" style={{ color: '#5e5045', marginTop: 24, marginBottom: 10 }}>Publishing date</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
            {days.map(d => {
              const sel = date === d.iso
              return (
                <button key={d.iso} onClick={() => setDate(d.iso)} style={{ all: 'unset', cursor: 'pointer', minWidth: 78, textAlign: 'center', padding: '12px 8px', borderRadius: 12, background: sel ? '#1a1716' : '#fff', color: sel ? '#fff' : '#1a1716', border: '1px solid ' + (sel ? '#1a1716' : '#e8dcc4') }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: sel ? '#f3a13a' : '#5e5045', textTransform: 'uppercase' }}>{d.dow}</div>
                  <div style={{ fontSize: 18, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, marginTop: 4 }}>{d.label}</div>
                </button>
              )
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#5e5045' }}>
            Selected: <b style={{ color: '#1a1716' }}>{date}</b> · publishes in tomorrow's morning edition if booked before <b>9 PM</b>
          </div>

          <div style={{ marginTop: 24, padding: 16, background: 'linear-gradient(90deg, #1d4d8c 0%, #2c5d72 70%, #1a1716 100%)', color: '#fff', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 18 }}>Buy 4 ads, get 1 free</div>
              <div style={{ fontSize: 12, color: '#d8c7a3', marginTop: 2 }}>Add more dates and we'll automatically discount.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: 4 }}>
              <button onClick={() => setAdsCount(Math.max(1, adsCount - 1))} style={{ all: 'unset', cursor: 'pointer', width: 28, height: 28, borderRadius: '50%', background: '#fff', color: '#1a1716', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>−</button>
              <span style={{ minWidth: 36, textAlign: 'center', fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 800 }}>{adsCount}</span>
              <button onClick={() => setAdsCount(adsCount + 1)} style={{ all: 'unset', cursor: 'pointer', width: 28, height: 28, borderRadius: '50%', background: '#f3a13a', color: '#1a1716', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>＋</button>
            </div>
          </div>

          <div className="eyebrow" style={{ color: '#5e5045', marginTop: 32, marginBottom: 12 }}>Final preview · how it will print</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ background: '#1a1716', padding: 18, borderRadius: 12, flexShrink: 0 }}>
              <div style={{ width: 220, background: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                <div style={{ background: accent, color: '#fff', padding: '20px 14px', fontFamily: "'Fraunces', Georgia, serif", fontWeight: 900, fontSize: 48, lineHeight: 0.9 }}>FOR<br />SALE</div>
                <div style={{ height: 130, background: 'linear-gradient(180deg,#bfd9ea,#7ea4c2)' }}>
                  <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%' }}><polygon points="20,30 50,12 80,30 80,55 20,55" fill="#a47148" /><polygon points="20,30 50,12 80,30" fill="#7d4f2a" /><rect x="44" y="38" width="12" height="17" fill="#3a2a1d" /><rect x="0" y="55" width="100" height="5" fill="#5d7c3a" /></svg>
                </div>
                <div style={{ background: '#7d9b3f', color: '#fff', padding: 14, fontSize: 11, textAlign: 'center', lineHeight: 1.35, fontFamily: "'Fraunces', Georgia, serif" }}>
                  {draft.body || 'Your ad copy will appear here.'}
                  <div style={{ marginTop: 8, color: '#1a3056', fontWeight: 800, whiteSpace: 'pre-wrap', fontSize: 10 }}>{draft.contact}</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, padding: 16, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 12, fontSize: 13 }}>
              <div className="eyebrow" style={{ color: '#d8232a' }}>Booking summary</div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Row k="Order ID (provisional)" v="B5745325" />
                <Row k="Category" v={draft.category} />
                <Row k="Format" v={draft.format} />
                <Row k="Edition" v={edition} />
                <Row k="Publishing" v={`${date}${combo ? ' (combo · 3 papers)' : ''}`} />
                <Row k="Number of ads" v={adsCount} />
                <Row k="Size" v={draft.size} />
              </div>
              <label style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, color: '#3d342c', lineHeight: 1.5, cursor: 'pointer' }}>
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 2 }} />
                <span>I confirm the preview is correct. <b>Edits aren't possible after press time (9 PM the night before).</b></span>
              </label>
            </div>
          </div>
        </div>

        <OrderSummary draft={draft} />
      </div>

      <FlowFooter
        onBack={() => goStep(2)}
        onNext={() => consent && goStep(4)}
        nextDisabled={!consent}
        nextLabel="Continue to pay"
        helperLeft={consent ? '✓ Confirmed — pay to publish' : '☐ Tick the consent box to continue'}
      />
    </FlowChrome>
  )
}
