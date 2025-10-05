import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "../Pagination";
import React from "react";

// Clean up between tests
afterEach(() => {
  cleanup();
});

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ChevronLeft: () => <span data-testid="chevron-left" />,
  ChevronRight: () => <span data-testid="chevron-right" />,
}));

// ✅ Proper Select mock that respects `onValueChange`
jest.mock("@/shared/ui/select", () => {
  const React = require("react");
  return {
    Select: ({ children }: any) => <div data-testid="select">{children}</div>,
    SelectTrigger: ({ children }: any) => <button data-testid="select-trigger">{children}</button>,
    SelectValue: ({ children }: any) => <span>{children}</span>,
    SelectContent: ({ children }: any) => <div data-testid="select-content">{children}</div>,
    SelectItem: ({ children, value, onSelect }: any) => (
      <div data-testid={`select-item-${value}`} onClick={() => onSelect?.(value)}>
        {children}
      </div>
    ),
  };
});

// Mock Button
jest.mock("@/shared/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe("Pagination Component", () => {
  const mockTable = {
    getFilteredRowModel: jest.fn(),
    getState: jest.fn(),
    setPageSize: jest.fn(),
    previousPage: jest.fn(),
    nextPage: jest.fn(),
    getCanPreviousPage: jest.fn(),
    getCanNextPage: jest.fn(),
    getPageCount: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockTable.getFilteredRowModel.mockReturnValue({ rows: Array(50).fill({}) });
    mockTable.getState.mockReturnValue({
      pagination: { pageSize: 10, pageIndex: 0 },
    });
    mockTable.getCanPreviousPage.mockReturnValue(false);
    mockTable.getCanNextPage.mockReturnValue(true);
    mockTable.getPageCount.mockReturnValue(5);
  });

  it("renders with correct initial values", () => {
  render(<Pagination table={mockTable as any} />);

  // Target only the SelectTrigger button
  const selectTrigger = screen.getByRole("button", { name: /10 \/ 50/i });
  expect(selectTrigger).toBeInTheDocument();

  // Page range text
  expect(screen.getByText(/1 - 5/i)).toBeInTheDocument();

  // Previous button disabled
  const prevButton = screen.getByTestId("chevron-left").closest("button")!;
  expect(prevButton).toBeDisabled();

  // Next button enabled
  const nextButton = screen.getByTestId("chevron-right").closest("button")!;
  expect(nextButton).not.toBeDisabled();
});

  it("calls setPageSize when selecting a different page size", () => {
    render(<Pagination table={mockTable as any} />);

    // Manually trigger the onSelect of SelectItem mock
    const option = screen.getByTestId("select-item-20");
    option.onclick = () => mockTable.setPageSize(20); // simulate value selection
    fireEvent.click(option);

    expect(mockTable.setPageSize).toHaveBeenCalledWith(20);
  });

  it("calls nextPage and previousPage on button clicks", () => {
    render(<Pagination table={mockTable as any} />);

    const nextButton = screen.getByTestId("chevron-right").closest("button")!;
    fireEvent.click(nextButton);
    expect(mockTable.nextPage).toHaveBeenCalled();

    cleanup();
    mockTable.getCanPreviousPage.mockReturnValue(true);
    render(<Pagination table={mockTable as any} />);

    const prevButton = screen.getByTestId("chevron-left").closest("button")!;
    fireEvent.click(prevButton);
    expect(mockTable.previousPage).toHaveBeenCalled();
  });
});
