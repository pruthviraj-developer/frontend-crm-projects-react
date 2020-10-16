export type sosTableList = {
  id?: number;
  title?: string;
  sorts?: string[];
  startDate?: Date;
  endDate?: Date;
  createdBy?: string;
  createdOn?: Date;
  updatedBy?: string;
  updatedOn?: Date;
  active?: boolean;
};

export type sosTableData = {
  action?: string;
  totalRecords?: number;
  pageSize?: number;
  pageNo?: number;
  records?: sosTableList[];
};

export type sosTableParams = { pageSize: number; pageNo: number };

