export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
            {columns.map((col) => (
              <th key={col.key} className="border-b border-slate-200 px-3 py-2 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} 
            className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              {columns.map((col) => (
                <td key={col.key} className="border-b border-slate-200 px-3 py-2 align-top">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
