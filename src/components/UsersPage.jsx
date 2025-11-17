import { useEffect, useState } from 'react'
import DataTable from './DataTable'

export default function UsersPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/users`)
        if (!res.ok) throw new Error('Failed to fetch users')
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
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'is_active', label: 'Active', render: (v) => v ? 'Yes' : 'No' },
  ]

  if (loading) return <div className="text-gray-500">Loading users...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
      <DataTable title="All Users" columns={columns} rows={rows} />
    </div>
  )
}
