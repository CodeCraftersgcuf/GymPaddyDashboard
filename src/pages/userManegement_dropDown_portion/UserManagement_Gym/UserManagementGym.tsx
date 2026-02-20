import React, { useMemo, useState } from "react";
import { userTableHeaders } from "../../../constants/Data";
import Horizontal from "../../../components/alignments/Horizontal";
import StatsCard from "../../../components/StatsCard";
import StatsCardSkeleton from "../../../components/StatsCardSkeleton";
import TableSkeleton from "../../../components/TableSkeleton";
import Vertical from "../../../components/alignments/Vertical";
import ItemAlign from "../../../components/alignments/ItemAlign";
import Dropdown from "../../../components/Dropdown";
import { bulkFilter, UserActiveStatus } from "../../../constants/FiltersData";
import Button from "../../../components/Buttons/Button";
import SearchFilter from "../../../components/SearchFilter";
import TableCan from "../../../components/TableCan";
import UserRow from "../../userManagement/components/UserRow";
import UserFormModal from "../../userManagement/components/AddUserModal";
import { useGetUserStatsBySection, useGetAllUsers } from "../../../utils/queries/userQueries";
import images from "../../../constants/images";

const UserManagementGym: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: sectionStats, isLoading: statsLoading } = useGetUserStatsBySection();
  const { data: users, isLoading: usersLoading } = useGetAllUsers();

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

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((user) => {
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        user.fullName?.toLowerCase().includes(q) ||
        user.username?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [users, statusFilter, searchQuery]);

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
            onChange={(val) => setStatusFilter(val)}
            placeholder="Status"
            position="left-0"
          />
          <Dropdown
            options={bulkFilter}
            onChange={(val) => console.log("Bulk:", val)}
            placeholder="Bulk Actions"
            position="left-0"
          />
        </ItemAlign>
        <ItemAlign>
          <Button handleFunction={() => setModalOpen(true)}>Add New User</Button>
          <SearchFilter handleFunction={(val) => setSearchQuery(val)} />
        </ItemAlign>
      </Vertical>

      {usersLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : (
        <TableCan
          headerTr={userTableHeaders}
          dataTr={filteredUsers}
          TrName={UserRow}
        />
      )}

      <UserFormModal
        onSubmit={(values) => { console.log("Form submitted:", values); setModalOpen(false); }}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Horizontal>
  );
};

export default UserManagementGym;
