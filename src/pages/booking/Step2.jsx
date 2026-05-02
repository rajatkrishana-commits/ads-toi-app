import { useState, useEffect } from 'react'
import FlowChrome from '../../components/flow/FlowChrome'
import OrderSummary from '../../components/flow/OrderSummary'
import FlowFooter from '../../components/flow/FlowFooter'
import HelpNudge from '../../components/flow/HelpNudge'
import { SampleAdForSale } from '../../components/brand'

const FORMATS = [
  { id: 'text', name: 'Text Classified', sub: 'A few lines, fits any budget', price: 'From ₹ 495', size: '3 × 5 cm', icon: 'lines', popular: false },
  { id: 'display1', name: 'Display · 1 column', sub: 'Photo + bold layout, single column', price: 'From ₹ 990', size: '3 × 10 cm', icon: 'frame', popular: true },
  { id: 'displayN', name: 'Display · multi-column', sub: 'Stand out across 2–4 columns', price: 'From ₹ 2,400', size: '6 × 10 cm', icon: 'wide', popular: false },
  { id: 'forum', name: 'Forum group ad', sub: 'Pool with similar advertisers', price: 'From ₹ 750', size: 'Shared frame', icon: 'grid', popular: false },
]

const TEMPLATES = [
  { id: 'tpl-1', accent: '#1d4d8c', name: 'Heritage blue' },
  { id: 'tpl-2', accent: '#d8232a', name: 'Crimson banner' },
  { id: 'tpl-3', accent: '#e8b94a', name: 'Mustard punch' },
  { id: 'tpl-4', accent: '#6b8e3d', name: 'Field green' },
  { id: 'tpl-5', accent: '#3a7d8c', name: 'Ocean teal' },
]

const FormatThumb = ({ icon }) => {
  if (icon === 'lines') return (
    <div style={{ padding: 14, fontFamily: "'Fraunces', Georgia, serif", fontSize: 9, lineHeight: 1.4, color: '#1a1716', textAlign: 'left' }}>
      <b>Plots for sale</b><br />Asaf Ali Road, comm/office space.<br />Plot No. 122, Sec 5, 100 yards.<br />Sanjay 99XXX-XXXXX
    </div>
  )
  if (icon === 'frame') return <SampleAdForSale accent="#1d4d8c" img="house" />
  if (icon === 'wide') return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, background: '#e8b94a', color: '#1a1716', padding: 8, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, lineHeight: 0.95 }}>FOR<br />SALE</div>
      <div style={{ flex: 1, background: '#6b8e3d', color: '#fff', padding: 8, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 16, lineHeight: 0.95 }}>FOR<br />SALE</div>
    </div>
  )
  return (
    <div style={{ background: '#a72c1a', height: '100%', padding: 8, color: '#fff', fontFamily: "'Fraunces', Georgia, serif" }}>
      <div style={{ background: '#fff5e8', color: '#1a1716', padding: '4px 6px', fontSize: 8, fontWeight: 800 }}>PROPERTY SPECIAL OFFER</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 4 }}>
        <div style={{ background: '#1d4d8c', height: 32 }} /><div style={{ background: '#e8b94a', height: 32 }} />
        <div style={{ background: '#fff', height: 32 }} /><div style={{ background: '#6b8e3d', height: 32 }} />
      </div>
    </div>
  )
}

export default function Step2({ draft, setDraft, goStep, onHome }) {
  const [tab, setTab] = useState('format')

  const pickFormat = (f) => setDraft({ ...draft, formatId: f.id, format: f.name, size: f.size, subtotal: f.id === 'displayN' ? 2400 : f.id === 'text' ? 495 : f.id === 'forum' ? 750 : 990 })
  const pickTemplate = (t) => setDraft({ ...draft, templateId: t.id, previewAccent: t.accent })

  useEffect(() => {
    if (draft.previewAccent) {
      setDraft(d => ({ ...d, templateAccent: d.previewAccent }))
    }
  }, [draft.templateId])

  const ready = draft.formatId && (draft.formatId === 'text' ? true : draft.templateId)

  return (
    <FlowChrome stepIdx={1} goStep={goStep} onHome={onHome} draft={draft}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, padding: '36px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Step 2 of 5 · 1 min</div>
          <h1 className="headline serif" style={{ fontSize: 56, color: '#1a1716', margin: '8px 0 6px' }}>How should it <i style={{ color: '#d8232a', fontWeight: 500 }}>look?</i></h1>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 18, marginTop: 0 }}>Pick a format first, then a template you can customise.</p>

          <div style={{ marginTop: 24, display: 'inline-flex', gap: 4, background: '#fbf3e3', padding: 4, borderRadius: 999, border: '1px solid #e8dcc4' }}>
            {[['format', '1. Format'], ['template', '2. Template' + (draft.formatId === 'text' ? ' (skip)' : '')]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} disabled={k === 'template' && !draft.formatId} style={{ all: 'unset', cursor: 'pointer', padding: '8px 18px', borderRadius: 999, background: tab === k ? '#1a1716' : 'transparent', color: tab === k ? '#fff' : '#5e5045', fontWeight: 700, fontSize: 13, opacity: (k === 'template' && !draft.formatId) ? 0.4 : 1 }}>{l}</button>
            ))}
          </div>

          {tab === 'format' && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {FORMATS.map(f => {
                const sel = draft.formatId === f.id
                return (
                  <button key={f.id} onClick={() => { pickFormat(f); if (f.id !== 'text') setTimeout(() => setTab('template'), 200) }} style={{ all: 'unset', cursor: 'pointer', background: '#fff', border: sel ? '2px solid #d8232a' : '1px solid #e8dcc4', borderRadius: 14, padding: 18, display: 'grid', gridTemplateColumns: '1fr 130px', gap: 14, position: 'relative', boxShadow: sel ? '0 14px 30px rgba(216,35,42,0.18)' : 'none' }}>
                    {f.popular && <span style={{ position: 'absolute', top: -10, left: 18, background: '#e8b94a', color: '#1a1716', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '0.06em' }}>MOST PICKED</span>}
                    <div>
                      <div className="serif" style={{ fontSize: 22, fontWeight: 700, color: '#1a1716', letterSpacing: '-0.01em' }}>{f.name}</div>
                      <div style={{ fontSize: 13, color: '#5e5045', marginTop: 4 }}>{f.sub}</div>
                      <div style={{ marginTop: 14, display: 'flex', gap: 16, fontSize: 12, color: '#5e5045' }}>
                        <span>📏 {f.size}</span>
                        <span style={{ fontWeight: 800, color: '#1a1716' }}>{f.price}</span>
                      </div>
                    </div>
                    <div style={{ background: '#fbf3e3', borderRadius: 8, overflow: 'hidden', height: 130 }}>
                      <FormatThumb icon={f.icon} />
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {tab === 'template' && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#5e5045' }}>Curated for <b style={{ color: '#1a1716' }}>{draft.category} · {draft.format}</b> — all editable in the next step.</div>
                <button style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#1d4d8c' }}>＋ Upload my own</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
                {TEMPLATES.map(t => {
                  const sel = draft.templateId === t.id
                  return (
                    <button key={t.id} onClick={() => pickTemplate(t)} style={{ all: 'unset', cursor: 'pointer', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: sel ? '0 0 0 2px #d8232a, 0 14px 30px rgba(216,35,42,0.16)' : '0 0 0 1px #e8dcc4' }}>
                      <div style={{ aspectRatio: '3/4' }}>
                        <SampleAdForSale accent={t.accent} img="house" />
                      </div>
                      <div style={{ padding: '10px 12px', fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#1a1716' }}>{t.name}</span>
                        {sel && <span style={{ color: '#d8232a', fontWeight: 800 }}>✓ Selected</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
              <div style={{ marginTop: 24 }}>
                <HelpNudge>
                  <b style={{ color: '#1a1716' }}>Pro tip:</b> The colour you pick here sets the heading and footer of your ad. You can fine-tune spacing, add a photo and bold key terms in the next step.
                </HelpNudge>
              </div>
            </div>
          )}
        </div>

        <OrderSummary draft={draft} />
      </div>

      <FlowFooter
        onBack={() => goStep(0)}
        onNext={() => ready && goStep(2)}
        nextDisabled={!ready}
        helperLeft={!draft.formatId ? 'Pick a format to continue' : (draft.formatId !== 'text' && !draft.templateId) ? 'Pick a template to continue' : '✓ Format & template ready'}
      />
    </FlowChrome>
  )
}
