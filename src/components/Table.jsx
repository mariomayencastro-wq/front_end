// src/components/Table.jsx
import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-blue-50 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-blue-50 transition border-b last:border-none"
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-4 py-2 text-gray-700">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-400 py-4"
              >
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
