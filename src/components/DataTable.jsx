export default function DataTable({ title, columns = [], rows = [] }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2 font-medium">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-4 text-center text-gray-500">No data</td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-2 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
