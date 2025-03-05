import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Summary from './routes/summary.tsx'
import AllSummaries from './routes/all-summaries.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/all-summaries" element={<AllSummaries />} />
      </Routes>
    </Router>
  </div>
)
