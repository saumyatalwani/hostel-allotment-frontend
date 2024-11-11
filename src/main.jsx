import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './router';

import AuthProvider from './authProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <Routes/>
    </AuthProvider>
  </StrictMode>,
)
