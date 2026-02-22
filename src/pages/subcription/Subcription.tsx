import React, { useMemo, useState } from 'react';
import { exportToCsv } from '../../utils/exportCsv';
import Horizontal from '../../components/alignments/Horizontal';
import StatsCard from '../../components/StatsCard';
import FilterTab from '../../components/FilterTab';
import ItemAlign from '../../components/alignments/ItemAlign';
import Dropdown from '../../components/Dropdown';
import { bulkFilter, dates } from '../../constants/FiltersData';
import TableCan from '../../components/TableCan';
import SubscriptionRow from './components/SubscriptionRow';
import StatsCardSkeleton from '../../components/StatsCardSkeleton';
import TableSkeleton from '../../components/TableSkeleton';
import { useGetAllSubscriptions, useGetSubscriptionStats } from '../../utils/queries/subscriptionQueries';
import images from '../../constants/images';

const getDaysDifference = (dateStr: string) => {
  const now = new Date();
  const given = new Date(dateStr);
  const diff = now.getTime() - given.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

const Subcription: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const { data: subscriptions, isLoading: subscriptionsLoading, error: subscriptionsError } = useGetAllSubscriptions();
  const { data: stats, isLoading: statsLoading } = useGetSubscriptionStats();

  const filterTabs = [
    { name: 'all', value: 'all' },
    { name: 'active', value: 'active' },
  ];

  const handleFilterTab = (value: string) => {
    setActiveTab(value);
  };

  const handleDateFilter = (value: string) => {
    setSelectedDate(value);
  };

  const handleBulkAction = (value: string) => {
    if (value === 'ExportASCSV') exportToCsv(filteredData, 'subscriptions');
  };

  const filteredData = useMemo(() => {
    if (!subscriptions || !Array.isArray(subscriptions)) return [];
    return subscriptions.filter(item => {
      const statusMatch = activeTab === 'all' || item.status === activeTab;

      const daysLimit = selectedDate === 'today' ? 1 : parseInt(selectedDate);
      const dateMatch = getDaysDifference(item.start_date) <= daysLimit;

      return statusMatch && dateMatch;
    });
  }, [subscriptions, activeTab, selectedDate]);

  const subscriptionStatics = stats ? [
    {
      icon: images.subcription,
      heading: 'Total',
      subHeading: 'Subscriptions',
      IconColor: '#FF0000',
      value: stats.totalSubscriptions || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.subcription,
      heading: 'Active',
      subHeading: 'Subscriptions',
      IconColor: '#008000',
      value: stats.activeSubscriptions || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.revenue,
      heading: 'Total',
      subHeading: 'Revenue',
      IconColor: '#0000FF',
      value: stats.totalRevenue || 0,
      changeStatus: 'up',
      subDetail: []
    },
  ] : [];

  return (
    <Horizontal>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {statsLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          subscriptionStatics.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>

      <FilterTab
        tabs={filterTabs}
        handleValue={handleFilterTab}
        activeTab={activeTab}
      />

      <ItemAlign>
        <Dropdown
          options={dates}
          onChange={handleDateFilter}
          placeholder="Date"
          position="left-0"
        />
        <Dropdown
          options={bulkFilter}
          onChange={handleBulkAction}
          placeholder="Bulk Actions"
          position="left-0"
        />
      </ItemAlign>

      {subscriptionsLoading ? (
        <TableSkeleton rows={10} columns={6} />
      ) : subscriptionsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading subscriptions. Please try again.
        </div>
      ) : (
        <TableCan
          headerTr={["Name", "Plan", "Amount", "Status", "Date", "Action"]}
          dataTr={filteredData}
          TrName={SubscriptionRow}
        />
      )}
    </Horizontal>
  );
};

export default Subcription;
