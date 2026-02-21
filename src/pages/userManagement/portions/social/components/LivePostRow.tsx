import React, { useState } from 'react';
import { AlertOctagonIcon, AlertTriangleIcon } from 'lucide-react';
import MoreDropdown from '../../../../../components/MoreDropdown';
import Modal from '../../../../../components/Modal';
import LiveView from './LiveView';
import LiveStats from './LiveStats';
import { avatarUrl, storageUrl, formatCreatedAt } from '../../../../../constants/help';

interface Props {
  displayData: {
    id?: number | string;
    postType?: string;
    postImage?: string;
    views: number;
    likes: number;
    profile_picture?: string;
    fullName?: string;
    username?: string;
    earned: string;
    status: 'Running' | 'Ended';
    date?: string;
    createdAt?: string;
    title?: string;
  };
}

const LivePostRow: React.FC<Props> = ({ displayData }) => {
  const [showLive, setShowLive] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleViewStats = () => {
    setShowLive(false);
    setShowStats(true);
  };

  const timeAgo = displayData.createdAt
    ? formatCreatedAt(displayData.createdAt)
    : displayData.date || '';

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-4"><input type="checkbox" className="form-checkbox" /></td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {displayData.fullName || displayData.username || 'Unknown'}
          </div>
        </td>
        <td className="p-4">
          {displayData.postImage ? (
            <img src={storageUrl(displayData.postImage) || ''} alt="Live" className="w-20 h-20 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <span className="text-gray-400">No thumbnail</span>
          )}
        </td>
        <td className="p-4">{displayData.views ?? 0}</td>
        <td className="p-4">{displayData.likes ?? 0}</td>
        <td className="p-4">{displayData.earned || '—'}</td>
        <td className="p-4">
          <span className={displayData.status === 'Running' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
            {displayData.status}
          </span>
        </td>
        <td className="p-4">{displayData.date || ''}</td>
        <td className="p-4">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowLive(true)}
              className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600 cursor-pointer"
            >
              Details
            </button>
            <MoreDropdown menuClass="min-w-[140px] bg-white">
              <div className="flex flex-col gap-1 px-1 text-sm text-black">
                <button className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2">
                  <AlertOctagonIcon size={20} color="black" /> End Stream
                </button>
                <button className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2 text-red-600">
                  <AlertTriangleIcon size={20} color="red" /> Delete
                </button>
              </div>
            </MoreDropdown>
          </div>
        </td>
      </tr>

      <Modal isOpen={showLive} onClose={() => setShowLive(false)} title="Live Stream">
        <LiveView
          live={{
            userAvatar: displayData.profile_picture,
            username: displayData.fullName || displayData.username || 'Unknown',
            location: 'Nigeria',
            timeAgo: timeAgo,
            image: displayData.postImage || '',
            title: displayData.title || 'Live Stream',
          }}
          onViewStats={handleViewStats}
        />
      </Modal>

      <Modal isOpen={showStats} onClose={() => setShowStats(false)} title="Live Stats">
        <LiveStats
          userAvatar={displayData.profile_picture}
          username={displayData.fullName || displayData.username || 'Unknown'}
          location="Nigeria"
          timeAgo={timeAgo}
          viewers={displayData.views ?? 0}
          status={displayData.status}
          date={displayData.date || ''}
        />
      </Modal>
    </>
  );
};

export default LivePostRow;
