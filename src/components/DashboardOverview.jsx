import { useEffect, useState } from 'react'

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/dashboard`)
        if (!res.ok) throw new Error('Failed to fetch metrics')
        const data = await res.json()
        setMetrics(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [])

  if (loading) return <div className="text-gray-500">Loading metrics...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!metrics) return null

  const cards = [
    { label: 'Users', value: metrics.total_users, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Products', value: metrics.total_products, color: 'bg-green-50 text-green-700 border-green-200' },
    { label: 'Orders', value: metrics.total_orders, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Revenue', value: `$${Number(metrics.revenue).toFixed(2)}`, color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`border rounded-lg p-4 ${c.color}`}>
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="text-2xl font-bold">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Top Categories</h2>
        {metrics.top_categories && metrics.top_categories.length ? (
          <ul className="divide-y">
            {metrics.top_categories.map((c) => (
              <li key={c.category} className="py-2 flex items-center justify-between">
                <span className="text-gray-700">{c.category}</span>
                <span className="text-gray-900 font-medium">{c.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  )
}
