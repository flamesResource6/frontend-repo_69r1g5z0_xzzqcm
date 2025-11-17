import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardOverview from './components/DashboardOverview'
import ProductsPage from './components/ProductsPage'
import OrdersPage from './components/OrdersPage'
import UsersPage from './components/UsersPage'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    // redirect root to dashboard
    if (location.pathname === '/') {
      navigate('/dashboard', { replace: true })
    }
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
