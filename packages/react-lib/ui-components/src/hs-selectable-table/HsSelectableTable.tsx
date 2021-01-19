import React, { FC, useState } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { SelectableTableProps } from './ISelectableTable';
import { Colors } from '@hs/utils';
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

interface EnhancedTableToolbarProps {
  numSelected: number;
  rowsSelected: (string | Record<string, string>)[];
  deleteColumn?: (event: (string | Record<string, string>)[]) => void;
  exportColumn?: (event: (string | Record<string, string>)[]) => void;
  showFilters?: (event: any) => void;
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
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
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
              maxWidth: setColumnsWidth[headCell.id]
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

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.primary.main,
            backgroundColor: lighten(theme.palette.primary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.dark,
          },
    title: {
      flex: '1 1 100%',
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
);

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, rowsSelected } = props;
  const deleteSelected = () => {
    props.deleteColumn && props.deleteColumn(rowsSelected);
  };
  const exportSelected = () => {
    props.exportColumn && props.exportColumn(rowsSelected);
  };

  const showFilters = () => {
    props.showFilters && props.showFilters(true);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <>
          <Typography
            className={classes.title}
            color={'primary'}
            variant="h4"
            component="div"
            align="left"
          >
            {numSelected} Selected
          </Typography>
          <Tooltip title="Delete" onClick={deleteSelected}>
            <IconButton aria-label="delete">
              <DeleteIcon style={{ color: Colors.PINK[500], fontSize: 24 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Import/Export" onClick={exportSelected}>
            <IconButton aria-label="ImportExport">
              <ImportExportIcon
                style={{ color: Colors.PINK[500], fontSize: 20 }}
              />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography
            className={classes.title}
            color={'primary'}
            variant="h5"
            component="div"
            align="left"
          >
            Select Rows
          </Typography>
          <Tooltip title="Filter list" onClick={showFilters}>
            <IconButton aria-label="filter list">
              <FilterListIcon
                style={{ color: Colors.PINK[500], fontSize: 24 }}
              />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
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

const createHeadCells = (rowKeys, columns) => {
  headCells = [];
  for (let index = 0; index < rowKeys.length; index++) {
    headCells.push({
      id: rowKeys[index],
      disablePadding: false,
      label: columns[index],
    });
  }
};

export const HsSelectableTable: FC<SelectableTableProps> = ({
  rows,
  rowKeys,
  rowsPerPageOptions,
  displayRowsPerPage,
  totalRowsCount,
  columns,
  currentPage,
  sortingId,
  selectId,
  sorting,
  fetchTableData,
  deleteColumn,
  exportColumn,
  showFilters,
  stableSort,
  getComparator,
  onSort,
  setColumnsWidth,
}: SelectableTableProps) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string | number>(
    sortingId || (rowKeys && rowKeys[0])
  );
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
        {rowKeys.map((name: string, index: number) => (
          <TableCell
            align="left"
            key={index}
            className={classes.tableRow}
            style={{
              maxWidth: setColumnsWidth[name] ? setColumnsWidth[name] : 'auto',
            }}
          >
            {row[name]}
          </TableCell>
        ))}
      </>
    );
  };

  const sortData = () => {
    sortedRows =
      stableSort &&
      stableSort(totalRows, getComparator && getComparator(order, orderBy));
    return sortedRows;
  };

  const isSelected: any = (name: any) => {
    return selected.indexOf(name) !== -1;
  };
  createHeadCells(rowKeys, columns);
  return (
    <div className={classes.root}>
      {totalRowsCount > 0 && (
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            rowsSelected={selected}
            deleteColumn={deleteColumn}
            exportColumn={exportColumn}
            showFilters={showFilters}
          />
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
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
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
