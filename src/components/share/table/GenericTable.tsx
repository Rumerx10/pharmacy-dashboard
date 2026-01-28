"use client";
import TableContent from "@/components/share/table/TableContent";
import { Card, CardContent } from "@/components/ui/card";
import { IGenericTableProps } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";

const GenericTable = ({
  flag,
  setFlag,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  table,
  isLoading,
  filtering,
  setFiltering,
  // setSorting,
  tableData,
  paginationData,
  hideHeaderAndControl = false,
}: {
  flag: string;
  setFlag: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  table: IGenericTableProps["table"];
  isLoading: boolean;
  filtering?: string;
  setFiltering: (value: string) => void;
  setSorting: (value: { id: string; desc: boolean }[]) => void;
  tableData: number;
  paginationData: IGenericTableProps["paginationData"];
  hideHeaderAndControl?: boolean;
}) => {
  // Handle sorting for unit price column
  // const handleUnitPriceSort = () => {
  //   const currentSort = table.getState().sorting;
  //   const priceSort = currentSort.find((sort) => sort.id === "price");

  //   if (!priceSort) {
  //     // If not currently sorted by price, sort ascending
  //     setSorting([{ id: "price", desc: false }]);
  //   } else if (!priceSort.desc) {
  //     // If ascending, switch to descending
  //     setSorting([{ id: "price", desc: true }]);
  //   } else {
  //     // If descending, remove sort
  //     setSorting([]);
  //   }
  // };

  // Get current sort state for price column
  // const getPriceSortState = () => {
  //   const currentSort = table.getState().sorting;
  //   const priceSort = currentSort.find((sort) => sort.id === "price");

  //   if (!priceSort) return "none";
  //   return priceSort.desc ? "desc" : "asc";
  // };

  // const priceSortState = getPriceSortState();

  return (
    <div className="h-full flex flex-col">
      <Card className="flex flex-col py-0 h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            All Item List
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {/* Column Visibility Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-gray-300 dark:border-gray-600"
                  disabled={isLoading}
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Columns</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white dark:bg-gray-800"
              >
                {table
                  ?.getAllColumns()
                  .filter(
                    (column) =>
                      column.getCanHide() &&
                      column.id !== "select" && // only real data columns
                      typeof column.columnDef.header === "string", // ensures label exists
                  )
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.columnDef.header as string}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Unit Price Sort Button */}
            {/* <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600"
              onClick={handleUnitPriceSort}
              disabled={isLoading}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Sort by Price</span>
              {priceSortState === "asc" && <ChevronUp className="h-4 w-4" />}
              {priceSortState === "desc" && <ChevronDown className="h-4 w-4" />}
              {priceSortState === "none" && (
                <div className="h-4 w-4 flex items-center justify-center">
                  <span className="text-xs">-</span>
                </div>
              )}
            </Button> */}

            {/* Global Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {!hideHeaderAndControl && (
          <div className="flex-shrink-0 px-6 pt-6">
            <div className="relative flex gap-8">
              {["E", "N", "TS", "NS"].map((tabFlag) => {
                const tabLabels = {
                  E: "Expiring Soon",
                  N: "Newly Added",
                  TS: "Top Selling",
                  NS: "Not Selling",
                };

                const isActive = flag === tabFlag;

                return (
                  <div key={tabFlag} className="relative">
                    <button
                      className={`cursor-pointer px-2 py-4 transition-colors text-base font-medium ${
                        isActive
                          ? "text-gray-900 dark:text-gray-100"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                      onClick={() => setFlag(tabFlag)}
                      // disabled={isLoading}
                    >
                      {tabLabels[tabFlag as keyof typeof tabLabels]}
                      {isLoading && isActive && " (Loading...)"}
                    </button>
                    <div
                      className={`absolute bottom-0 left-0 h-1.5 bg-[#4C8876] rounded transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 opacity-0"
                      }`}
                    />
                  </div>
                );
              })}
              <hr className="absolute left-0 right-0 bottom-0 border-t border-gray-300 dark:border-gray-700" />
            </div>
          </div>
        )}

        <CardContent className="flex-grow overflow-hidden p-0">
          <TableContent
            table={table}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={paginationData?.totalPage || 1}
            totalItems={paginationData?.totalItem || 0}
            isLoading={isLoading}
            tableData={tableData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericTable;
