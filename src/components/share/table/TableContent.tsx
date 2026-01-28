import { Table } from "@tanstack/react-table";
import { TableData } from "@/types/types";
import { flexRender } from "@tanstack/react-table";
import TablePagination from "./TablePagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FcDataSheet } from "react-icons/fc";
import TableLoader from "@/components/TableLoader";

const TableContent = ({
  table,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalPage,
  totalItems,
  isLoading,
  tableData,
}: {
  table: Table<TableData>;
  currentPage: number;
  totalPage: number;
  pageSize: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  isLoading: boolean;
  tableData: number;
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Scrollable Table Area */}
      <div className="flex-grow overflow-auto scrollbar-none">
        {isLoading ? (
          <TableLoader />
        ) : tableData === 0 ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-gray-400 flex items-center justify-center dark:text-gray-500 text-6xl mb-4">
                <FcDataSheet />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                No data available
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                There are no records to display
              </p>
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left font-semibold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wider"
                      >
                        <div
                          {...{
                            className:
                              "flex items-center gap-2 cursor-pointer select-none",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getIsSorted() && (
                            <span className="text-xs">
                              {header.column.getIsSorted() === "asc"
                                ? "↑"
                                : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {table.getRowModel().rows.map((row) => {
                  const highlight = row.original?.colorFlag === "R";
                  return (
                    <tr
                      key={row.id}
                      className={`
                        transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50
                        ${
                          highlight
                            ? "bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20"
                            : ""
                        }
                      `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-gray-700 dark:text-gray-300 text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      {tableData > 0 && (
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Total:
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {totalItems.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                  Rows per page:
                </span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) =>
                    setPageSize(value === "all" ? totalItems : Number(value))
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-[100px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30, 40, 50].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TablePagination
              isLoading={isLoading}
              currentPage={currentPage}
              totalPage={totalPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableContent;
