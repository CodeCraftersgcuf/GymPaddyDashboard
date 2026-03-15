import React, { useState } from 'react';
import { avatarUrl } from '../../../constants/help';
import ChatModal from './ChatModal';
import Button from '../../../components/Buttons/Button';
import { useUpdateTicket } from '../../../utils/mutations/supportMutations';

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

const TICKET_STATUSES = ['open', 'pending', 'in_progress', 'closed'] as const;

function normalizeStatus(status: string | undefined): string {
  const s = (status || 'open').toLowerCase().replace(/\s+/g, '_');
  if (TICKET_STATUSES.includes(s as any)) return s;
  if (s === 'in_progress' || s === 'inprogress') return 'in_progress';
  return 'open';
}

const SupportRow: React.FC<Props> = ({ displayData, selectedIds, onToggle }) => {
  const isSelected = selectedIds?.has(String(displayData.id)) ?? false;
  const [isChatOpen, setisChatOpen] = useState(false);
  const updateTicket = useUpdateTicket();

  const userId = displayData.user_id ?? displayData.user?.id;
  const currentStatus = normalizeStatus(displayData.status);

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === currentStatus) return;
    updateTicket.mutate({ id: String(displayData.id), data: { status: newStatus } });
  };

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
        <td className="p-2 py-4">
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updateTicket.isPending}
            onClick={(e) => e.stopPropagation()}
            className="capitalize border border-gray-300 rounded px-2 py-1.5 text-sm bg-white min-w-[120px] disabled:opacity-50 cursor-pointer focus:ring-2 focus:ring-red-500/30 focus:border-red-400"
            title="Change ticket status"
          >
            {TICKET_STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
          {updateTicket.isPending && (
            <span className="ml-1 text-xs text-gray-500">Saving...</span>
          )}
        </td>
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
