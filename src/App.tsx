import { Route, Routes } from 'react-router-dom'
import IndexRoutes from './routes'
import PrivateDashboard from './routes/farmer'
function App() {
  return (
    <Routes>
      <Route path='/*' element={<IndexRoutes />} />
      <Route path='/fd/*' element={<PrivateDashboard />} />
    </Routes>
  )
}

export default App
