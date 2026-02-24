import React, { useState } from 'react';
import { AlertOctagonIcon, AlertTriangleIcon } from 'lucide-react';
import MoreDropdown from '../../../../../components/MoreDropdown';
import Modal from '../../../../../components/Modal';
import StatusView from './StatusView';
import { avatarUrl, storageUrl, formatCreatedAt } from '../../../../../constants/help';
import { useDeleteStatus } from '../../../../../utils/mutations/socialMutations';

interface Props {
  displayData: {
    id?: number | string;
    postType?: string;
    postImage?: string;
    views: number;
    likes: number;
    status: 'Running' | 'Ended';
    date?: string;
    profile_picture?: string;
    fullName?: string;
    username?: string;
    createdAt?: string;
  };
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
}

const StatusPostRow: React.FC<Props> = ({ displayData, selectedIds, onToggle }) => {
  const [showStatus, setShowStatus] = useState(false);
  const isSelected = selectedIds?.has(String(displayData.id)) ?? false;
  const deleteStatus = useDeleteStatus();

  const timeAgo = displayData.createdAt
    ? formatCreatedAt(displayData.createdAt)
    : displayData.date || '';

  const handleHideStatus = () => {
    if (!window.confirm('Are you sure you want to hide this status?')) return;
    deleteStatus.mutate(String(displayData.id));
  };

  const handleDeleteStatus = () => {
    if (!window.confirm('Are you sure you want to delete this status?')) return;
    deleteStatus.mutate(String(displayData.id));
  };

  return (
    <>
      <tr className={`hover:bg-gray-100 transition cursor-pointer relative ${isSelected ? 'bg-red-50' : ''}`}>
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
            {displayData.fullName || displayData.username || 'Unknown'}
          </div>
        </td>
        <td className="p-4">
          {displayData.postImage ? (
            <img src={storageUrl(displayData.postImage) || ''} alt="Status" className="w-20 h-20 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <span className="text-gray-400">No media</span>
          )}
        </td>
        <td className="p-4">{displayData.views ?? 0}</td>
        <td className="p-4">{displayData.likes ?? 0}</td>
        <td className="p-4">
          <span className={displayData.status === 'Running' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
            {displayData.status}
          </span>
        </td>
        <td className="p-4">{displayData.date || ''}</td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStatus(true)}
              className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
            >
              Details
            </button>
            <MoreDropdown menuClass="min-w-[140px] bg-white">
              <div className="flex flex-col gap-1 px-1 text-sm text-black">
                <button
                  onClick={handleHideStatus}
                  disabled={deleteStatus.isPending}
                  className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2 disabled:opacity-50"
                >
                  <AlertOctagonIcon size={20} color="black" /> {deleteStatus.isPending ? 'Hiding...' : 'Hide Status'}
                </button>
                <button
                  onClick={handleDeleteStatus}
                  disabled={deleteStatus.isPending}
                  className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2 text-red-600 disabled:opacity-50"
                >
                  <AlertTriangleIcon size={20} color="red" /> {deleteStatus.isPending ? 'Deleting...' : 'Delete Status'}
                </button>
              </div>
            </MoreDropdown>
          </div>
        </td>
      </tr>

      <Modal isOpen={showStatus} onClose={() => setShowStatus(false)} title="Status">
        <StatusView
          status={{
            userAvatar: displayData.profile_picture,
            username: displayData.fullName || displayData.username || 'Unknown',
            location: 'Nigeria',
            timeAgo: timeAgo,
            image: displayData.postImage || '',
            views: displayData.views ?? 0,
          }}
        />
      </Modal>
    </>
  );
};

export default StatusPostRow;
