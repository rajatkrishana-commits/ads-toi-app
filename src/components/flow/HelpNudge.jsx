export default function HelpNudge({ children, tone = 'cream' }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: 14, background: tone === 'cream' ? '#fbf3e3' : '#fff5e8', border: '1px solid #e8dcc4', borderRadius: 10, fontSize: 13, color: '#3d342c', lineHeight: 1.5, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 20, lineHeight: 1 }}>💡</span>
      <div>{children}</div>
    </div>
  )
}
