import React, { useMemo, useState } from 'react'
import Horizontal from '../../../components/alignments/Horizontal'
import StatsCard from '../../../components/StatsCard'
import Vertical from '../../../components/alignments/Vertical'
import ItemAlign from '../../../components/alignments/ItemAlign'
import Button from '../../../components/Buttons/Button'
import Dropdown from '../../../components/Dropdown'
import { dates } from '../../../constants/FiltersData'
import SearchFilter from '../../../components/SearchFilter'
import TableCan from '../../../components/TableCan'
import AdminRow from './components/AdminRow'
import Modal from '../../../components/Modal'
import StatsCardSkeleton from '../../../components/StatsCardSkeleton'
import TableSkeleton from '../../../components/TableSkeleton'
import { useGetAllAdmins } from '../../../utils/queries/adminQueries'
import { useCreateAdmin } from '../../../utils/mutations/adminMutations'
import { getDateThreshold } from '../../../constants/help'
import images from '../../../constants/images'

const AdminManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ fullName: '', email: '', password: '', role: 'admin' })
  const [addError, setAddError] = useState<string | null>(null)

  const { data: admins, isLoading, error } = useGetAllAdmins()
  const createMutation = useCreateAdmin()

  const filteredData = useMemo(() => {
    if (!admins) return []
    return admins.filter((admin) => {
      const matchSearch = searchText === '' ||
        admin.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchText.toLowerCase())

      let matchDate = true
      if (dateFilter !== 'all') {
        const threshold = getDateThreshold(dateFilter)
        if (threshold) {
          const adminDate = admin.createdAt ? new Date(admin.createdAt) : null
          matchDate = !!adminDate && adminDate >= threshold
        }
      }

      return matchSearch && matchDate
    })
  }, [admins, searchText, dateFilter])

  const adminStats = [
    {
      icon: images.social,
      heading: 'Total',
      subHeading: 'Admins',
      IconColor: '#FF0000',
      value: admins?.length || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.social,
      heading: 'Active',
      subHeading: 'Admins',
      IconColor: '#008000',
      value: admins?.filter(a => a.status === 'active').length || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.social,
      heading: 'Total',
      subHeading: 'Roles',
      IconColor: '#0000FF',
      value: admins ? new Set(admins.map(a => a.role)).size : 0,
      changeStatus: 'up',
      subDetail: []
    },
  ]

  const handleAddAdmin = async () => {
    setAddError(null)
    if (!newAdmin.fullName || !newAdmin.email || !newAdmin.password) {
      setAddError('Please fill in all fields.')
      return
    }
    try {
      await createMutation.mutateAsync(newAdmin)
      setShowAddModal(false)
      setNewAdmin({ fullName: '', email: '', password: '', role: 'admin' })
    } catch (err: any) {
      setAddError(err?.response?.data?.message || err?.message || 'Failed to create admin.')
    }
  }

  return (
    <Horizontal>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          adminStats.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>

      <Vertical>
        <ItemAlign>
          <Dropdown
            options={[{ name: 'all', value: 'all' }, ...dates]}
            onChange={(val) => setDateFilter(val)}
            placeholder="Dates"
            position="left-0"
          />
          <Button handleFunction={() => setShowAddModal(true)}>Add new</Button>
        </ItemAlign>
        <SearchFilter handleFunction={(val) => setSearchText(val)} />
      </Vertical>

      {isLoading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading admins. Please try again.
        </div>
      ) : (
        <TableCan
          dataTr={filteredData}
          headerTr={['Name', 'Role', 'Status', 'Date', 'Action']}
          TrName={AdminRow}
        />
      )}

      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setAddError(null); }} title="Add New Admin">
        <div className="flex flex-col gap-4 p-4">
          <input
            type="text"
            placeholder="Full name"
            value={newAdmin.fullName}
            onChange={(e) => setNewAdmin({ ...newAdmin, fullName: e.target.value })}
            className="border p-2 border-gray-200 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="border p-2 border-gray-200 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            className="border p-2 border-gray-200 rounded"
          />

          {addError && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{addError}</p>
          )}

          <button
            onClick={handleAddAdmin}
            disabled={createMutation.isPending}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50 cursor-pointer"
          >
            {createMutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Modal>
    </Horizontal>
  )
}

export default AdminManagement
