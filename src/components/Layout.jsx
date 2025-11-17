import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/products', label: 'Products' },
  { to: '/orders', label: 'Orders' },
  { to: '/users', label: 'Users' },
]

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-rose-500" />
            <span className="font-semibold text-gray-800">Pinduoduo Admin</span>
          </div>
          <div className="text-sm text-gray-500">Dashboard</div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
          <nav className="bg-white border rounded-lg p-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors mb-1 ${
                    isActive ? 'bg-rose-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="col-span-12 lg:col-span-9 xl:col-span-10">
          {children}
        </main>
      </div>
    </div>
  )
}
