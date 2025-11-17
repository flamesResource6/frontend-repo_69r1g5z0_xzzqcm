import { useEffect, useState } from 'react'
import DataTable from './DataTable'

export default function ProductsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/products`)
        if (!res.ok) throw new Error('Failed to fetch products')
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
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price', render: (v) => `$${Number(v).toFixed(2)}` },
    { key: 'in_stock', label: 'In Stock', render: (v) => v ? 'Yes' : 'No' },
  ]

  if (loading) return <div className="text-gray-500">Loading products...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
      <DataTable title="All Products" columns={columns} rows={rows} />
    </div>
  )
}
