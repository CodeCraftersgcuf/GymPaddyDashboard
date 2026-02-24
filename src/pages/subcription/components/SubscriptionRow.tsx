import React from 'react';
import { avatarUrl } from '../../../constants/help';
import Button from '../../../components/Buttons/Button';

interface BusinessRowProps {
  displayData: {
    id?: number;
    user: {
      username: string;
      profile_picture: string | null;
    };
    plan: string;
    amount: string;
    status: 'active' | 'inactive';
    created_at: string;
    document: string;
  };
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
}

const statusColor = {
  active: 'bg-green-600',
  inactive: 'bg-red-500'
};

const SubscriptionRow: React.FC<BusinessRowProps> = ({ displayData, selectedIds, onToggle }) => {
  const isSelected = selectedIds?.has(String(displayData.id)) ?? false;

  return (
    <>
      <tr className={`hover:bg-gray-100 transition cursor-pointer relative ${isSelected ? 'bg-red-50' : ''}`}>
        <td className="p-2 py-4 px-4 w-10">
          <input type="checkbox" checked={isSelected} onChange={(e) => { e.stopPropagation(); onToggle?.(String(displayData.id)); }} className="cursor-pointer" />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.user.profile_picture, displayData.user.username)}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            {displayData.user.username}
          </div>
        </td>
        <td className="p-2 py-4 uppercase">{displayData.plan}</td>
        <td className="p-2 py-4">{displayData.amount}</td>
        <td className="p-2 py-4">
          <span className={`w-4 h-4 inline-block rounded ${statusColor[displayData.status]}`}></span>
        </td>
        <td className="p-2 py-4">{displayData.created_at}</td>
        <td className="p-2 py-4">
          <Button>
            View User
          </Button>
        </td>
      </tr>
    </>
  );
};

export default SubscriptionRow;