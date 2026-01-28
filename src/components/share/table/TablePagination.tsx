"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationProps } from "@/types/types";
import React, { useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TablePagination: React.FC<PaginationProps> = ({
  isLoading,
  currentPage,
  totalPage,
  setCurrentPage,
}) => {
  const pages = useMemo(() => {
    if (totalPage <= 1) return [1];

    const pages: (number | string)[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPage - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPage - 1) pages.push("...");
    if (totalPage > 1) pages.push(totalPage);

    return pages;
  }, [currentPage, totalPage]);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPage;

  const handlePrev = () => setCurrentPage(Math.max(1, currentPage - 1));
  const handleNext = () => setCurrentPage(Math.min(totalPage, currentPage + 1));

  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="outline"
        className="cursor-pointer"
        type="button"
        onClick={handlePrev}
        disabled={!canGoPrev}
      >
        <IoIosArrowBack />
      </Button>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <div className="flex gap-2" key={idx}>
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => setCurrentPage(page)}
              variant={page === currentPage ? "activeBtn" : "outline"}
            >
              {page}
            </Button>
            {isLoading && (
              <>
                <Skeleton>
                  <div className="w-9 h-9"></div>
                </Skeleton>
                <Skeleton>
                  <div className="w-9 h-9"></div>
                </Skeleton>
                <Skeleton>
                  <div className="w-9 h-9"></div>
                </Skeleton>
                <Skeleton>
                  <div className="w-9 h-9"></div>
                </Skeleton>
                <Skeleton>
                  <div className="w-9 h-9"></div>
                </Skeleton>
                <Skeleton>
                  <div className="w-9 h-9"></div>
                </Skeleton>
              </>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            key={idx}
            className="px-3 text-gray-500 select-none"
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        className="cursor-pointer"
        type="button"
        onClick={handleNext}
        disabled={!canGoNext}
      >
        <IoIosArrowForward />
      </Button>
    </div>
  );
};

export default TablePagination;
