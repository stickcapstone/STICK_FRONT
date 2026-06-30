import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import ErrorBoundary from './share/errorPage/ErrorBoundary'
import { HistoryProvider } from './share/context/HistoryContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <HistoryProvider>
          <App />
        </HistoryProvider>
      </ErrorBoundary>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>,
)
