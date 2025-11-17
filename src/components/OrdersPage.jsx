import { useEffect, useState } from 'react'
import DataTable from './DataTable'

export default function OrdersPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/orders`)
        if (!res.ok) throw new Error('Failed to fetch orders')
        const data = await res.json()
        setRows(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const columns = [
    { key: '_id', label: 'ID' },
    { key: 'user_id', label: 'User' },
    { key: 'product_id', label: 'Product' },
    { key: 'quantity', label: 'Qty' },
    { key: 'total_price', label: 'Total', render: (v) => `$${Number(v).toFixed(2)}` },
    { key: 'status', label: 'Status' },
  ]

  if (loading) return <div className="text-gray-500">Loading orders...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
      <DataTable title="Recent Orders" columns={columns} rows={rows} />
    </div>
  )
}
