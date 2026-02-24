import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import HeaderWrapper from '../../components/HeaderWrapper';
import StatsCard from '../../../../components/StatsCard';
import FilterTab from '../../../../components/FilterTab';
import PostPortion from './Portions/PostPortion';
import StatusPortion from './Portions/StatusPortion';
import LivePortion from './Portions/LivePortion';
import { useGetUserByUsername } from '../../../../utils/queries/userQueries';
import { useGetUserPosts, useGetUserStatuses, useGetUserLiveStreams } from '../../../../utils/queries/socialQueries';
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
  const userId = user?.id?.toString() || '';
  const { data: posts, isLoading: postsLoading, error: postsError } = useGetUserPosts(userId);
  const { data: statuses, isLoading: statusesLoading, error: statusesError } = useGetUserStatuses(userId);
  const { data: liveStreams, isLoading: liveLoading, error: liveError } = useGetUserLiveStreams(userId);
  
  const tabs = [
    { name: 'all', value: 'all' },
    { name: 'status', value: 'status' },
    { name: 'live', value: 'live' },
  ]
  
  const handleValues = (tab: string) => {
    switch (tab) {
      case 'all':
        return posts || [];
      case 'status':
        return statuses || [];
      case 'live':
        return liveStreams || [];
      default:
        return [];
    }
  }
  
  const getLoadingState = (tab: string) => {
    switch (tab) {
      case 'all': return postsLoading;
      case 'status': return statusesLoading;
      case 'live': return liveLoading;
      default: return false;
    }
  }
  
  const getErrorState = (tab: string) => {
    switch (tab) {
      case 'all': return postsError;
      case 'status': return statusesError;
      case 'live': return liveError;
      default: return null;
    }
  }

  const totalPosts = posts?.length || 0;
  const totalStatuses = statuses?.length || 0;
  const totalLives = liveStreams?.length || 0;
  
  const socialStats = [
    {
      icon: images.social,
      heading: 'Total',
      subHeading: 'Posts',
      IconColor: '#FF0000',
      value: totalPosts,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.social,
      heading: 'Total',
      subHeading: 'Statuses',
      IconColor: '#0000FF',
      value: totalStatuses,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.social,
      heading: 'Live',
      subHeading: 'Streams',
      IconColor: '#008000',
      value: totalLives,
      changeStatus: 'up',
      subDetail: []
    },
  ];

  const isStatsLoading = userLoading || postsLoading || statusesLoading || liveLoading;

  return (
    <HeaderWrapper
      location={location}
      user={username}
      activeTab={activeTab}
      setActiveTab={setactiveTab}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {isStatsLoading ? (
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
        activeTab={activePortion}
      />
      {RenderComponent(
        activePortion, 
        handleValues(activePortion),
        getLoadingState(activePortion),
        getErrorState(activePortion)
      )}
    </HeaderWrapper>
  )
}

export default Social