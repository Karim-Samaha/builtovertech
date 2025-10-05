import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { ChevronRight, ChevronsUpDown } from "lucide-react";
import clsx from "clsx";
import { TableSchema } from "../types/types";

export function buildColumnsFromSchema<TData extends object>(
  schema: TableSchema
): ColumnDef<TData>[] {
  const columns: ColumnDef<TData>[] = schema.all_columns.map(
    (col): ColumnDef<TData> => {
      const base: ColumnDef<TData> = {
        accessorKey: col.accessor_key,
        header: ({ column }) => {
          if (!col.enable_sorting) return col.header;
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {col.header}
              <ChevronsUpDown
                className="ml- text-[#00B4D8]"
                style={{ width: 25, height: 25 }}
              />
            </Button>
          );
        },
        cell: ({ row }: { row: Row<TData> }) => {
          const value = row.getValue(col.accessor_key) as string | undefined;

          if (row.getIsGrouped()) {
            const toggle = row.getToggleExpandedHandler();
            const isExpanded = row.getIsExpanded();

            return (
              <div
                onClick={toggle}
                className="flex items-center gap-2 font-semibold cursor-pointer select-none"
              >
                <ChevronRight
                  className={clsx(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
                <span>{value}</span>
                <span className="text-muted-foreground text-xs">
                  ({row.subRows.length})
                </span>
              </div>
            );
          }

          // ✅ Image column
          if (col.type === "image" && col.url && value) {
            return (
              <img
                src={`${col.url}${value}`}
                alt={col.header}
                className="h-8 w-8 rounded object-cover"
              />
            );
          }

          // ✅ Normal text
          return <div>{String(value ?? "")}</div>;
        },

        enableSorting: !!col.enable_sorting,
        enableGrouping: !!col.enable_grouping,
        enableHiding: true,
        enableColumnFilter: !!col.enable_column_filter,

        filterFn:
          col.accessor_key === "id"
            ? (row, columnId, filterValue) => {
                const cellValue = row.getValue(columnId);
                if (cellValue == null || filterValue == null) return false;

                const cellStr = String(cellValue).toLowerCase();
                const filterStr = String(filterValue).toLowerCase();

                return cellStr.includes(filterStr);
              }
            : "includesString",

        size: col.size ?? 150,
        minSize: col.size ? Math.max(60, col.size * 0.8) : 100,
        maxSize: col.size ? col.size * 1.5 : 300,
      };

      return base;
    }
  );

  const selectColumn: ColumnDef<TData> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") || false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-6 h-6"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="w-6 h-6"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 40,
    maxSize: 60,
  };

  return [selectColumn, ...columns];
}
