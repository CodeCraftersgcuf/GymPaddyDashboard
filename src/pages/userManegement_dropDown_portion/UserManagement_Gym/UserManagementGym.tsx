import React, { useState } from "react";
import { userTableHeaders } from "../../../constants/Data";
import Horizontal from "../../../components/alignments/Horizontal";
import StatsCard from "../../../components/StatsCard";
import StatsCardSkeleton from "../../../components/StatsCardSkeleton";
import TableSkeleton from "../../../components/TableSkeleton";
import Vertical from "../../../components/alignments/Vertical";
import ItemAlign from "../../../components/alignments/ItemAlign";
import Dropdown from "../../../components/Dropdown";
import { bulkFilter, UserActiveStatus } from "../../../constants/FiltersData";
import { exportToCsv } from "../../../utils/exportCsv";
import Button from "../../../components/Buttons/Button";
import SearchFilter from "../../../components/SearchFilter";
import TableCan from "../../../components/TableCan";
import UserRow from "../../userManagement/components/UserRow";
import UserFormModal from "../../userManagement/components/AddUserModal";
import Pagination from "../../../components/Pagination";
import { fetchAllUsersForExport, useGetUserStatsBySection, useGetAllUsers } from "../../../utils/queries/userQueries";
import { useCreateUser } from "../../../utils/mutations/userMutations";
import images from "../../../constants/images";

const ITEMS_PER_PAGE = 20;

const UserManagementGym: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: sectionStats, isLoading: statsLoading } = useGetUserStatsBySection();
  const { data: usersPage, isLoading: usersLoading } = useGetAllUsers(currentPage, ITEMS_PER_PAGE, {
    search: searchQuery,
    status: statusFilter,
  });
  const users = usersPage?.users ?? [];
  const pagination = usersPage?.pagination;
  const createUserMutation = useCreateUser();

  const statCards = sectionStats
    ? [
        {
          icon: images.user,
          heading: "Total",
          subHeading: "Users",
          IconColor: "#8B0000",
          value: sectionStats.totalUsers,
          changeStatus: "up",
          subDetail: [],
        },
        {
          icon: images.social,
          heading: "Social",
          subHeading: "Users",
          IconColor: "#FF0000",
          value: sectionStats.socialUsers,
          changeStatus: "up",
          subDetail: [],
        },
        {
          icon: images.love,
          heading: "Connect",
          subHeading: "Users",
          IconColor: "#0000FF",
          value: sectionStats.connectUsers,
          changeStatus: "up",
          subDetail: [],
        },
        {
          icon: images.marketIcon,
          heading: "Marketplace",
          subHeading: "Users",
          IconColor: "#008000",
          value: sectionStats.marketplaceUsers,
          changeStatus: "up",
          subDetail: [],
        },
        {
          icon: images.gym,
          heading: "Gym Hub",
          subHeading: "Users",
          IconColor: "#800080",
          value: sectionStats.gymHubUsers,
          changeStatus: "up",
          subDetail: [],
        },
      ]
    : [];

  const filteredUsers = users;

  const handleBulkAction = async (value: string) => {
    if (value !== 'ExportASCSV') return;

    try {
      const exportUsers = await fetchAllUsersForExport({
        status: statusFilter,
        search: searchQuery,
      });
      exportToCsv(exportUsers, 'users');
    } catch (error) {
      console.error('Failed to export users CSV:', error);
      window.alert('Failed to export users. Please try again.');
    }
  };

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
          statCards.map((item, index) => <StatsCard {...item} key={index} />)
        )}
      </div>

      <h1 className="text-2xl font-medium">Gym Hub Users</h1>

      <Vertical>
        <ItemAlign>
          <Dropdown
            options={UserActiveStatus}
            onChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
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
          <Button handleFunction={() => setModalOpen(true)}>Add New User</Button>
          <SearchFilter handleFunction={(val) => { setSearchQuery(val); setCurrentPage(1); }} />
        </ItemAlign>
      </Vertical>

      {usersLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : (
        <>
          <TableCan
            headerTr={userTableHeaders}
            dataTr={filteredUsers}
            TrName={UserRow}
          />
          {pagination && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      )}

      <UserFormModal
        onSubmit={async (values) => { await createUserMutation.mutateAsync(values); setModalOpen(false); }}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Horizontal>
  );
};

export default UserManagementGym;
