import React, { useState } from 'react';
import MoreDropdown from '../../../components/MoreDropdown';
import Button from '../../../components/Buttons/Button';
import { AlertOctagonIcon, AlertTriangleIcon } from 'lucide-react';
import Modal from '../../../components/Modal';
import BoostStats from './BoostStats';
import PostView from './PostView';
import { avatarUrl } from '../../../constants/help';

interface Props {
  displayData: any
}
const mockData = {
  postType: "Image",
  post: "Always try to be the best...",
  comments: 52,
  like: 500,
  replies: 26,
  boostStatus: "Yes",
  date: "01/01/25",
  username: "Maleekfrenzy",
  location: "Lagos, Nigeria",
  timeAgo: "20 min ago",
  content: "Always try to the best you can be, strive for the best, put in the work and you will achieve your goals",
  image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
};

const UserPostRow: React.FC<Props> = ({ displayData }) => {
  const [showBoostStats, setShowBoostStats] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const boostStats = {
    amountSpent: "2,500 GP",
    duration: "5 days",
    dateCreated: "01/01/25 - 02:22 AM",
    impressions: 2400,
    clicks: 1200
  };
  const handleViewPost = () => {
    setShowBoostStats(false);
    setShowPost(true);
  };
  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className='p-4'>
          <input type="checkbox" />
        </td>
        <td className="p-2 py-4">
          <div className="flex items-center gap-2">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            {displayData.fullName || mockData.username}
          </div>
        </td>
        {/* <td className='p-4'>{displayData.postType}</td> */}
        <td className='p-4'>{displayData.post}</td>
        <td className='p-4'>{displayData.comments}</td>
        <td className='p-4'>{displayData.like}</td>
        <td className='p-4'>{displayData.replies}</td>
        <td className={displayData.boostStatus === 'Yes' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold' + ' p-4'}>
          {displayData.boostStatus}
        </td>
        <td className='p-4'>{displayData.date}</td>
        <td className='p-4'>
          <div className="flex gap-2 items-center">
            <Button handleFunction={() => setShowBoostStats(true)}>Details</Button>
            <MoreDropdown
              menuClass="min-w-[140px] bg-white"
            >
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
        isOpen={showBoostStats}
        onClose={() => setShowBoostStats(false)}
        title="Boost Stats"
      >
        <BoostStats
          stats={boostStats}
          username={mockData.username}
          location={mockData.location}
          timeAgo={mockData.timeAgo}
          onViewPost={handleViewPost}
        />
      </Modal>

      <Modal
        isOpen={showPost}
        onClose={() => setShowPost(false)}
        title="Post"
      >
        <PostView
          post={{
            username: mockData.username,
            location: mockData.location,
            timeAgo: mockData.timeAgo,
            content: mockData.content,
            likes: mockData.like,
            comments: mockData.comments,
            shares: mockData.replies,
            image: mockData.image
          }}
        />
      </Modal>
    </>
  );
};

export default UserPostRow;
