import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { HSTableV1, Loader } from '@hs-crm/components';
import { TableWrapper } from './Style';
import { useState, useEffect } from 'react';
import {
  ISummaryDashboardResponse,
  ITableDataType,
  IHeaderType,
  IPageType,
  IWarehouseReturnedQuantityFinalStatusEntityProps,
} from './ISummaryDashboard';
import { useQuery } from 'react-query';
import { reversepickupService } from '@hs/services';

export const DashboardColumns = [
  {
    id: 'type',
    key: 'type',
    label: 'Final Status',
  },
  {
    id: 'totalQuantity',
    key: 'totalQuantity',
    label: 'All',
  },
  {
    id: 'ndlQuantity',
    key: 'ndlQuantity',
    label: 'NDL',
  },
  {
    id: 'kolQuantity',
    key: 'kolQuantity',
    label: 'KOL',
  },
  {
    id: 'wheQuantity',
    key: 'wheQuantity',
    label: 'WHE',
  },
  {
    id: 'bngQuantity',
    key: 'bngQuantity',
    label: 'BNG',
  },
];

const showError = (error: Record<string, string>) => {
  let message = 'Please try later';
  if (error.action === 'FAILURE' && error.messageList[0]) {
    message = error.messageList[0];
  }
  toast.error(message);
};

const Summary: FC<{ header: string }> = ({ header }: IHeaderType) => {
  const [returnData, setReturnData] = useState<IWarehouseReturnedQuantityFinalStatusEntityProps[]>([]);
  const {
    data: dashboardData,
    isSuccess: isDashboardSuccess,
    isLoading: isDashboardLoading,
  } = useQuery<ISummaryDashboardResponse, Record<string, string>>(
    ['SummaryData'],
    () => reversepickupService.getReturnSummary(),
    {
      staleTime: Infinity,
      retry: false,
      onError: (error) => {
        showError(error);
      },
    },
  );

  useEffect(() => {
    if (dashboardData?.data?.warehouseReturnedQuantityFinalStatus?.length) {
      setReturnData(dashboardData?.data?.warehouseReturnedQuantityFinalStatus);
    }
  }, [dashboardData]);

  const tableData: ITableDataType = {
    title: '',
    count: 0,
    activePage: 0,
    columns: DashboardColumns,
    rows: returnData || [],
    rowsPerPage: 10,
    filterRowsPerPage: [],
    fetchTableData: () => {},
  };

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <h1>{header}</h1>
      {isDashboardLoading && <Loader />}
      <TableWrapper>
        {!isDashboardLoading && isDashboardSuccess && tableData.rows?.length > 0 && <HSTableV1 {...tableData} />}
        {isDashboardSuccess && tableData.rows?.length === 0 && <h4>No Records Found</h4>}
      </TableWrapper>
    </>
  );
};

export default Summary;
