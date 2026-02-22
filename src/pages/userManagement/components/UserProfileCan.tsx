import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, Eye, ShieldOff } from 'lucide-react';
import MoreDropdown from '../../../components/MoreDropdown';
import BanUserModal from './BanUserModal';
import { storageUrl } from '../../../constants/help';
import { useUnbanUser } from '../../../utils/mutations/userMutations';

interface UserProfileProps {
  userData: {
    id?: number;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    gender: string;
    age: number;
    password: string;
    profilePicture?: string;
    verified: boolean;
    lastLogin: string;
    dateRegistered: string;
    is_banned?: boolean;
    ban_reason?: string | null;
    banned_until?: string | null;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const UserProfileCan: React.FC<UserProfileProps> = ({ userData, onEdit, onDelete }) => {
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const unbanMutation = useUnbanUser();

  const handleDelete = () => {
    onDelete();
  };

  const handleUnban = () => {
    if (!userData?.id) return;
    if (!window.confirm(`Are you sure you want to unblock "${userData.fullName}"?`)) return;
    unbanMutation.mutate(userData.id.toString());
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#990000] to-[#4d0000] text-white rounded-3xl p-6">
        {userData.is_banned && (
          <div className="mb-4 bg-red-800/50 border border-red-400/30 rounded-lg px-4 py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-red-200">This user is currently blocked</span>
              {userData.ban_reason && <span className="text-red-300 ml-2">- {userData.ban_reason}</span>}
              {userData.banned_until && (
                <span className="text-red-300 ml-2">
                  (until {new Date(userData.banned_until).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })})
                </span>
              )}
            </div>
            <button
              onClick={handleUnban}
              disabled={unbanMutation.isPending}
              className="bg-white text-black px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer disabled:opacity-50"
            >
              {unbanMutation.isPending ? 'Unblocking...' : 'Unblock'}
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Profile Card */}
          <div className="flex flex-col items-center justify-center gap-2 col-span-1 lg:col-span-4 bg-[#B31016] h-full rounded-lg p-4 py-8">
            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-white">
              {userData.profilePicture ? (
                <img
                  src={storageUrl(userData.profilePicture) || userData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-black font-bold text-xl">
                  {userData.username?.charAt(0) || '?'}
                </div>
              )}
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-600 border-2 border-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">{userData.username}</p>
              <p className="text-sm opacity-90">{userData.fullName}</p>
            </div>
            <span
              className={`px-4 py-1 rounded-full text-sm mt-2 ${userData.verified ? 'bg-green-600' : 'bg-white/10'}`}
            >
              {userData.verified ? 'Verified' : 'Unverified'}
            </span>

            <div className="flex gap-3 mt-4">
              <button onClick={onEdit} className="bg-white cursor-pointer text-black px-4 py-2 rounded-md hover:bg-gray-200 font-medium text-sm">
                Edit Profile
              </button>
              <button className="bg-white cursor-pointer text-black px-4 py-2 rounded-md hover:bg-gray-200 font-medium text-sm">
                Notifications
              </button>
              <MoreDropdown
                buttonClass='border-white hover:bg-transparent'
                menuClass="bg-white min-w-[150px] text-black"
              >
                <div className='flex flex-col gap-2'>
                  {userData.is_banned ? (
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
                    className='flex gap-2 text-red-500 items-center capitalize font-medium py-4 px-3 w-[150px] hover:bg-black/10 cursor-pointer'
                  >
                    <AlertOctagon size={20} color='red' />
                    Delete User
                  </button>
                </div>
              </MoreDropdown>
            </div>
          </div>

          {/* Right: User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 col-span-1 lg:col-span-8">
            <div>
              <p className="text-sm text-gray-300">Full Name</p>
              <p className="font-semibold">{userData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Gender</p>
              <p className="font-semibold">{userData.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Username</p>
              <p className="font-semibold">{userData.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Age</p>
              <p className="font-semibold">{userData.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Email</p>
              <p className="font-semibold">{userData.email}</p>
            </div>
            <div className="relative">
              <p className="text-sm text-gray-300">Password</p>
              <p className="font-semibold flex items-center gap-2">
                {showPassword ? userData.password : '*************'}
                <Eye
                  size={18}
                  className="cursor-pointer text-white/70"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Phone no</p>
              <p className="font-semibold">{userData.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Date Registered</p>
              <p className="font-semibold">{userData.dateRegistered}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Last Login</p>
              <p className="font-semibold">{userData.lastLogin}</p>
            </div>
          </div>
        </div>
      </div>
      <BanUserModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        userId={userData?.id || 0}
        userName={userData.fullName}
      />
    </>
  );
};

export default UserProfileCan;
