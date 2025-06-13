import { useParams } from "react-router-dom"

export default function Header() {
  const {uid} = useParams();
  
  return <>
    <div style={{
          backgroundColor: 'white',
          padding: '15px 30px',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontSize: '18px' }}>☰</span>
            <h2 style={{ margin: '0', fontSize: '20px', color: '#333' }}>
              Hello..! {uid || 'User'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '35px',
              height: '35px',
              backgroundColor: '#4a90a4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {uid ? uid.charAt(0).toUpperCase() : 'U'}
            </div>
            <span style={{ fontWeight: '500', color: '#333' }}>{uid || 'User'}</span>
          </div>
        </div>
  </>
}
