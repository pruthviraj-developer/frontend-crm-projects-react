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

type Order = 'asc' | 'desc';
let sortedRows: Array<Record<string, string>> = [];

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
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  rowsSelected: (string | Record<string, string>)[];
  deleteColumn?: (event: (string | Record<string, string>)[]) => void;
  exportColumn?: (event: (string | Record<string, string>)[]) => void;
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
  } = props;
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    if (sorting) {
      headCells = [];
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={
              rowCount > 0 &&
              (numSelected === rowsPerPage ||
                numSelected === rowCount % rowsPerPage)
            }
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
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  })
);

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, rowsSelected } = props;
  const deleteSelected = (e) => {
    props.deleteColumn && props.deleteColumn(rowsSelected);
  };
  const exportSelected = (e) => {
    props.exportColumn && props.exportColumn(rowsSelected);
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
            color="inherit"
            variant="h4"
            component="div"
          >
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete" onClick={deleteSelected}>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Import/Export" onClick={exportSelected}>
            <IconButton aria-label="ImportExport">
              <ImportExportIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography
            className={classes.title}
            color="inherit"
            variant="h5"
            component="div"
          >
            Select Rows
          </Typography>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
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
  columns,
  sortingId,
  selectId,
  sorting,
  fetchTableData,
  deleteColumn,
  exportColumn,
  stableSort,
  getComparator,
  onSort,
}: SelectableTableProps) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string | number>(
    sortingId || (rowKeys && rowKeys[0])
  );
  const [selected, setSelected] = useState<(string | Record<string, string>)[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalRows = rows || [];
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    const sortingOrder = isAsc ? 'desc' : 'asc';
    setOrder(sortingOrder);
    setOrderBy(property);
    onSort && onSort(sortingOrder, property);
    setSelected([]);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    headCells = [];
    if (event.target.checked) {
      const currentIndex = page * rowsPerPage;
      const newSelecteds: (string | Record<string, string>)[] = [];
      for (
        let index = currentIndex;
        index < currentIndex + rowsPerPage;
        index++
      ) {
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
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    headCells = [];
    setSelected([]);
    setPage(newPage);
    fetchTableData &&
      fetchTableData({ pageSize: rowsPerPage, pageNo: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    headCells = [];
    setSelected([]);
    const rowsPerPage = parseInt(event.target.value, 10);
    setPage(0);
    setRowsPerPage(rowsPerPage);
    fetchTableData && fetchTableData({ pageSize: rowsPerPage, pageNo: 0 });
  };

  const generateRow = (row) => {
    return (
      <>
        {rowKeys.map((name: string, index: number) => (
          <TableCell align="left" key={index} className={classes.tableRow}>
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

  const isSelected: any = (name: string | Record<string, string>) =>
    selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalRows.length - page * rowsPerPage);
  createHeadCells(rowKeys, columns);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          rowsSelected={selected}
          deleteColumn={deleteColumn}
          exportColumn={exportColumn}
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
              rowCount={totalRows.length}
              rowsPerPage={rowsPerPage}
              sorting={sorting}
            />
            <TableBody>
              {sortData()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Record<string, string | number>, index) => {
                  const isItemSelected = sortingId
                    ? isSelected(row[sortingId])
                    : false;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {generateRow(row)}
                    </TableRow>
                  );
                })}
              {totalRows.length === 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={rowKeys.length} rowSpan={rowKeys.length}>
                    <h1>Data not available</h1>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows.length}
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
    </div>
  );
};
