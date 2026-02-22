import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query';
import Horizontal from '../../../components/alignments/Horizontal';
import UserProfileCan from '../components/UserProfileCan';
import UserFormModal from '../components/AddUserModal';
import FilterTab from '../../../components/FilterTab';
import HeaderWrapper from '../components/HeaderWrapper';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useGetUserByUsername } from '../../../utils/queries/userQueries';
import { useUpdateUser, useDeleteUser } from '../../../utils/mutations/userMutations';
import { useGetUserPosts, useGetUserStatuses, useGetUserLiveStreams } from '../../../utils/queries/socialQueries';
import PostPortion from './social/Portions/PostPortion';
import StatusPortion from './social/Portions/StatusPortion';
import LivePortion from './social/Portions/LivePortion';

const activityTabs = [
  { name: 'posts', value: 'posts' },
  { name: 'statuses', value: 'statuses' },
  { name: 'live', value: 'live' },
];

const UserProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setactiveTab] = useState('activity');
  const [activityTab, setActivityTab] = useState('posts');
  const [isEditModal, setisEditModal] = useState(false);
  const { username } = useParams();

  const isValidUsername = !!username && username !== 'undefined' && username !== 'null';

  const { data: user, isLoading, error } = useGetUserByUsername(isValidUsername ? username! : '');
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const userId = user?.id?.toString() || '';
  const { data: posts, isLoading: postsLoading } = useGetUserPosts(userId);
  const { data: statuses, isLoading: statusesLoading } = useGetUserStatuses(userId);
  const { data: liveStreams, isLoading: liveLoading } = useGetUserLiveStreams(userId);

  const userData = user ? {
    id: user.id,
    fullName: user.fullName || 'N/A',
    username: user.username || username || 'N/A',
    email: user.email || 'N/A',
    phoneNumber: user.phoneNumber || 'N/A',
    gender: user.gender || 'N/A',
    age: user.age || 0,
    password: '************',
    profilePicture: user.profile_picture || null,
    verified: false,
    lastLogin: user.lastLogin || 'N/A',
    dateRegistered: (user as any).dateRegistered || user.lastLogin || 'N/A',
    is_banned: (user as any).is_banned || false,
    ban_reason: (user as any).ban_reason || null,
    banned_until: (user as any).banned_until || null,
  } : null;

  const handleEdit = () => {
    setisEditModal(true);
  };

  const handleDelete = async () => {
    if (!userData?.id) return;
    if (!window.confirm(`Are you sure you want to delete "${userData.fullName}"? This action cannot be undone.`)) return;
    try {
      await deleteUserMutation.mutateAsync(userData.id.toString());
      navigate('/user/management');
    } catch (err: any) {
      alert(`Failed to delete user: ${err?.response?.data?.error?.message || err?.message || 'Unknown error'}`);
    }
  };

  const handleUpdateSubmit = async (values: any) => {
    if (!userData?.id) return;
    const result = await updateUserMutation.mutateAsync({
      id: userData.id.toString(),
      data: {
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        age: values.age,
      },
    });
    setisEditModal(false);

    const confirmedUsername = result?.username;
    if (confirmedUsername && confirmedUsername !== username) {
      queryClient.removeQueries({ queryKey: ['user', 'username', username] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate(`/user/management/profile/${encodeURIComponent(confirmedUsername)}`, { replace: true });
    } else {
      queryClient.invalidateQueries({ queryKey: ['user', 'username', username] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  };

  const renderActivityContent = () => {
    switch (activityTab) {
      case 'posts':
        if (postsLoading) return <LoadingSpinner className="h-40" />;
        return <PostPortion data={posts || []} />;
      case 'statuses':
        if (statusesLoading) return <LoadingSpinner className="h-40" />;
        return <StatusPortion data={statuses || []} />;
      case 'live':
        if (liveLoading) return <LoadingSpinner className="h-40" />;
        return <LivePortion data={liveStreams || []} />;
      default:
        return null;
    }
  };

  if (!isValidUsername) {
    return (
      <HeaderWrapper
        location={location}
        user={username}
        activeTab={activeTab}
        setActiveTab={setactiveTab}
      >
        <div className="p-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg">
          No user selected. Please go back and click <strong>Details</strong> on a user.
        </div>
      </HeaderWrapper>
    );
  }

  if (isLoading) {
    return (
      <HeaderWrapper
        location={location}
        user={username}
        activeTab={activeTab}
        setActiveTab={setactiveTab}
      >
        <LoadingSpinner className="h-64" />
      </HeaderWrapper>
    );
  }

  if (error || !userData) {
    return (
      <HeaderWrapper
        location={location}
        user={username}
        activeTab={activeTab}
        setActiveTab={setactiveTab}
      >
        <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg">
          User not found. The user <strong>@{username}</strong> does not exist.
        </div>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper
      location={location}
      user={username}
      activeTab={activeTab}
      setActiveTab={setactiveTab}
    >
      <Horizontal>
        <UserProfileCan
          onEdit={handleEdit}
          onDelete={handleDelete}
          userData={userData}
        />

        <h1 className='text-xl font-semibold'>User Activities</h1>

        <FilterTab
          tabs={activityTabs}
          handleValue={(val) => setActivityTab(val)}
          activeTab={activityTab}
        />

        {renderActivityContent()}

        <UserFormModal
          isOpen={isEditModal}
          onClose={() => setisEditModal(false)}
          onSubmit={handleUpdateSubmit}
          initialData={userData}
        />
      </Horizontal>
    </HeaderWrapper>
  );
};

export default UserProfile;
