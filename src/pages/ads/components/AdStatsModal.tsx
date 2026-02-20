import React from 'react';
import { X } from 'lucide-react';
import { avatarUrl } from '../../../constants/help';

interface AdStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    userImage?: string | null;
    location?: string;
    amountSpent: string;
    boostDuration: string;
    dateCreated: string;
    impressions: number;
    clicks: number;
  };
}

const AdStatsModal: React.FC<AdStatsModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const ctr = data.impressions > 0
    ? ((data.clicks / data.impressions) * 100).toFixed(2) + '%'
    : '0%';

  return (
    <div className="fixed inset-0 min-h-screen bg-black/50 z-[1000] overflow-auto">
      <div className="flex items-center justify-center w-full py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
          <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Ad Stats</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={avatarUrl(data.userImage, data.name)}
                alt={data.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{data.name}</h3>
                <p className="text-sm text-gray-500">{data.location || 'Nigeria'}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <StatCard title="Amount Spent" value={data.amountSpent} />
              <StatCard title="Duration"     value={data.boostDuration} />
              <StatCard title="Date Created" value={data.dateCreated} />
              <StatCard title="Impressions"  value={data.impressions.toLocaleString()} />
              <StatCard title="Clicks"       value={data.clicks.toLocaleString()} />
              <StatCard title="CTR"          value={ctr} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="font-semibold mt-1">{value}</p>
  </div>
);

export default AdStatsModal;
