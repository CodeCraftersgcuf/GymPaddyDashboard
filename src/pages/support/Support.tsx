import React, { useMemo, useState } from "react";
import Horizontal from "../../components/alignments/Horizontal";
import Vertical from "../../components/alignments/Vertical";
import FilterTab from "../../components/FilterTab";
import ItemAlign from "../../components/alignments/ItemAlign";
import Dropdown from "../../components/Dropdown";
import { dates } from "../../constants/FiltersData";
import TableCan from "../../components/TableCan";
import SupportRow from "./components/SupportRow";
import TableSkeleton from "../../components/TableSkeleton";
import { useGetAllTickets } from "../../utils/queries/supportQueries";

const getDaysDifference = (dateStr: string) => {
  const now = new Date();
  const givenDate = new Date(dateStr);
  const diff = now.getTime() - givenDate.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

const Support: React.FC = () => {
  const { data: tickets, isLoading: ticketsLoading, error: ticketsError } = useGetAllTickets();
  const supportStatus = [
    { name: 'all', value: 'all' },
    { name: 'open', value: 'open' },
    { name: 'pending', value: 'pending' },
    { name: 'closed', value: 'closed' },
  ];

  const tabs = [
    { name: 'all', value: 'all' },
    { name: 'general', value: 'general' },
    { name: 'socials', value: 'socials' },
    { name: 'connect', value: 'connect' },
    { name: 'market', value: 'market' },
    { name: 'gym hub', value: 'gym' }
  ]

  const [activeTab, setActiveTab] = useState<string>('all')
  const [selectedDate, setSelectedDate] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleFilterTab = (filter: string) => {
    setActiveTab(filter)
  }

  const handleDateFilter = (value: string) => {
    setSelectedDate(value)
  }

  const handleStatusFilter = (value: string) => {
    setSelectedStatus(value)
  }

  const filteredData = useMemo(() => {
    if (!tickets) return [];
    return tickets.filter((ticket) => {
      const subject = (ticket.subject || '').toLowerCase();
      const tabMatch =
        activeTab === "all" ||
        (activeTab === 'general' && (!subject || subject === 'general')) ||
        (activeTab === 'socials' && subject.includes('social')) ||
        (activeTab === 'connect' && subject.includes('connect')) ||
        (activeTab === 'market' && (subject.includes('market') || subject.includes('marketplace'))) ||
        (activeTab === 'gym' && (subject.includes('gym') || subject.includes('hub')));

      const statusMatch = selectedStatus === "all" || (ticket.status || '').toLowerCase() === selectedStatus;

      const dateMatch =
        selectedDate === 'all' ||
        getDaysDifference(ticket.created_at) <= (selectedDate === 'today' ? 1 : parseInt(selectedDate));

      return tabMatch && statusMatch && dateMatch;
    });
  }, [tickets, activeTab, selectedDate, selectedStatus]);

  const allSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.has(String(item.id)));
  const someSelected = filteredData.some(item => selectedIds.has(String(item.id)));
  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredData.map(item => String(item.id))));
    else setSelectedIds(new Set());
  };
  const handleToggleRow = (id: string) => {
    setSelectedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  return (
    <Horizontal>
      <Vertical>
        <FilterTab
          handleValue={handleFilterTab}
          tabs={tabs}
          activeTab={activeTab}
        />
      </Vertical>

      <ItemAlign>
        <Dropdown
          options={[{ name: 'all time', value: 'all' }, ...dates]}
          onChange={handleDateFilter}
          defaultValue="all"
          placeholder="Dates"
          position="left-0"
        />
        <Dropdown
          options={supportStatus}
          onChange={handleStatusFilter}
          placeholder="Status"
          position="left-0"
        />
      </ItemAlign>

      {ticketsLoading ? (
        <TableSkeleton rows={10} columns={5} />
      ) : ticketsError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading support tickets. Please try again.
        </div>
      ) : (
        <TableCan
          headerTr={['name', 'category', 'message', 'status', 'Date', 'actions']}
          dataTr={filteredData}
          TrName={SupportRow}
          allSelected={allSelected}
          someSelected={someSelected}
          onSelectAll={handleSelectAll}
          TrPropsName={{ selectedIds, onToggle: handleToggleRow }}
        />
      )}
    </Horizontal>
  )
};

export default Support;
