import React, { FC, useEffect } from 'react';
import { HsTableProps } from './IHsTable';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import styled from '@emotion/styled';

const StyledHsTable = styled(Paper)`
  width: '100%';
`;
const StyledTableContainer = styled(TableContainer)`
  max-height: 80vh;
  .MuiTableCell-root {
    font-size: 1.2rem;
  }
`;
export const HSTable: FC<HsTableProps> = (props: HsTableProps) => {
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
                              column.render
                                ? column.render(value, row, 1)
                                : value
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
                            {column.render ? column.render(value, row) : value}
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
