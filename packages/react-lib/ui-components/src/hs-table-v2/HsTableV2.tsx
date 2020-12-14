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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useHistory } from 'react-router-dom';

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

export const HSTableV2: FC<HsTableV2Props> = ({
  rows,
  columns,
  disableExport,
  exportColumn,
  tableActions,
}: HsTableV2Props) => {
  const classes = useStyles();
  const history = useHistory();
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
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    {...bindTrigger(popupState)}
                  >
                    Select Action
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    {tableActions?.map((action, index) => (
                      <MenuItem
                        key={action.display + index}
                        onClick={() => {
                          popupState.close();
                          history.push(action.url);
                        }}
                      >
                        {action.display}.
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </TableCell>
        )}
        <TableCell className={row.rowSpan ? classes.rowBorder : ''}>
          <Button
            color="primary"
            variant="contained"
            disabled={!row.pid_count || disableExport}
            onClick={() => {
              exportColumn(row);
            }}
          >
            Export
          </Button>
        </TableCell>
      </>
    );
  };
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
