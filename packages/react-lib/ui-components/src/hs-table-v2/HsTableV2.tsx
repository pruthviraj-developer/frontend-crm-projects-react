import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { HsTableV2Props, tableRowsV2 } from './IHsTableV2';

const StyledHsTable = styled(Paper)`
  width: '100%';
`;
const StyledTableContainer = styled(TableContainer)`
  max-height: 80vh;
  .MuiTableCell-root {
    font-size: 1.2rem;
  }
`;

const border2Px = '2px solid rgba(224, 224, 224, 1)';
const useStyles = makeStyles({
  table: {
    minWidth: 700,
    border: border2Px,
  },
  rowBorder: {
    borderTop: border2Px,
  },
});

const generateRow = (row: tableRowsV2, classes: Record<string, string>) => {
  return (
    <>
      <TableCell className={row.rowSpan ? classes.rowBorder : ''}>
        {' '}
        {row.pid_count}{' '}
      </TableCell>
      <TableCell className={row.rowSpan ? classes.rowBorder : ''}>
        {' '}
        {row.status}
      </TableCell>
      <TableCell className={row.rowSpan ? classes.rowBorder : ''}>
        {row.priority}
      </TableCell>
      {row.rowSpan && (
        <TableCell
          className={row.rowSpan ? classes.rowBorder : ''}
          rowSpan={row.rowSpan}
        >
          <Button color="primary" variant="contained">
            Select Action
          </Button>
        </TableCell>
      )}
      <TableCell className={row.rowSpan ? classes.rowBorder : ''}>
        <Button color="primary" variant="contained">
          Export
        </Button>
      </TableCell>
    </>
  );
};

export const HSTableV2: FC<HsTableV2Props> = (props: HsTableV2Props) => {
  const columns = props.columns;
  const rows = props.rows;
  const classes = useStyles();
  return (
    <StyledHsTable>
      <StyledTableContainer>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="spanning table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {columns.map((column: string, index: number) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: tableRowsV2, index: number) => (
                <TableRow key={index}>{generateRow(row, classes)}</TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledTableContainer>
    </StyledHsTable>
  );
};
