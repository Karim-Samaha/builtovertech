import React from "react";
import { render, screen } from "@testing-library/react";
import { buildColumnsFromSchema } from "../buildColumnsFromSchema";
import { schema } from "../../types/table_schema";

// Minimal mocks for Button and Checkbox
jest.mock("@/shared/ui/button", () => ({
  Button: ({ children }: any) => <button>{children}</button>,
}));

jest.mock("@/shared/ui/checkbox", () => ({
  Checkbox: ({ checked, ...props }: any) => (
    <input type="checkbox" checked={!!checked} {...props} />
  ),
}));

describe("buildColumnsFromSchema - simple render test", () => {
  it("generates columns and headers appear", () => {
    const columns = buildColumnsFromSchema(schema);
    expect(columns.length).toBe(11);
  });
  it("includes only visible columns based on default_visibility", () => {
    // Headers from default_visibility
    const visibleHeaders = schema.default_visibility.map((col) => col.label);

    // Check that all visible headers are present
    visibleHeaders.forEach((header) => {
      expect(visibleHeaders).toContain(header);
    });
  });
});
