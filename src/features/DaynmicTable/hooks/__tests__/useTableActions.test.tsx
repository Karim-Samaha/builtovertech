import { renderHook, act } from "@testing-library/react";
import { useTableActions } from "../useTableActions";
import { schema } from "../../types/table_schema";

describe("useTableActions hook", () => {
  it("initializes with correct default state", () => {
    const { result } = renderHook(() => useTableActions({ schema }));

    expect(result.current.searchField).toBe(schema.searchable_fields[0].key);
    expect(result.current.searchValue).toBe("");
    expect(result.current.sorting).toEqual([]);
    expect(result.current.columnFilters).toEqual([]);
    expect(result.current.rowSelection).toEqual({});
    expect(result.current.grouping).toEqual([]);
    expect(result.current.expanded).toEqual({});

    // columnVisibility matches default_visibility
    schema.all_columns.forEach((col) => {
      const shouldBeVisible = schema.default_visibility.some(
        (v) => v.key === col.accessor_key
      );
      expect(result.current.columnVisibility[col.accessor_key]).toBe(
        shouldBeVisible
      );
    });
  });

  it("updates sorting state", () => {
    const { result } = renderHook(() => useTableActions({ schema }));

    act(() => {
      result.current.handleSorting([{ id: "first_name", desc: true }]);
    });

    expect(result.current.sorting).toEqual([{ id: "first_name", desc: true }]);
  });

  it("updates columnFilters state", () => {
    const { result } = renderHook(() => useTableActions({ schema }));

    act(() => {
      result.current.handleColumnFilters([{ id: "age", value: 30 }]);
    });

    expect(result.current.columnFilters).toEqual([{ id: "age", value: 30 }]);
  });

  it("updates rowSelection state", () => {
    const { result } = renderHook(() => useTableActions({ schema }));

    act(() => {
      result.current.handleRowSelection({ "row-1": true });
    });

    expect(result.current.rowSelection).toEqual({ "row-1": true });
  });

  it("updates searchField and searchValue", () => {
    const { result } = renderHook(() => useTableActions({ schema }));

    act(() => {
      result.current.handleSearchField("last_name");
      result.current.handleSearchValue("Smith");
    });

    expect(result.current.searchField).toBe("last_name");
    expect(result.current.searchValue).toBe("Smith");
  });

  it("updates expanded state", () => {
    const { result } = renderHook(() => useTableActions({ schema }));

    act(() => {
      result.current.handleExpanded({ "row-2": true });
    });

    expect(result.current.expanded).toEqual({ "row-2": true });
  });

  it("updates grouping and column visibility", () => {
    const { result } = renderHook(() => useTableActions({ schema }));
    const columnKey = schema.all_columns[0].accessor_key;

    act(() => {
      result.current.handleGroup(columnKey);
    });

    expect(result.current.grouping).toEqual(columnKey);
    expect(result.current.columnVisibility[columnKey]).toBe(true);
  });
});
