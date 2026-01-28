import { Skeleton } from "@/components/ui/skeleton";

const TableLoader = () => {
  return (
    <div className="w-full overflow-auto min-h-screen">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
          <tr>
            {Array.from({ length: 5 }).map((_, index) => (
              <th
                key={`skeleton-header-${index}`}
                className="px-6 py-4 text-left font-semibold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wider"
              >
                <Skeleton className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <tr
              key={`skeleton-row-${rowIndex}`}
              className="transition-colors duration-150"
            >
              {Array.from({ length: 5 }).map((_, cellIndex) => (
                <td
                  key={`skeleton-cell-${rowIndex}-${cellIndex}`}
                  className="px-6 py-4"
                >
                  {cellIndex === 0 ? (
                    <Skeleton className="h-5 w-32" />
                  ) : cellIndex === 4 ? (
                    <Skeleton className="h-6 w-16 rounded-full" />
                  ) : (
                    <Skeleton className="h-5 w-20" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;
