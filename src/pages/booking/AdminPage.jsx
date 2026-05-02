import { SampleAdForSale } from '../../components/brand'

const orders = [
  ['B5745325', '28/04/2026', 'Rajat Srivastava', 'Property', 'TOIM', 'Awaiting', '—'],
  ['B5745298', '27/04/2026', 'Rajat Srivastava', 'Property', 'TOIM', 'Approved', 'RAJATS'],
  ['B5745297', '27/04/2026', 'Suraj Tiwari', 'Property', 'TOIWAGR', 'Draft', '—'],
  ['B5745295', '26/04/2026', 'Rajat Srivastava', 'Property', 'MMIR', 'Approved', 'RAJATS'],
  ['B5745271', '26/04/2026', 'Nitisha Rathore', 'Property', 'NBTM', 'Draft', '—'],
  ['B5745267', '25/04/2026', 'Nitisha Rathore', 'Property', 'NBTM', 'Draft', '—'],
  ['B5745264', '24/04/2026', 'Purvansh Jain', 'Property', 'NBTM', 'Draft', '—'],
]

const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d8c7a3', borderRadius: 6, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, background: '#fff' }

export default function AdminPage({ onHome }) {
  return (
    <div style={{ background: '#fafaf6', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header style={{ background: '#1a1716', color: '#fff', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 800, fontSize: 22 }}>TIMES <i style={{ color: '#d8232a' }}>interact</i></span>
          <span style={{ color: '#d8c7a3', fontSize: 13 }}>BCCL Application · Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13 }}>
          <span style={{ color: '#d8232a', fontWeight: 700 }}>Hello, RAJAT SRIVASTAVA [RAJATS]</span>
          <button onClick={onHome} style={{ background: '#d8232a', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 4, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Log Off</button>
        </div>
      </header>

      <div style={{ padding: '20px 28px' }}>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 700, margin: 0 }}>Order moderation queue</h1>

        <div style={{ marginTop: 16, padding: 18, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 8, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) auto', gap: 14, alignItems: 'end' }}>
          <div><div className="eyebrow" style={{ color: '#5e5045' }}>From</div><input defaultValue="22/04/2026" style={inputStyle} /></div>
          <div><div className="eyebrow" style={{ color: '#5e5045' }}>To</div><input defaultValue="29/04/2026" style={inputStyle} /></div>
          <div><div className="eyebrow" style={{ color: '#5e5045' }}>Order Number</div><input style={inputStyle} placeholder="B574..." /></div>
          <div><div className="eyebrow" style={{ color: '#5e5045' }}>Client</div><input style={inputStyle} placeholder="Search…" /></div>
          <div><div className="eyebrow" style={{ color: '#5e5045' }}>Status</div><select style={inputStyle}><option>All</option><option>Awaiting</option><option>Approved</option><option>Draft</option></select></div>
          <button style={{ background: '#1d4d8c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 6, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>SEARCH</button>
        </div>

        <div style={{ marginTop: 12, background: '#fff', border: '1px solid #e8dcc4', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#1a1716', color: '#fff' }}>
                {['Order #', 'Date', 'Client', 'Cat', 'Pub', 'Status', 'Moderator', 'Action'].map(h => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o[0]} style={{ background: i % 2 ? '#fafaf6' : '#fff', borderTop: '1px solid #e8dcc4' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: i === 0 ? '#d8232a' : '#1a1716' }}>{o[0]}{i === 0 && ' ●'}</td>
                  <td style={{ padding: '10px 12px' }}>{o[1]}</td>
                  <td style={{ padding: '10px 12px', background: i === 0 ? '#fff3a0' : 'transparent' }}>{o[2]}{i === 0 && <span style={{ color: '#d8232a', marginLeft: 6, fontWeight: 700 }}>(new)</span>}</td>
                  <td style={{ padding: '10px 12px' }}>{o[3]}</td>
                  <td style={{ padding: '10px 12px' }}>{o[4]}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: o[5] === 'Awaiting' ? '#fff3a0' : o[5] === 'Approved' ? '#dde8d6' : '#f0eae0', color: o[5] === 'Awaiting' ? '#7a5230' : o[5] === 'Approved' ? '#3d5e1e' : '#5e5045' }}>{o[5]}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>{o[6]}</td>
                  <td style={{ padding: '10px 12px', color: '#1d4d8c' }}>
                    <a style={{ marginRight: 8, cursor: 'pointer' }}>View</a>|<a style={{ marginLeft: 8, marginRight: 8, cursor: 'pointer' }}>Approve</a>|<a style={{ marginLeft: 8, cursor: 'pointer' }}>Reject</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 24, padding: 24, background: '#fff', border: '2px solid #d8232a', borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ color: '#d8232a' }}>● Order awaiting approval</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 700, margin: '6px 0' }}>B5745325 · Rajat Srivastava</h2>
            <div style={{ fontSize: 13, color: '#5e5045' }}>Property · Display single col · ₹ 990 · Times of India Mumbai · 28-04-2026</div>
            <textarea style={{ marginTop: 16, width: '100%', padding: 12, border: '1px solid #d8c7a3', borderRadius: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, height: 120, resize: 'vertical' }} defaultValue={"Newly constructed 2 floor building with carpet area of 1200 sq.ft. Parking in basement. Near ABC mall.\n\nContact: ABC XYZ\n+91 98XXX XXXXX"} />
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button style={{ background: '#6b8e3d', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 6, fontWeight: 800, cursor: 'pointer' }}>✓ Approve &amp; send to SAP</button>
              <button style={{ background: '#fff', color: '#d8232a', border: '1.5px solid #d8232a', padding: '12px 18px', borderRadius: 6, fontWeight: 800, cursor: 'pointer' }}>Reject</button>
              <button style={{ background: 'transparent', color: '#1a1716', border: '1.5px solid #1a1716', padding: '12px 18px', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>Edit ad</button>
            </div>
          </div>
          <div style={{ background: '#fafaf6', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 220 }}><SampleAdForSale accent="#1d4d8c" img="house" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
