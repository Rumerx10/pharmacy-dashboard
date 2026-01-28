const PieChartLoader = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full gap-6">
          {/* Chart Skeleton */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Outer ring skeleton */}
              <div className="w-[200px] h-[200px] rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse border-8 border-gray-50 dark:border-gray-900"></div>

              {/* Inner circle skeleton */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-gray-50 dark:bg-gray-900"></div>

              {/* Center text skeleton */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1 mx-auto"></div>
                {/* <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div> */}
              </div>
            </div>
          </div>

          {/* Legend Skeleton */}
          <div className="flex items-center">
            <div className="w-full">
              <div className="grid grid-cols-2 gap-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-full"></div>
                      {/* <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded animate-pulse w-1/3"></div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartLoader;
