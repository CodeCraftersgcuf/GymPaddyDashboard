import React, { useState } from 'react';
import { avatarUrl } from '../../../constants/help';
import ChatModal from './ChatModal';
import Button from '../../../components/Buttons/Button';

interface User {
  id?: number;
  username: string;
  profile_picture?: string | null;
}

export interface SupportTableRow {
  id: string;
  user_id?: number;
  user: User;
  message: string;
  admin_reply?: string | null;
  created_at: string;
  status: string;
  type: string;
  subject?: string;
}

interface Props {
  displayData: SupportTableRow;
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
}

const SupportRow: React.FC<Props> = ({ displayData, selectedIds, onToggle }) => {
  const isSelected = selectedIds?.has(String(displayData.id)) ?? false;
  const [isChatOpen, setisChatOpen] = useState(false);

  const userId = displayData.user_id ?? displayData.user?.id;

  const handleChat = () => {
    setisChatOpen(!isChatOpen);
  };

  return (
    <>
      <tr className={`hover:bg-gray-100 transition cursor-pointer relative ${isSelected ? 'bg-red-50' : ''}`}>
        <td className="p-2 py-4 px-4 w-10">
          <input type="checkbox" checked={isSelected} onChange={(e) => { e.stopPropagation(); onToggle?.(String(displayData.id)); }} className="cursor-pointer" />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.user.profile_picture, displayData.user.username)}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            {displayData.user.username}
          </div>
        </td>
        <td className="p-2 py-4">{displayData.subject || 'General'}</td>
        <td className="p-2 py-4 max-w-[200px] truncate">{displayData.message}</td>
        <td className="p-2 py-4 capitalize">{displayData.status}</td>
        <td className="p-2 py-4">
          {new Date(displayData.created_at).toLocaleString()}
        </td>
        <td className="p-2 py-4">
          <Button handleFunction={() => handleChat()}>Open Chat</Button>
        </td>
      </tr>
      <ChatModal
        userId={userId ? Number(userId) : undefined}
        isOpen={isChatOpen}
        onClose={setisChatOpen}
        userName={displayData.user?.username || 'User'}
        userProfilePic={displayData.user?.profile_picture ?? undefined}
      />
    </>
  );
};

export default SupportRow;
