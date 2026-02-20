import React, { useState } from 'react';
import { avatarUrl } from '../../../constants/help';
import ChatModal from './ChatModal';
import Button from '../../../components/Buttons/Button';

interface User {
  username: string;
  profile_picture?: string | null;
}

export interface SupportTableRow {
  id: string;
  user: User;
  message: string;
  created_at: string;
  status: string;
  type: string;
}

interface Props {
  displayData: SupportTableRow;
}

const SupportRow: React.FC<Props> = ({ displayData }) => {
  const [isChatOpen, setisChatOpen] = useState(false)
  const handleChat = ()=>{
    setisChatOpen(!isChatOpen)
  }
  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-2 py-4 px-4 w-10">
          <input type="checkbox" />
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
        <td className="p-2 py-4">{displayData.message}</td>
        <td className="p-2 py-4 capitalize">{displayData.status}</td>
        <td className="p-2 py-4">
          {new Date(displayData.created_at).toLocaleString()}
        </td>
        <td className="p-2 py-4">
          <Button handleFunction={()=>handleChat()} >Open Chat</Button>
        </td>
      </tr>
      {/* < */}
      <ChatModal isOpen={isChatOpen} onClose={setisChatOpen} />
    </>
  );
};

export default SupportRow;
