import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ table }: { table: Table<object> }) => {
  const pageSizes = [10, 20, 50, 100];
  const total = table.getFilteredRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="items-center space-x-2 hidden lg:flex">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[100px] text-sm">
            <SelectValue asChild>
              <span>
                {Math.min(pageSize, total)} / {total}
              </span>
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {pageSizes.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} / {total}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 border-1 border-[#E9E9E9] rounded-[6px] min-w-[120px]">
        <Button
          variant="outline"
          size="sm"
          className="border-none shadow-none text-[#819AA7] cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>

        <span className="text-sm">
          {table.getState().pagination.pageIndex + 1} - {table.getPageCount()}
        </span>

        <Button
          variant="outline"
          size="sm"
          className="border-none shadow-none text-[#819AA7] cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
