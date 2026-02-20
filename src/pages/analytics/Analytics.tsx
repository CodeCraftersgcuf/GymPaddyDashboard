import React, { useState } from 'react'
import Horizontal from '../../components/alignments/Horizontal'
import FilterTab from '../../components/FilterTab'
import { analyticsTab, dates } from '../../constants/FiltersData'
import Dropdown from '../../components/Dropdown'
import AllPortion from './Portion/AllPortion'
import UserPortion from './Portion/UserPortion'
import RevenuePortion from './Portion/RevenuePortion'
import AdsPortions from './Portion/AdsPortions'
import LoadingSpinner from '../../components/LoadingSpinner'
import { 
  useGetOverallAnalytics, 
  useGetUserAnalytics, 
  useGetRevenueAnalytics, 
  useGetAdsAnalytics 
} from '../../utils/queries/analyticsQueries'

const RenderComponent = (activeTab: string, data?: any, isLoading?: boolean, error?: any) => {
  if (isLoading) {
    return <LoadingSpinner className="h-64" />;
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error loading analytics data. Please try again.
      </div>
    );
  }

  switch (activeTab) {
    case 'all':
      return <AllPortion data={data} />;
    case 'UsersPortion':
      return <UserPortion data={data} />;
    case 'RevenuePortion':
      return <RevenuePortion data={data} />;
    case 'AdsPortion':
      return <AdsPortions data={data} />;
    default:
      return null;
  }
}

const Analytics: React.FC = () => {
  const [activeTab, setactiveTab] = useState('all');
  
  const { data: overallData, isLoading: overallLoading, error: overallError } = useGetOverallAnalytics();
  const { data: userData, isLoading: userLoading, error: userError } = useGetUserAnalytics();
  const { data: revenueData, isLoading: revenueLoading, error: revenueError } = useGetRevenueAnalytics();
  const { data: adsData, isLoading: adsLoading, error: adsError } = useGetAdsAnalytics();

  const handleDateFilter = (value: string) => {
    console.log(value)
  }

  const hanldeValues = (activeTab: string) => {
    switch (activeTab) {
      case 'all':
        return overallData;
      case 'UsersPortion':
        return userData;
      case 'RevenuePortion':
        return revenueData;
      case 'AdsPortion':
        return adsData;
      default:
        return null;
    }
  }

  const getLoadingState = (activeTab: string) => {
    switch (activeTab) {
      case 'all':
        return overallLoading;
      case 'UsersPortion':
        return userLoading;
      case 'RevenuePortion':
        return revenueLoading;
      case 'AdsPortion':
        return adsLoading;
      default:
        return false;
    }
  }

  const getErrorState = (activeTab: string) => {
    switch (activeTab) {
      case 'all':
        return overallError;
      case 'UsersPortion':
        return userError;
      case 'RevenuePortion':
        return revenueError;
      case 'AdsPortion':
        return adsError;
      default:
        return null;
    }
  }

  return (
    <Horizontal>
      <FilterTab
        tabs={analyticsTab}
        handleValue={setactiveTab}
        activeTab={activeTab}
      />
      <Dropdown
        options={dates}
        onChange={handleDateFilter}
        placeholder="Bulk Actions"
        position="left-0"
      />
      {RenderComponent(
        activeTab, 
        hanldeValues(activeTab),
        getLoadingState(activeTab),
        getErrorState(activeTab)
      )}
    </Horizontal>
  )
}

export default Analytics