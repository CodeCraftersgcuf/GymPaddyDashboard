import React from 'react';
import { avatarUrl } from '../../../constants/help';

interface BoostStatsProps {
  userAvatar?: string | null;
  username: string;
  location: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  isBoosted: boolean;
  postType: string;
  date: string;
  onViewPost: () => void;
}

const BoostStats: React.FC<BoostStatsProps> = ({
  userAvatar,
  username,
  location,
  timeAgo,
  likes,
  comments,
  shares,
  isBoosted,
  postType,
  date,
  onViewPost,
}) => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl(userAvatar, username)}
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{username}</h3>
          <p className="text-gray-500 text-sm">{location} · {timeAgo}</p>
        </div>
        <button
          onClick={onViewPost}
          className="ml-auto bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 cursor-pointer"
        >
          View Post
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Likes" value={likes.toLocaleString()} />
        <StatsCard title="Comments" value={comments.toLocaleString()} />
        <StatsCard title="Shares" value={shares.toLocaleString()} />
        <StatsCard title="Post Type" value={postType} />
        <StatsCard title="Boosted" value={isBoosted ? 'Yes' : 'No'} />
        <StatsCard title="Date" value={date} />
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="border rounded-xl p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-xl font-semibold mt-1">{value || '—'}</p>
  </div>
);

export default BoostStats;
