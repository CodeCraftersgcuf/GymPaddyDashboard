import React, { useState } from 'react';
import Button from '../../../components/Buttons/Button';
import TransactionDetails from '../../userManagement/portions/transactions/components/TransactionDetails';
import { avatarUrl } from '../../../constants/help';

interface TransactionRowProps {
  displayData: {
    id: string;
    amount: number;
    status: 'completed' | 'failed' | 'pending' | string;
    type: 'topup' | 'withdrawal' | string;
    date: string;
    fullName?: string;
    username?: string | null;
    profile_picture?: string | null;
    description?: string | null;
  };
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
}

const formatAmount = (amount: number) =>
  Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TransactionRow: React.FC<TransactionRowProps> = ({ displayData, selectedIds, onToggle }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isSelected = selectedIds?.has(String(displayData.id)) ?? false;

  const getStatusIcon = () => {
    switch (displayData.status) {
      case 'completed':
        return <span className="w-4 h-4 bg-green-600 block rounded-sm" />;
      case 'failed':
        return <span className="w-4 h-4 bg-red-600 block rounded-sm" />;
      case 'pending':
        return <span className="w-4 h-4 bg-yellow-400 block rounded-sm" />;
      default:
        return <span className="w-4 h-4 bg-gray-400 block rounded-sm" />;
    }
  };

  return (
    <>
      <tr className={`hover:bg-gray-100 transition cursor-pointer relative ${isSelected ? 'bg-red-50' : ''}`}>
        <td className="p-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => { e.stopPropagation(); onToggle?.(String(displayData.id)); }}
            className="cursor-pointer rounded border-gray-300"
          />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            {displayData.fullName || 'Unknown'}
          </div>
        </td>
        <td className="p-4 text-sm text-gray-700">{displayData.id}</td>
        <td className="p-4 font-medium">
          <span className={displayData.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'}>
            {displayData.type === 'withdrawal' ? '-' : '+'}
            ₦{formatAmount(displayData.amount)}
          </span>
        </td>
        <td className="p-4">{getStatusIcon()}</td>
        <td className="p-4 text-gray-600">{displayData.date}</td>
        <td className="p-4">
          <Button
            handleFunction={() => setShowDetails(true)}
          >
            Details
          </Button>
        </td>
      </tr>

      {showDetails && (
        <TransactionDetails
          transaction={displayData}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default TransactionRow;
