import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'

const user = localStorage.getItem('user')
console.log('user', user)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    { 
      user ? <App /> : <Login /> 
    }
  </StrictMode>,
)
