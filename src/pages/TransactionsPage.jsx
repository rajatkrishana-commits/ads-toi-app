import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AdsTOIWordmark, TOIMasthead, SampleAdForSale } from '../components/brand'

const TX_STATUSES = {
  placed: { label: 'Order placed', color: '#3d5e1e', bg: '#dde8d6', dot: '#6b8e3d' },
  draft: { label: 'Saved as draft', color: '#7a5230', bg: '#fbf3e3', dot: '#e8b94a' },
  pending: { label: 'Payment pending', color: '#a72c1a', bg: '#fde4d8', dot: '#d8232a' },
  paysuccess: { label: 'Payment successful', color: '#2c5d72', bg: '#daeaf0', dot: '#1d4d8c' },
  differential: { label: 'Differential payment pending', color: '#7a5230', bg: '#fff3a0', dot: '#e8b94a' },
  published: { label: 'Published', color: '#3d5e1e', bg: '#dde8d6', dot: '#3d5e1e' },
  rejected: { label: 'Rejected by moderator', color: '#a72c1a', bg: '#fde4d8', dot: '#d8232a' },
}

const fmtDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  return [String(d.getDate()).padStart(2, '0'), String(d.getMonth() + 1).padStart(2, '0'), d.getFullYear()].join('-')
}

const mapBooking = (row) => ({
  id: row.order_id,
  booked: fmtDate(row.created_at),
  cat: row.category || 'Property',
  design: row.design || 'Template',
  pubDate: row.pub_date || '—',
  status: row.status || 'placed',
  amount: row.amount || 0,
  pub: row.publication || 'Times of India',
})

const StatusPill = ({ s }) => {
  const c = TX_STATUSES[s] || TX_STATUSES.placed
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: c.bg, color: c.color, borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.02em' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot }} />
      {c.label}
    </span>
  )
}

const StatCard = ({ label, value, sub, accent = '#1a1716' }) => (
  <div style={{ background: '#fff', border: '1px solid #e8dcc4', borderRadius: 14, padding: 18, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: accent }} />
    <div style={{ fontSize: 11, color: '#5e5045', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 800, color: '#1a1716', letterSpacing: '-0.02em', marginTop: 4, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 12, color: '#9b8c70', marginTop: 6 }}>{sub}</div>
  </div>
)

const iconBtn = { width: 30, height: 30, borderRadius: 8, background: '#fbf3e3', border: '1px solid #e8dcc4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#5e5045', cursor: 'pointer' }

const selStyle = {
  padding: '10px 32px 10px 12px', border: '1px solid #e8dcc4', borderRadius: 8, fontSize: 13,
  fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#fafaf6', color: '#1a1716', fontWeight: 600,
  appearance: 'none', cursor: 'pointer',
}

const pgBtn = (active) => ({
  background: active ? '#1a1716' : '#fff', color: active ? '#fff' : '#1a1716',
  border: '1px solid ' + (active ? '#1a1716' : '#e8dcc4'),
  padding: '7px 12px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', minWidth: 36,
})

const TxRow = ({ o, onContinue }) => {
  const isAction = o.status === 'draft' || o.status === 'pending' || o.status === 'differential'
  return (
    <div style={{ background: '#fff', border: '1px solid #e8dcc4', borderRadius: 14, padding: 22, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 20, alignItems: 'center' }}>
      <div style={{ width: 76, height: 96, borderRadius: 8, overflow: 'hidden', background: '#fbf3e3', flexShrink: 0 }}>
        <SampleAdForSale accent={o.cat === 'Education' ? '#e8b94a' : o.cat === 'Personal' ? '#5b8a72' : o.cat === 'Display' ? '#a72c1a' : '#1d4d8c'} img="house" />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 800, color: '#1a1716', letterSpacing: '-0.01em' }}>#{o.id}</span>
          <StatusPill s={o.status} />
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: '#3d342c', display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <span><b style={{ color: '#1a1716' }}>{o.cat}</b> · {o.design}</span>
          <span style={{ color: '#9b8c70' }}>·</span>
          <span>📰 {o.pub}</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#5e5045', display: 'flex', gap: 20 }}>
          <span>📅 Booked <b style={{ color: '#1a1716' }}>{o.booked}</b></span>
          <span>🗞 Publishes <b style={{ color: '#1a1716' }}>{o.pubDate}</b></span>
          <span>💳 <b style={{ color: '#1a1716' }}>₹ {o.amount.toLocaleString('en-IN')}</b></span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', minWidth: 160 }}>
        {isAction ? (
          <button onClick={onContinue} style={{ background: '#d8232a', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 8px 18px rgba(216,35,42,0.22)', whiteSpace: 'nowrap' }}>Continue →</button>
        ) : (
          <button style={{ background: '#1a1716', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 800, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>View receipt</button>
        )}
        <div style={{ display: 'flex', gap: 4 }}>
          <button title="View ad" style={iconBtn}>👁</button>
          <button title="Reorder" style={iconBtn}>↻</button>
          <button title="Download invoice" style={iconBtn}>⤓</button>
          <button title="Share" style={iconBtn}>↗</button>
          <button title="More" style={iconBtn}>⋯</button>
        </div>
      </div>
    </div>
  )
}

export default function TransactionsPage({ onHome, onContinueDraft, onSignOut, user, profile }) {
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [catFilter, setCatFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [range, setRange] = useState('90')
  const [view, setView] = useState('list')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    if (!user) { setLoadingOrders(false); return }
    supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setOrders(data ? data.map(mapBooking) : [])
        setLoadingOrders(false)
      })
  }, [user])

  const firstName = profile?.first_name || user?.email?.split('@')[0] || 'there'

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (catFilter !== 'all' && o.cat !== catFilter) return false
    if (search && !(o.id + o.design + o.cat + o.pub).toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalSpend = orders.reduce((s, o) => s + (o.status !== 'draft' ? o.amount : 0), 0)
  const drafts = orders.filter(o => o.status === 'draft').length
  const actionNeeded = orders.filter(o => o.status === 'pending' || o.status === 'differential' || o.status === 'rejected').length
  const upcoming = orders.filter(o => o.status === 'placed' || o.status === 'paysuccess').length

  return (
    <div style={{ minHeight: '100vh', background: '#faf6ee', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e8dcc4', padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 30 }}>
        <button onClick={onHome} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
          <AdsTOIWordmark />
          <span style={{ width: 1, height: 22, background: '#d8c7a3' }} />
          <TOIMasthead size={20} />
        </button>
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center', fontSize: 13, fontWeight: 600, color: '#1a1716' }}>
          <a style={{ cursor: 'pointer' }}>Book an ad ▾</a>
          <a style={{ cursor: 'pointer' }}>Pricing</a>
          <a style={{ color: '#d8232a', fontWeight: 800, borderBottom: '2px solid #d8232a', paddingBottom: 4 }}>My account ▾</a>
          <a style={{ cursor: 'pointer' }}>Help</a>
          <span style={{ color: '#5e5045' }}>Hi, <b style={{ color: '#1a1716' }}>{firstName}</b></span>
          <button onClick={onSignOut} style={{ background: 'transparent', border: '1.5px solid #1a1716', color: '#1a1716', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Log out</button>
        </nav>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 56px)' }}>
        <aside style={{ background: '#fff', borderRight: '1px solid #e8dcc4', padding: '28px 18px', position: 'sticky', top: 56, height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#9b8c70', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0 12px', marginBottom: 12 }}>Account</div>
          {[['🏠', 'Dashboard', false], ['📋', 'My transactions', true], ['📝', 'Draft ads', false], ['💸', 'Wallet & promo', false], ['🏷', 'Saved templates', false], ['🔔', 'Notifications', false], ['⚙', 'Settings', false], ['📞', 'Support', false]].map(([ic, l, active]) => (
            <button key={l} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 8, fontSize: 13, fontWeight: active ? 800 : 600, color: active ? '#fff' : '#3d342c', background: active ? '#1a1716' : 'transparent', width: '100%', boxSizing: 'border-box', marginBottom: 2 }}>
              <span style={{ fontSize: 14 }}>{ic}</span>{l}
              {active && <span style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#d8232a' }} />}
            </button>
          ))}
          <div style={{ marginTop: 28, padding: 16, background: '#fbf3e3', border: '1px solid #e8dcc4', borderRadius: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#d8232a', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Wallet</div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 800, color: '#1a1716', marginTop: 4 }}>₹ 100</div>
            <div style={{ fontSize: 11, color: '#5e5045', marginTop: 2 }}>Welcome credit · expires in 28 days</div>
            <button style={{ marginTop: 10, background: '#1a1716', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 999, fontSize: 11, fontWeight: 800, cursor: 'pointer', width: '100%' }}>Add money</button>
          </div>
        </aside>

        <main style={{ padding: '28px 36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#d8232a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>My Account</div>
              <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 52, fontWeight: 800, letterSpacing: '-0.025em', margin: '6px 0 4px', color: '#1a1716', lineHeight: 1 }}>My <i style={{ color: '#d8232a', fontWeight: 500 }}>transactions</i></h1>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#5e5045', fontSize: 16, marginTop: 4 }}>{loadingOrders ? 'Loading…' : `${orders.length} booking${orders.length !== 1 ? 's' : ''}`}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ background: 'transparent', border: '1.5px solid #1a1716', color: '#1a1716', padding: '10px 18px', borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>⤓ Export CSV</button>
              <button onClick={onHome} style={{ background: '#d8232a', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 999, fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 8px 18px rgba(216,35,42,0.25)' }}>+ New booking</button>
            </div>
          </div>

          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <StatCard label="Total spend" value={`₹ ${(totalSpend / 1000).toFixed(1)}k`} sub={`Across ${orders.filter(o => o.status !== 'draft').length} paid orders`} accent="#1a1716" />
            <StatCard label="Drafts" value={drafts} sub="Saved · finish anytime" accent="#e8b94a" />
            <StatCard label="Action needed" value={actionNeeded} sub="Pending payment / rejected" accent="#d8232a" />
            <StatCard label="Upcoming print" value={upcoming} sub="Will run in next 30 days" accent="#3d5e1e" />
          </div>

          {actionNeeded > 0 && (
            <div style={{ marginTop: 22, padding: 18, background: '#fde4d8', border: '1px solid #d8232a', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#d8232a', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>!</span>
                <div>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, fontWeight: 800, color: '#1a1716', letterSpacing: '-0.01em' }}>{actionNeeded} orders need your attention</div>
                  <div style={{ fontSize: 13, color: '#5e5045', marginTop: 2 }}>Differential payment pending or moderator rejected. Resolve before press time.</div>
                </div>
              </div>
              <button style={{ background: '#1a1716', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 999, fontWeight: 800, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>Review now →</button>
            </div>
          )}

          <div style={{ marginTop: 22, padding: 14, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 220 }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔎</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order #, template, publication…" style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #e8dcc4', borderRadius: 8, fontSize: 13, background: '#fafaf6', boxSizing: 'border-box' }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selStyle}>
              <option value="all">All statuses</option>
              <option value="placed">Order placed</option>
              <option value="draft">Drafts</option>
              <option value="paysuccess">Paid</option>
              <option value="differential">Differential pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={selStyle}>
              <option value="all">All categories</option>
              <option value="Property">Property</option>
              <option value="Education">Education</option>
              <option value="Personal">Personal</option>
              <option value="Display">Display</option>
            </select>
            <select value={range} onChange={e => setRange(e.target.value)} style={selStyle}>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last 1 year</option>
              <option value="all">All time</option>
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} style={selStyle}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="amount-h">₹ High → low</option>
              <option value="amount-l">₹ Low → high</option>
            </select>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: '#5e5045' }}>{filtered.length} of {orders.length}</span>
              <div style={{ display: 'flex', background: '#fbf3e3', borderRadius: 8, padding: 3, border: '1px solid #e8dcc4' }}>
                <button onClick={() => setView('list')} style={{ all: 'unset', cursor: 'pointer', padding: '6px 12px', borderRadius: 6, background: view === 'list' ? '#1a1716' : 'transparent', color: view === 'list' ? '#fff' : '#5e5045', fontWeight: 700, fontSize: 12 }}>☰ List</button>
                <button onClick={() => setView('grid')} style={{ all: 'unset', cursor: 'pointer', padding: '6px 12px', borderRadius: 6, background: view === 'grid' ? '#1a1716' : 'transparent', color: view === 'grid' ? '#fff' : '#5e5045', fontWeight: 700, fontSize: 12 }}>▦ Grid</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, display: view === 'grid' ? 'grid' : 'flex', gridTemplateColumns: view === 'grid' ? 'repeat(2, 1fr)' : undefined, flexDirection: view === 'grid' ? undefined : 'column', gap: 14 }}>
            {loadingOrders ? (
              <div style={{ padding: 64, textAlign: 'center', color: '#5e5045', fontSize: 16 }}>Loading your bookings…</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: 64, textAlign: 'center', background: '#fff', border: '1px dashed #d8c7a3', borderRadius: 14, color: '#5e5045' }}>
                <div style={{ fontSize: 40 }}>🗞</div>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 700, color: '#1a1716', marginTop: 8 }}>{orders.length === 0 ? 'No bookings yet' : 'No matching orders'}</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>{orders.length === 0 ? 'Book your first ad to see it here.' : 'Try clearing filters or change the date range.'}</div>
              </div>
            ) : filtered.map(o => <TxRow key={o.id} o={o} onContinue={onContinueDraft} />)}
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center', fontSize: 13 }}>
            <button style={pgBtn(false)}>‹ Prev</button>
            {[1, 2, 3, 4, 5].map(n => <button key={n} style={pgBtn(n === 1)}>{n}</button>)}
            <span style={{ color: '#9b8c70' }}>…</span>
            <button style={pgBtn(false)}>10</button>
            <button style={pgBtn(false)}>Next ›</button>
          </div>
          <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: '#9b8c70' }}>
            Showing 1–10 of 57 transactions
          </div>
        </main>
      </div>
    </div>
  )
}
