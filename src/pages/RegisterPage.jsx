import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AdsTOIWordmark, TOIMasthead } from '../components/brand'

const ACCOUNT_TYPES = [
  { id: 'individual', name: 'Individual', sub: 'Personal classifieds', icon: '👤' },
  { id: 'agency', name: 'Agency', sub: 'Booking on behalf of clients', icon: '🏢' },
  { id: 'business', name: 'Business', sub: 'Direct corporate advertiser', icon: '🤝' },
]

const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Goa', 'Kochi', 'Indore', 'Other']

const Field = ({ label, hint, error, children }) => (
  <label style={{ display: 'block' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, fontWeight: 700, color: '#1a1716', letterSpacing: '0.04em' }}>{label}</span>
      {hint && <span style={{ fontSize: 11, color: '#9b8c70' }}>{hint}</span>}
    </div>
    {children}
    {error && <div style={{ marginTop: 4, fontSize: 11, color: '#d8232a', fontWeight: 600 }}>⚠ {error}</div>}
  </label>
)

const inp = (extra = {}) => ({
  width: '100%', padding: '13px 14px', border: '1.5px solid #d8c7a3', borderRadius: 10,
  fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, background: '#fff', color: '#1a1716', outline: 'none', ...extra,
})

const RegisterPoster = () => (
  <div style={{ background: '#1a1716', color: '#fff5e8', padding: 48, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 79px, rgba(255,245,232,0.04) 79px, rgba(255,245,232,0.04) 80px)', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <AdsTOIWordmark color="#d8232a" textColor="#fff5e8" />
        <span style={{ width: 1, height: 22, background: '#5e5045' }} />
        <TOIMasthead size={20} color="#fff5e8" />
      </div>
      <div style={{ marginTop: 40, display: 'inline-block', borderTop: '1px solid #5e5045', borderBottom: '1px solid #5e5045', padding: '6px 0', fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', color: '#f3a13a' }}>
        ESTD. 1838 · BENGALURU EDITION · ₹ 5 · PARTLY CLOUDY 28°
      </div>
    </div>
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 800, color: '#d8232a', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Create an account</div>
      <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 64, lineHeight: 0.92, letterSpacing: '-0.025em', margin: '14px 0 16px' }}>
        Your ad in <i style={{ color: '#f3a13a', fontWeight: 500 }}>tomorrow's</i> paper, in five minutes.
      </h1>
      <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, color: '#d8c7a3', lineHeight: 1.5, fontStyle: 'italic' }}>
        Times of India reaches 4.7 crore readers every morning. One free account, all 30+ cities, all categories.
      </p>
    </div>
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 20 }}>
      {[['4.7 cr', 'daily readers'], ['30+', 'city editions'], ['1838', 'estd.'], ['98%', 'on-time print']].map(([n, l]) => (
        <div key={l}>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 800, color: '#fff5e8', letterSpacing: '-0.02em' }}>{n}</div>
          <div style={{ fontSize: 11, color: '#9b8c70', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{l}</div>
        </div>
      ))}
    </div>
  </div>
)

export default function RegisterPage({ mode = 'register', onHome, onSwitchMode, onComplete, onAuthSuccess }) {
  const [type, setType] = useState('individual')
  const [step, setStep] = useState('form')
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', mobile: '', city: 'Mumbai', password: '', companyName: '', gst: '' })
  const [agreed, setAgreed] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setData(d => ({ ...d, [k]: v }))

  const pwd = data.password
  const pwdScore = (() => {
    let s = 0
    if (pwd.length >= 8) s++
    if (/[A-Z]/.test(pwd)) s++
    if (/[0-9]/.test(pwd)) s++
    if (/[^A-Za-z0-9]/.test(pwd)) s++
    return s
  })()
  const pwdLabel = ['Too short', 'Weak', 'Fair', 'Strong', 'Excellent'][pwdScore]
  const pwdColor = ['#bb6b3e', '#bb6b3e', '#e8b94a', '#6b8e3d', '#3d5e1e'][pwdScore]

  const requiredFilled = data.firstName && data.lastName && data.email && data.mobile.length === 10 && pwd.length >= 8 && (type === 'individual' || data.companyName)

  const submitRegister = async (e) => {
    e.preventDefault()
    if (!requiredFilled || !agreed) return
    setLoading(true)
    setError('')
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          mobile: data.mobile,
          city: data.city,
          account_type: type,
          company_name: data.companyName || null,
          gst: data.gst || null,
        }
      }
    })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    if (authData.user) {
      onAuthSuccess(authData.user)
      setStep('done')
    }
  }

  const submitSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    if (authData.user) {
      onAuthSuccess(authData.user)
      onComplete()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf6ee', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e8dcc4', padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20 }}>
        <button onClick={onHome} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
          <AdsTOIWordmark />
          <span style={{ width: 1, height: 22, background: '#d8c7a3' }} />
          <TOIMasthead size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 13 }}>
          <span style={{ color: '#5e5045' }}>{mode === 'register' ? 'Already have an account?' : "Don't have an account?"}</span>
          <button onClick={onSwitchMode} style={{ background: 'transparent', border: '1.5px solid #1a1716', color: '#1a1716', padding: '8px 18px', borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            {mode === 'register' ? 'Sign in' : 'Register'}
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: 'calc(100vh - 56px)' }}>
        <RegisterPoster />

        <div style={{ padding: '48px 56px', overflowY: 'auto', maxWidth: 720 }}>

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={submitSignIn}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Welcome back</div>
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 44, fontWeight: 800, letterSpacing: '-0.025em', margin: '6px 0 4px', color: '#1a1716' }}>Sign in to <i style={{ color: '#d8232a', fontWeight: 500 }}>Ads.TOI</i></h2>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 16, marginTop: 0 }}>Continue managing your bookings.</p>

              {error && <div style={{ marginTop: 16, padding: 14, background: '#fde4d8', border: '1px solid #d8232a', borderRadius: 10, fontSize: 13, color: '#a72c1a', fontWeight: 600 }}>⚠ {error}</div>}

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field label="Email *">
                  <input type="email" style={inp()} value={data.email} onChange={e => set('email', e.target.value)} placeholder="rajat@example.com" autoComplete="email" />
                </Field>
                <Field label="Password *">
                  <div style={{ position: 'relative' }}>
                    <input type={showPwd ? 'text' : 'password'} style={inp({ paddingRight: 60 })} value={pwd} onChange={e => set('password', e.target.value)} placeholder="••••••••" autoComplete="current-password" />
                    <button type="button" onClick={() => setShowPwd(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#5e5045', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{showPwd ? 'Hide' : 'Show'}</button>
                  </div>
                </Field>
              </div>

              <button type="submit" disabled={!data.email || pwd.length < 8 || loading} style={{ marginTop: 28, width: '100%', background: (data.email && pwd.length >= 8 && !loading) ? '#d8232a' : '#c5b491', color: '#fff', border: 'none', padding: '16px 24px', borderRadius: 999, fontWeight: 800, fontSize: 16, cursor: (data.email && pwd.length >= 8 && !loading) ? 'pointer' : 'not-allowed', boxShadow: (data.email && pwd.length >= 8 && !loading) ? '0 14px 28px rgba(216,35,42,0.3)' : 'none' }}>
                {loading ? 'Signing in…' : 'Sign in →'}
              </button>

              <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#5e5045' }}>
                Don't have an account?{' '}
                <button type="button" onClick={onSwitchMode} style={{ background: 'transparent', border: 'none', color: '#d8232a', fontWeight: 800, cursor: 'pointer', fontSize: 13, padding: 0 }}>Register free</button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && step === 'form' && (
            <form onSubmit={submitRegister}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Create account</div>
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 44, fontWeight: 800, letterSpacing: '-0.025em', margin: '6px 0 4px', color: '#1a1716' }}>Create your <i style={{ color: '#d8232a', fontWeight: 500 }}>Ads.TOI</i> account</h2>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 16, marginTop: 0 }}>Free. Takes under a minute. No card needed.</p>

              {error && <div style={{ marginTop: 16, padding: 14, background: '#fde4d8', border: '1px solid #d8232a', borderRadius: 10, fontSize: 13, color: '#a72c1a', fontWeight: 600 }}>⚠ {error}</div>}

              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1716', letterSpacing: '0.04em', marginBottom: 10 }}>I'm registering as</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {ACCOUNT_TYPES.map(t => {
                    const sel = type === t.id
                    return (
                      <button type="button" key={t.id} onClick={() => setType(t.id)} style={{ all: 'unset', cursor: 'pointer', padding: 14, background: sel ? '#fbf3e3' : '#fff', border: sel ? '2px solid #d8232a' : '1.5px solid #e8dcc4', borderRadius: 10, textAlign: 'left', position: 'relative' }}>
                        {sel && <span style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: '#d8232a', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>✓</span>}
                        <div style={{ fontSize: 22 }}>{t.icon}</div>
                        <div style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: '#1a1716' }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: '#5e5045', marginTop: 2 }}>{t.sub}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="First name *">
                  <input style={inp()} value={data.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Rajat" autoComplete="given-name" />
                </Field>
                <Field label="Last name *">
                  <input style={inp()} value={data.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Srivastava" autoComplete="family-name" />
                </Field>
              </div>

              {type !== 'individual' && (
                <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
                  <Field label={type === 'agency' ? 'Agency name *' : 'Company name *'}>
                    <input style={inp()} value={data.companyName} onChange={e => set('companyName', e.target.value)} placeholder={type === 'agency' ? 'e.g. Madison Media' : 'e.g. Acme Pvt. Ltd.'} />
                  </Field>
                  <Field label="GSTIN" hint="optional">
                    <input style={inp({ fontFamily: 'monospace', textTransform: 'uppercase' })} value={data.gst} onChange={e => set('gst', e.target.value.toUpperCase())} placeholder="29AAAAA0000A1Z5" maxLength={15} />
                  </Field>
                </div>
              )}

              <div style={{ marginTop: 14 }}>
                <Field label="Email *" hint="we'll send booking receipts here">
                  <input type="email" style={inp()} value={data.email} onChange={e => set('email', e.target.value)} placeholder="rajat@example.com" autoComplete="email" />
                </Field>
              </div>

              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
                <Field label="Mobile number *">
                  <div style={{ display: 'flex', border: '1.5px solid #d8c7a3', borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 12px', borderRight: '1px solid #e8dcc4', fontSize: 14, color: '#1a1716', fontWeight: 700, background: '#fbf3e3' }}>🇮🇳 +91</span>
                    <input style={{ ...inp({ border: 'none', borderRadius: 0, fontFamily: 'monospace', letterSpacing: '0.06em' }), flex: 1 }} value={data.mobile} onChange={e => set('mobile', e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="98XXXXXXXX" inputMode="numeric" maxLength={10} />
                  </div>
                </Field>
                <Field label="City *">
                  <select style={inp()} value={data.city} onChange={e => set('city', e.target.value)}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              <div style={{ marginTop: 14 }}>
                <Field label="Password *" hint="min. 8 chars">
                  <div style={{ position: 'relative' }}>
                    <input type={showPwd ? 'text' : 'password'} style={inp({ paddingRight: 60 })} value={pwd} onChange={e => set('password', e.target.value)} placeholder="••••••••" autoComplete="new-password" />
                    <button type="button" onClick={() => setShowPwd(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#5e5045', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{showPwd ? 'Hide' : 'Show'}</button>
                  </div>
                </Field>
                {pwd.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ flex: 1, display: 'flex', gap: 3 }}>
                      {[0, 1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < pwdScore ? pwdColor : '#e8dcc4' }} />)}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: pwdColor, minWidth: 70, textAlign: 'right' }}>{pwdLabel}</span>
                  </div>
                )}
              </div>

              <label style={{ marginTop: 22, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#3d342c', cursor: 'pointer' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 3, width: 16, height: 16, accentColor: '#d8232a' }} />
                <span>I agree to the <a style={{ color: '#d8232a', fontWeight: 700 }}>Terms of Service</a> and <a style={{ color: '#d8232a', fontWeight: 700 }}>Privacy Policy</a>.</span>
              </label>

              <button type="submit" disabled={!requiredFilled || !agreed || loading} style={{ marginTop: 28, width: '100%', background: (requiredFilled && agreed && !loading) ? '#d8232a' : '#c5b491', color: '#fff', border: 'none', padding: '16px 24px', borderRadius: 999, fontWeight: 800, fontSize: 16, cursor: (requiredFilled && agreed && !loading) ? 'pointer' : 'not-allowed', boxShadow: (requiredFilled && agreed && !loading) ? '0 14px 28px rgba(216,35,42,0.3)' : 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                {loading ? 'Creating account…' : <>Create account <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', background: '#fff', color: '#d8232a', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>→</span></>}
              </button>
            </form>
          )}

          {/* REGISTER SUCCESS */}
          {mode === 'register' && step === 'done' && (
            <div style={{ textAlign: 'left', maxWidth: 520 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dde8d6', color: '#3d5e1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800 }}>✓</div>
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 52, fontWeight: 800, letterSpacing: '-0.025em', margin: '20px 0 4px', color: '#1a1716', lineHeight: 1 }}>
                Welcome aboard, <i style={{ color: '#d8232a', fontWeight: 500 }}>{data.firstName || 'there'}.</i>
              </h2>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 17, marginTop: 8 }}>
                Your Ads.TOI account is ready. We've added <b style={{ color: '#3d5e1e' }}>₹100 in promo credit</b> for your first booking.
              </p>
              <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                <button onClick={onComplete} style={{ flex: 1, background: '#d8232a', color: '#fff', border: 'none', padding: '15px 24px', borderRadius: 999, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 14px 28px rgba(216,35,42,0.3)' }}>Book my first ad →</button>
                <button onClick={onHome} style={{ background: 'transparent', border: '1.5px solid #1a1716', color: '#1a1716', padding: '15px 24px', borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Explore home</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
