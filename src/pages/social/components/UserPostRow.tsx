import React, { useState } from 'react';
import MoreDropdown from '../../../components/MoreDropdown';
import Button from '../../../components/Buttons/Button';
import { AlertOctagonIcon, AlertTriangleIcon } from 'lucide-react';
import Modal from '../../../components/Modal';
import BoostStats from './BoostStats';
import PostView from './PostView';
import { avatarUrl, formatCreatedAt } from '../../../constants/help';
import { useDeletePost } from '../../../utils/queries/socialQueries';
import { useHidePost } from '../../../utils/mutations/socialMutations';

interface Props {
  displayData: any;
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
}

const UserPostRow: React.FC<Props> = ({ displayData, selectedIds, onToggle }) => {
  const isSelected = selectedIds?.has(String(displayData.id)) ?? false;
  const [showBoostStats, setShowBoostStats] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const deletePost = useDeletePost();
  const hidePost = useHidePost();

  const timeAgo = displayData.createdAt
    ? formatCreatedAt(displayData.createdAt)
    : displayData.date || '';

  const handleViewPost = () => {
    setShowBoostStats(false);
    setShowPost(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost.mutate(displayData.id);
    }
  };

  return (
    <>
      <tr className={`hover:bg-gray-100 transition cursor-pointer relative ${isSelected ? 'bg-red-50' : displayData.isHidden ? 'bg-gray-50' : ''} ${dropdownOpen ? 'z-[99]' : ''}`}>
        <td className="p-4">
          <input type="checkbox" checked={isSelected} onChange={(e) => { e.stopPropagation(); onToggle?.(String(displayData.id)); }} className="cursor-pointer" />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>
              {displayData.fullName || displayData.username || 'Unknown'}
              {displayData.isHidden && (
                <span className="ml-2 inline-block text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-medium">Hidden</span>
              )}
            </span>
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
        <td className={`p-4 ${dropdownOpen ? 'relative z-[99]' : ''}`}>
          <div className="flex gap-2 items-center">
            <Button handleFunction={() => setShowBoostStats(true)}>Details</Button>
            <MoreDropdown menuClass="min-w-[140px] bg-white" onOpenChange={setDropdownOpen}>
              <div className="flex flex-col gap-1 px-1 text-sm text-black">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!hidePost.isPending) hidePost.mutate(displayData.id);
                  }}
                  disabled={hidePost.isPending}
                  className="py-2 px-2 hover:underline cursor-pointer text-left flex items-center gap-2 disabled:opacity-50 py-4"
                >
                  <AlertOctagonIcon size={20} color="black" />
                  {hidePost.isPending
                    ? (displayData.isHidden ? 'Unhiding...' : 'Hiding...')
                    : (displayData.isHidden ? 'Unhide Post' : 'Hide Post')}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deletePost.isPending}
                  className="py-2 px-2 hover:underline cursor-pointer text-left flex items-center gap-2 text-red-600 disabled:opacity-50 py-4"
                >
                  <AlertTriangleIcon size={20} color="red" />
                  {deletePost.isPending ? 'Deleting...' : 'Delete Post'}
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
