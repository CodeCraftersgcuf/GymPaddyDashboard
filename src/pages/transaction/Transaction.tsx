import React, { useMemo, useState } from 'react';
import { exportToCsv } from '../../utils/exportCsv';
import Horizontal from '../../components/alignments/Horizontal';
import { TransactionFilter } from '../../constants/Data';
import StatsCard from '../../components/StatsCard';
import FilterTab from '../../components/FilterTab';
import Vertical from '../../components/alignments/Vertical';
import ItemAlign from '../../components/alignments/ItemAlign';
import Dropdown from '../../components/Dropdown';
import { bulkFilter, dates } from '../../constants/FiltersData';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import TransactionRow from './components/TransactionRow';
import StatsCardSkeleton from '../../components/StatsCardSkeleton';
import TableSkeleton from '../../components/TableSkeleton';
import { useGetAllTransactions, useGetTransactionStats } from '../../utils/queries/transactionQueries';
import images from '../../constants/images';
import { getDateThreshold } from '../../constants/help';

const Transaction: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [transactionStatus, setTransactionStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useGetAllTransactions();
  const { data: stats, isLoading: statsLoading } = useGetTransactionStats();

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
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q === '' ||
        item.id?.toString().toLowerCase().includes(q) ||
        (item.fullName ?? '').toLowerCase().includes(q) ||
        (item.username ?? '').toLowerCase().includes(q) ||
        (item.email ?? '').toLowerCase().includes(q);

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

  const allSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.has(String(item.id)));
  const someSelected = filteredData.some(item => selectedIds.has(String(item.id)));
  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredData.map(item => String(item.id))));
    else setSelectedIds(new Set());
  };
  const handleToggleRow = (id: string) => {
    setSelectedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const revenueStats = stats ? [
    {
      icon: images.revenue,
      heading: 'Total',
      subHeading: 'Revenue',
      IconColor: '#FF0000',
      value: stats.totalRevenue || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.revenue,
      heading: 'Total',
      subHeading: 'Deposits',
      IconColor: '#008000',
      value: stats.totalDeposits || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.revenue,
      heading: 'Total',
      subHeading: 'Withdrawals',
      IconColor: '#FFA500',
      value: stats.totalWithdrawals || 0,
      changeStatus: 'down',
      subDetail: []
    },
    {
      icon: images.revenue,
      heading: 'Pending',
      subHeading: 'Transactions',
      IconColor: '#0000FF',
      value: stats.pendingTransactions || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.revenue,
      heading: 'Total',
      subHeading: 'Transactions',
      IconColor: '#800080',
      value: stats.totalTransactions || 0,
      changeStatus: 'up',
      subDetail: []
    },
  ] : [];

  return (
    <Horizontal>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {statsLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          revenueStats.map((item, index) => (
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
        <TableSkeleton rows={10} columns={6} />
      ) : transactionsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading transactions. Please try again.
        </div>
      ) : (
        <TableCan
          TrName={TransactionRow}
          dataTr={filteredData}
          headerTr={['Name','transaction id', 'amount', 'status', 'date', 'actions']}
          allSelected={allSelected}
          someSelected={someSelected}
          onSelectAll={handleSelectAll}
          TrPropsName={{ selectedIds, onToggle: handleToggleRow }}
        />
      )}
    </Horizontal>
  );
};

export default Transaction;
