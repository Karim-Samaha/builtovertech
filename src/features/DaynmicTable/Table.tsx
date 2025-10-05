"use client";
import { schema } from "./types/table_schema";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import { DataTableToolbar } from "./components/DataTableToolbar";
import { MockData } from "../../../dummyData";
import { useTable } from "./hooks/useTable";
import { useMemo } from "react";

function DaynmicTable() {
  const { table, columns, tableActionProps } = useTable({
    data: MockData,
    schema,
  });
  const headerGroups = useMemo(
    () => table.getHeaderGroups(),
    [table, tableActionProps]
  );
  const rows = useMemo(
    () => table.getRowModel().rows,
    [table, tableActionProps]
  );

  return (
    <div className="w-full">
      <DataTableToolbar schema={schema} table={table} {...tableActionProps} />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-0 h-[60px] ${
                    i % 2 === 0 ? "bg-white" : "bg-[#F5F7F8]"
                  } hover:bg-gray-200 transition-colors`}
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellValue = flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    );
                    
                    return (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                      >
                        {cellValue ?? "N/A"}

                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DaynmicTable;
