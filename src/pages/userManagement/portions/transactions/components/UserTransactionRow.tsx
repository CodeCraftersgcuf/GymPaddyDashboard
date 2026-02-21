import React, { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import Button from '../../../../../components/Buttons/Button';

interface TransactionRowProps {
  displayData: {
    id: string;
    amount: number;
    status: 'completed' | 'failed' | 'pending' | string;
    type: 'topup' | 'withdrawal' | string;
    date: string;
    fullName?: string;
    description?: string | null;
  };
}

const formatAmount = (amount: number) =>
  Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const UserTransactionRow: React.FC<TransactionRowProps> = ({ displayData }) => {
  const [showDetails, setShowDetails] = useState(false);

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
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-4">
          <input type="checkbox" className="rounded border-gray-300" />
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

export default UserTransactionRow;