import React, { useState, useMemo } from 'react';
import Horizontal from '../../components/alignments/Horizontal';
import { ListingTableHeaders, marketTabs } from '../../constants/Data';
import StatsCard from '../../components/StatsCard';
import Vertical from '../../components/alignments/Vertical';
import ItemAlign from '../../components/alignments/ItemAlign';
import Dropdown from '../../components/Dropdown';
import { boostedFilter, bulkFilter, dates } from '../../constants/FiltersData';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import ListingRow from '../userManagement/portions/market/components/ListingRow';
import FilterTab from '../../components/FilterTab';
import StatsCardSkeleton from '../../components/StatsCardSkeleton';
import TableSkeleton from '../../components/TableSkeleton';
import { useGetAllListings, useGetMarketStats } from '../../utils/queries/marketQueries';
import images from '../../constants/images';

const MarketManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [boostStatus, setBoostStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: listings, isLoading: listingsLoading, error: listingsError } = useGetAllListings();
  const { data: stats, isLoading: statsLoading } = useGetMarketStats();

  const filteredData = useMemo(() => {
    if (!listings || !Array.isArray(listings)) return [];
    let temp = [...listings];

    if (boostStatus !== 'all') {
      temp = temp.filter((item) => item.boostedStatus === boostStatus);
    }

    if (activeTab !== 'all') {
      temp = temp.filter((item) => item.status === activeTab);
    }

    if (searchTerm.trim() !== '') {
      temp = temp.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return temp;
  }, [listings, boostStatus, activeTab, searchTerm]);

  const marketStatics = stats ? [
    {
      icon: images.marketIcon,
      heading: 'Total',
      subHeading: 'Listings',
      IconColor: '#FF0000',
      value: stats.totalListings || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.marketIcon,
      heading: 'Active',
      subHeading: 'Listings',
      IconColor: '#0000FF',
      value: stats.activeListings || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.marketIcon,
      heading: 'Boosted',
      subHeading: 'Listings',
      IconColor: '#008000',
      value: stats.boostedListings || 0,
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
          marketStatics.map((item, index) => (
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
            options={boostedFilter}
            onChange={(val) => setBoostStatus(val)}
            placeholder="Boost Status"
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

      {listingsLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : listingsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading listings. Please try again.
        </div>
      ) : (
        <TableCan
          headerTr={ListingTableHeaders}
          dataTr={filteredData}
          TrName={ListingRow}
        />
      )}
    </Horizontal>
  );
};

export default MarketManagement;
