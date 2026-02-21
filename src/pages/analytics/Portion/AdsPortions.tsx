import React from 'react'
import CardPopulation from '../components/CardPopulation';
import AnalyticsChart from '../components/AnalyticsChart';
import type { AdsAnalytics } from '../../../utils/queries/analyticsQueries';

interface Props {
  data?: AdsAnalytics;
}

const formatNumber = (n: number) => n?.toLocaleString('en-US') ?? '0';
const formatCurrency = (n: number) => '₦' + (n?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00');

const AdsPortions: React.FC<Props> = ({ data }) => {
  const summary = data?.summary;
  const cards = summary ? [
    { label: 'Total Impressions', value: formatNumber(summary.totalImpressions) },
    { label: 'Total Clicks', value: formatNumber(summary.totalClicks) },
    { label: 'Average CTR', value: `${summary.averageCTR ?? 0}%` },
    { label: 'Total Spent', value: formatCurrency(summary.totalSpent) },
  ] : [];

  return (
    <div className='space-y-6'>
      <h1 className='capitalize text-2xl font-medium'>Ads Statistics</h1>
      <CardPopulation data={cards} />
      <div className='shadow-md border border-gray-200 p-4 max-w-4xl rounded-lg h-[400px]'>
        <AnalyticsChart chartData={data?.chartData} />
      </div>
    </div>
  )
}

export default AdsPortions;
