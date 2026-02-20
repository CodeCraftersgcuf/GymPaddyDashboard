import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 7 }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="p-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-200">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
