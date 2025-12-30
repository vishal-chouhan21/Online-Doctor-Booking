import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'
import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
       <AuthProvider>
      <App />
    </AuthProvider>
    </AppContextProvider>
  </BrowserRouter>,
)