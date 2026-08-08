import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Detect from './pages/Detect'
import Details from './pages/Details'
import History from './pages/History'
import Statistics from './pages/Statistics'
import NotFound from './pages/NotFound'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="detect" element={<Detect />} />
          <Route path="history" element={<History />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="statistics" element={<Statistics />} />
          
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
