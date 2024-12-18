import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './fanta.css'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <App />
    </AuthProvider>
)