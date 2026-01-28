import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export interface DashboardDataType {
  reorderItem: number;
  inactiveItem: number;
  totalItem: number;
  expireItem: number;
  stockOutItem: number;
  activeItem: number;
  expireSoon: number;
  newlyAddedItem: number;
}

export interface DashboardCardDataType {
  id: string;
  cardTitle: string;
  number: number | undefined;
  percent: string;
  fIcon: ReactNode;
  bIcon: ReactNode;
  fIconBg: string;
}

export interface TableData {
  rank: number;
  itemName: string;
  genericName: string;
  supplierName: string;
  price: number;
  qty: number;
  totalPrice: number;
  expDate: string;
  isExpireSoon?: boolean;
  colorFlag:string;
}

export interface IGenericTableProps {
  flag: string;
  setFlag: (value: string) => void;
  table: Table<TableData>;
  isLoading: boolean;
  filtering: string;
  setFiltering: React.Dispatch<React.SetStateAction<string>>;
  setSorting: (value: { id: string; desc: boolean }[]) => void;
  filterModalOpen: boolean;
  setFilterModalOpen: (value: boolean) => void;
  tableData: [];
  paginationData?: {
    totalItem: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export interface IFilter {
  filtering: string;
  setFiltering: React.Dispatch<React.SetStateAction<string>>;
  setSorting: (value: { id: string; desc: boolean }[]) => void;
  table: object;
  data: [];
  open: boolean;
  setOpen: (open: boolean) => void;
  usersNumber?: number;
}

export interface PaginationProps {
  isLoading: boolean;
  currentPage: number;
  totalPage: number;
  setCurrentPage: (page: number) => void;
}
