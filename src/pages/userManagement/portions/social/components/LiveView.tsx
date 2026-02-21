import React from 'react';
import { avatarUrl, storageUrl } from '../../../../../constants/help';

interface LiveViewProps {
  live: {
    userAvatar?: string | null;
    username: string;
    location: string;
    timeAgo: string;
    image: string;
    title?: string;
  };
  onViewStats: () => void;
}

const LiveView: React.FC<LiveViewProps> = ({ live, onViewStats }) => {
  const resolvedImage = storageUrl(live.image);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl(live.userAvatar, live.username)}
            alt={live.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{live.username}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{live.location}</span>
              <span>·</span>
              <span>{live.timeAgo}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onViewStats}
          className="text-red-500 font-medium hover:underline cursor-pointer"
        >
          View Stats
        </button>
      </div>

      {live.title && (
        <h3 className="text-lg font-medium">{live.title}</h3>
      )}

      {resolvedImage ? (
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <img
            src={resolvedImage}
            alt="Live Stream"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      ) : (
        <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
          No thumbnail available
        </div>
      )}
    </div>
  );
};

export default LiveView;
