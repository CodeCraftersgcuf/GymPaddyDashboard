import React from 'react';
import { avatarUrl, storageUrl } from '../../../constants/help';

interface StatusViewProps {
  status: {
    userAvatar?: string | null;
    username: string;
    location: string;
    timeAgo: string;
    image: string;
    views: number;
  };
}

const StatusView: React.FC<StatusViewProps> = ({ status }) => {
  const resolvedImage = storageUrl(status.image);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl(status.userAvatar, status.username)}
            alt={status.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{status.username}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{status.location}</span>
              <span>·</span>
              <span>{status.timeAgo}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{status.views.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Views</div>
        </div>
      </div>

      {resolvedImage ? (
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <img
            src={resolvedImage}
            alt="Status"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      ) : (
        <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
          No media available
        </div>
      )}
    </div>
  );
};

export default StatusView;
