import {
  ColumnFiltersState,
  GroupingState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { TableSchema } from "../types/types";

export const useTableActions = ({ schema }: { schema: TableSchema }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchField, setSearchField] = useState(
    schema.searchable_fields[0].key
  );
  const [searchValue, setSearchValue] = useState("");
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState({});

  const defaultVisibilityMap = useMemo(() => {
    const visibleKeys = new Set(schema.default_visibility.map((v) => v.key));
    return schema.all_columns.reduce<Record<string, boolean>>((acc, col) => {
      acc[col.accessor_key] = visibleKeys.has(col.accessor_key);
      return acc;
    }, {});
  }, []);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultVisibilityMap);

  const handleSorting = useCallback(
    (newSorting: SortingState) => setSorting(newSorting),
    []
  );

  const handleColumnFilters = useCallback(
    (newFilters: ColumnFiltersState) => setColumnFilters(newFilters),
    []
  );

  const handleRowSelection = useCallback(
    (newSelection: typeof rowSelection) => setRowSelection(newSelection),
    []
  );

  const handleSearchField = useCallback(
    (field: string) => setSearchField(field),
    []
  );

  const handleSearchValue = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const handleExpanded = useCallback(
    (newExpanded: typeof expanded) => setExpanded(newExpanded),
    []
  );

  const handleGroup = useCallback(
    (columnKey) => {
      setColumnVisibility((prev) => ({
        ...prev,
        [columnKey]: true,
      }));

      setGrouping(columnKey);
    },
    [setColumnVisibility, setGrouping]
  );
  return {
    searchField,
    searchValue,
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
    handleSearchField,
    handleSearchValue,
  };
};
