import React, { useState } from 'react';
import { avatarUrl, storageUrl } from '../../../constants/help';
import VerifyModal from './VerifyModal';

interface BusinessRowProps {
  displayData: {
    id: string;
    userName: string;
    username: string;
    profilePicture?: string | null;
    businessName: string;
    category: string;
    status: 'approved' | 'pending' | 'rejected';
    created_at: string;
    businessEmail: string;
    businessPhone: string;
    userEmail: string;
    userPhone: string;
    photo?: string | null;
  };
}

const statusColor: Record<string, string> = {
  approved: 'bg-green-600',
  pending: 'bg-yellow-500',
  rejected: 'bg-red-500',
};

const VerificationRow: React.FC<BusinessRowProps> = ({ displayData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-2 py-4 px-4 w-10">
          <input type="checkbox" />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profilePicture, displayData.userName)}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            {displayData.userName}
          </div>
        </td>
        <td className="p-2 py-4">{displayData.businessName}</td>
        <td className="p-2 py-4">{displayData.category}</td>
        <td className="p-2 py-4">
          <span className={`w-4 h-4 inline-block rounded ${statusColor[displayData.status] || 'bg-gray-400'}`}></span>
        </td>
        <td className="p-2 py-4">{displayData.created_at}</td>
        <td className="p-2 py-4">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            View
          </button>
        </td>
      </tr>

      <VerifyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        business={{
          id: displayData.id,
          businessName: displayData.businessName,
          category: displayData.category,
          email: displayData.businessEmail || displayData.userEmail || '',
          phone: displayData.businessPhone || displayData.userPhone || '',
          document: storageUrl(displayData.photo) || '',
          status: displayData.status,
        }}
      />
    </>
  );
};

export default VerificationRow;