import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { HSTableV1, FilterPan } from '@hs/components';
import {
  IHeaderType,
  INewDashboardData,
  INewDashboardDataResponse,
  IPageType,
  ITableDataType,
  IPostDataType,
} from './IDashboard';
import { FilterPanProps } from '@hs/components';
import { financeAccountingService } from '@hs/services';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    paddingTop: '3rem',
    fontSize: 28,
  },
  filters: {
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'FAILURE' && error.messageList[0]) {
    message = error.messageList[0];
  }
  toast.error(message);
};

const DashBoardWrapper = styled.div`
  width: 94%;
  margin: -19px 0 0 9rem;
`;

const FilterWrapper = styled.div`
  width: 98%;
  margin: 10px 0;
`;

const TableWrapper = styled.div`
  width: 100%;
`;

const defaultPageFilters = { pageSize: 20, pageNo: 0 };

const FinanceAccountDashboard: FC<{ header: string }> = ({ header }: IHeaderType) => {
  const classes = useStyles();
  const [postFilterData, setPostFilterData] = useState({});
  const [filterPage, setFilterPage] = useState<IPageType>(defaultPageFilters);

  const { data: dashboardData, isSuccess: isDashboardSuccess } = useQuery<
    INewDashboardDataResponse,
    Record<string, string>
  >(
    ['dashboardData', postFilterData, filterPage],
    () => financeAccountingService.getDashboardData({ ...filterPage, pageNo: filterPage.pageNo + 1 }, postFilterData),
    {
      staleTime: Infinity,
      onError: (error) => {
        showError(error);
      },
    },
  );

  const { data: filtersData, isSuccess: isFiltersDataSuccess } = useQuery<any, Record<string, string>>(
    ['filtersData'],
    () => financeAccountingService.getFilterData(),
    {
      staleTime: Infinity,
      onError: (error) => {
        showError(error);
      },
    },
  );

  const columns = [
    {
      id: 'shipmentNo',
      label: 'Shipment No',
      customRender: (row: INewDashboardData, isTitle?: boolean) => {
        if (isTitle) {
          return row.shipmentNo;
        }
        if (row) {
          return <>{row.shipmentNo}</>;
        }
        return '--';
      },
    },
    { id: 'boe', label: 'BOE' },
    { id: 'vsku', label: 'VSKU' },
    { id: 'productType', label: 'Product Type' },
    { id: 'category', label: 'Category' },
    { id: 'composition', label: 'Composition' },
    { id: 'material', label: 'Material' },
    { id: 'fabric', label: 'Fabric' },
    { id: 'hsCode', label: 'HS Code' },
    { id: 'heightOfChild', label: 'Height Of Child' },
    { id: 'qty', label: 'Quantity' },
    { id: 'mrp', label: 'MRP' },
    { id: 'unitPrice', label: 'Unit Price' },
    { id: 'currencyMultiplier', label: 'Currency Multiplier' },
    { id: 'assessibleValue', label: 'Assessible Value' },
    { id: 'dutyRate', label: 'Duty Rate' },
    { id: 'duty', label: 'Duty' },
    { id: 'surchargeRate', label: 'Surcharge Rate' },
    { id: 'surcharge', label: 'Surcharge' },
    { id: 'igstRate', label: 'IGST Rate' },
    { id: 'igst', label: 'IGST' },
    { id: 'totalFinalDuty', label: 'Total Final Duty' },
  ];

  const tableData: ITableDataType = {
    title: 'Finance & Accounting Dashboard Table',
    count: dashboardData ? dashboardData['totalRecords'] : 0,
    activePage: filterPage.pageNo,
    columns: columns,
    rows: dashboardData ? dashboardData['data'] : [],
    rowsPerPage: filterPage.pageSize || 20,
    filterRowsPerPage: [20, 50, 70, 100],
    fetchTableData: setFilterPage,
  };

  const onChangeHandler = (data: IPostDataType) => {
    // console.log(data);
    setFilterPage(defaultPageFilters);
    setPostFilterData(data);
  };

  const filterData: FilterPanProps = {
    data: filtersData ? filtersData.data : [],
    onChange: onChangeHandler,
  };

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <DashBoardWrapper>
        <h1 className={classes.header}>{header}</h1>
        {/* {JSON.stringify(postFilterData)} */}
        <FilterWrapper>
          {isFiltersDataSuccess && filtersData.data.length > 0 && <FilterPan {...filterData} />}
        </FilterWrapper>
        <TableWrapper>
          {isDashboardSuccess && tableData.rows.length > 0 && <HSTableV1 {...tableData} />}
          {tableData.rows.length === 0 && <h4>No Records Found</h4>}
        </TableWrapper>
      </DashBoardWrapper>
    </>
  );
};

export default FinanceAccountDashboard;
