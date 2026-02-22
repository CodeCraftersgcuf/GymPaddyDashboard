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

const dateToPeriod: Record<string, string> = {
  'all': 'all',
  'today': '1d',
  '7': '7d',
  '30': '30d',
  '90': '90d',
  '365': '1y',
};

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [period, setPeriod] = useState('30d');

  const { data: overallData, isLoading: overallLoading, error: overallError } = useGetOverallAnalytics(period);
  const { data: userData, isLoading: userLoading, error: userError } = useGetUserAnalytics(period);
  const { data: revenueData, isLoading: revenueLoading, error: revenueError } = useGetRevenueAnalytics(period);
  const { data: adsData, isLoading: adsLoading, error: adsError } = useGetAdsAnalytics(period);

  const handleDateFilter = (value: string) => {
    setPeriod(dateToPeriod[value] || '30d');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'all': {
        if (overallLoading) return <LoadingSpinner className="h-64" />;
        if (overallError) return <ErrorMessage />;
        return <AllPortion data={overallData} />;
      }
      case 'UsersPortion': {
        if (userLoading) return <LoadingSpinner className="h-64" />;
        if (userError) return <ErrorMessage />;
        return <UserPortion data={userData} />;
      }
      case 'RevenuePortion': {
        if (revenueLoading) return <LoadingSpinner className="h-64" />;
        if (revenueError) return <ErrorMessage />;
        return <RevenuePortion data={revenueData} />;
      }
      case 'AdsPortion': {
        if (adsLoading) return <LoadingSpinner className="h-64" />;
        if (adsError) return <ErrorMessage />;
        return <AdsPortions data={adsData} />;
      }
      default:
        return null;
    }
  };

  return (
    <Horizontal>
      <FilterTab
        tabs={analyticsTab}
        handleValue={setActiveTab}
        activeTab={activeTab}
      />
      <Dropdown
        options={[{ name: 'all time', value: 'all' }, ...dates]}
        onChange={handleDateFilter}
        placeholder="Time Period"
        position="left-0"
      />
      {renderContent()}
    </Horizontal>
  )
}

const ErrorMessage = () => (
  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
    Error loading analytics data. Please try again.
  </div>
);

export default Analytics
