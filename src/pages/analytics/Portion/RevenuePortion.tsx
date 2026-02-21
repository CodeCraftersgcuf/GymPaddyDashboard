import React from 'react'
import CardPopulation from '../components/CardPopulation';
import AnalyticsChart from '../components/AnalyticsChart';
import type { RevenueAnalytics } from '../../../utils/queries/analyticsQueries';

interface Props {
  data?: RevenueAnalytics;
}

const formatCurrency = (n: number) => '₦' + (n?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00');

const RevenuePortion: React.FC<Props> = ({ data }) => {
  const summary = data?.summary;
  const cards = summary ? [
    { label: 'Total Revenue', value: formatCurrency(summary.totalRevenue) },
    { label: 'Average Revenue', value: formatCurrency(summary.averageRevenue) },
    { label: 'Growth', value: `${summary.growth ?? 0}%` },
  ] : [];

  return (
    <div className='space-y-6'>
      <h1 className='capitalize text-2xl font-medium'>Revenue Statistics</h1>
      <CardPopulation data={cards} />
      <div className='shadow-md border border-gray-200 p-4 max-w-4xl rounded-lg h-[400px]'>
        <AnalyticsChart chartData={data?.chartData} />
      </div>
    </div>
  )
}

export default RevenuePortion;
