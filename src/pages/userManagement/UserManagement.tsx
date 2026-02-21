import React, { useMemo, useState } from "react";
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
import UserRow from "./components/UserRow";
import UserFormModal from "./components/AddUserModal";
import StatsCardSkeleton from "../../components/StatsCardSkeleton";
import TableSkeleton from "../../components/TableSkeleton";
import { useGetAllUsers, useGetUserStats } from "../../utils/queries/userQueries";
import { useCreateUser } from "../../utils/mutations/userMutations";
import images from "../../constants/images";

const UserManagement: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setmodalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users, isLoading: usersLoading, error: usersError } = useGetAllUsers();
  const { data: stats, isLoading: statsLoading } = useGetUserStats();
  const createUserMutation = useCreateUser();

  const handleBulkAction = (value: string) => {
    console.log("Bulk action:", value);
  };
  
  const handleOnlineStatus = (value: string) => {
    setStatusFilter(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
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

  const handleSubmit = async (values: any) => {
    await createUserMutation.mutateAsync(values);
    setmodalOpen(false);
  };

  // Transform stats data to match StatsCard format
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

      {usersLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : usersError ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading users. Please try again.
        </div>
      ) : (
        <TableCan
          headerTr={userTableHeaders}
          dataTr={filteredUsers}
          TrName={UserRow}
        />
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
