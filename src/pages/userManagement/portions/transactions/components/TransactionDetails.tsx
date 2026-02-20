import React from 'react';
import { X, Copy, Check, AlertTriangle } from 'lucide-react';

interface TransactionDetailsProps {
  transaction: {
    id: string;
    amount: string;
    status: 'completed' | 'failed' | 'pending' | string;
    type: 'topup' | 'withdrawal' | string;
    date: string;
    description?: string | null;
    accountDetails?: {
      accountName: string;
      accountNumber: string;
      bankName: string;
    };
  };
  onClose: () => void;
}

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
            <AlertTriangle className="w-8 h-8 text-white" />
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
              {transaction.amount}
            </span>
          </div>

          <div className="space-y-4 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tx ID</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">{transaction.id}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Type</span>
              <span className="text-gray-900 capitalize">{transaction.type}</span>
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

          {transaction.type === 'withdrawal' && transaction.accountDetails && (
            <div className="mt-6">
              <h3 className="text-gray-600 mb-4">Withdrawal Account</h3>
              <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Name</span>
                  <span className="text-gray-900">
                    {transaction.accountDetails.accountName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Number</span>
                  <span className="text-gray-900">
                    {transaction.accountDetails.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bank Name</span>
                  <span className="text-gray-900">
                    {transaction.accountDetails.bankName}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;