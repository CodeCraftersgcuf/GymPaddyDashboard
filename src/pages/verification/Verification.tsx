import React, { useMemo, useState } from 'react';
import Horizontal from '../../components/alignments/Horizontal';
import StatsCard from '../../components/StatsCard';
import FilterTab from '../../components/FilterTab';
import ItemAlign from '../../components/alignments/ItemAlign';
import Dropdown from '../../components/Dropdown';
import { bulkFilter, dates } from '../../constants/FiltersData';
import TableCan from '../../components/TableCan';
import VerificationRow from './components/VerificationRow';
import StatsCardSkeleton from '../../components/StatsCardSkeleton';
import TableSkeleton from '../../components/TableSkeleton';
import { useGetAllVerifications, useGetVerificationStats } from '../../utils/queries/verificationQueries';
import images from '../../constants/images';

const getDaysDifference = (dateStr: string) => {
  const now = new Date();
  const given = new Date(dateStr);
  const diff = now.getTime() - given.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

const Verification: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const { data: verifications, isLoading: verificationsLoading, error: verificationsError } = useGetAllVerifications();
  const { data: stats, isLoading: statsLoading } = useGetVerificationStats();

  const filterTabs = [
    { name: 'all', value: 'all' },
    { name: 'approved', value: 'approved' },
    { name: 'pending', value: 'pending' },
    { name: 'rejected', value: 'rejected' }
  ];

  const handleFilterTab = (value: string) => {
    setActiveTab(value);
  };

  const handleDateFilter = (value: string) => {
    setSelectedDate(value);
  };

  const handleBulkAction = (value: string) => {
    console.log("Bulk action:", value);
  };

  const filteredData = useMemo(() => {
    if (!verifications) return [];
    return verifications.filter(item => {
      const statusMatch = activeTab === 'all' || item.status === activeTab;

      const daysLimit = selectedDate === 'today' ? 1 : parseInt(selectedDate);
      const dateMatch = getDaysDifference(item.created_at) <= daysLimit;

      return statusMatch && dateMatch;
    });
  }, [verifications, activeTab, selectedDate]);

  const verificationsStatics = stats ? [
    {
      icon: images.verification,
      heading: 'Total',
      subHeading: 'Verifications',
      IconColor: '#FF0000',
      value: stats.totalVerifications || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.verification,
      heading: 'Pending',
      subHeading: 'Verifications',
      IconColor: '#FFA500',
      value: stats.pendingVerifications || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.verification,
      heading: 'Approved',
      subHeading: 'Verifications',
      IconColor: '#008000',
      value: stats.approvedVerifications || 0,
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
          verificationsStatics.map((item, index) => (
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

      {verificationsLoading ? (
        <TableSkeleton rows={10} columns={6} />
      ) : verificationsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading verifications. Please try again.
        </div>
      ) : (
        <TableCan
          headerTr={["Name", "Business Name", "Category", "Status", "Date", "Action"]}
          dataTr={filteredData}
          TrName={VerificationRow}
        />
      )}
    </Horizontal>
  );
};

export default Verification;
