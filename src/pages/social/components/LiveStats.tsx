import React from 'react';
import { avatarUrl } from '../../../constants/help';

interface LiveStatsProps {
  userAvatar?: string | null;
  username: string;
  location: string;
  timeAgo: string;
  viewers: number;
  status: 'Running' | 'Ended';
  date: string;
}

const LiveStats: React.FC<LiveStatsProps> = ({
  userAvatar,
  username,
  location,
  timeAgo,
  viewers,
  status,
  date,
}) => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-3 mb-6">
        <img
          src={avatarUrl(userAvatar, username)}
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{username}</h3>
          <p className="text-gray-500 text-sm">{location} · {timeAgo}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-gray-500 text-sm">Audience</p>
          <p className="text-xl font-semibold mt-1">{viewers.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-gray-500 text-sm">Status</p>
          <p className={`text-xl font-semibold mt-1 ${status === 'Running' ? 'text-green-600' : 'text-red-500'}`}>
            {status}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-gray-500 text-sm">Date</p>
          <p className="text-xl font-semibold mt-1">{date}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-gray-500 text-sm">Time</p>
          <p className="text-xl font-semibold mt-1">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
