import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { useTableActions } from "./useTableActions";
import { buildColumnsFromSchema } from "../components/buildColumnsFromSchema";
import { TableSchema } from "../types/types";

export const useTable = ({
  data,
  schema,
}: {
  data: object[];
  schema: TableSchema;
}) => {
  const columns = useMemo(() => buildColumnsFromSchema(schema), []);

  const {
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    grouping,
    expanded,
    handleSorting,
    handleColumnFilters,
    handleRowSelection,
    handleGroup,
    handleExpanded,
    setColumnVisibility,
    searchField,
    searchValue,
    handleSearchField,
    handleSearchValue,
  } = useTableActions({ schema });
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      grouping,
      expanded,
    },
    onSortingChange: handleSorting,
    onColumnFiltersChange: handleColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: handleRowSelection,
    onGroupingChange: handleGroup,
    onExpandedChange: handleExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: grouping.length > 0 ? getGroupedRowModel() : undefined,
    getExpandedRowModel: getExpandedRowModel(),
  });
  useEffect(() => {
    const col = table.getColumn(searchField);
    console.log({ col });
    if (col) col.setFilterValue(searchValue);
  }, [searchField, searchValue]);
  return {
    table,
    columns,
    tableActionProps: {
      searchField,
      handleSearchField,
      searchValue,
      handleSearchValue,
      grouping,
      handleGroup,
    },
  };
};
