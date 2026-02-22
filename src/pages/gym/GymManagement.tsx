import React, { useMemo, useState } from 'react';
import { exportToCsv } from '../../utils/exportCsv';
import Horizontal from '../../components/alignments/Horizontal';
import { gymUserTableHeaders } from '../../constants/Data';
import StatsCard from '../../components/StatsCard';
import ItemAlign from '../../components/alignments/ItemAlign';
import Dropdown from '../../components/Dropdown';
import { bulkFilter, dates } from '../../constants/FiltersData';
import TableCan from '../../components/TableCan';
import GymRow from './components/GymRow';
import StatsCardSkeleton from '../../components/StatsCardSkeleton';
import TableSkeleton from '../../components/TableSkeleton';
import { useGetAllGyms, useGetGymStats } from '../../utils/queries/gymQueries';
import images from '../../constants/images';

const getDaysDifference = (dateStr: string) => {
  const now = new Date();
  const given = new Date(dateStr);
  const diff = now.getTime() - given.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

const GymManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('today');

  const { data: gyms, isLoading: gymsLoading, error: gymsError } = useGetAllGyms();
  const { data: stats, isLoading: statsLoading } = useGetGymStats();

  const handleDateFilter = (value: string) => {
    setSelectedDate(value);
  };

  const handleBulkAction = (value: string) => {
    if (value === 'ExportASCSV') exportToCsv(filteredData, 'gyms');
  };

  const filteredData = useMemo(() => {
    if (!gyms) return [];
    return gyms.filter(item => {
      const daysLimit = selectedDate === 'today' ? 1 : parseInt(selectedDate);
      const dateMatch = item.created_at ? getDaysDifference(item.created_at) <= daysLimit : true;
      return dateMatch;
    });
  }, [gyms, selectedDate]);

  const gymStats = stats ? [
    {
      icon: images.gym,
      heading: 'Total',
      subHeading: 'Gyms',
      IconColor: '#FF0000',
      value: stats.totalGyms || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.gym,
      heading: 'Active',
      subHeading: 'Gyms',
      IconColor: '#008000',
      value: stats.activeGyms || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.gym,
      heading: 'Pending',
      subHeading: 'Approvals',
      IconColor: '#FFA500',
      value: stats.pendingApprovals || 0,
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
          gymStats.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>

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

      {gymsLoading ? (
        <TableSkeleton rows={10} columns={6} />
      ) : gymsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading gyms. Please try again.
        </div>
      ) : (
        <TableCan
          headerTr={gymUserTableHeaders}
          dataTr={filteredData}
          TrName={GymRow}
        />
      )}
    </Horizontal>
  );
};

export default GymManagement;
