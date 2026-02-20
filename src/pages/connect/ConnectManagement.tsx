import React, { useState, useMemo } from 'react'
import Horizontal from '../../components/alignments/Horizontal'
import StatsCard from '../../components/StatsCard'
import { connectuserTableHeaders } from '../../constants/Data'
import FilterTab from '../../components/FilterTab'
import Vertical from '../../components/alignments/Vertical'
import ItemAlign from '../../components/alignments/ItemAlign'
import Dropdown from '../../components/Dropdown'
import { bulkFilter, connectVerifyStatus, dates } from '../../constants/FiltersData'
import SearchFilter from '../../components/SearchFilter'
import TableCan from '../../components/TableCan'
import ConnectTableRow from './components/ConnectTableRow'
import StatsCardSkeleton from '../../components/StatsCardSkeleton'
import TableSkeleton from '../../components/TableSkeleton'
import { useGetAllConnectUsers, useGetConnectStats } from '../../utils/queries/connectQueries'
import images from '../../constants/images'

const ConnectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedDate, setSelectedDate] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [bulkAction, setBulkAction] = useState('')
  const [searchText, setSearchText] = useState('')

  const { data: users, isLoading: usersLoading, error: usersError } = useGetAllConnectUsers()
  const { data: stats, isLoading: statsLoading } = useGetConnectStats()

  const filteredData = useMemo(() => {
    if (!users || !Array.isArray(users)) return []
    return users.filter((user) => {
      const matchTab = activeTab === 'all' || (activeTab === 'subscriber' && user.subscription === true)
      const matchStatus = !statusFilter || statusFilter === 'all' || user.videoVerification === statusFilter
      const matchSearch = !searchText || user.fullName?.toLowerCase().includes(searchText.toLowerCase())
      return matchTab && matchStatus && matchSearch
    })
  }, [users, activeTab, statusFilter, searchText])

  const connectStatistics = stats ? [
    {
      icon: images.connect,
      heading: 'Total',
      subHeading: 'Users',
      IconColor: '#FF0000',
      value: stats.totalUsers || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.connect,
      heading: 'Active',
      subHeading: 'Matches',
      IconColor: '#008000',
      value: stats.activeMatches || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.connect,
      heading: 'Pending',
      subHeading: 'Requests',
      IconColor: '#FFA500',
      value: stats.pendingRequests || 0,
      changeStatus: 'up',
      subDetail: []
    },
  ] : []

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
          connectStatistics.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>
      <h1 className='text-2xl font-medium'>Connect Management</h1>
      <FilterTab
        tabs={[
          { name: 'all', value: 'all' },
          { name: 'subscriber', value: 'subscriber' },
        ]}
        handleValue={(e) => setActiveTab(e)}
        activeTab={activeTab}
      />
      <Vertical>
        <ItemAlign>
          <Dropdown
            options={dates}
            onChange={(val) => setSelectedDate(val)}
            placeholder="Dates"
            position="left-0"
          />
          <Dropdown
            options={connectVerifyStatus}
            onChange={(val) => setStatusFilter(val)}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkFilter}
            onChange={(val) => setBulkAction(val)}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemAlign>
        <SearchFilter
          handleFunction={(val) => setSearchText(val)}
        />
      </Vertical>
      {usersLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : usersError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading connect users. Please try again.
        </div>
      ) : (
        <TableCan
          TrName={ConnectTableRow}
          dataTr={filteredData}
          headerTr={connectuserTableHeaders}
        />
      )}
    </Horizontal>
  )
}

export default ConnectManagement
