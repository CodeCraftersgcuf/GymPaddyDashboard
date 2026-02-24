import React, { useMemo, useState } from "react";
import { exportToCsv } from "../../utils/exportCsv";
import Horizontal from "../../components/alignments/Horizontal";
import { userTableHeaders } from "../../constants/Data";
import StatsCard from "../../components/StatsCard";
import ItemAlign from "../../components/alignments/ItemAlign";
import Dropdown from "../../components/Dropdown";
import { bulkFilter, UserActiveStatus } from "../../constants/FiltersData";
import Vertical from "../../components/alignments/Vertical";
import SearchFilter from "../../components/SearchFilter";
import Button from "../../components/Buttons/Button";
import TableCan from "../../components/TableCan";
import Pagination from "../../components/Pagination";
import UserRow from "./components/UserRow";
import UserFormModal from "./components/AddUserModal";
import StatsCardSkeleton from "../../components/StatsCardSkeleton";
import TableSkeleton from "../../components/TableSkeleton";
import { fetchAllUsersForExport, useGetAllUsers, useGetUserStats } from "../../utils/queries/userQueries";
import { useCreateUser } from "../../utils/mutations/userMutations";
import images from "../../constants/images";

const ITEMS_PER_PAGE = 20;

const UserManagement: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setmodalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const { data, isLoading: usersLoading, error: usersError } = useGetAllUsers(currentPage, ITEMS_PER_PAGE);
  const { data: stats, isLoading: statsLoading } = useGetUserStats();
  const createUserMutation = useCreateUser();

  const users = data?.users || [];
  const pagination = data?.pagination;

  const handleBulkAction = async (value: string) => {
    if (value !== 'ExportASCSV') return;

    try {
      if (selectedIds.size > 0) {
        const selectedUsers = filteredUsers.filter((user) => selectedIds.has(user.id));
        exportToCsv(selectedUsers, 'users');
        return;
      }

      const allUsers = await fetchAllUsersForExport({
        status: statusFilter,
        search: searchQuery,
      });
      exportToCsv(allUsers, 'users');
    } catch (error) {
      console.error('Failed to export users CSV:', error);
      window.alert('Failed to export users. Please try again.');
    }
  };

  const handleOnlineStatus = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds(new Set());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredUsers = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];
    return users.filter((user) => {
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      const matchesSearch =
        user.fullName?.toLowerCase().includes(searchQuery) ||
        user.username?.toLowerCase().includes(searchQuery) ||
        user.email?.toLowerCase().includes(searchQuery);
      return matchesStatus && matchesSearch;
    });
  }, [users, statusFilter, searchQuery]);

  const allSelected = filteredUsers.length > 0 && filteredUsers.every((u) => selectedIds.has(u.id));
  const someSelected = filteredUsers.some((u) => selectedIds.has(u.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredUsers.map((u) => u.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = async (values: any) => {
    await createUserMutation.mutateAsync(values);
    setmodalOpen(false);
  };

  const userStatics = stats ? [
    {
      icon: images.user,
      heading: 'Total',
      subHeading: 'Users',
      IconColor: '#A52A2A',
      value: stats.totalUsers || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.social,
      heading: 'Active',
      subHeading: 'Users',
      IconColor: '#FF0000',
      value: stats.activeUsers || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.user,
      heading: 'New',
      subHeading: 'Today',
      IconColor: '#0000FF',
      value: stats.newUsersToday || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.user,
      heading: 'Online',
      subHeading: 'Users',
      IconColor: '#008000',
      value: stats.onlineUsers || 0,
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
          </>
        ) : (
          userStatics.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>

      <Vertical>
        <ItemAlign>
          <Dropdown
            options={UserActiveStatus}
            onChange={handleOnlineStatus}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkFilter}
            onChange={handleBulkAction}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemAlign>

        <ItemAlign>
          <Button handleFunction={() => setmodalOpen(true)}>Add New User</Button>
          <SearchFilter handleFunction={handleSearch} />
        </ItemAlign>
      </Vertical>

      {someSelected && (
        <div className="flex items-center gap-3 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm">
          <span className="font-medium text-red-600">{selectedIds.size} user{selectedIds.size !== 1 ? 's' : ''} selected</span>
          <button onClick={() => setSelectedIds(new Set())} className="text-gray-500 hover:text-gray-700 underline">
            Clear
          </button>
        </div>
      )}

      {usersLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : usersError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading users. Please try again.
        </div>
      ) : (
        <div>
          <TableCan
            headerTr={userTableHeaders}
            dataTr={filteredUsers}
            TrName={UserRow}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
            TrPropsName={{
              selectedIds,
              onToggle: handleToggleRow,
            }}
          />
          {pagination && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}

      <UserFormModal
        onSubmit={handleSubmit}
        isOpen={modalOpen}
        onClose={() => setmodalOpen(false)}
      />
    </Horizontal>
  );
};

export default UserManagement;
