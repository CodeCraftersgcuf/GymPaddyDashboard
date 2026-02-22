import React, { useState, useEffect, useRef } from "react";
import HeaderWrapper from "../../components/HeaderWrapper";
import { useLocation, useParams } from "react-router-dom";
import Horizontal from "../../../../components/alignments/Horizontal";
import {
  useGetUserByUsername,
  useGetUserChats,
  useGetConversationMessages,
  useGetTicketDetails,
  type UserChat as UserChatType,
} from "../../../../utils/queries/userQueries";
import { avatarUrl, storageUrl } from "../../../../constants/help";
import { Loader2, MessageCircle, Headphones, ArrowLeft, Send } from "lucide-react";

const UserChat: React.FC = () => {
  const location = useLocation();
  const [activeTab, setactiveTab] = useState("all");
  const { username } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: user, isLoading: userLoading } = useGetUserByUsername(username || "");
  const userId = user?.id?.toString() || "";
  const { data: chats, isLoading: chatsLoading } = useGetUserChats(userId);

  const [selectedChat, setSelectedChat] = useState<UserChatType | null>(null);

  const isConversation = selectedChat?.type !== "support";
  const conversationId = isConversation ? String(selectedChat?.id || "") : "";
  const ticketId = !isConversation && selectedChat
    ? String(selectedChat.id).replace("ticket_", "")
    : "";

  const { data: conversationDetail, isLoading: messagesLoading } =
    useGetConversationMessages(conversationId);
  const { data: ticketDetail, isLoading: ticketLoading } =
    useGetTicketDetails(ticketId);

  const isLoading = userLoading || chatsLoading;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationDetail, ticketDetail]);

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
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] min-h-[500px]">
              {/* Left: Conversation List */}
              <div className={`border-r border-gray-200 overflow-y-auto max-h-[600px] ${selectedChat ? 'hidden lg:block' : ''}`}>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                      selectedChat?.id === chat.id ? "bg-red-50 border-l-4 border-l-red-500" : ""
                    }`}
                  >
                    <img
                      src={avatarUrl(chat.otherUserAvatar, chat.otherUserName)}
                      alt={chat.otherUserName}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate text-sm">
                          {chat.otherUserName}
                        </h3>
                        <span className="text-[11px] text-gray-400 ml-2 whitespace-nowrap">
                          {chat.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {chat.lastMessage || "No messages yet"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                      {chat.type === "support" ? (
                        <span className="flex items-center gap-1 text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
                          <Headphones size={10} /> Support
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MessageCircle size={14} />
                          {chat.messageCount}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Message Detail */}
              <div className={`flex flex-col ${!selectedChat ? 'hidden lg:flex' : ''}`}>
                {!selectedChat ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Select a conversation to view messages</p>
                    </div>
                  </div>
                ) : isConversation ? (
                  <ConversationView
                    chat={selectedChat}
                    detail={conversationDetail}
                    isLoading={messagesLoading}
                    userId={Number(userId)}
                    onBack={() => setSelectedChat(null)}
                    messagesEndRef={messagesEndRef}
                  />
                ) : (
                  <TicketView
                    chat={selectedChat}
                    detail={ticketDetail}
                    isLoading={ticketLoading}
                    onBack={() => setSelectedChat(null)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Horizontal>
    </HeaderWrapper>
  );
};

interface ConversationViewProps {
  chat: UserChatType;
  detail: any;
  isLoading: boolean;
  userId: number;
  onBack: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  chat,
  detail,
  isLoading,
  userId,
  onBack,
  messagesEndRef,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50">
        <button onClick={onBack} className="lg:hidden p-1 hover:bg-gray-200 rounded cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <img
          src={avatarUrl(chat.otherUserAvatar, chat.otherUserName)}
          alt={chat.otherUserName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{chat.otherUserName}</h3>
          <p className="text-xs text-gray-500">@{chat.otherUsername}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[450px] bg-gray-50/50">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-red-500" />
          </div>
        ) : !detail?.messages || detail.messages.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No messages in this conversation.</div>
        ) : (
          <>
            {detail.messages.map((msg: any, idx: number) => {
              const isSentByUser = msg.senderId === userId;
              const showDate =
                idx === 0 || detail.messages[idx - 1]?.date !== msg.date;

              return (
                <React.Fragment key={msg.id}>
                  {showDate && (
                    <div className="text-center my-3">
                      <span className="text-[11px] text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
                        {msg.date}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${isSentByUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                        isSentByUser
                          ? "bg-red-500 text-white rounded-br-sm"
                          : "bg-white text-gray-900 shadow-sm rounded-bl-sm"
                      }`}
                    >
                      {!isSentByUser && (
                        <p className="text-[11px] font-medium text-red-500 mb-0.5">{msg.senderName}</p>
                      )}
                      {msg.image && (
                        <img
                          src={storageUrl(msg.image) || msg.image}
                          alt="attachment"
                          className="max-w-full max-h-48 rounded-lg mb-1"
                        />
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          isSentByUser ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Read-only footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-100">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 opacity-60">
          <span className="text-sm text-gray-400 flex-1">Admin view only — messages are read-only</span>
          <Send size={18} className="text-gray-300" />
        </div>
      </div>
    </div>
  );
};

interface TicketViewProps {
  chat: UserChatType;
  detail: any;
  isLoading: boolean;
  onBack: () => void;
}

const TicketView: React.FC<TicketViewProps> = ({ chat, detail, isLoading, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-yellow-50">
        <button onClick={onBack} className="lg:hidden p-1 hover:bg-gray-200 rounded cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <Headphones className="w-8 h-8 text-yellow-600" />
        <div>
          <h3 className="font-semibold text-gray-900">Support Ticket</h3>
          <p className="text-xs text-gray-500">{chat.subject || "Support request"}</p>
        </div>
        {detail?.status && (
          <span
            className={`ml-auto text-xs px-2.5 py-1 rounded-full font-medium ${
              detail.status === "open"
                ? "bg-green-100 text-green-700"
                : detail.status === "closed"
                ? "bg-gray-100 text-gray-600"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {detail.status}
          </span>
        )}
      </div>

      {/* Ticket Content */}
      <div className="flex-1 overflow-y-auto p-6 max-h-[450px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-red-500" />
          </div>
        ) : !detail ? (
          <div className="text-center text-gray-400 py-12">
            <p className="font-medium mb-1">{chat.subject || "Support Ticket"}</p>
            <p className="text-sm">{chat.lastMessage}</p>
            <p className="text-xs text-gray-300 mt-2">{chat.date}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={avatarUrl(detail.user?.avatar, detail.user?.name)}
                  alt={detail.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{detail.user?.name}</p>
                  <p className="text-xs text-gray-500">
                    {detail.date} at {detail.time}
                  </p>
                </div>
              </div>
              {detail.subject && (
                <h4 className="font-semibold text-gray-900 mb-2">{detail.subject}</h4>
              )}
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {detail.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChat;
