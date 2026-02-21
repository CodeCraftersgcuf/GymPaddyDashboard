import React, { useState } from 'react';
import ListingDetails from './ListingDetails';
import StatisticsModal from './StatisticsModal';
import { storageUrl } from '../../../../../constants/help';

interface Props {
  displayData: any;
}

const formatPrice = (price: number | string) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '—';
  return '₦' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const ListingRow: React.FC<Props> = ({ displayData }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleShowStats = () => {
    setShowDetails(false);
    setShowStats(true);
  };

  const handleBack = () => {
    setShowStats(false);
    setShowDetails(true);
  };

  const imageUrl = storageUrl(displayData.image);

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-4">
          <input type="checkbox" />
        </td>
        <td className="p-4">
          {imageUrl ? (
            <img src={imageUrl} alt={displayData.name} className="w-12 h-12 rounded-md object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
          )}
        </td>
        <td className="p-4 font-medium">{displayData.name || '—'}</td>
        <td className="p-4">{formatPrice(displayData.price)}</td>
        <td className="p-4">{displayData.category || '—'}</td>
        <td className="p-4">
          <span className={`font-semibold ${displayData.boostedStatus === 'boosted' ? 'text-green-600' : 'text-red-500'}`}>
            {displayData.boostedStatus === 'boosted' ? 'Boosted' : 'Normal'}
          </span>
        </td>
        <td className="p-4">{displayData.date || '—'}</td>
        <td className="p-4">
          <button 
            onClick={() => setShowDetails(true)} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
          >
            Details
          </button>
        </td>
      </tr>

      {showDetails && (
        <ListingDetails
          data={displayData}
          onClose={() => setShowDetails(false)}
          onShowStats={handleShowStats}
        />
      )}

      {showStats && (
        <StatisticsModal
          data={displayData}
          onClose={() => setShowStats(false)}
          onBack={handleBack}
        />
      )}
    </>
  );
};

export default ListingRow;