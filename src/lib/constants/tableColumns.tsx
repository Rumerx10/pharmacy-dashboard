import { TableData } from "@/types/types";
import { CellContext } from "@tanstack/react-table";

export const getActiveItemColumns = () => [
  {
    header: "Sl",
    accessorKey: "sl",
    enableHiding: false,
    cell: (info: CellContext<TableData, number>) => info.row.index + 1,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("itemName");
      return value ? value : "-";
    },
  },
  {
    header: "Generic Name",
    accessorKey: "genericName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("genericName");
      return value ? value : "-";
    },
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("supplierName");
      return value ? value : "-";
    },
  },
  {
    header: "Unit Price",
    accessorKey: "price",
    enableSorting: true,
    cell: (info: CellContext<TableData, number>) => {
      const value = info.getValue();
      return value ? `${value} BDT` : "0 BDT";
    },
  },
];

export const getTotalItemColumns = () => [
  {
    header: "Sl",
    accessorKey: "sl",
    enableHiding: false,
    cell: (info: CellContext<TableData, number>) => info.row.index + 1,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("itemName");
      return value ? value : "-";
    },
  },
  {
    header: "Generic Name",
    accessorKey: "genericName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("genericName");
      return value ? value : "-";
    },
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("supplierName");
      return value ? value : "-";
    },
  },
  {
    header: "Unit Price",
    accessorKey: "price",
    enableSorting: true,
    cell: (info: CellContext<TableData, number>) => {
      const value = info.getValue();
      return value ? `${value} BDT` : "0 BDT";
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info: CellContext<TableData, string>) => {
      const value = info.getValue();
      if (value === "Y") {
        return (
          <div className="rounded-full text-center text-green-600 px-2 py-1 bg-green-50">
            Active
          </div>
        );
      } else if (value === "N") {
        return (
          <div className="rounded-full text-red-600 px-2 py-1 bg-red-50">
            Inactive
          </div>
        );
      } else {
        return <div className="text-gray-500">-</div>;
      }
    },
  },
];

export const getForReorderItemColumns = () => [
  {
    header: "Sl",
    accessorKey: "sl",
    enableHiding: false,
    cell: (info: CellContext<TableData, number>) => info.row.index + 1,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("itemName");
      return value ? value : "-";
    },
  },
  {
    header: "Generic Name",
    accessorKey: "genericName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("genericName");
      return value ? value : "-";
    },
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("supplierName");
      return value ? value : "-";
    },
  },
  {
    header: "Unit Price",
    accessorKey: "price",
    enableSorting: true,
    cell: (info: CellContext<TableData, number>) => {
      const value = info.getValue();
      return value ? `${value} BDT` : "0 BDT";
    },
  },
  {
    header: "Quantity",
    accessorKey: "qty",
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("qty");
      return value !== undefined && value !== null ? value : "-";
    },
  },
];

export const getNewlyAddedItemColumns = () => [
  {
    header: "Sl",
    accessorKey: "sl",
    enableHiding: false,
    cell: (info: CellContext<TableData, number>) => info.row.index + 1,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("itemName");
      return value ? value : "-";
    },
  },
  {
    header: "Generic Name",
    accessorKey: "genericName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("genericName");
      return value ? value : "-";
    },
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("supplierName");
      return value ? value : "-";
    },
  },
  {
    header: "Unit Price",
    accessorKey: "price",
    enableSorting: true,
    cell: (info: CellContext<TableData, number>) => {
      const value = info.getValue();
      return value ? `${value} BDT` : "0 BDT";
    },
  },
  {
    header: "Stock Quantity",
    accessorKey: "qty",
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("qty");
      return value !== undefined && value !== null ? value : "-";
    },
  },
  {
    header: "Sell Quantity",
    accessorKey: "soldQty",
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("soldQty");
      return value !== undefined && value !== null ? value : "-";
    },
  },
];

export const getAdminColumns = () => [
  {
    header: "Sl",
    accessorKey: "sl",
    enableHiding: false,
    cell: (info: CellContext<TableData, number>) => info.row.index + 1,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("itemName");
      return value ? value : "-";
    },
  },
  {
    header: "Generic Name",
    accessorKey: "genericName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("genericName");
      return value ? value : "-";
    },
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("supplierName");
      return value ? value : "-";
    },
  },
  {
    header: "Unit Price",
    accessorKey: "price",
    enableSorting: true,
    cell: (info: CellContext<TableData, number>) => {
      const value = info.getValue();
      return value ? `${value} BDT` : "0 BDT";
    },
  },
  {
    header: "Quantity",
    accessorKey: "qty",
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("qty");
      return value !== undefined && value !== null ? value : "-";
    },
  },
  {
    header: "Total Price",
    accessorKey: "totalPrice",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("totalPrice");
      return value ? value : "-";
    },
  },
  {
    header: "Expired Date",
    accessorKey: "expDate",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("expDate");
      return value ? value : "-";
    },
  },
];

export const getTsColumns = () => [
  {
    header: "Rank",
    accessorKey: "rank",
    enableHiding: false,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("rank");
      return value !== undefined && value !== null ? value : "-";
    },
  },
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("itemName");
      return value ? value : "-";
    },
  },
  {
    header: "Generic Name",
    accessorKey: "genericName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("genericName");
      return value ? value : "-";
    },
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("supplierName");
      return value ? value : "-";
    },
  },
  {
    header: "Unit Price",
    accessorKey: "unitPrice",
    enableSorting: true,
    cell: (info: CellContext<TableData, number>) => {
      const value = info.getValue();
      return value ? `${value} BDT` : "0 BDT";
    },
  },
  {
    header: "Sold",
    accessorKey: "soldQty",
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("soldQty");
      return value !== undefined && value !== null ? value : "-";
    },
  },
  {
    header: "Total Amount",
    accessorKey: "totAmt",
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("totAmt");
      return value !== undefined && value !== null ? value : "-";
    },
  },
];

export const getNsColumns = () => [
  {
    header: "Rank",
    accessorKey: "rank",
    enableHiding: false,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }: CellContext<TableData, string | number>) => {
      const value = row.getValue("rank");
      return value !== undefined && value !== null ? value : "-";
    },
  },
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("itemName");
      return value ? value : "-";
    },
  },
  {
    header: "Generic Name",
    accessorKey: "genericName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("genericName");
      return value ? value : "-";
    },
  },
  {
    header: "Supplier Name",
    accessorKey: "supplierName",
    cell: ({ row }: CellContext<TableData, string>) => {
      const value = row.getValue("supplierName");
      return value ? value : "-";
    },
  },
  {
    header: "Unit Price",
    accessorKey: "price",
    enableSorting: true,
    cell: (info: CellContext<TableData, number>) => {
      const value = info.getValue();
      return value ? `${value} BDT` : "0 BDT";
    },
  },
];