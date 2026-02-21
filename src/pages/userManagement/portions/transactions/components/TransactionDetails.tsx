import React from 'react';
import { X, Copy, Check, AlertTriangle, Clock } from 'lucide-react';

interface TransactionDetailsProps {
  transaction: {
    id: string;
    amount: number;
    status: 'completed' | 'failed' | 'pending' | string;
    type: 'topup' | 'withdrawal' | string;
    date: string;
    fullName?: string;
    description?: string | null;
  };
  onClose: () => void;
}

const formatAmount = (amount: number) =>
  Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  onClose,
}) => {
  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return (
          <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
        );
      case 'failed':
        return (
          <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-white" />
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-white" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-400 w-16 h-16 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        );
    }
  };

  const getStatusLabel = () => {
    switch (transaction.status) {
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      case 'pending': return 'Pending';
      default: return transaction.status;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transaction.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            {getStatusIcon()}
            <span
              className={`text-2xl font-bold mt-4 ${
                transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {transaction.type === 'withdrawal' ? '-' : '+'}
              ₦{formatAmount(transaction.amount)}
            </span>
            <span className="text-sm text-gray-500 mt-1 capitalize">{getStatusLabel()}</span>
          </div>

          <div className="space-y-4 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tx ID</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 text-sm">{transaction.id}</span>
                <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {transaction.fullName && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">User</span>
                <span className="text-gray-900">{transaction.fullName}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Type</span>
              <span className="text-gray-900 capitalize">{transaction.type}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className={`capitalize font-medium ${
                transaction.status === 'completed' ? 'text-green-600' :
                transaction.status === 'failed' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {getStatusLabel()}
              </span>
            </div>

            {transaction.description && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Description</span>
                <span className="text-gray-900">{transaction.description}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-900">{transaction.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;