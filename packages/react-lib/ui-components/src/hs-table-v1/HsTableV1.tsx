import React, { FC, useEffect } from 'react';
import { format } from 'date-fns';
import { HsTablePropsV1 } from './IHsTableV1';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import styled from '@emotion/styled';
import { SelectedCircle, SvgIcon } from '@hs/icons';
const StyledHsTable = styled(Paper)`
  width: '100%';
`;
const StyledTableContainer = styled(TableContainer)`
  max-height: 80vh;
  .MuiTableCell-root {
    font-size: 1.4rem;
  }
`;

const StyledIcon = styled(SvgIcon)`
  min-width: 24px;
`;

export const HSTableV1: FC<HsTablePropsV1> = (props: HsTablePropsV1) => {
  const columns = props.columns;
  const rows = props.rows;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(() => props.rowsPerPage);

  useEffect(() => {
    setRowsPerPage(props.rowsPerPage);
  }, [props.rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    if (event) {
      setPage(newPage);
      props.fetchTableData({ pageSize: rowsPerPage, pageNo: newPage });
    }
  };
  const handleChangeRowsPerPage = (event) => {
    const rowsPerPage = +event.target.value;
    setRowsPerPage(rowsPerPage);
    setPage(0);
    props.fetchTableData({ pageSize: rowsPerPage, pageNo: 0 });
  };

  const renderTitle = (value: any) => {
    return value;
  };

  const getRowData = (row: any, column: any) => {
    if (column.withIcon) {
      return (
        <>
          {column.withIcon && (row.active || row.value === 'DISABLE') && (
            <StyledIcon icon={SelectedCircle} />
          )}
          {row[column.id]}{' '}
        </>
      );
    } else if (column.withDate) {
      return <>{format(new Date(row[column.id]), 'dd/MM/yyyy, hh:mm aa')}</>;
    } else if (column.withJoin) {
      const rowArray = row[column.id];
      if (rowArray && rowArray.length) {
        return <>{rowArray.join(', ')}</>;
      }
      return '--';
    } else {
      return <>{row[column.id]}</>;
    }
  };

  const render = (row: any, column: any) => {
    if (row) {
      return (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '10px',
            }}
          >
            {getRowData(row, column)}
          </div>
        </>
      );
    }
    return '--';
  };

  return (
    <div>
      <StyledHsTable>
        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column: any, index) => (
                  <TableCell
                    key={index}
                    style={{
                      minWidth: column.minWidth ? column.minWidth : 'auto',
                      maxWidth: column.width ? column.width : 'auto',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column: any, index) => {
                      if (column.id) {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            title={
                              column.customRender
                                ? column.customRender(row, true)
                                : renderTitle(value)
                            }
                            style={{
                              minWidth: column.minWidth
                                ? column.minWidth
                                : 'auto',
                              maxWidth: column.width ? column.width : 'auto',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              padding: '16px 10px',
                            }}
                          >
                            {column.customRender
                              ? column.customRender(row)
                              : column.render
                              ? render(row, column)
                              : value}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={index}
                            style={{
                              minWidth: column.minWidth
                                ? column.minWidth
                                : 'auto',
                              maxWidth: column.width ? column.width : 'auto',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              padding: '16px 10px',
                            }}
                          >
                            {column.render(props, row)}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <TablePagination
          rowsPerPageOptions={props.filterRowsPerPage}
          component="div"
          count={props.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </StyledHsTable>
    </div>
  );
};
