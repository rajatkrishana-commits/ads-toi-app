import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { SampleAdForSale } from '../../components/brand'

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d8c7a3', borderRadius: 6, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, background: '#fff' }

const fmtDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  return [String(d.getDate()).padStart(2, '0'), String(d.getMonth() + 1).padStart(2, '0'), d.getFullYear()].join('/')
}

export default function AdminPage({ onHome, user, profile }) {
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState(false)

  const firstName = profile?.first_name || ''
  const lastName = profile?.last_name || ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ').toUpperCase() || 'ADMIN'

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*, profiles(first_name, last_name)')
      .order('created_at', { ascending: false })
    if (data) {
      setOrders(data)
      if (!selected && data.find(o => o.status === 'placed')) {
        setSelected(data.find(o => o.status === 'placed'))
      }
    }
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (orderId, status) => {
    setActing(true)
    await supabase
      .from('bookings')
      .update({ status, moderator_id: user?.id })
      .eq('id', orderId)
    await fetchOrders()
    setActing(false)
  }

  const statusColor = (s) => ({
    placed: { bg: '#fff3a0', color: '#7a5230' },
    pending: { bg: '#fde4d8', color: '#a72c1a' },
    paysuccess: { bg: '#daeaf0', color: '#2c5d72' },
    published: { bg: '#dde8d6', color: '#3d5e1e' },
    rejected: { bg: '#fde4d8', color: '#a72c1a' },
    draft: { bg: '#f0eae0', color: '#5e5045' },
  }[s] || { bg: '#f0eae0', color: '#5e5045' })

  return (
    <div style={{ background: '#fafaf6', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header style={{ background: '#1a1716', color: '#fff', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 22 }}>TIMES <i style={{ color: '#d8232a' }}>interact</i></span>
          <span style={{ color: '#d8c7a3', fontSize: 13 }}>BCCL Application · Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13 }}>
          <span style={{ color: '#d8232a', fontWeight: 700 }}>Hello, {fullName}</span>
          <button onClick={onHome} style={{ background: '#d8232a', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Log Off</button>
        </div>
      </header>

      <div style={{ padding: '20px 28px' }}>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 700, margin: 0 }}>Order moderation queue</h1>

        <div style={{ marginTop: 12, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 8, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#5e5045' }}>Loading orders…</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#1a1716', color: '#fff' }}>
                  {['Order #', 'Date', 'Client', 'Cat', 'Pub', 'Status', 'Action'].map(h => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#5e5045' }}>No orders yet.</td></tr>
                ) : orders.map((o, i) => {
                  const sc = statusColor(o.status)
                  const clientName = o.profiles ? `${o.profiles.first_name || ''} ${o.profiles.last_name || ''}`.trim() : '—'
                  const isNew = o.status === 'placed' && i === 0
                  return (
                    <tr key={o.id} onClick={() => setSelected(o)} style={{ background: selected?.id === o.id ? '#fff8f0' : i % 2 ? '#fafaf6' : '#fff', borderTop: '1px solid #e8dcc4', cursor: 'pointer' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: isNew ? '#d8232a' : '#1a1716' }}>{o.order_id}{isNew && ' ●'}</td>
                      <td style={{ padding: '10px 12px' }}>{fmtDate(o.created_at)}</td>
                      <td style={{ padding: '10px 12px', background: isNew ? '#fff3a0' : 'transparent' }}>{clientName}{isNew && <span style={{ color: '#d8232a', marginLeft: 6, fontWeight: 700 }}>(new)</span>}</td>
                      <td style={{ padding: '10px 12px' }}>{o.category}</td>
                      <td style={{ padding: '10px 12px', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.publication}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color }}>{o.status}</span>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#1d4d8c' }}>
                        <span style={{ cursor: 'pointer' }} onClick={e => { e.stopPropagation(); setSelected(o) }}>View</span>
                        {o.status === 'placed' && <>
                          {' | '}<span style={{ cursor: 'pointer', color: '#3d5e1e' }} onClick={e => { e.stopPropagation(); updateStatus(o.id, 'published') }}>Approve</span>
                          {' | '}<span style={{ cursor: 'pointer', color: '#d8232a' }} onClick={e => { e.stopPropagation(); updateStatus(o.id, 'rejected') }}>Reject</span>
                        </>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div style={{ marginTop: 24, padding: 24, background: '#fff', border: '2px solid #d8232a', borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div className="eyebrow" style={{ color: '#d8232a' }}>● Order {selected.status}</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 700, margin: '6px 0' }}>
                {selected.order_id} · {selected.profiles ? `${selected.profiles.first_name || ''} ${selected.profiles.last_name || ''}`.trim() : '—'}
              </h2>
              <div style={{ fontSize: 13, color: '#5e5045' }}>{selected.category} · {selected.design} · ₹ {selected.amount} · {selected.publication} · {selected.pub_date || '—'}</div>
              <textarea
                readOnly
                style={{ marginTop: 16, width: '100%', padding: 12, border: '1px solid #d8c7a3', borderRadius: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, height: 120, resize: 'vertical', boxSizing: 'border-box' }}
                value={selected.ad_text || '(no ad text)'}
              />
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {selected.status === 'placed' ? <>
                  <button disabled={acting} onClick={() => updateStatus(selected.id, 'published')} style={{ background: '#6b8e3d', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 6, fontWeight: 800, cursor: 'pointer', opacity: acting ? 0.6 : 1 }}>✓ Approve &amp; publish</button>
                  <button disabled={acting} onClick={() => updateStatus(selected.id, 'rejected')} style={{ background: '#fff', color: '#d8232a', border: '1.5px solid #d8232a', padding: '12px 18px', borderRadius: 6, fontWeight: 800, cursor: 'pointer', opacity: acting ? 0.6 : 1 }}>Reject</button>
                </> : (
                  <div style={{ padding: '12px 18px', borderRadius: 6, background: '#f0eae0', color: '#5e5045', fontWeight: 700, fontSize: 13 }}>Status: {selected.status}</div>
                )}
              </div>
            </div>
            <div style={{ background: '#fafaf6', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 220 }}><SampleAdForSale accent="#1d4d8c" img="house" /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
