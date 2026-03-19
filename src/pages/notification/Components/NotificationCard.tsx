import React, { useState } from 'react';
import { MessageSquare, Heart, Store, Dumbbell, Loader2, Check, Eye } from 'lucide-react';
import type { NotificationProps } from '../../../constants/Data';
import { avatarUrl } from '../../../constants/help';
import { useMarkNotificationRead, useUpdateNotificationStatus } from '../../../utils/mutations/notificationMutations';
import Modal from '../../../components/Modal';

interface ExtendedNotificationProps extends NotificationProps {
  id?: string;
}

const NotificationCard: React.FC<ExtendedNotificationProps> = ({
  id,
  user,
  title,
  message,
  type,
  time,
  status
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const markReadMutation = useMarkNotificationRead();
  const updateStatusMutation = useUpdateNotificationStatus();

  const getTypeIcon = () => {
    switch (type) {
      case 'socials':
        return <MessageSquare className="w-4 h-4 text-red-500" />;
      case 'connect':
        return <Heart className="w-4 h-4 text-blue-500" />;
      case 'market':
        return <Store className="w-4 h-4 text-green-500" />;
      case 'gym':
        return <Dumbbell className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'socials':
        return 'bg-red-50';
      case 'connect':
        return 'bg-blue-50';
      case 'market':
        return 'bg-green-50';
      case 'gym':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'approved':
        return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Approved</span>;
      case 'reviewed':
        return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Reviewed</span>;
      case 'rejected':
        return <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Rejected</span>;
      default:
        return null;
    }
  };

  const handleReview = () => {
    if (!id) return;
    setShowReviewModal(true);
    markReadMutation.mutate(id);
  };

  const handleApprove = () => {
    if (!id) return;
    updateStatusMutation.mutate({ id, status: 'approved' });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-4 w-full h-full hover:shadow-md transition-shadow border border-gray-200 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <img
            src={avatarUrl(user?.profile_picture, user?.username)}
            alt={user?.username || 'User'}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{user?.username || 'Unknown User'}</h3>
                  <div className={`px-2 py-1 rounded-full ${getTypeColor()} flex items-center gap-1`}>
                    {getTypeIcon()}
                    <span className="text-xs font-medium capitalize">{type}</span>
                  </div>
                  {getStatusBadge()}
                </div>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">{time}</span>
            </div>

            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleReview}
            disabled={markReadMutation.isPending}
            className="cursor-pointer px-6 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {markReadMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            Review
          </button>
          {type !== 'support' && status !== 'approved' && (
            <button
              onClick={handleApprove}
              disabled={updateStatusMutation.isPending}
              className="cursor-pointer px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {updateStatusMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Approve
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Notification Details">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl(user?.profile_picture, user?.username)}
              alt={user?.username || 'User'}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user?.username || 'Unknown User'}</h3>
              <div className={`px-2 py-0.5 rounded-full ${getTypeColor()} flex items-center gap-1 w-fit mt-1`}>
                {getTypeIcon()}
                <span className="text-xs font-medium capitalize">{type}</span>
              </div>
            </div>
          </div>

          {title && <h4 className="text-base font-medium text-gray-800">{title}</h4>}
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">{message}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Time: {time}</span>
            <span className="capitalize">Status: {status}</span>
          </div>

          {status !== 'approved' && (
            <button
              onClick={() => {
                handleApprove();
                setShowReviewModal(false);
              }}
              disabled={updateStatusMutation.isPending}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {updateStatusMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Approve Notification
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NotificationCard;
