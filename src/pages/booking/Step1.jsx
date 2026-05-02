import { useState } from 'react'
import FlowChrome from '../../components/flow/FlowChrome'
import OrderSummary from '../../components/flow/OrderSummary'
import FlowFooter from '../../components/flow/FlowFooter'
import HelpNudge from '../../components/flow/HelpNudge'

const CATS = [
  { id: 'property', name: 'Property', sub: 'Sale, rent, plots', color: '#1d4d8c', emoji: '🏠', popular: true },
  { id: 'soulmate', name: 'Soulmate', sub: 'Matrimonial', color: '#d8232a', emoji: '💍', popular: true },
  { id: 'recruitment', name: 'Recruitment', sub: 'Jobs, hiring', color: '#f3a13a', emoji: '💼', popular: true },
  { id: 'vehicles', name: 'Vehicles', sub: 'Cars, bikes, sale', color: '#6b8e3d', emoji: '🚗' },
  { id: 'education', name: 'Education', sub: 'Admissions, courses', color: '#e8b94a', emoji: '🎓' },
  { id: 'obituary', name: 'Obituary', sub: 'In memoriam', color: '#6e6e6e', emoji: '🕊️' },
  { id: 'business', name: 'Business', sub: 'B2B notices', color: '#2c5d72', emoji: '🤝' },
  { id: 'tenders', name: 'Tenders', sub: 'Govt. & legal', color: '#7a5230', emoji: '📜' },
  { id: 'personal', name: 'Personal', sub: 'Greetings, all', color: '#5b8a72', emoji: '💌' },
  { id: 'shopping', name: 'Shopping', sub: 'Festive deals', color: '#e85a4f', emoji: '🛍️' },
  { id: 'travel', name: 'Travel', sub: 'Tour packages', color: '#3a7d8c', emoji: '✈️' },
  { id: 'services', name: 'Services', sub: 'Local pros', color: '#bb6b3e', emoji: '🛠️' },
]

export default function Step1({ draft, setDraft, goStep, onHome }) {
  const [search, setSearch] = useState('')
  const filtered = CATS.filter(c => !search || (c.name + ' ' + c.sub).toLowerCase().includes(search.toLowerCase()))
  const selected = draft.categoryId
  const pick = (c) => setDraft({ ...draft, categoryId: c.id, category: c.name, categoryColor: c.color })

  return (
    <FlowChrome stepIdx={0} goStep={goStep} onHome={onHome} draft={draft}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, padding: '36px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Step 1 of 5 · 2 min</div>
          <h1 className="headline serif" style={{ fontSize: 56, color: '#1a1716', margin: '8px 0 6px' }}>What are you <i style={{ color: '#d8232a', fontWeight: 500 }}>advertising</i> today?</h1>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 18, marginTop: 0, maxWidth: 640 }}>Pick a category. We'll show you templates and pricing made for it.</p>

          <div style={{ marginTop: 24, position: 'relative', maxWidth: 480 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search e.g. 'Marriage', 'Plot for sale', 'Car'…" style={{ width: '100%', padding: '14px 14px 14px 44px', border: '1.5px solid #d8c7a3', borderRadius: 999, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#fff' }} />
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔎</span>
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#5e5045', fontWeight: 700, alignSelf: 'center', marginRight: 4 }}>Most booked:</span>
            {CATS.filter(c => c.popular).map(c => (
              <button key={c.id} onClick={() => pick(c)} style={{ all: 'unset', cursor: 'pointer', padding: '6px 14px', borderRadius: 999, background: selected === c.id ? c.color : '#fff', color: selected === c.id ? '#fff' : '#1a1716', border: '1px solid ' + (selected === c.id ? c.color : '#e8dcc4'), fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span>{c.emoji}</span>{c.name}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {filtered.map(c => {
              const sel = selected === c.id
              return (
                <button key={c.id} onClick={() => pick(c)} style={{ all: 'unset', cursor: 'pointer', background: '#fff', border: sel ? `2px solid ${c.color}` : '1px solid #e8dcc4', borderRadius: 14, padding: 18, position: 'relative', boxShadow: sel ? `0 14px 30px ${c.color}26` : '0 1px 0 rgba(0,0,0,0.02)' }}>
                  {sel && <span style={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: '50%', background: c.color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>✓</span>}
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color + '1a', color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.emoji}</div>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: '#1a1716', marginTop: 12, letterSpacing: '-0.01em' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: '#5e5045', marginTop: 4 }}>{c.sub}</div>
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: 28 }}>
            <HelpNudge>
              <b style={{ color: '#1a1716' }}>Not sure which to pick?</b> Choose the one closest to your need — you can change it anytime before payment.
            </HelpNudge>
          </div>
        </div>

        <OrderSummary draft={draft} />
      </div>

      <FlowFooter
        onBack={onHome}
        onNext={() => draft.categoryId && goStep(1)}
        nextDisabled={!draft.categoryId}
        helperLeft={draft.categoryId ? `Selected: ${draft.category}` : 'Pick a category to continue'}
      />
    </FlowChrome>
  )
}
