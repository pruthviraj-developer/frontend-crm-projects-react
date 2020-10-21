export type tableRowsV2 = {
  pid_count: number | string;
  status: string;
  priority: string;
  rowSpan?: number;
};

export interface HsTableV2Props {
  columns: Array<string>;
  rows: Array<tableRowsV2>;
}
