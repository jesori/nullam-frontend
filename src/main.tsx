import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ServiceProvider } from './context/ServiceContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
