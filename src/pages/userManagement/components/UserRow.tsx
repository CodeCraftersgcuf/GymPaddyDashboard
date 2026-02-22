import React, { useState } from "react";
import { avatarUrl } from "../../../constants/help";
import ItemAlign from "../../../components/alignments/ItemAlign";
import MoreDropdown from "../../../components/MoreDropdown";
import { AlertOctagon, AlertTriangle, ShieldOff } from "lucide-react";
import BanUserModal from "./BanUserModal";
import { Link } from "react-router-dom";
import { useDeleteUser, useUnbanUser } from "../../../utils/mutations/userMutations";

interface Props {
  displayData: {
    id: number;
    profile_picture?: string | null;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    status: 'online' | 'offline';
    lastLogin: string;
    is_banned?: boolean;
    ban_reason?: string | null;
    banned_until?: string | null;
  };
  selectedIds?: Set<number>;
  onToggle?: (id: number) => void;
}

const UserRow: React.FC<Props> = ({ displayData, selectedIds, onToggle }) => {
  const isSelected = selectedIds?.has(displayData.id) ?? false;
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const deleteUserMutation = useDeleteUser();
  const unbanMutation = useUnbanUser();

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete "${displayData.fullName}"? This action cannot be undone.`)) return;
    deleteUserMutation.mutate(displayData.id.toString(), {
      onSuccess: () => {
        alert(`"${displayData.fullName}" has been deleted successfully.`);
      },
      onError: (err: any) => {
        alert(`Failed to delete user: ${err?.response?.data?.error?.message || err?.message || 'Unknown error'}`);
      },
    });
  };

  const handleUnban = () => {
    if (!window.confirm(`Are you sure you want to unblock "${displayData.fullName}"?`)) return;
    unbanMutation.mutate(displayData.id.toString());
  };

  return (
    <>
      <tr className={`hover:bg-gray-100 transition cursor-pointer ${isSelected ? 'bg-red-50' : ''}`}>
        <td className="p-2 py-4 px-4 w-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle?.(displayData.id)}
            className="cursor-pointer"
          />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="flex items-center gap-1">
              {displayData.fullName}
              {displayData.is_banned && (
                <span className="inline-flex items-center gap-0.5 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                  Blocked
                </span>
              )}
            </span>
          </div>
        </td>
        <td className="p-2 py-4">{displayData.username}</td>
        <td className="p-2 py-4">{displayData.email}</td>
        <td className="p-2 py-4">{displayData.phoneNumber}</td>
        <td className="p-2 py-4">
          <span
            className={`inline-block w-3 h-3 rounded-full ${displayData.status === "online" ? "bg-green-600" : "bg-gray-400"
              }`}
          ></span>
        </td>
        <td className="p-2 py-4">{new Date(displayData.lastLogin).toLocaleString()}</td>
        <td className="p-2 py-4">
          <ItemAlign>
            <Link
              to={displayData.username ? `/user/management/profile/${displayData.username}` : '#'}
              className={`bg-red-500 text-white px-4 py-2 rounded-lg ${!displayData.username ? 'opacity-50 pointer-events-none' : ''}`}
            >Details</Link>
            <MoreDropdown
              menuClass="bg-white min-w-[150px]"
            >
              <div className='flex flex-col gap-2'>
                {displayData.is_banned ? (
                  <button
                    onClick={handleUnban}
                    disabled={unbanMutation.isPending}
                    className='flex gap-2 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer disabled:opacity-50'
                  >
                    <ShieldOff size={20} color='green' />
                    {unbanMutation.isPending ? 'Unblocking...' : 'Unblock User'}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsBanModalOpen(true)}
                    className='flex gap-2 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'
                  >
                    <AlertTriangle size={20} color='black' />
                    Block User
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={deleteUserMutation.isPending}
                  className='flex gap-2 text-red-500 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer disabled:opacity-50'
                >
                  <AlertOctagon size={20} color='red' />
                  {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
                </button>
              </div>
            </MoreDropdown>
          </ItemAlign>
        </td>
      </tr>

      <BanUserModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        userId={displayData.id}
        userName={displayData.fullName}
      />
    </>
  );
};

export default UserRow;
