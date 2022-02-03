import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { IFilters, IProductsList, IProductsData, DashboardProps } from './IDashboard';
import { Helmet } from 'react-helmet';
import Filters from './Filters';
import { useQuery } from 'react-query';
import { buyerService } from '@hs/services';
import { Paper } from '@material-ui/core';
import HsTableRow from './HsTableRow';
import { toast } from 'react-toastify';

const StyledHsTable = styled(Paper)`
  width: 100%;
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: 80vh;
  .MuiTableCell-root {
    font-size: 1.4rem;
  }
`;

const DashBoardWrapper = styled.div`
  margin: 0 10px 0 90px;
`;

const useTableStyles = makeStyles({
  tableHeader: {
    fontWeight: 700,
    textAlign: 'center',
  },
  header: {
    margin: 10,
    fontSize: 18,
  },
});
const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure' && error.message) {
    message = error.message;
  }
  toast.error(message);
};

const Dashboard: FC<DashboardProps> = ({ header }: DashboardProps) => {
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [size, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const {
    data: tableData,
    isSuccess: isTableSuccess,
    isFetching: isTableDataFetching,
  } = useQuery<IProductsList, Record<string, string>>(
    ['subCategories', filters, size, page],
    () => buyerService.getTableData({ ...filters, action: 'buyerDashboardAssortmentGap', size, page }),
    {
      staleTime: 2000,
      retry: false,
      enabled: Object.keys(filters).length > 1,
      onError: (error) => {
        showError(error);
      },
    },
  );

  useEffect(() => {
    if (tableData && tableData.action === 'failure') {
      toast.error(tableData.message);
    }
  }, [tableData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateFilters = (filters: IFilters) => {
    setFilters({
      category_id: filters.categoryId.id,
      sub_category_id: filters.subCategoryId.id,
    });
    setPage(0);
  };

  const columns = ['SL No', 'Product type', 'Number of PSTs', 'Number of MSKUs', 'Total GAP', 'Upload Images'];

  const Row = (row: IProductsData) => {
    return <HsTableRow key={`${row.pid}${row.ptName}`} {...row} />;
  };

  return (
    <DashBoardWrapper>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <h1 className={classes.header}>{header}</h1>
      <Filters {...{ onSubmit: updateFilters }}></Filters>
      {isTableSuccess && tableData?.data?.totalRecords != 0 && (
        <StyledHsTable>
          <StyledTableContainer>
            <Table stickyHeader aria-label="Buyer dashboard">
              <TableHead>
                <TableRow>
                  {columns.map((title: string) => (
                    <TableCell key={title} className={classes.tableHeader}>
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.data?.records?.map((row: IProductsData) => (
                  <Row key={row.pid} {...row} />
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tableData?.data?.totalRecords || 0}
            rowsPerPage={size}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </StyledHsTable>
      )}
      {isTableSuccess && tableData?.data?.totalRecords === 0 && <h5>No data</h5>}
      {isTableDataFetching && <h5>Loading...</h5>}
      {Object.keys(filters).length === 0 && <h5>Please select filters</h5>}
    </DashBoardWrapper>
  );
};

export default Dashboard;
