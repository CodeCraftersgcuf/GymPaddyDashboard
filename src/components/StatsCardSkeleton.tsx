import React from 'react';

const StatsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="w-16 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default StatsCardSkeleton;
