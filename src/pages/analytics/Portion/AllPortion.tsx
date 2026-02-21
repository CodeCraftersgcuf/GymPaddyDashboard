import React from 'react'
import SiteStatisticsChart from '../../dashboard/components/SiteStatisticsChart';
import CardPopulation from '../components/CardPopulation';
import type { OverallAnalytics } from '../../../utils/queries/analyticsQueries';

interface Props {
  data?: OverallAnalytics;
}

const formatNumber = (n: number) => n?.toLocaleString('en-US') ?? '0';
const formatCurrency = (n: number) => '₦' + (n?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00');

const AllPortion: React.FC<Props> = ({ data }) => {
  const cards = data ? [
    { label: 'Total Users', value: formatNumber(data.users?.total ?? 0) },
    { label: 'User Growth', value: `${data.users?.growth ?? 0}%` },
    { label: 'Total Revenue', value: formatCurrency(data.revenue?.total ?? 0) },
    { label: 'Revenue Growth', value: `${data.revenue?.growth ?? 0}%` },
    { label: 'Total Transactions', value: formatNumber(data.transactions?.total ?? 0) },
  ] : [];

  return (
    <div className='space-y-6'>
      <h1 className='capitalize text-2xl font-medium'>All Statistics</h1>
      <CardPopulation data={cards} />
      <div className='shadow-md border border-gray-200 p-4 max-w-4xl rounded-lg h-[400px]'>
        <SiteStatisticsChart />
      </div>
    </div>
  )
}

export default AllPortion
