import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import HeaderWrapper from '../../components/HeaderWrapper';
import StatsCard from '../../../../components/StatsCard';
import FilterTab from '../../../../components/FilterTab';
import PostPortion from './Portions/PostPortion';
import StatusPortion from './Portions/StatusPortion';
import LivePortion from './Portions/LivePortion';
import { useGetUserByUsername } from '../../../../utils/queries/userQueries';
import { useGetUserPosts } from '../../../../utils/queries/socialQueries';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import StatsCardSkeleton from '../../../../components/StatsCardSkeleton';
import images from '../../../../constants/images';

const RenderComponent = (activeTab: string, data?: any, isLoading?: boolean, error?: any) => {
  if (isLoading) {
    return <LoadingSpinner className="h-64" />;
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error loading data. Please try again.
      </div>
    );
  }

  switch (activeTab) {
    case 'all':
      return <PostPortion data={data} />;
    case 'status':
      return <StatusPortion data={data} />;
    case 'live':
      return <LivePortion data={data} />;
    default:
      return null;
  }
}

const Social: React.FC = () => {
  const location = useLocation();
  const [activeTab, setactiveTab] = useState('all');
  const { username } = useParams();
  const [activePortion, setActivePortion] = useState('all')
  
  const { data: user, isLoading: userLoading } = useGetUserByUsername(username || '');
  const { data: posts, isLoading: postsLoading, error: postsError } = useGetUserPosts(user?.id?.toString() || '');
  
  const tabs = [
    {
      name: 'all', value: 'all'
    },
    {
      name: 'status', value: 'status'
    },
    {
      name: 'live', value: 'live'
    },
  ]
  
  const hanldeValues = (activeTab: string) => {
    switch (activeTab) {
      case 'all':
        return posts || [];
      case 'status':
        return [];
      case 'live':
        return [];
      default:
        return [];
    }
  }
  
  const getLoadingState = (activeTab: string) => {
    switch (activeTab) {
      case 'all':
        return postsLoading;
      default:
        return false;
    }
  }
  
  const getErrorState = (activeTab: string) => {
    switch (activeTab) {
      case 'all':
        return postsError;
      default:
        return null;
    }
  }
  
  const socialStats = posts ? [
    {
      icon: images.social,
      heading: 'Total',
      subHeading: 'Posts',
      IconColor: '#FF0000',
      value: posts.length || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.social,
      heading: 'Total',
      subHeading: 'Likes',
      IconColor: '#0000FF',
      value: posts.reduce((sum, p) => sum + (p.likes || 0), 0),
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.social,
      heading: 'Total',
      subHeading: 'Comments',
      IconColor: '#008000',
      value: posts.reduce((sum, p) => sum + (p.comments || 0), 0),
      changeStatus: 'up',
      subDetail: []
    },
  ] : []
  return (
    <HeaderWrapper
      location={location}
      user={username}
      activeTab={activeTab}
      setActiveTab={setactiveTab}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {userLoading || postsLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          socialStats.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>
      <h1 className='text-2xl font-medium'>Social Activity</h1>
      <FilterTab
        tabs={tabs}
        handleValue={setActivePortion}
        activeTab={tabs[0].name}
      />
      {RenderComponent(
        activePortion, 
        hanldeValues(activePortion),
        getLoadingState(activePortion),
        getErrorState(activePortion)
      )}
    </HeaderWrapper>
  )
}

export default Social