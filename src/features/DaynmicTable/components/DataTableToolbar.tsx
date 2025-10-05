"use client";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Plus, Search, XIcon, Menu, Settings } from "lucide-react";
import { useEffect } from "react";
import { TableSchema } from "../types/types";
import { Table } from "@tanstack/react-table";
import { Pagination } from "./Pagination";

interface DataTableToolbarProps {
  table: Table<object>;
  schema: TableSchema;
  searchField: string;
  searchValue: string;
  grouping: string[];
  handleSearchField: (e: string) => void;
  handleSearchValue: (e: string) => void;
  handleGroup: (e: string[]) => void;
}
export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  table,
  schema,
  searchValue,
  searchField,
  grouping,
  handleSearchField,
  handleSearchValue,
  handleGroup,
}) => {
  useEffect(() => {
    const col = table.getColumn(searchField);
    if (col) col.setFilterValue(searchValue);
  }, [searchField, searchValue]);

  return (
    <div className="flex items-center py-4 space-x-4">
      <Button className="bg-[#03045E]">
        <Plus />
        <span>Add</span>
      </Button>
      <div className="flex items-center w-[60%]  rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 overflow-hidden">
        <Select value={searchField} onValueChange={handleSearchField}>
          <SelectTrigger className="w-[140px] border-none focus:ring-0 focus:ring-offset-0 text-sm bg-muted/40 rounded-none">
            <SelectValue placeholder="Field" />
          </SelectTrigger>
          <SelectContent>
            {schema.searchable_fields.map((field) => (
              <SelectItem key={field.key} value={field.key}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search
            color="#00B4D8"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            placeholder={`Search by ${searchField || "field"}...`}
            value={searchValue}
            onChange={(e) => handleSearchValue(e.target.value)}
            className="pl-8 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm rounded-none w-full"
          />
        </div>
      </div>

      <Select
        value={grouping[0] ?? ""}
        onValueChange={(value) => handleGroup(value ? [value] : [])}
      >
        <div className="relative w-[180px]">
          <SelectTrigger className="w-full text-sm pr-8">
            <SelectValue placeholder="Group by..." />
          </SelectTrigger>

          {grouping.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleGroup([]);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <SelectContent>
          {schema.all_columns
            .filter((c) => c.enable_grouping)
            .map((c) => (
              <SelectItem key={c.accessor_key} value={c.accessor_key}>
                {c.header}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div className="ml-auto flex gap-x-2">
        <Pagination table={table} />
        <Button variant="outline" className="bg-[#F5F7F8] cursor-pointer">
          <Settings color="#00B4D8" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-[#F5F7F8] cursor-pointer"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
