import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';
import { storageUrl } from '../../../../../constants/help';
import { useUpdateListing, useBoostListing } from '../../../../../utils/mutations/marketMutations';

interface ListingDetailsProps {
  data: any;
  onClose: () => void;
  onShowStats: () => void;
}

const formatPrice = (price: number | string) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '—';
  return '₦' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active': case 'running': return 'text-green-600';
    case 'pending': return 'text-yellow-600';
    case 'closed': case 'sold': return 'text-gray-500';
    default: return 'text-blue-600';
  }
};

const ListingDetails: React.FC<ListingDetailsProps> = ({ data, onClose, onShowStats }) => {
  const imageUrl = storageUrl(data.image);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: data.name || '',
    description: data.description || '',
    price: data.price || 0,
    category: data.category || '',
  });
  const [editError, setEditError] = useState<string | null>(null);

  const updateMutation = useUpdateListing();
  const boostMutation = useBoostListing();

  const handleSaveEdit = async () => {
    setEditError(null);
    try {
      await updateMutation.mutateAsync({ id: data.id, data: editForm });
      setIsEditing(false);
    } catch (err: any) {
      setEditError(err?.response?.data?.message || err?.message || 'Failed to update listing.');
    }
  };

  const handleBoost = async () => {
    try {
      await boostMutation.mutateAsync(data.id);
    } catch (err: any) {
      console.error('Boost error:', err);
    }
  };

  return createPortal(
    <div className="fixed inset-0 min-h-screen bg-black/50 z-[1000] overflow-auto">
      <div className="flex items-center justify-center w-full py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
          <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{isEditing ? 'Edit Listing' : 'Listing Details'}</h2>
            <button
              onClick={() => { if (isEditing) setIsEditing(false); else onClose(); }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-400 resize-none"
                  />
                </div>

                {editError && (
                  <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{editError}</p>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleSaveEdit}
                    disabled={updateMutation.isPending}
                    className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition cursor-pointer disabled:opacity-50"
                  >
                    {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {imageUrl ? (
                  <img src={imageUrl} alt={data.name} className="w-full h-64 object-cover rounded-lg mb-6" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <div className="w-full h-40 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
                <div className="space-y-0 border border-gray-200 rounded-lg">
                  <div className="flex justify-between p-4 border-b border-gray-200">
                    <span className="font-medium">Name</span>
                    <span className="text-gray-600">{data.name || '—'}</span>
                  </div>
                  <div className="flex justify-between p-4 border-b border-gray-200">
                    <span className="font-medium">Price</span>
                    <span className="text-gray-600 font-semibold">{formatPrice(data.price)}</span>
                  </div>
                  <div className="flex justify-between p-4 border-b border-gray-200">
                    <span className="font-medium shrink-0 mr-4">Description</span>
                    <span className="text-gray-600 text-right">{data.description || 'No description available'}</span>
                  </div>
                  <div className="flex justify-between p-4 border-b border-gray-200">
                    <span className="font-medium">Category</span>
                    <span className="text-gray-600">{data.category || '—'}</span>
                  </div>
                  {data.location && data.location !== '—' && (
                    <div className="flex justify-between p-4 border-b border-gray-200">
                      <span className="font-medium">Location</span>
                      <span className="text-gray-600">{data.location}</span>
                    </div>
                  )}
                  <div className="flex justify-between p-4 border-b border-gray-200">
                    <span className="font-medium">Date Created</span>
                    <span className="text-gray-600">{data.date || '—'}</span>
                  </div>
                  <div className="flex justify-between p-4 border-b border-gray-200">
                    <span className="font-medium">Status</span>
                    <span className={`font-semibold capitalize ${getStatusColor(data.status)}`}>
                      {data.status || '—'}
                    </span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="font-medium">Boost Status</span>
                    <span className={`font-semibold ${data.boostedStatus === 'boosted' ? 'text-green-600' : 'text-red-500'}`}>
                      {data.boostedStatus === 'boosted' ? 'Boosted' : 'Not Boosted'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleBoost}
                    disabled={boostMutation.isPending || data.boostedStatus === 'boosted'}
                    className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {boostMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Boosting...</>
                    ) : boostMutation.isSuccess ? (
                      'Boosted!'
                    ) : data.boostedStatus === 'boosted' ? (
                      'Already Boosted'
                    ) : (
                      'Boost'
                    )}
                  </button>
                  <button
                    onClick={onShowStats}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                  >
                    Statistics
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ListingDetails;