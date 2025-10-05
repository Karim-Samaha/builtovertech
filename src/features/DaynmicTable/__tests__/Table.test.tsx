import React from "react";
import { render, screen } from "@testing-library/react";
import DaynmicTable from "../Table";
import { schema } from "../types/table_schema";
import { MockData } from "../../../../dummyData";

// Fully mock useTable before importing the component
jest.mock("../hooks/useTable", () => ({
  useTable: jest.fn(() => {
    const columns = schema.all_columns;

    return {
      table: {
        getHeaderGroups: () => [
          {
            id: "header-group",
            headers: columns.map((col, idx) => ({
              id: `header-${idx}`,
              isPlaceholder: false,
              column: { columnDef: col },
              getContext: () => ({}),
              getSize: () => col.size ?? 100,
            })),
          },
        ],
        getRowModel: () => ({
          rows: MockData.map((row, idx) => ({
            id: `row-${idx}`,
            getVisibleCells: () =>
              columns.map((col) => ({
                id: `cell-${idx}-${col.accessor_key}`,
                column: { getSize: () => col.size ?? 100, columnDef: col },
                getContext: () => ({ row, column: col }),
              })),
            getIsSelected: () => false,
          })),
        }),
      },
      columns,
      tableActionProps: {},
    };
  }),
}));

jest.mock("../components/DataTableToolbar", () => ({
  DataTableToolbar: () => <div data-testid="toolbar" />,
}));

jest.mock("@/shared/ui/Table", () => ({
  Table: ({ children }: any) => <table>{children}</table>,
  TableHeader: ({ children }: any) => <thead>{children}</thead>,
  TableRow: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  TableHead: ({ children, ...props }: any) => <th {...props}>{children}</th>,
  TableBody: ({ children }: any) => <tbody>{children}</tbody>,
  TableCell: ({ children, ...props }: any) => <td {...props}>{children}</td>,
}));

describe("DaynmicTable component", () => {
  it("renders toolbar", () => {
    render(<DaynmicTable data={MockData} schema={schema} />);
    expect(screen.getByTestId("toolbar")).toBeInTheDocument();
  });

  it("renders table headers based on schema", () => {
    render(<DaynmicTable data={MockData} schema={schema} />);
    schema.all_columns.forEach((col) => {
      expect(screen.getAllByText(col.header)[0]).toBeInTheDocument();
    });
  });


  it("renders 'No results.' when data is empty", () => {
    const { useTable } = require("../hooks/useTable");
    useTable.mockImplementation(() => ({
      table: {
        getHeaderGroups: () => [],
        getRowModel: () => ({ rows: [] }),
      },
      columns: schema.all_columns,
      tableActionProps: {},
    }));

    render(<DaynmicTable data={MockData} schema={schema} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});
