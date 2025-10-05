export interface ColumnSchema {
  accessor_key: string;
  header: string;
  type?: string;
  url?: string;
  enable_sorting?: boolean;
  enable_grouping?: boolean;
  enable_column_filter?: boolean;
  size?: number;
}

export interface SearchableField {
  key: string;
  label: string;
}

export interface VisibilityOption {
  key: string;
  label: string;
}

export interface GearOption {
  key: string;
  label: string;
  visible?: boolean;
}

export interface TableSchema {
  all_columns: ColumnSchema[];
  searchable_fields: SearchableField[];
  default_visibility: VisibilityOption[];
  default_order?: VisibilityOption[];
  gear_options?: GearOption[];
}