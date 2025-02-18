import React from "react";
import { Badge } from "@/components/ui/badge";

/**
 * Props for the CoordinatorTable component.
 */
interface TableProps {
  columns: string[];
  data: any[];
}

/**
 * Renders a table with dynamic columns and data.
 * @param columns - Column headers.
 * @param data - Row data.
 */
const CoordinatorTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="text-left p-4 font-semibold text-gray-700 border-b">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-4 text-gray-800">
                    {col === "Status" ? (
                      <Badge
                        className={`px-3 py-1 rounded-full ${
                          row[col.toLowerCase()] === "registered"
                            ? "bg-blue-500 text-white"
                            : row[col.toLowerCase()] === "attended"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {row[col.toLowerCase()]}
                      </Badge>
                    ) : (
                      row[col.toLowerCase()] || "-"
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CoordinatorTable;
