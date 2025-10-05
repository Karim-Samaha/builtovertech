import { TableSchema } from "./types";

export const schema: TableSchema = {
  searchable_fields: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "first_name",
      label: "First Name",
    },
    {
      key: "last_name",
      label: "Last Name",
    },
    {
      key: "first_name_arabic",
      label: "First Name Arabic",
    },
    {
      key: "last_name_arabic",
      label: "Last Name Arabic",
    },
  ],
  all_columns: [
    {
      accessor_key: "id",
      header: "ID",
      enable_sorting: true,
      enable_grouping: false,
      enable_column_filter: false,
      size: 80,
    },
    {
      accessor_key: "first_name",
      header: "First Name EN",
      enable_sorting: true,
      enable_grouping: true,
      enable_column_filter: false,
      size: 80,
    },
    {
      accessor_key: "last_name",
      header: "Last Name EN",
      enable_sorting: true,
      enable_grouping: true,
      enable_column_filter: false,
      size: 80,
    },
    {
      accessor_key: "first_name_arabic",
      header: "First Name AR",
      enable_sorting: true,
      enable_grouping: true,
      enable_column_filter: false,
      size: 80,
    },
    {
      accessor_key: "last_name_arabic",
      header: "Last Name AR",
      enable_sorting: true,
      enable_grouping: true,
      enable_column_filter: false,
      size: 80,
    },
    {
      accessor_key: "image",
      header: "Image",
      enable_sorting: false,
      enable_grouping: false,
      enable_column_filter: false,
      size: 80,
      type: "image",
      url: "https://cdn.festilinx.com/festilinx/",
    },
    {
      accessor_key: "nationality",
      header: "Nationality",
      enable_sorting: true,
      enable_grouping: false,
      enable_column_filter: true,
      size: 80,
    },
    {
      accessor_key: "country_of_origin",
      header: "Country of Origin",
      enable_sorting: true,
      enable_grouping: true,
      enable_column_filter: false,
      size: 80,
    },
    {
      accessor_key: "country_of_residence",
      header: "Country of Residence",
      enable_sorting: true,
      enable_grouping: true,
      enable_column_filter: true,
      size: 80,
    },
    {
      accessor_key: "tags",
      header: "Tags",
      enable_sorting: false,
      enable_grouping: false,
      enable_column_filter: true,
      size: 80,
    },
  ],
  default_visibility: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "first_name",
      label: "First Name EN",
    },
    {
      key: "last_name",
      label: "Last Name EN",
    },
    {
      key: "first_name_arabic",
      label: "First Name AR",
    },
    {
      key: "last_name_arabic",
      label: "Last Name AR",
    },
  ],
  default_order: [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "first_name",
      label: "First Name EN",
    },
    {
      key: "last_name",
      label: "Last Name EN",
    },
    {
      key: "first_name_arabic",
      label: "First Name AR",
    },
    {
      key: "last_name_arabic",
      label: "Last Name AR",
    },
    {
      key: "image",
      label: "Image",
    },
    {
      key: "nationality",
      label: "Nationality",
    },
    {
      key: "country_of_origin",
      label: "Country of Origin",
    },
    {
      key: "country_of_residence",
      label: "Country of Residence",
    },
  ],
  gear_options: [
    {
      key: "export",
      label: "Export",
    },
    {
      key: "import",
      label: "Import",
    },
    {
      key: "merge",
      label: "Merge",
    },
    {
      key: "delete",
      label: "Delete",
      visible: false,
    },
    {
      key: "restore",
      label: "Restore",
      visible: false,
    },
  ],
};
