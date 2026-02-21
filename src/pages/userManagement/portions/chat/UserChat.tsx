import React, { useState } from "react";
import HeaderWrapper from "../../components/HeaderWrapper";
import { useLocation, useParams } from "react-router-dom";
import Horizontal from "../../../../components/alignments/Horizontal";
import { useGetUserByUsername, useGetUserChats } from "../../../../utils/queries/userQueries";
import { avatarUrl } from "../../../../constants/help";
import { Loader2, MessageCircle } from "lucide-react";

const UserChat: React.FC = () => {
  const location = useLocation();
  const [activeTab, setactiveTab] = useState('all');
  const { username } = useParams();

  const { data: user, isLoading: userLoading } = useGetUserByUsername(username || '');
  const userId = user?.id?.toString() || '';
  const { data: chats, isLoading: chatsLoading } = useGetUserChats(userId);

  const isLoading = userLoading || chatsLoading;

  return (
    <HeaderWrapper
      location={location}
      user={username}
      activeTab={activeTab}
      setActiveTab={setactiveTab}
    >
      <Horizontal>
        <h1 className="text-2xl font-medium">Chat History</h1>
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          </div>
        ) : !chats || chats.length === 0 ? (
          <div className="rounded-xl bg-white shadow-md shadow-gray-400 p-8 text-center text-gray-500">
            No chat history available for this user.
          </div>
        ) : (
          <div className="rounded-xl bg-white shadow-md shadow-gray-400 overflow-hidden">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <img
                  src={avatarUrl(chat.otherUserAvatar, chat.otherUserName)}
                  alt={chat.otherUserName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.otherUserName}
                    </h3>
                    <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{chat.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">
                    {chat.lastMessage || 'No messages yet'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle size={16} />
                  <span className="text-xs">{chat.messageCount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Horizontal>
    </HeaderWrapper>
  );
};

export default UserChat;
