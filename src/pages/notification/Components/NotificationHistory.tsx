import React from 'react';
import type { Notification } from '../../../utils/queries/notificationQueries';

interface Props {
  notifications: Notification[];
  isLoading?: boolean;
  onDelete: (id: string) => void;
  onResend: (title: string, message: string) => void;
}

const NotificationHistory: React.FC<Props> = ({ notifications, isLoading, onDelete, onResend }) => {
  if (isLoading) {
    return <div className="py-8 text-center text-gray-500 text-sm">Loading history...</div>;
  }

  if (notifications.length === 0) {
    return <div className="py-8 text-center text-gray-500 text-sm">No notifications sent yet.</div>;
  }

  return (
    <div className="divide-y max-h-[60vh] overflow-y-auto">
      {notifications.map((notification) => (
        <div key={notification.id} className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <span className="text-sm text-gray-500">{(notification as any).timestamp || notification.created_at}</span>
          </div>
          <p className="text-gray-600">{notification.message}</p>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => onResend(notification.title || '', notification.message)}
              className="text-green-600 hover:underline cursor-pointer"
            >
              Resend
            </button>
            <button
              onClick={() => onDelete(notification.id)}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationHistory;
