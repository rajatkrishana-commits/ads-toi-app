import Header from '../components/home/Header'
import Hero from '../components/home/Hero'
import DualCTA from '../components/home/DualCTA'
import Categories from '../components/home/Categories'
import HowItWorks from '../components/home/HowItWorks'
import Pricing from '../components/home/Pricing'
import Footer from '../components/home/Footer'
import MobilePreview from '../components/home/MobilePreview'

export default function HomePage({ onBook, onRegister, onSignIn }) {
  return (
    <div style={{ background: 'var(--toi-paper)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header onBook={onBook} onRegister={onRegister} onSignIn={onSignIn} />
      <Hero onBook={onBook} />
      <DualCTA onBook={onBook} />
      <Categories onBook={onBook} />
      <HowItWorks />
      <Pricing />
      {/* Mobile preview section */}
      <section style={{ background: 'var(--toi-cream)', padding: '80px 28px', borderTop: '1px solid #e8dcc4', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ maxWidth: 480 }}>
          <div className="eyebrow" style={{ color: 'var(--toi-red)' }}>Mobile preview</div>
          <h2 className="headline serif" style={{ fontSize: 48, margin: '8px 0 16px', color: 'var(--toi-ink)' }}>Book on the <span style={{ fontStyle: 'italic', fontWeight: 400 }}>go.</span></h2>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, color: '#3d342c', lineHeight: 1.5 }}>
            The same full booking experience — category selection, composer, scheduling, payment — optimised for your phone.
          </p>
        </div>
        <MobilePreview onBook={onBook} />
      </section>
      <Footer />
    </div>
  )
}
