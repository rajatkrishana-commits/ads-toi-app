import { useState } from 'react'
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

// View states: home | register | transactions | flow | done | admin
export default function App() {
  const [view, setView] = useState('home')
  const [stepIdx, setStepIdx] = useState(0)
  const [draft, setDraft] = useState({})

  const goHome = () => setView('home')
  const goRegister = () => setView('register')
  const goTx = () => setView('transactions')
  const startFlow = () => { setDraft({}); setStepIdx(0); setView('flow') }
  const goStep = (i) => { setStepIdx(i); setView('flow') }

  if (view === 'register') return <RegisterPage onHome={goHome} onSignIn={goHome} onComplete={startFlow} />
  if (view === 'transactions') return <TransactionsPage onHome={goHome} onContinueDraft={startFlow} onSignOut={goHome} />

  if (view === 'flow') {
    const props = { draft, setDraft, goStep, onHome: goHome }
    if (stepIdx === 0) return <Step1 {...props} />
    if (stepIdx === 1) return <Step2 {...props} />
    if (stepIdx === 2) return <Step3 {...props} />
    if (stepIdx === 3) return <Step4 {...props} />
    if (stepIdx === 4) return <Step5 {...props} onConfirm={() => setView('done')} />
  }

  if (view === 'done') return <ConfirmPage draft={draft} onAdmin={() => setView('admin')} onHome={goHome} />
  if (view === 'admin') return <AdminPage onHome={goHome} />

  return <HomePage onBook={startFlow} onRegister={goRegister} onSignIn={goRegister} />
}
