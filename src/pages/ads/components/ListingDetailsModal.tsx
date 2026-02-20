import React from 'react';
import { X } from 'lucide-react';
import { avatarUrl } from '../../../constants/help';

interface ListingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    image?: string | null;
    title: string;
    price: string;
    description: string;
    category: string;
    dateCreated: string;
    listingStatus: string;
    adStatus: string;
  };
}

const ListingDetailsModal: React.FC<ListingDetailsModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 min-h-screen bg-black/50 z-[1000] overflow-auto">
      <div className="flex items-center justify-center w-full  py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
          <div className="flex items-center justify-between p-4 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Listing Detail</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4">
            {data.image ? (
              <img
                src={data.image}
                alt="Product"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Name</span>
                <span>{data.title}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Price</span>
                <span className="text-red-500">{data.price}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Description</span>
                <span className="text-gray-600">{data.description}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Category</span>
                <span>{data.category}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Date Created</span>
                <span>{data.dateCreated}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Status</span>
                <span className={`${data.listingStatus === 'active' ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {data.listingStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Ad Status</span>
                <span className={`${data.adStatus === 'active' ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {data.adStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <select className="flex-1 p-2 border rounded-lg">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-4">


              <div className="flex gap-2 w-full">
                <button className="flex-[1] bg-red-500 text-white px-4 py-2 rounded-lg">
                  Edit
                </button>
                <button className="flex-[1] bg-black text-white px-4 py-2 rounded-lg">
                  Boost
                </button>
                {/* <button className="flex-[1] bg-gray-200 text-black px-4 py-2 rounded-lg">
                  Statistics
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsModal;