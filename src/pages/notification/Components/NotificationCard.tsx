import React from 'react';
import { MessageSquare, Heart, Store, Dumbbell } from 'lucide-react';
import type { NotificationProps } from '../../../constants/Data';
import { avatarUrl } from '../../../constants/help';

const NotificationCard: React.FC<NotificationProps> = ({
  user,
  title,
  message,
  type,
  time,
  status
}) => {
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

  return (
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
              </div>
              {/* <h4 className="text-sm font-medium text-gray-700 mt-1">{title}</h4> */}
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">{time}</span>
          </div>
          
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">{message}</p>
          
          </div>
        </div>
          <div className="flex gap-3 mt-4">
            <button 
              className="cursor-pointer px-6 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm font-medium flex items-center gap-2"
            >
              Review
            </button>
            {status !== 'pending' && <button 
              className="cursor-pointer px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 text-sm font-medium flex items-center gap-2"
            >
              Approve
            </button>}
      </div>
    </div>
  );
};

export default NotificationCard;