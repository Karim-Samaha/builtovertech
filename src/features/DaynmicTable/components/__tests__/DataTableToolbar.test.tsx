// src/features/DaynmicTable/components/DataTableToolbar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTableToolbar } from "../DataTableToolbar";
import { schema } from "../../types/table_schema";

// Mock Pagination component
jest.mock("../Pagination", () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

// Mock table object
const mockTable = {
  getColumn: jest.fn(),
  getAllColumns: jest.fn(),
};

const defaultProps = {
  table: mockTable as any,
  schema,
  searchField: "first_name",
  searchValue: "",
  grouping: [],
  handleSearchField: jest.fn(),
  handleSearchValue: jest.fn(),
  handleGroup: jest.fn(),
};

describe("DataTableToolbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTable.getColumn.mockReturnValue({
      setFilterValue: jest.fn(),
    });
    mockTable.getAllColumns.mockReturnValue(
      schema.all_columns.map((col) => ({
        id: col.accessor_key,
        getCanHide: () => true,
        getIsVisible: () => true,
        toggleVisibility: jest.fn(),
      }))
    );
  });

  it("renders Add button", () => {
    render(<DataTableToolbar {...defaultProps} />);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("renders search input and calls handleSearchValue on change", () => {
    render(<DataTableToolbar {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search by first_name...");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test" } });
    expect(defaultProps.handleSearchValue).toHaveBeenCalledWith("test");
  });


  it("renders Pagination component", () => {
    render(<DataTableToolbar {...defaultProps} />);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
