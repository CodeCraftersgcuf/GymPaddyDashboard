import React, { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderWrapper from '../../components/HeaderWrapper';
import Horizontal from '../../../../components/alignments/Horizontal';
import { TransactionFilter } from '../../../../constants/Data';
import StatsCard from '../../../../components/StatsCard';
import FilterTab from '../../../../components/FilterTab';
import ItemAlign from '../../../../components/alignments/ItemAlign';
import Dropdown from '../../../../components/Dropdown';
import { bulkFilter, dates } from '../../../../constants/FiltersData';
import { exportToCsv } from '../../../../utils/exportCsv';
import Vertical from '../../../../components/alignments/Vertical';
import SearchFilter from '../../../../components/SearchFilter';
import TableCan from '../../../../components/TableCan';
import UserTransactionRow from './components/UserTransactionRow';
import { useGetUserByUsername } from '../../../../utils/queries/userQueries';
import { useGetUserTransactions } from '../../../../utils/queries/transactionQueries';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import StatsCardSkeleton from '../../../../components/StatsCardSkeleton';
import images from '../../../../constants/images';
import { getDateThreshold } from '../../../../constants/help';

const UserTransaction: React.FC = () => {
  const location = useLocation();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [transactionStatus, setTransactionStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: user, isLoading: userLoading } = useGetUserByUsername(username || '');
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useGetUserTransactions(user?.id?.toString() || '');

  const tabs = [
    { name: 'all', value: 'all' },
    { name: 'topup', value: 'topup' },
    { name: 'withdrawal', value: 'withdrawal' },
  ];

  const filteredData = useMemo(() => {
    if (!transactions || !Array.isArray(transactions)) return [];
    return transactions.filter((item) => {
      const matchesTab = activeTab === 'all' || item.type === activeTab;
      const matchesStatus = transactionStatus === 'all' || item.status === transactionStatus;
      const matchesSearch = searchQuery === '' || item.id.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesDate = true;
      if (dateFilter !== 'all') {
        const threshold = getDateThreshold(dateFilter);
        if (threshold) {
          const itemDate = item.date ? new Date(item.date) : null;
          matchesDate = !!itemDate && itemDate >= threshold;
        }
      }

      return matchesTab && matchesStatus && matchesSearch && matchesDate;
    });
  }, [transactions, activeTab, transactionStatus, dateFilter, searchQuery]);
  
  const walletStats = transactions ? [
    {
      icon: images.earning,
      heading: 'Total',
      subHeading: 'Transactions',
      IconColor: '#FF0000',
      value: transactions.length || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.earning,
      heading: 'Total',
      subHeading: 'Deposits',
      IconColor: '#0000FF',
      value: transactions.filter(t => t.type === 'topup').reduce((sum, t) => sum + t.amount, 0),
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.earning,
      heading: 'Total',
      subHeading: 'Withdrawals',
      IconColor: '#008000',
      value: transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0),
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
          {userLoading || transactionsLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            walletStats.map((item, index) => (
              <StatsCard {...item} key={index} />
            ))
          )}
        </div>

        <FilterTab
          tabs={tabs}
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
              options={TransactionFilter}
              onChange={(val) => setTransactionStatus(val)}
              placeholder="Status"
              position="left-0"
            />
            <Dropdown
              options={bulkFilter}
              onChange={(val) => { if (val === 'ExportASCSV') exportToCsv(filteredData, 'transactions'); }}
              placeholder="Bulk Actions"
              position="left-0"
            />
          </ItemAlign>
          <SearchFilter
            handleFunction={(val) => setSearchQuery(val)}
          />
        </Vertical>

        {transactionsLoading ? (
          <LoadingSpinner className="h-64" />
        ) : transactionsError ? (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error loading transactions. Please try again.
          </div>
        ) : (
          <TableCan
            TrName={UserTransactionRow}
            dataTr={filteredData}
            headerTr={['transaction id', 'amount', 'status', 'date', 'actions']}
          />
        )}
      </Horizontal>
    </HeaderWrapper>
  );
};

export default UserTransaction;
