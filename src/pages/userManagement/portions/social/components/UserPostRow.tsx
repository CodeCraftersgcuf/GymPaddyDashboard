import React, { useState } from 'react';
import MoreDropdown from '../../../../../components/MoreDropdown';
import Button from '../../../../../components/Buttons/Button';
import { AlertOctagonIcon, AlertTriangleIcon } from 'lucide-react';
import Modal from '../../../../../components/Modal';
import BoostStats from './BoostStats';
import PostView from './PostView';
import { avatarUrl, formatCreatedAt } from '../../../../../constants/help';

interface Props {
  displayData: any;
}

const UserPostRow: React.FC<Props> = ({ displayData }) => {
  const [showBoostStats, setShowBoostStats] = useState(false);
  const [showPost, setShowPost] = useState(false);

  const timeAgo = displayData.createdAt
    ? formatCreatedAt(displayData.createdAt)
    : displayData.date || '';

  const handleViewPost = () => {
    setShowBoostStats(false);
    setShowPost(true);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-4"><input type="checkbox" /></td>
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
        <td className="p-4 max-w-[200px] truncate">{displayData.post || displayData.content || '—'}</td>
        <td className="p-4">{displayData.comments ?? 0}</td>
        <td className="p-4">{displayData.like ?? displayData.likes ?? 0}</td>
        <td className="p-4">{displayData.replies ?? displayData.shares ?? 0}</td>
        <td className={`p-4 font-semibold ${displayData.boostStatus === 'Yes' ? 'text-green-600' : 'text-red-500'}`}>
          {displayData.boostStatus || 'No'}
        </td>
        <td className="p-4">{displayData.date || ''}</td>
        <td className="p-4">
          <div className="flex gap-2 items-center">
            <Button handleFunction={() => setShowBoostStats(true)}>Details</Button>
            <MoreDropdown menuClass="min-w-[140px] bg-white">
              <div className="flex flex-col gap-1 px-1 text-sm text-black">
                <button className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2">
                  <AlertOctagonIcon size={20} color="black" /> Hide Post
                </button>
                <button className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2 text-red-600">
                  <AlertTriangleIcon size={20} color="red" /> Delete Post
                </button>
              </div>
            </MoreDropdown>
          </div>
        </td>
      </tr>

      <Modal isOpen={showBoostStats} onClose={() => setShowBoostStats(false)} title="Post Details">
        <BoostStats
          userAvatar={displayData.profile_picture}
          username={displayData.fullName || displayData.username || 'Unknown'}
          location="Nigeria"
          timeAgo={timeAgo}
          likes={displayData.like ?? displayData.likes ?? 0}
          comments={displayData.comments ?? 0}
          shares={displayData.replies ?? displayData.shares ?? 0}
          isBoosted={displayData.boostStatus === 'Yes'}
          postType={displayData.postType || 'Text'}
          date={displayData.date || ''}
          onViewPost={handleViewPost}
        />
      </Modal>

      <Modal isOpen={showPost} onClose={() => setShowPost(false)} title="Post">
        <PostView
          post={{
            userAvatar: displayData.profile_picture,
            username: displayData.fullName || displayData.username || 'Unknown',
            location: 'Nigeria',
            timeAgo: timeAgo,
            content: displayData.post || displayData.content || '',
            likes: displayData.like ?? displayData.likes ?? 0,
            comments: displayData.comments ?? 0,
            shares: displayData.replies ?? displayData.shares ?? 0,
            image: displayData.mediaUrl || (displayData.images?.[0] ?? null),
            isBoosted: displayData.boostStatus === 'Yes',
          }}
        />
      </Modal>
    </>
  );
};

export default UserPostRow;
