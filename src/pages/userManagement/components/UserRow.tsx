import React, { useState } from "react";
import { avatarUrl } from "../../../constants/help";
import ItemAlign from "../../../components/alignments/ItemAlign";
import MoreDropdown from "../../../components/MoreDropdown";
import { AlertOctagon, AlertTriangle } from "lucide-react";
import BanUserModal from "./BanUserModal";
import { Link } from "react-router-dom";

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
  };
}

const UserRow: React.FC<Props> = ({ displayData }) => {
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer">
        <td className="p-2 py-4 px-4 w-10">
          <input type="checkbox" />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            {displayData.fullName}
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
                <button onClick={() => setIsBanModalOpen(true)} className='flex gap-2 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'>
                  <AlertTriangle size={20} color='black' />
                  Block User
                </button>
                <button className='flex gap-2 text-red-500 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'>
                  <AlertOctagon size={20} color='red' />
                  Delete User
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
        onSubmit={(data) => console.log('Banning user:', data)}
      />

    </>
  );
};

export default UserRow;
