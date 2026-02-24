import React, { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderWrapper from '../../components/HeaderWrapper';
import Horizontal from '../../../../components/alignments/Horizontal';
import { ListingTableHeaders, marketTabs } from '../../../../constants/Data';
import StatsCard from '../../../../components/StatsCard';
import Vertical from '../../../../components/alignments/Vertical';
import ItemAlign from '../../../../components/alignments/ItemAlign';
import Dropdown from '../../../../components/Dropdown';
import { boostedFilter, bulkFilter, dates } from '../../../../constants/FiltersData';
import { exportToCsv } from '../../../../utils/exportCsv';
import SearchFilter from '../../../../components/SearchFilter';
import TableCan from '../../../../components/TableCan';
import ListingRow from './components/ListingRow';
import FilterTab from '../../../../components/FilterTab';
import { useGetUserByUsername } from '../../../../utils/queries/userQueries';
import { useGetUserListings } from '../../../../utils/queries/marketQueries';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import StatsCardSkeleton from '../../../../components/StatsCardSkeleton';
import images from '../../../../constants/images';
import { getDateThreshold } from '../../../../constants/help';

const Market: React.FC = () => {
  const location = useLocation();
  const { username } = useParams();

  const [activeTab, setActiveTab] = useState('all');
  const [boostStatus, setBoostStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const { data: user, isLoading: userLoading } = useGetUserByUsername(username || '');
  const { data: listings, isLoading: listingsLoading, error: listingsError } = useGetUserListings(user?.id?.toString() || '');

  const filteredData = useMemo(() => {
    if (!listings || !Array.isArray(listings)) return [];
    let temp = [...listings];

    if (boostStatus !== 'all') {
      temp = temp.filter((item) => item.boostedStatus === boostStatus);
    }

    if (activeTab !== 'all') {
      temp = temp.filter((item) => item.status === activeTab);
    }

    if (dateFilter !== 'all') {
      const threshold = getDateThreshold(dateFilter);
      if (threshold) {
        temp = temp.filter((item) => {
          const itemDate = item.createdAt ? new Date(item.createdAt) : null;
          return itemDate && itemDate >= threshold;
        });
      }
    }

    if (searchTerm.trim() !== '') {
      temp = temp.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return temp;
  }, [listings, boostStatus, activeTab, dateFilter, searchTerm]);

  const allSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.has(String(item.id)));
  const someSelected = filteredData.some(item => selectedIds.has(String(item.id)));
  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredData.map(item => String(item.id))));
    else setSelectedIds(new Set());
  };
  const handleToggleRow = (id: string) => {
    setSelectedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  
  const marketStats = listings ? [
    {
      icon: images.marketIcon,
      heading: 'Total',
      subHeading: 'Listings',
      IconColor: '#FF0000',
      value: listings.length || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.marketIcon,
      heading: 'Active',
      subHeading: 'Listings',
      IconColor: '#0000FF',
      value: listings.filter(l => l.status === 'active').length || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.marketIcon,
      heading: 'Boosted',
      subHeading: 'Listings',
      IconColor: '#008000',
      value: listings.filter(l => l.boostedStatus === 'boosted').length || 0,
      changeStatus: 'up',
      subDetail: []
    },
  ] : [];

  return (
    <HeaderWrapper
      location={location}
      user={username}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <Horizontal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {userLoading || listingsLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            marketStats.map((item, index) => (
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
              options={[{ name: 'all', value: 'all' }, ...dates]}
              onChange={(val) => setDateFilter(val)}
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
              onChange={(val) => { if (val === 'ExportASCSV') exportToCsv(filteredData, 'market_listings'); }}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemAlign>
          <SearchFilter
            handleFunction={(val) => setSearchTerm(val)}
          />
        </Vertical>

        {listingsLoading ? (
          <LoadingSpinner className="h-64" />
        ) : listingsError ? (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error loading listings. Please try again.
          </div>
        ) : (
          <TableCan
            headerTr={ListingTableHeaders}
            dataTr={filteredData}
            TrName={ListingRow}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
            TrPropsName={{ selectedIds, onToggle: handleToggleRow }}
          />
        )}
      </Horizontal>
    </HeaderWrapper>
  );
};

export default Market;
