import React, { useState } from 'react';
import ListingDetailsModal from './ListingDetailsModal';
import AdStatsModal from './AdStatsModal';
import Button from '../../../components/Buttons/Button';
import { avatarUrl } from '../../../constants/help';
import type { Ad } from '../../../utils/queries/adsQueries';

interface AdsRowProps {
  displayData: Ad;
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
}

const AdsRow: React.FC<AdsRowProps> = ({ displayData, selectedIds, onToggle }) => {
  const [showListingDetails, setShowListingDetails] = useState(false);
  const [showAdStats, setShowAdStats] = useState(false);
  const isSelected = selectedIds?.has(String(displayData.id)) ?? false;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'pending': return 'bg-yellow-500';
      case 'paused': return 'bg-orange-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <>
      <tr className={`hover:bg-gray-50 transition cursor-pointer ${isSelected ? 'bg-red-50' : ''}`}>
        <td className="p-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => { e.stopPropagation(); onToggle?.(String(displayData.id)); }}
            className="cursor-pointer"
          />
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.userImage, displayData.name)}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{displayData.name}</span>
          </div>
        </td>
        <td className="p-4 font-medium">{displayData.title}</td>
        <td className="p-4">{displayData.price}</td>
        <td className="p-4">{displayData.duration}</td>
        <td className="p-4">
          <div className={`w-4 h-4 rounded-full ${getStatusColor(displayData.status)}`} />
        </td>
        <td className="p-4">{displayData.date}</td>
        <td className="p-4 flex gap-2">
          <Button handleFunction={() => setShowListingDetails(true)}>
            Full Details
          </Button>
          <button
            onClick={() => setShowAdStats(true)}
            className="py-2 px-4 text-white rounded-lg bg-black"
          >
            Ad Stats
          </button>
        </td>
      </tr>

      <ListingDetailsModal
        isOpen={showListingDetails}
        onClose={() => setShowListingDetails(false)}
        data={displayData}
      />

      <AdStatsModal
        isOpen={showAdStats}
        onClose={() => setShowAdStats(false)}
        data={displayData}
      />
    </>
  );
};

export default AdsRow;