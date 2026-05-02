import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import TransactionsPage from './pages/TransactionsPage'
import Step1 from './pages/booking/Step1'
import Step2 from './pages/booking/Step2'
import Step3 from './pages/booking/Step3'
import Step4 from './pages/booking/Step4'
import Step5 from './pages/booking/Step5'
import ConfirmPage from './pages/booking/ConfirmPage'
import AdminPage from './pages/booking/AdminPage'

export default function App() {
  const [view, setView] = useState('home')
  const [stepIdx, setStepIdx] = useState(0)
  const [draft, setDraft] = useState({})
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setProfile(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (data) setProfile(data)
  }

  const goHome = () => setView('home')

  const startFlow = () => {
    if (!user) { setView('register'); return }
    setDraft({})
    setStepIdx(0)
    setView('flow')
  }

  const goStep = (i) => { setStepIdx(i); setView('flow') }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setView('home')
  }

  const handleAuthSuccess = (u) => {
    setUser(u)
    fetchProfile(u.id)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, color: '#5e5045' }}>
      Loading…
    </div>
  )

  if (view === 'register') return (
    <RegisterPage
      mode="register"
      onHome={goHome}
      onSwitchMode={() => setView('signin')}
      onComplete={startFlow}
      onAuthSuccess={handleAuthSuccess}
    />
  )

  if (view === 'signin') return (
    <RegisterPage
      mode="signin"
      onHome={goHome}
      onSwitchMode={() => setView('register')}
      onComplete={goHome}
      onAuthSuccess={handleAuthSuccess}
    />
  )

  if (view === 'transactions') return (
    <TransactionsPage
      user={user}
      profile={profile}
      onHome={goHome}
      onContinueDraft={startFlow}
      onSignOut={handleSignOut}
    />
  )

  if (view === 'flow') {
    const props = { draft, setDraft, goStep, onHome: goHome, user, profile }
    if (stepIdx === 0) return <Step1 {...props} />
    if (stepIdx === 1) return <Step2 {...props} />
    if (stepIdx === 2) return <Step3 {...props} />
    if (stepIdx === 3) return <Step4 {...props} />
    if (stepIdx === 4) return <Step5 {...props} onConfirm={() => setView('done')} />
  }

  if (view === 'done') return <ConfirmPage draft={draft} onAdmin={() => setView('admin')} onHome={goHome} user={user} profile={profile} />
  if (view === 'admin') return <AdminPage onHome={goHome} user={user} profile={profile} />

  return (
    <HomePage
      onBook={startFlow}
      onRegister={() => setView('register')}
      onSignIn={() => setView('signin')}
      onTransactions={() => setView('transactions')}
      user={user}
      profile={profile}
      onSignOut={handleSignOut}
    />
  )
}
