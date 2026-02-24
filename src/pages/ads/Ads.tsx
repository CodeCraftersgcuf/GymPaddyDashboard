import React, { useState, useMemo } from 'react';
import { exportToCsv } from '../../utils/exportCsv';
import { adsTableHeaders } from '../../constants/Data';
import Horizontal from '../../components/alignments/Horizontal';
import StatsCard from '../../components/StatsCard';
import FilterTab from '../../components/FilterTab';
import Vertical from '../../components/alignments/Vertical';
import ItemAlign from '../../components/alignments/ItemAlign';
import Dropdown from '../../components/Dropdown';
import { adsStatus, bulkFilter, dates } from '../../constants/FiltersData';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import AdsRow from './components/AdsRow';
import StatsCardSkeleton from '../../components/StatsCardSkeleton';
import TableSkeleton from '../../components/TableSkeleton';
import { useGetAllAds, useGetAdsStats } from '../../utils/queries/adsQueries';
import images from '../../constants/images';
import { getDateThreshold } from '../../constants/help';

const adTypeTabs = [
  { name: 'All', value: 'all' },
  { name: 'Social', value: 'post' },
  { name: 'Marketplace', value: 'listing' },
];

const Ads: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: ads, isLoading: adsLoading, error: adsError } = useGetAllAds();
  const { data: stats, isLoading: statsLoading } = useGetAdsStats();

  const filteredData = useMemo(() => {
    if (!ads) return [];
    let temp = [...ads];

    if (statusFilter !== 'all') {
      temp = temp.filter((item) => item.status === statusFilter);
    }

    if (activeTab !== 'all') {
      temp = temp.filter((item) => item.type === activeTab);
    }

    if (dateFilter !== 'all') {
      const threshold = getDateThreshold(dateFilter);
      if (threshold) {
        temp = temp.filter((item) => {
          const itemDate = item.date ? new Date(item.date) : null;
          return itemDate && itemDate >= threshold;
        });
      }
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      temp = temp.filter((item) =>
        item.title?.toLowerCase().includes(term) ||
        item.name?.toLowerCase().includes(term)
      );
    }

    return temp;
  }, [ads, statusFilter, activeTab, dateFilter, searchTerm]);

  const allSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.has(String(item.id)));
  const someSelected = filteredData.some(item => selectedIds.has(String(item.id)));

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredData.map(item => String(item.id))));
    else setSelectedIds(new Set());
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const adsStatistics = stats ? [
    {
      icon: images.ads,
      heading: 'Total',
      subHeading: 'Ads',
      IconColor: '#FF0000',
      value: stats.totalAds || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.ads,
      heading: 'Active',
      subHeading: 'Ads',
      IconColor: '#008000',
      value: stats.activeAds || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.ads,
      heading: 'Paused',
      subHeading: 'Ads',
      IconColor: '#FFA500',
      value: stats.pausedAds || 0,
      changeStatus: 'down',
      subDetail: []
    },
    {
      icon: images.revenue,
      heading: 'Total',
      subHeading: 'Budget',
      IconColor: '#0000FF',
      value: stats.totalBudget || 0,
      changeStatus: 'up',
      subDetail: []
    },
  ] : [];

  return (
    <Horizontal>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          adsStatistics.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>

      <FilterTab
        tabs={adTypeTabs}
        handleValue={(val) => setActiveTab(val)}
        activeTab={activeTab}
      />

      <Vertical>
        <ItemAlign>
          <Dropdown
            options={[{ name: 'all', value: 'all' }, ...dates]}
            onChange={(val) => setDateFilter(val)}
            placeholder="Dates"
            position="left-0"
          />
          <Dropdown
            options={adsStatus}
            onChange={(val) => setStatusFilter(val)}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkFilter}
            onChange={(val) => { if (val === 'ExportASCSV') exportToCsv(filteredData, 'ads'); }}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemAlign>
        <SearchFilter
          handleFunction={(val) => setSearchTerm(val)}
        />
      </Vertical>

      {adsLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : adsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading ads. Please try again.
        </div>
      ) : (
        <TableCan
          headerTr={adsTableHeaders}
          dataTr={filteredData}
          TrName={AdsRow}
          allSelected={allSelected}
          someSelected={someSelected}
          onSelectAll={handleSelectAll}
          TrPropsName={{ selectedIds, onToggle: handleToggleRow }}
        />
      )}
    </Horizontal>
  );
};

export default Ads;
