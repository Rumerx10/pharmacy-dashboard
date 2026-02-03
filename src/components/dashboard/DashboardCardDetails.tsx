"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { useGetData } from "@/api/api";
import { Card } from "../ui/card";
import GenericTable from "../share/table/GenericTable";
import { RxCross2 } from "react-icons/rx";
import {
  getActiveItemColumns,
  getAdminColumns,
  getForReorderItemColumns,
  getNewlyAddedItemColumns,
  getTotalItemColumns,
} from "@/lib/constants/tableColumns";

interface DashboardCard {
  id: string;
  title: string;
}

interface DashboardCardDetailsProps {
  card: DashboardCard;
  onClose: () => void;
}

interface PaginationInfo {
  currentPage: number;
  totalItem: number;
  totalPage: number;
  pageSize: number;
}

export interface InventoryItem {
  rank: number;
  itemName: string;
  colorFlag: string;
  genericName: string;
  totalPrice: number;
  supplierName: string;
  price: number;
  qty: number;
  expDate: string;
  // Add other possible fields to match your TableData type
  sl?: number;
  status?: boolean;
  stock?: number;
  sellQty?: number;
  soldQty?: number;
  totAmt?: number;
}

const DashboardCardDetails = ({ card, onClose }: DashboardCardDetailsProps) => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filtering, setFiltering] = useState(""); // Add filtering state
  const [sorting, setSorting] = useState<SortingState>([]); // Add sorting state

  // Determine API endpoint based on card ID
  const getApiUrl = useMemo(() => {
    if (card.id === "ES") {
      return `/get-inv-info?flag=E&performBy=&appId=1&page=${currentPage}&size=${pageSize}`;
    } else if (card.id === "NA") {
      return `/get-inv-info?flag=N&performBy=&appId=1&page=${currentPage}&size=${pageSize}`;
    }
    return `/get-dash-summery-details?flag=${card.id}&page=${currentPage}&size=${pageSize}`;
  }, [card.id, currentPage, pageSize]);

  // Use the hook directly - no need for extra state management
  const { data, isPending, error } = useGetData(
    [
      "dashboardCard-data",
      card.id,
      currentPage.toString(),
      pageSize.toString(),
    ],
    getApiUrl,
  ) as {
    data: ApiResponse | undefined;
    isPending: boolean;
    error: Error | null;
  };

  // Extract data with safe defaults
  const tableData = useMemo(() => {
    if (!data?.data?.contents) return [];

    // Apply filtering locally if needed
    let filteredData = data.data.contents;

    if (filtering) {
      const searchTerm = filtering.toLowerCase();
      filteredData = filteredData.filter(
        (item: InventoryItem) =>
          item.itemName?.toLowerCase().includes(searchTerm) ||
          item.genericName?.toLowerCase().includes(searchTerm) ||
          item.supplierName?.toLowerCase().includes(searchTerm),
      );
    }
    return filteredData;
  }, [data, filtering, sorting]);

  const paginationData: PaginationInfo = useMemo(
    () => ({
      currentPage: data?.data?.currentPage ?? currentPage,
      totalItem: data?.data?.dataSize ?? 0,
      totalPage: data?.data?.totalPage ?? 0,
      pageSize: data?.data?.totalPage ?? 10,
    }),
    [data, currentPage, pageSize, tableData.length],
  );

  // Define table columns based on card type
  const columns = useMemo(() => {
    switch (card.id) {
      case "AI":
      case "NI":
      case "SO":
      case "TS":
        return getActiveItemColumns();
      case "RI":
        return getForReorderItemColumns();
      case "NA":
        return getNewlyAddedItemColumns();
      case "TI":
        return getTotalItemColumns();
      default:
        return getAdminColumns();
    }
  }, [card.id]);

  // Initialize React Table
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      pagination: {
        pageIndex: currentPage,
        pageSize,
      },
    },
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount: paginationData.totalPage,
  });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); // Convert to 0-based index
  };

  // Reset to first page when pageSize changes
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  // Add missing ApiResponse interface
  interface ApiResponse {
    statusCode: number;
    message: string;
    data: {
      dataSize: number;
      totalPage: number;
      currentPage: number;
      pageSize: number;
      contents: InventoryItem[];
    };
  }

  return (
    <Card
      className="w-full h-full flex flex-col bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()} // Simplified handler
    >
      {/* Modal Header */}
      <div className="mx-6 flex-shrink-0 flex items-center justify-between rounded-lg px-7 py-4 text-white bg-[#4C8876] font-medium">
        <h2 className="text-xl font-semibold">
          Inventory Update :: {card.title}
        </h2>
        <button
          onClick={onClose}
          className="border rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Close modal"
          type="button"
        >
          <RxCross2 size={24} />
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 m-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
          Error loading data: {error.message}
        </div>
      )}

      {/* Modal Content - Scrollable area */}
      <div className="flex-grow overflow-hidden p-6">
        <GenericTable
          flag={card.id}
          setFlag={() => {}} // Required prop but not needed
          currentPage={currentPage + 1} // Convert back to 1-based for UI
          setCurrentPage={handlePageChange}
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
          table={table}
          isLoading={isPending}
          filtering={filtering} // Pass filtering state
          setFiltering={setFiltering} // Pass setFiltering function
          setSorting={setSorting} // Pass setSorting function
          tableData={tableData.length}
          paginationData={paginationData}
          hideHeaderAndControl={true}
        />
      </div>
    </Card>
  );
};

export default DashboardCardDetails;
