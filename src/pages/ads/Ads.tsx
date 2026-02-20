import React, { useState, useMemo } from 'react';
import { adsTableHeaders, marketTabs } from '../../constants/Data';
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

const Ads: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [boostStatus, setBoostStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: ads, isLoading: adsLoading, error: adsError } = useGetAllAds();
  const { data: stats, isLoading: statsLoading } = useGetAdsStats();

  const filteredData = useMemo(() => {
    if (!ads) return [];
    let temp = [...ads];

    if (boostStatus !== 'all') {
      temp = temp.filter((item) => item.status === boostStatus);
    }

    if (activeTab !== 'all') {
      temp = temp.filter((item) => item.title?.toLowerCase().includes(activeTab));
    }

    if (searchTerm.trim() !== '') {
      temp = temp.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return temp;
  }, [ads, boostStatus, activeTab, searchTerm]);

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
        tabs={marketTabs}
        handleValue={(val) => setActiveTab(val)}
        activeTab={activeTab}
      />

      <Vertical>
        <ItemAlign>
          <Dropdown
            options={dates}
            onChange={(val) => console.log('Date:', val)}
            placeholder="Dates"
            position="left-0"
          />
          <Dropdown
            options={adsStatus}
            onChange={(val) => setBoostStatus(val)}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkFilter}
            onChange={(val) => console.log('Bulk:', val)}
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
        />
      )}
    </Horizontal>
  );
};

export default Ads;
