import React from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft } from 'lucide-react';
import { avatarUrl } from '../../../../../constants/help';

interface StatisticsModalProps {
  data: any;
  onClose: () => void;
  onBack: () => void;
}

const formatPrice = (price: number | string) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '—';
  return '₦' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const StatisticsModal: React.FC<StatisticsModalProps> = ({ data, onClose, onBack }) => {
  return createPortal(
    <div className="fixed inset-0 min-h-screen bg-black/50 z-[1000] overflow-auto">
      <div className="flex items-center justify-center w-full py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
          <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-200">
            <div className='flex items-center gap-2'>
              <ChevronLeft onClick={onBack} size={20} color='gray' className='cursor-pointer' />
              <h2 className="text-xl font-semibold">Statistics</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <img src={avatarUrl(data.userImage, data.userName || data.username)} alt="User" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-medium">{data.userName || data.username || 'User'}</h3>
                <p className="text-sm text-gray-500">{data.location || '—'}</p>
              </div>
              <button onClick={onBack} className="cursor-pointer ml-auto bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">
                View Listing
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Price', value: formatPrice(data.price) },
                { label: 'Category', value: data.category || '—' },
                { label: 'Date Created', value: data.date || '—' },
                { label: 'Status', value: (data.status || '—').charAt(0).toUpperCase() + (data.status || '—').slice(1) },
                { label: 'Boost Status', value: data.boostedStatus === 'boosted' ? 'Boosted' : 'Not Boosted' },
                { label: 'Location', value: data.location || '—' },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StatisticsModal;