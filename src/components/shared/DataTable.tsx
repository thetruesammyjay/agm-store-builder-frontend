"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  onRowClick,
  isLoading,
  emptyMessage = "No data found."
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
        <div className="h-12 w-full bg-gray-50 rounded animate-pulse" />
        <div className="h-12 w-full bg-gray-50 rounded animate-pulse" />
        <div className="h-12 w-full bg-gray-50 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className={cn("font-semibold text-gray-700", col.className)}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow 
                key={row.id} 
                className={cn("hover:bg-gray-50/50", onRowClick && "cursor-pointer")}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col, index) => (
                  <TableCell key={index} className={col.className}>
                    {col.cell 
                      ? col.cell(row) 
                      : col.accessorKey 
                        ? String(row[col.accessorKey]) 
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}