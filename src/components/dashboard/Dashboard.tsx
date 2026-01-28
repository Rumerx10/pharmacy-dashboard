"use client";
import GenericTable from "@/components/share/table/GenericTable";
import {
  getAdminColumns,
  getNewlyAddedItemColumns,
  getNsColumns,
  getTsColumns,
} from "@/lib/constants/tableColumns";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { useGetData } from "@/api/api";
import DashboardCards from "./DashboardCards";
import Header from "./Header";
import SalesSummaryChart from "./SalesSummaryChart";
import TopSellingBrandChart from "./TopSellingBrandChart";

const Dashboard = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [flag, setFlag] = useState("E");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [navToggle, setNavToggle] = useState(false);

  const url = `/get-inv-info?flag=${flag}&performBy=&appId=1&page=${currentPage}&size=${pageSize}`;
  const { data, isPending } = useGetData(
    ["items-data", flag, String(currentPage), String(pageSize)],
    url,
  );

  const tableData = data?.data?.contents ?? [];

  console.log("Table Data :: ", tableData);
  console.log("Response Data :: ", data);

  const paginationData = {
    currentPage: data?.data?.currentPage,
    totalItem: data?.data?.dataSize || 0,
    totalPage: data?.data?.totalPage || 1,
    pageSize: pageSize,
  };

  // Reset to page 0 (which will display as page 1 in UI) when flag or pageSize changes
  useEffect(() => {
    setCurrentPage(0);
  }, [flag, pageSize]);

  const columns =
    flag === "E"
      ? getAdminColumns()
      : flag === "N"
        ? getNewlyAddedItemColumns()
        : flag === "NS"
          ? getNsColumns()
          : getTsColumns();

  const table = useReactTable({
    data: tableData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      columnVisibility,
      pagination: { pageIndex: 0, pageSize: pageSize },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex flex-col gap-5 bg-[#f1f5f9] dark:bg-gray-900">
        <Header
          connectionStatus={connectionStatus}
          navToggle={navToggle}
          setNavToggle={setNavToggle}
        />
        <div
          className={`space-y-6 duration-300 ${navToggle ? "my-16" : "my-30"}`}
        >
          <DashboardCards setConnectionStatus={setConnectionStatus} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-4 lg:px-40 ">
            <SalesSummaryChart />
            <TopSellingBrandChart />
          </div>
          <section className="px-4 lg:px-40">
            <GenericTable
              flag={flag}
              setFlag={setFlag}
              currentPage={currentPage + 1} // Pass 1-based page to UI
              setCurrentPage={(page) => setCurrentPage(page - 1)} // Convert back to 0-based for backend
              pageSize={pageSize}
              setPageSize={setPageSize}
              table={table}
              isLoading={isPending}
              filtering={filtering}
              setFiltering={setFiltering}
              setSorting={setSorting}
              tableData={tableData.length}
              paginationData={paginationData}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
