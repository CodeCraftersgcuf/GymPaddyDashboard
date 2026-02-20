import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Horizontal from '../../../components/alignments/Horizontal';
import UserProfileCan from '../components/UserProfileCan';
import UserFormModal from '../components/AddUserModal';
import ItemAlign from '../../../components/alignments/ItemAlign';
import Dropdown from '../../../components/Dropdown';
import { bulkFilter, UserActiveStatus } from '../../../constants/FiltersData';
import HeaderWrapper from '../components/HeaderWrapper';
import { useGetUserByUsername } from '../../../utils/queries/userQueries';
import LoadingSpinner from '../../../components/LoadingSpinner';

const UserProfile: React.FC = () => {
  const location = useLocation();
  const [activeTab, setactiveTab] = useState('activity')
  const [isEditModal, setisEditModal] = useState(false);
  const { username } = useParams();

  const isValidUsername = !!username && username !== 'undefined' && username !== 'null';

  const { data: user, isLoading, error } = useGetUserByUsername(isValidUsername ? username! : '');
  
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
  } : null;

  const handleEdit = () => {
    setisEditModal(true);
  }

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
          userData={userData}
        />
        <h1 className='text-xl font-semibold'>User Activities</h1>
        <ItemAlign>
          <Dropdown
            options={UserActiveStatus}
            onChange={(v) => console.log(v)}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkFilter}
            onChange={(v) => console.log(v)}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemAlign>

        <div className="rounded-xl bg-white shadow-md shadow-gray-400 p-6 text-center text-gray-500">
          No activity data available for this user.
        </div>

        <UserFormModal
          isOpen={isEditModal}
          onClose={() => setisEditModal(false)}
          onSubmit={(values: any) => console.log("Edit User", values)}
          initialData={userData}
        />
      </Horizontal>
    </HeaderWrapper>
  )
}

export default UserProfile