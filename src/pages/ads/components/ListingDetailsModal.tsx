import React from 'react';
import { X } from 'lucide-react';
import { storageUrl } from '../../../constants/help';
import type { Ad } from '../../../utils/queries/adsQueries';

interface ListingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ad;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'pending': return 'text-yellow-600 bg-yellow-50';
    case 'paused': return 'text-orange-600 bg-orange-50';
    case 'completed': return 'text-blue-600 bg-blue-50';
    default: return 'text-red-600 bg-red-50';
  }
};

const ListingDetailsModal: React.FC<ListingDetailsModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen) return null;

  const resolvedImage = storageUrl(data.image);
  const isPost = data.type === 'post';

  return (
    <div className="fixed inset-0 min-h-screen bg-black/50 z-[1000] overflow-auto">
      <div className="flex items-center justify-center w-full py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
          <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold">
              {isPost ? 'Boosted Post Details' : 'Listing Details'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4">
            {resolvedImage ? (
              <img
                src={resolvedImage}
                alt="Ad media"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}

            <div className="space-y-3">
              <DetailRow label="Title" value={data.title} />
              <DetailRow label="Advertiser" value={data.name} />
              {data.description && (
                <DetailRow label="Description" value={data.description} />
              )}
              <DetailRow label="Type" value={isPost ? 'Post Boost' : 'Marketplace Listing'} />
              {!isPost && data.price !== '—' && (
                <DetailRow label="Price" value={data.price} highlight />
              )}
              <DetailRow label="Category" value={data.category} />
              <DetailRow label="Budget" value={data.amountSpent} highlight />
              <DetailRow label="Duration" value={data.duration} />
              <DetailRow label="Start Date" value={data.startDate} />
              <DetailRow label="End Date" value={data.endDate} />
              <DetailRow label="Date Created" value={data.dateCreated} />

              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Ad Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(data.adStatus)}`}>
                  {data.adStatus}
                </span>
              </div>

              {!isPost && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Listing Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(data.listingStatus)}`}>
                    {data.listingStatus}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight
}) => (
  <div className="flex justify-between items-center">
    <span className="font-medium text-gray-700">{label}</span>
    <span className={highlight ? 'text-red-500 font-semibold' : 'text-gray-600'}>
      {value || '—'}
    </span>
  </div>
);

export default ListingDetailsModal;