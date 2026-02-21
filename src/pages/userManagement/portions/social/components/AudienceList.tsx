import React from 'react';
import { Search } from 'lucide-react';
import { avatarUrl } from '../../../../../constants/help';

interface AudienceListProps {
  audience: Array<{
    name: string;
    gifts: number;
    amount: string;
    duration: string;
  }>;
}

const AudienceList: React.FC<AudienceListProps> = ({ audience }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {audience.map((viewer, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl(null, viewer.name)}
                alt={viewer.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{viewer.name}</h3>
                <p className="text-sm text-gray-500">{viewer.gifts} gifts</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-500">{viewer.amount}</p>
              <p className="text-sm text-gray-500">{viewer.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceList;
