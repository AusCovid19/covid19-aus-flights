import { Flight } from "../../types";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Flight;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  classes: ReturnType<typeof useTableStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Flight
  ) => void;
  order: Order;
  orderBy: string;
  searchMode: boolean;
}
