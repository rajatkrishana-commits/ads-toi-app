import { useState, useEffect } from 'react'
import FlowChrome from '../../components/flow/FlowChrome'
import OrderSummary from '../../components/flow/OrderSummary'
import FlowFooter from '../../components/flow/FlowFooter'
import HelpNudge from '../../components/flow/HelpNudge'

const SAMPLE_BODY = {
  property: 'Newly constructed 2-floor building, 1200 sq.ft. carpet area. Basement parking. Near ABC Mall · 5 min walk to metro.',
  soulmate: 'Suitable match invited for 28-yr Hindu Brahmin girl. MBA, working in Mumbai. Caste no bar. Send bio-data with photo.',
  recruitment: 'Wanted: Receptionist for reputed firm in Andheri East. Female, English/Hindi. Apply by 5 May.',
  vehicles: '2019 Maruti Swift VXI, single owner, 32k km, white, all papers ready, insurance valid till Dec.',
  obituary: 'With profound sorrow we announce the demise of Smt. Kamla Devi Sharma on 27-04-2026. Prarthana Sabha at home.',
  business: 'Notice of Annual General Meeting, ABC Industries Ltd. Friday, 30 May, 11 AM, Regd. Office Mumbai.',
  education: 'Admissions open 2026–27, Classes I–X. Limited seats. Bright Future School, Andheri (W). Visit before 10 May.',
  default: 'Type your ad copy here. Keep it short, punchy and easy to read at a glance.',
}

const ToolbarBtn = ({ children }) => (
  <button style={{ all: 'unset', cursor: 'pointer', padding: '6px 10px', borderRadius: 6, fontWeight: 700, fontSize: 12, color: '#1a1716' }}>{children}</button>
)

export default function Step3({ draft, setDraft, goStep, onHome, profile }) {
  const initial = draft.body || SAMPLE_BODY[draft.categoryId] || SAMPLE_BODY.default
  const [body, setBody] = useState(initial)
  const [contact, setContact] = useState(draft.contact || 'Contact: ABC XYZ\n+91 98XXX XXXXX')
  const [enhance, setEnhance] = useState({ bold: true, image: true, border: false })
  const [aiOpen, setAiOpen] = useState(false)
  const [translate, setTranslate] = useState('en')

  const charLimit = 320
  const charsUsed = body.length
  const overLimit = charsUsed > charLimit

  useEffect(() => {
    setDraft(d => ({ ...d, body, contact }))
  }, [body, contact])

  const accent = draft.templateAccent || draft.categoryColor || '#1d4d8c'

  const applyAI = (variant) => {
    const variants = {
      polish: body.replace(/\s+/g, ' ').replace(/\.\s*/g, '. ').trim(),
      shorter: body.split('.').slice(0, 2).join('.') + '.',
      catchy: '✨ ' + body.split('.')[0] + '! Don\'t miss this. Call now.',
    }
    setBody(variants[variant])
    setAiOpen(false)
  }

  return (
    <FlowChrome stepIdx={2} goStep={goStep} onHome={onHome} draft={draft} profile={profile}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, padding: '36px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Step 3 of 5 · 3 min</div>
          <h1 className="headline serif" style={{ fontSize: 56, color: '#1a1716', margin: '8px 0 6px' }}>Now, <i style={{ color: '#d8232a', fontWeight: 500 }}>write</i> it.</h1>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 18, marginTop: 0 }}>Type as you would speak. Keep your headline short, your facts clear, and a way to reach you.</p>

          <div style={{ marginTop: 24, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f0eae0', background: '#fbf3e3' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <ToolbarBtn>𝐁</ToolbarBtn>
                <ToolbarBtn>𝘐</ToolbarBtn>
                <ToolbarBtn>U̲</ToolbarBtn>
                <span style={{ width: 1, height: 22, background: '#e8dcc4', alignSelf: 'center', margin: '0 4px' }} />
                <ToolbarBtn>＋ Image</ToolbarBtn>
                <ToolbarBtn>＋ Bold key terms</ToolbarBtn>
              </div>
              <button onClick={() => setAiOpen(!aiOpen)} style={{ background: 'linear-gradient(135deg,#d8232a,#f3a13a)', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 999, fontWeight: 800, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                ✨ AI rewrite
              </button>
            </div>

            <div style={{ padding: 18, position: 'relative' }}>
              <div className="eyebrow" style={{ color: '#5e5045', marginBottom: 8 }}>Ad body</div>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={5} style={{ width: '100%', padding: 14, border: '1px solid ' + (overLimit ? '#d8232a' : '#e8dcc4'), borderRadius: 10, fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, lineHeight: 1.5, resize: 'vertical', background: '#fafaf6' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span style={{ color: overLimit ? '#d8232a' : '#5e5045' }}>{charsUsed}/{charLimit} characters</span>
                <span style={{ color: '#5e5045' }}>≈ {Math.ceil(charsUsed / 30)} lines · {Math.ceil(charsUsed / 30)} cm height</span>
              </div>

              <div className="eyebrow" style={{ color: '#5e5045', marginTop: 18, marginBottom: 8 }}>Contact</div>
              <textarea value={contact} onChange={e => setContact(e.target.value)} rows={3} style={{ width: '100%', padding: 14, border: '1px solid #e8dcc4', borderRadius: 10, fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, lineHeight: 1.5, resize: 'vertical', background: '#fafaf6' }} />

              {aiOpen && (
                <div style={{ marginTop: 16, padding: 16, background: 'linear-gradient(135deg,#fff5e8,#ffe1cc)', borderRadius: 12, border: '1px solid #f3a13a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: 13, color: '#1a1716' }}>✨ AI suggestions</div>
                    <button onClick={() => setAiOpen(false)} style={{ all: 'unset', cursor: 'pointer', fontSize: 14, color: '#5e5045' }}>✕</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 10 }}>
                    {[['polish', 'Polish grammar'], ['shorter', 'Make shorter'], ['catchy', 'Add punch']].map(([k, l]) => (
                      <button key={k} onClick={() => applyAI(k)} style={{ all: 'unset', cursor: 'pointer', background: '#fff', borderRadius: 8, padding: 12, fontSize: 12, fontWeight: 700, color: '#1a1716', textAlign: 'center', border: '1px solid #f3a13a' }}>{l}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#5e5045' }}>Enhance:</span>
            {[['bold', 'Bold key terms', '+ ₹ 0'], ['image', 'Photo / image', '+ ₹ 150'], ['border', 'Add border', '+ ₹ 80']].map(([k, l, p]) => (
              <button key={k} onClick={() => setEnhance({ ...enhance, [k]: !enhance[k] })} style={{ all: 'unset', cursor: 'pointer', background: enhance[k] ? '#1a1716' : '#fff', color: enhance[k] ? '#fff' : '#1a1716', border: '1px solid ' + (enhance[k] ? '#1a1716' : '#e8dcc4'), borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: enhance[k] ? '#d8232a' : 'transparent', border: '1.5px solid ' + (enhance[k] ? '#d8232a' : '#c5b491'), display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9 }}>{enhance[k] && '✓'}</span>
                {l} <span style={{ color: enhance[k] ? '#f3a13a' : '#5e5045' }}>{p}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 24, background: '#fff5e8', border: '1px solid #f3a13a', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 22 }}>🌐</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1716' }}>Need this in another language?</div>
                <div style={{ fontSize: 12, color: '#5e5045' }}>We translate to Hindi, Marathi, Gujarati, Tamil, Bengali — ready for regional editions.</div>
              </div>
            </div>
            <select value={translate} onChange={e => setTranslate(e.target.value)} style={{ padding: '8px 14px', border: '1.5px solid #f3a13a', borderRadius: 999, fontWeight: 700, fontSize: 13, background: '#fff' }}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
              <option value="gu">ગુજરાતી</option>
              <option value="ta">தமிழ்</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>

          <div style={{ marginTop: 18 }}>
            <HelpNudge>
              <b style={{ color: '#1a1716' }}>Headlines that get replies:</b> Lead with the strongest fact (size, location, price). Avoid all-caps. End with a clear way to be reached.
            </HelpNudge>
          </div>
        </div>

        <OrderSummary draft={draft} />
      </div>

      <FlowFooter
        onBack={() => goStep(1)}
        onNext={() => goStep(3)}
        nextDisabled={overLimit || !body.trim()}
        helperLeft={overLimit ? '⚠ Trim a few words to fit your size' : '✓ Looks good — preview next'}
      />
    </FlowChrome>
  )
}
