import React from 'react'
import CardPopulation from '../components/CardPopulation';
import AnalyticsChart from '../components/AnalyticsChart';
import type { UserAnalytics } from '../../../utils/queries/analyticsQueries';

interface Props {
  data?: UserAnalytics;
}

const formatNumber = (n: number) => n?.toLocaleString('en-US') ?? '0';

const UserPortion: React.FC<Props> = ({ data }) => {
  const summary = data?.summary;
  const cards = summary ? [
    { label: 'Total Users', value: formatNumber(summary.totalUsers) },
    { label: 'New Users', value: formatNumber(summary.newUsers) },
    { label: 'Active Users', value: formatNumber(summary.activeUsers) },
    { label: 'Growth', value: `${summary.growth ?? 0}%` },
  ] : [];

  return (
    <div className='space-y-6'>
      <h1 className='capitalize text-2xl font-medium'>Users Statistics</h1>
      <CardPopulation data={cards} />
      <div className='shadow-md border border-gray-200 p-4 max-w-4xl rounded-lg h-[400px]'>
        <AnalyticsChart chartData={data?.chartData} />
      </div>
    </div>
  )
}

export default UserPortion;
