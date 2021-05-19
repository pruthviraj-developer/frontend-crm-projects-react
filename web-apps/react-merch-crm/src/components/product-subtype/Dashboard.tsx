import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { productSubtypeService } from '@hs/services';
import { HSTableV1, HsTablePropsV1 } from '@hs/components';
import { useQuery, useQueryClient } from 'react-query';
import { DashboardData, IPageType, PropsType } from './IDashboard';

const useStyles = makeStyles((theme) => ({
  header: {
    margin: 10,
    fontSize: 28,
  },
  clearFilters: {
    fontSize: '10px',
    margin: theme.spacing(1),
    padding: '12px 0',
  },
}));

const DashBoardWrapper = styled.div`
  width: 100%;
  margin: 10px 0 0 9rem;
`;

const TableWrapper = styled.div`
  width: 94%;
`;

const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure' && error.message) {
    message = error.message;
  }
  toast.error(message);
};

const defaultPageFilters = { pageSize: 20, pageNo: 0 };

const ProductSubtypeDashboard: FC = () => {
  const classes = useStyles();
  const [filterPage, setFilterPage] = useState<IPageType>(defaultPageFilters);
  const queryClient = useQueryClient();

  const { data: dashboardData, isSuccess: isDashboardSuccess } = useQuery<any>(
    ['dashboardData', filterPage],
    () => productSubtypeService.getDashboardData({ ...filterPage, pageNo: filterPage.pageNo + 1 }, {}),
    {
      staleTime: 2000,
      onError: (error: any) => {
        showError(error);
      },
    },
  );

  const getUpdatedTableData = (filters: IPageType) => {
    setFilterPage({ pageSize: filters.pageSize, pageNo: filters.pageNo });
  };

  const handleAction = (data: DashboardData) => {
    const status = {
      status: data.status === 'Y' ? 'N' : 'Y',
    };
    (async () => {
      try {
        const actionStatus: Record<string, string> = await productSubtypeService.updateAction(
          data.productCategoryId,
          status,
        );
        if (actionStatus.status === 'SUCCESS') {
          toast.success(actionStatus.messageList || 'Status updated successfully');
          setFilterPage(defaultPageFilters);
          queryClient.invalidateQueries('dashboardData');
          return;
        }
        showError(actionStatus);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const columns = [
    {
      id: 'productCategoryName',
      label: 'Category',
      customRender: (row: DashboardData, isTitle?: boolean) => {
        if (isTitle) {
          return row.productCategoryName;
        }
        if (row) {
          return (
            <>
              <NavLink to={{ pathname: `edit-cluster/${row.productCategoryId}` }}>{row.productCategoryName}</NavLink>
            </>
          );
        }
        return '--';
      },
    },
    {
      id: 'productSubCategoryName',
      label: 'Sub Category',
    },
    { id: 'productTypeName', label: 'Product Type' },
    { id: 'productSubtypeName', label: 'Product Sub Type' },
    {
      label: 'Action',
      render: (props: PropsType, data: DashboardData) => {
        if (data) {
          return (
            <Button
              variant="contained"
              color={data.status === 'Y' ? 'default' : 'primary'}
              type="button"
              className={classes.clearFilters}
              onClick={() => handleAction(data)}
            >
              {data.status === 'Y' ? 'DISABLE' : 'ENABLE'}
            </Button>
          );
        }
      },
      withIcon: false,
    },
  ];

  const tableData: HsTablePropsV1 = {
    title: 'Product SubType Dashboard Table',
    count: dashboardData ? dashboardData['totalCount'] : 0,
    activePage: filterPage.pageNo,
    columns: columns,
    rows: dashboardData ? dashboardData['productSubtypeList'] : [],
    rowsPerPage: filterPage.pageSize || 20,
    filterRowsPerPage: [20, 25, 30, 35],
    fetchTableData: getUpdatedTableData,
  };

  return (
    <>
      <DashBoardWrapper>
        <h1 className={classes.header}>Product SubType Dashboard</h1>
        <TableWrapper>{isDashboardSuccess && tableData.rows.length > 0 && <HSTableV1 {...tableData} />}</TableWrapper>
      </DashBoardWrapper>
    </>
  );
};

export default ProductSubtypeDashboard;
