import React, { useMemo, useRef, useEffect, useState } from 'react'
import Modal from '../../../components/Modal'
import { useGetAllTickets } from '../../../utils/queries/supportQueries';
import { useReplyToTicket } from '../../../utils/mutations/supportMutations';
import { avatarUrl } from '../../../constants/help';
import { Send } from 'lucide-react';

interface Props {
  userId?: number;
  isOpen: boolean;
  onClose: (button: boolean) => void;
  userName?: string;
  userProfilePic?: string;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  ticketId: string;
}

const statusColor = (status: string) => {
  if (status === 'open') return 'text-green-600 bg-green-50';
  if (status === 'pending') return 'text-yellow-600 bg-yellow-50';
  if (status === 'closed') return 'text-gray-500 bg-gray-100';
  return 'text-blue-600 bg-blue-50';
};

const ChatModal: React.FC<Props> = ({ isOpen, onClose, userId, userName, userProfilePic }) => {
  const [replyText, setReplyText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: allTickets, isLoading } = useGetAllTickets({ enabled: isOpen });
  const replyMutation = useReplyToTicket();

  // Collect all tickets belonging to this user, sorted oldest → newest
  const userTickets = useMemo(() => {
    if (!allTickets || !userId) return [];
    return [...allTickets]
      .filter((t) => {
        const ticketUserId = (t as any).user_id ?? (t.user as any)?.id;
        return Number(ticketUserId) === Number(userId);
      })
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }, [allTickets, userId]);

  // Build chat messages: split concatenated user messages, interleave admin replies
  const chatMessages = useMemo((): ChatMessage[] => {
    const msgs: ChatMessage[] = [];
    userTickets.forEach((ticket) => {
      const rawMessage = (ticket as any).message || (ticket as any).description || '';
      const createdAt = new Date(ticket.created_at).getTime();

      // Messages may be merged with \n — split each back into individual bubbles
      const lines = rawMessage.split('\n').filter((l: string) => l.trim());
      (lines.length ? lines : [rawMessage]).forEach((line: string, idx: number) => {
        if (!line.trim()) return;
        msgs.push({
          id: `user_${ticket.id}_${idx}`,
          text: line.trim(),
          isUser: true,
          timestamp: new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ticketId: ticket.id,
        });
      });

      if (ticket.admin_reply?.trim()) {
        // Admin replies are stored as newline-separated history; render each line as its own bubble
        const adminLines = ticket.admin_reply
          .split('\n')
          .map((l: string) => l.trim())
          .filter((l: string) => l.length > 0);

        adminLines.forEach((line: string, idx: number) => {
          msgs.push({
            id: `admin_${ticket.id}_${idx}`,
            text: line,
            isUser: false,
            timestamp: new Date(ticket.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            ticketId: ticket.id,
          });
        });
      }
    });
    return msgs;
  }, [userTickets]);

  // The most recent open/in-progress ticket to reply to
  const latestOpenTicket = useMemo(
    () =>
      [...userTickets]
        .reverse()
        .find((t) => t.status === 'open' || t.status === 'in_progress' || t.status === 'pending'),
    [userTickets]
  );

  const latestTicket = userTickets[userTickets.length - 1];

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [chatMessages, isOpen]);

  const handleSendReply = async () => {
    if (!latestOpenTicket || !replyText.trim() || replyMutation.isPending) return;
    await replyMutation.mutateAsync({ id: latestOpenTicket.id, reply: replyText.trim() });
    setReplyText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  return (
    <Modal title={`Chat with ${userName || 'User'}`} isOpen={isOpen} onClose={() => onClose(false)}>
      <div className="flex flex-col" style={{ height: '62vh' }}>

        {/* User info bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <img
            src={avatarUrl(userProfilePic, userName || 'U')}
            alt=""
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{userName || 'User'}</p>
            {latestTicket && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 truncate">{latestTicket.subject}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColor(latestTicket.status)}`}
                >
                  {latestTicket.status}
                </span>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {userTickets.length} msg{userTickets.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-white">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-gray-400">Loading conversation…</p>
            </div>
          ) : chatMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-gray-400">No messages yet</p>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.isUser ? 'justify-start' : 'justify-end'}`}
              >
                {/* User avatar (left) */}
                {msg.isUser && (
                  <img
                    src={avatarUrl(userProfilePic, userName || 'U')}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                )}

                <div className={`flex flex-col ${msg.isUser ? 'items-start' : 'items-end'} max-w-[72%]`}>
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-snug break-words ${
                      msg.isUser
                        ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                        : 'bg-red-600 text-white rounded-tr-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[11px] text-gray-400 mt-0.5 px-1">{msg.timestamp}</span>
                </div>

                {/* Admin avatar (right) */}
                {!msg.isUser && (
                  <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-[11px] font-bold text-red-600 flex-shrink-0">
                    A
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Reply input */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          {latestOpenTicket ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a reply…"
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
              />
              <button
                onClick={handleSendReply}
                disabled={!replyText.trim() || replyMutation.isPending}
                className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white disabled:opacity-50 flex-shrink-0 hover:bg-red-700 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-sm text-center text-gray-400 py-1">
              {userTickets.length > 0
                ? 'This conversation is closed.'
                : 'No active support tickets.'}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
