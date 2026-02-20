import React, { useMemo, useState } from "react";
import Horizontal from "../../components/alignments/Horizontal";
import Vertical from "../../components/alignments/Vertical";
import FilterTab from "../../components/FilterTab";
import ItemAlign from "../../components/alignments/ItemAlign";
import Dropdown from "../../components/Dropdown";
import { dates, notificationStatus } from "../../constants/FiltersData";
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

  const tabs = [
    { name: 'all', value: 'all' },
    { name: 'socials', value: 'socials' },
    { name: 'connect', value: 'connect' },
    { name: 'market', value: 'market' },
    { name: 'gym hub', value: 'gym' }
  ]

  const [activeTab, setActiveTab] = useState<string>('all')
  const [selectedDate, setSelectedDate] = useState<string>('today')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

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
      const tabMatch = activeTab === "all" || ticket.subject?.toLowerCase().includes(activeTab);
      const statusMatch = selectedStatus === "all" || ticket.status === selectedStatus;

      const daysLimit = selectedDate === "today" ? 1 : parseInt(selectedDate);
      const dateMatch = getDaysDifference(ticket.created_at) <= daysLimit;

      return tabMatch && statusMatch && dateMatch;
    });
  }, [tickets, activeTab, selectedDate, selectedStatus]);

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
          options={dates}
          onChange={handleDateFilter}
          placeholder="Dates"
          position="left-0"
        />
        <Dropdown
          options={notificationStatus}
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
          headerTr={['name', 'message', 'status', 'Date', 'actions']}
          dataTr={filteredData}
          TrName={SupportRow}
        />
      )}
    </Horizontal>
  )
};

export default Support;
