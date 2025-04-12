import React, { useState } from 'react';
import ListingDetailsModal from './ListingDetailsModal';
import AdStatsModal from './AdStatsModal';
import Button from '../../../components/Buttons/Button';

interface AdsRowProps {
  displayData: {
    id: number;
    image: string;
    name: string;
    title: string;
    price: string;
    duration: string;
    status: string;
    date: string;
    description: string;
    category: string;
    dateCreated: string;
    listingStatus: string;
    adStatus: string;
    amountSpent: string;
    boostDuration: string;
    impressions: number;
    clicks: number;
  };
}

const AdsRow: React.FC<AdsRowProps> = ({ displayData }) => {
  const [showListingDetails, setShowListingDetails] = useState(false);
  const [showAdStats, setShowAdStats] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50 transition cursor-pointer">
        <td className="p-4">
          <input type="checkbox" />
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <img
              src={displayData.image}
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
          <div
            className={`w-4 h-4 rounded-full ${displayData.status === 'active'
                ? 'bg-green-600'
                : displayData.status === 'pending'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
          />
        </td>
        <td className="p-4">{displayData.date}</td>
        <td className="p-4 flex gap-2">
          <Button
            handleFunction={() => setShowListingDetails(true)}
          >
            Full Details
          </Button>
          <button
            onClick={() => setShowAdStats(true)}
            className='py-2 px-4 text-white rounded-lg bg-black'
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