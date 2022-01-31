import React, { FC, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { SelectableTableProps } from './ISelectableTable';
type Order = 'asc' | 'desc';
let sortedRows: any = [];
interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | number;
  rowCount: number;
  rowsPerPage: number;
  sorting?: boolean;
  setColumnsWidth?: any;
}

let headCells: HeadCell[] = [];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    rowsPerPage,
    onRequestSort,
    sorting,
    setColumnsWidth,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      if (sorting) {
        headCells = [];
        onRequestSort(event, property);
      }
    };
  const isCheckBoxSelected =
    rowCount > 0 &&
    numSelected > 0 &&
    (numSelected === rowsPerPage || numSelected === rowCount % rowsPerPage);
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={isCheckBoxSelected}
            color={isCheckBoxSelected ? 'primary' : 'default'}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              headCells = [];
              onSelectAllClick(evt);
            }}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableHead}
            style={{
              maxWidth:
                setColumnsWidth && setColumnsWidth[headCell.id]
                  ? setColumnsWidth[headCell.id]
                  : 'auto',
            }}
          >
            <TableSortLabel
              active={sorting && orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={!sorting}
              style={{ cursor: 'default' || (sorting && 'pointer') }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: 4,
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableHead: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    tableRow: {
      fontSize: 12,
    },
    caption: {
      fontSize: 14,
    },
    toolbar: {
      fontSize: 14,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

const createHeadCells = (columns) => {
  headCells = [];
  columns.map((column) => {
    headCells.push({
      id: column.id,
      disablePadding: false,
      label: column.label,
    });
  });
};

export const HsSelectableTable: FC<SelectableTableProps> = ({
  rows,
  rowsPerPageOptions,
  displayRowsPerPage,
  totalRowsCount,
  columns,
  currentPage,
  sortingId,
  selectId,
  sorting,
  fetchTableData,
  onSort,
  setColumnsWidth,
  tableToolbar,
}: SelectableTableProps) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string | number>(sortingId || 'id');
  const [selected, setSelected] = useState<(string | Record<string, string>)[]>(
    []
  );
  const [page, setPage] = useState(currentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(displayRowsPerPage);
  const totalRows = rows || [];
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    if (event) {
      const isAsc = orderBy === property && order === 'asc';
      const sortingOrder = isAsc ? 'desc' : 'asc';
      setOrder(sortingOrder);
      setOrderBy(property);
      onSort &&
        onSort({
          order: sortingOrder,
          orderBy: property,
          pageSize: rowsPerPage,
          pageNo: page,
        });
      setSelected([]);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    headCells = [];
    if (event.target.checked) {
      const newSelecteds: (string | Record<string, string>)[] = [];
      for (let index = 0; index < rowsPerPage; index++) {
        const element = sortedRows[index];
        if (element) {
          newSelecteds.push(selectId ? element[selectId] : element);
        }
      }
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
    if (event) {
      const selectedIndex: number = selected.indexOf(name);
      let newSelected: (string | Record<string, string>)[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      headCells = [];
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (event) {
      headCells = [];
      setSelected([]);
      setPage(newPage);
      const qParams = { pageSize: rowsPerPage, pageNo: newPage };
      if (sorting) {
        qParams['order'] = order;
        qParams['orderBy'] = orderBy;
      }
      fetchTableData && fetchTableData(qParams);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    headCells = [];
    setSelected([]);
    const rowsPerPage = parseInt(event.target.value, 10);
    const qParams = { pageSize: rowsPerPage, pageNo: 0 };
    setPage(0);
    setRowsPerPage(rowsPerPage);
    if (sorting) {
      qParams['order'] = order;
      qParams['orderBy'] = orderBy;
    }
    fetchTableData && fetchTableData(qParams);
  };

  const generateRow = (row, setColumnsWidth) => {
    return (
      <>
        {columns.map((column: any) => {
          const value = row[column.id];
          return (
            <TableCell
              key={column.id}
              align="left"
              title={
                column.customRender ? column.customRender(row, true) : value
              }
              className={classes.tableRow}
              style={{
                maxWidth:
                  setColumnsWidth && setColumnsWidth[column.key]
                    ? setColumnsWidth[column.key]
                    : 'auto',
              }}
            >
              {column.customRender ? column.customRender(row) : value}
            </TableCell>
          );
        })}
      </>
    );
  };

  const sortData = () => {
    sortedRows =
      stableSort &&
      stableSort(totalRows, getComparator && getComparator(order, orderBy));
    return sortedRows;
  };

  const descendingComparator = (a: string, b: string, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order: any, orderBy: any) => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array: any, comparator: any) => {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  };

  const isSelected: any = (name: any) => {
    return selected.indexOf(name) !== -1;
  };
  createHeadCells(columns);

  return (
    <div className={classes.root}>
      {totalRowsCount > 0 && (
        <Paper className={classes.paper}>
          {tableToolbar ? tableToolbar(selected.length, selected) : null}
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={totalRowsCount}
                rowsPerPage={rowsPerPage}
                setColumnsWidth={setColumnsWidth}
                sorting={sorting}
              />
              <TableBody>
                {sortData().map(
                  (row: Record<string, string | number>, index) => {
                    const isItemSelected = selectId
                      ? isSelected(row[selectId])
                      : false;
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, selectId ? row[selectId] : row[0])
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={selectId ? row[selectId] : row[0]}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            color={isItemSelected ? 'primary' : 'default'}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        {generateRow(row, setColumnsWidth)}
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={totalRowsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              toolbar: classes.toolbar,
              caption: classes.caption,
            }}
          />
        </Paper>
      )}
      {totalRowsCount === 0 && <h5>No data to display</h5>}
    </div>
  );
};
