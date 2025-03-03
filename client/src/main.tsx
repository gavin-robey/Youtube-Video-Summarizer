import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Summary from './routes/summary.tsx'
import AllSummaries from './routes/all-summaries.tsx'
import App from './App.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App/>
  },
  {
    path: "/summary", 
    element: <Summary/>
  },
  {
    path: "/all-summaries", 
    element: <AllSummaries/>
  },
])

createRoot(document.getElementById('root')!).render(
  <div className='w-[100vw] h-[100vw] bg-[#282C34]'>
    <RouterProvider router={router} />
  </div>
)
