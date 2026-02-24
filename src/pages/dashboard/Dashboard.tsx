import React, { useState } from "react";
import { Link } from "react-router-dom";
import Horizontal from "../../components/alignments/Horizontal";
import StatsCard from "../../components/StatsCard";
import SiteStatisticsChart from "./components/SiteStatisticsChart";
import Vertical from "../../components/alignments/Vertical";
import PostCan from "../../components/PostCan";
import TableCan from "../../components/TableCan";
import LatestUserRow from "./components/LatestUserRow";
import StatsCardSkeleton from "../../components/StatsCardSkeleton";
import TableSkeleton from "../../components/TableSkeleton";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetDashboardStats, useGetLatestUsers, useGetLatestPosts } from "../../utils/queries/dashboardQueries";
import images from "../../constants/images";

const Dashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useGetDashboardStats();
  const { data: latestUsers, isLoading: usersLoading, error: usersError } = useGetLatestUsers();
  const { data: latestPosts, isLoading: postsLoading, error: postsError } = useGetLatestPosts();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const usersData = latestUsers ?? [];
  const allSelected = usersData.length > 0 && usersData.every((u) => selectedIds.has(String(u.id)));
  const someSelected = usersData.some((u) => selectedIds.has(String(u.id)));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(usersData.map((u) => String(u.id))));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const sid = String(id);
      next.has(sid) ? next.delete(sid) : next.add(sid);
      return next;
    });
  };

  // Transform stats data to match StatsCard format
  const dashboardStatics = stats ? [
    {
      icon: images.user,
      heading: 'Total',
      subHeading: 'Users',
      IconColor: '#FF0000',
      value: stats.totalUsers || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.transaction,
      heading: 'Total',
      subHeading: 'Transactions',
      IconColor: '#0000FF',
      value: stats.totalTransactions || 0,
      changeStatus: 'up',
      subDetail: []
    },
    {
      icon: images.revenue,
      heading: 'Total',
      subHeading: 'Revenue',
      IconColor: '#008000',
      value: stats.totalRevenue || 0,
      changeStatus: 'up',
      subDetail: []
    },
  ] : [];

  return (
    <Horizontal>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {statsLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : statsError ? (
          <div className="col-span-3 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error loading dashboard stats. Please try again.
          </div>
        ) : (
          dashboardStatics.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-1 lg:col-span-8 ">
          <h2 className="text-2xl font-semibold  flex items-center gap-2 py-4 pb-4">
            Users Statistic
          </h2>
          <div className="p-4 w-full h-[400px] overflow-hidden bg-white rounded-lg shadow-lg border border-gray-300">
            <SiteStatisticsChart />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <Vertical>
            <h2 className="text-2xl font-semibold  flex items-center gap-2 py-4 pb-4">
              Latest Posts
            </h2>
            <Link
              to="/social"
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              View All
            </Link>
          </Vertical>
          <div className="p-1 w-full h-[400px] overflow-auto bg-white rounded-lg shadow-lg border border-gray-300 divide-gray-200">
            {postsLoading ? (
              <LoadingSpinner className="h-full" />
            ) : postsError ? (
              <div className="p-4 text-center text-red-600">
                Error loading posts
              </div>
            ) : latestPosts && latestPosts.length > 0 ? (
              latestPosts.map((item, index) => (
                <PostCan
                  key={index}
                  Description={item.description}
                  time={item.time}
                  profile_picture={item.profile_picture ?? undefined}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No posts available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl">Latest Users</h1>
        {usersLoading ? (
          <TableSkeleton rows={5} columns={7} />
        ) : usersError ? (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error loading users. Please try again.
          </div>
        ) : latestUsers && latestUsers.length > 0 ? (
          <TableCan
            headerTr={[
              "Full Name",
              "Username",
              "Email",
              "Phone number",
              "Age",
              "Last login",
              "Action"
            ]}
            dataTr={latestUsers}
            TrName={LatestUserRow}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
            TrPropsName={{
              selectedIds,
              onToggle: handleToggleRow,
            }}
          />
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-300 text-center text-gray-500">
            No users available
          </div>
        )}
      </div>
    </Horizontal>
  );
};

export default Dashboard;
