import { AdsTOIWordmark, TOIMasthead } from '../brand'

export const FLOW_STEPS = [
  { key: 'cat', label: 'What' },
  { key: 'fmt', label: 'How it looks' },
  { key: 'comp', label: 'Write it' },
  { key: 'sched', label: 'When & where' },
  { key: 'pay', label: 'Pay' },
]

export default function FlowChrome({ stepIdx, goStep, onHome, draft, children, hideStepper }) {
  return (
    <div style={{ background: '#faf6ee', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e8dcc4', padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onHome} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
            <AdsTOIWordmark />
            <div style={{ width: 1, height: 22, background: '#d8c7a3' }} />
            <TOIMasthead size={22} />
          </button>
          <span style={{ marginLeft: 6, fontSize: 11, color: '#6b8e3d', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6b8e3d' }} />
            Saved · just now
          </span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 13 }}>
          <select style={{ background: '#fbf3e3', border: '1px solid #e8dcc4', borderRadius: 999, padding: '6px 12px', fontWeight: 700, color: '#1a1716' }}>
            <option>EN</option><option>हिन्दी</option><option>मराठी</option><option>ગુજરાતી</option><option>தமிழ்</option>
          </select>
          <a style={{ color: '#1a1716', fontWeight: 600, cursor: 'pointer' }}>📞 Need help?</a>
          <span style={{ color: '#5e5045' }}>Hi, Rajat ▾</span>
        </div>
      </header>

      {!hideStepper && (
        <div style={{ background: '#fff', borderBottom: '1px solid #e8dcc4', padding: '18px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 1100, margin: '0 auto' }}>
            {FLOW_STEPS.map((s, i) => {
              const done = i < stepIdx
              const active = i === stepIdx
              const reachable = i <= stepIdx
              return (
                <div key={s.key} style={{ display: 'contents' }}>
                  <button onClick={() => reachable && goStep(i)} disabled={!reachable} style={{ all: 'unset', cursor: reachable ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 10, opacity: reachable ? 1 : 0.55 }}>
                    <span style={{ width: 32, height: 32, borderRadius: '50%', background: active ? '#d8232a' : done ? '#1a1716' : '#fbf3e3', color: active || done ? '#fff' : '#5e5045', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, border: active ? 'none' : done ? 'none' : '1px solid #e8dcc4', boxShadow: active ? '0 6px 14px rgba(216,35,42,0.3)' : 'none' }}>{done ? '✓' : i + 1}</span>
                    <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, fontWeight: active ? 700 : 600, color: active ? '#1a1716' : done ? '#5e5045' : '#9b8c70', fontStyle: active ? 'italic' : 'normal' }}>{s.label}</span>
                  </button>
                  {i < FLOW_STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < stepIdx ? '#1a1716' : '#f0eae0' }} />}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
