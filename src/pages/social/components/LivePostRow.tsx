import React, { useState } from 'react';
import { AlertOctagonIcon, AlertTriangleIcon } from 'lucide-react';
import MoreDropdown from '../../../components/MoreDropdown';
import Modal from '../../../components/Modal';
import LiveView from './LiveView';
import LiveStats from './LiveStats';
import AudienceList from './AudienceList';
import { avatarUrl } from '../../../constants/help';

interface Props {
  displayData: {
    postType: string;
    postImage: string;
    views: number;
    likes: number;
    profile_picture?:string;
    fullName?:string;
    earned: string;
    status: 'Running' | 'Ended';
    date: string;
  };
}

const LivePostRow: React.FC<Props> = ({ displayData }) => {
  const [showLive, setShowLive] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAudience, setShowAudience] = useState(false);

  const handleViewStats = () => {
    setShowLive(false);
    setShowStats(true);
  };

  const handleViewAudience = () => {
    setShowStats(false);
    setShowAudience(true);
  };

  const mockStats = {
    audience: 2500,
    duration: "3 hours",
    amountEarned: "34,000 GP",
    charge: {
      amount: "2,300 GP",
      rate: "3 GP/min"
    },
    mostActiveGifter: {
      name: "Adewale",
      amount: "34,000 GP"
    },
    timeStarted: "01/01/25 - 07:22 AM",
    liveTimer: "01:35:45"
  };

  const mockAudience = Array(10).fill({
    name: "Sasha 123",
    gifts: 5,
    amount: "3,000 GP",
    duration: "00:35 min"
  });

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-4">
          <input type="checkbox" className="form-checkbox" />
        </td>
        {/* <td className="p-4">{displayData.postType}</td> */}
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            {displayData.fullName || 'user'}
          </div>
        </td>
        <td className="p-4">
          <img
            src={displayData.postImage}
            alt="Live Post"
            className="w-20 h-20 object-cover rounded-lg"
          />
        </td>
        <td className="p-4">{displayData.views}</td>
        <td className="p-4">{displayData.likes}</td>
        <td className="p-4">{displayData.earned}</td>
        <td className="p-4">
          <span className="text-green-600 font-semibold">{displayData.status}</span>
        </td>
        <td className="p-4">{displayData.date}</td>
        <td className="p-4">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowLive(true)}
              className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600"
            >
              Details
            </button>
            <MoreDropdown menuClass="min-w-[140px] bg-white">
              <div className="flex flex-col gap-1 px-1 text-sm text-black">
                <button className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2">
                  <AlertOctagonIcon size={20} color='black' /> Hide Post
                </button>
                <button className="py-2 px-2 hover:underline cursor-pointer py-4 text-left flex items-center gap-2 text-red-600">
                  <AlertTriangleIcon size={20} color='red' /> Delete Post
                </button>
              </div>
            </MoreDropdown>
          </div>
        </td>
      </tr>

      <Modal
        isOpen={showLive}
        onClose={() => setShowLive(false)}
        title="Live"
      >
        <LiveView
          live={{
            username: "Maleekfrenzy",
            location: "Lagos, Nigeria",
            timeAgo: "20 min ago",
            image: displayData.postImage
          }}
          onViewStats={handleViewStats}
        />
      </Modal>

      <Modal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        title="Live Stats"
      >
        <LiveStats
          stats={mockStats}
          onViewAudience={handleViewAudience}
        />
      </Modal>

      <Modal
        isOpen={showAudience}
        onClose={() => setShowAudience(false)}
        title="Audience List"
      >
        <AudienceList audience={mockAudience} />
      </Modal>
    </>
  );
};

export default LivePostRow;