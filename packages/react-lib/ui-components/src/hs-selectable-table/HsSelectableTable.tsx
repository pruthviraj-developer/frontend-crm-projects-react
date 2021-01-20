import React, { FC, useState, useEffect } from 'react';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import { SelectableTableProps } from './ISelectableTable';
import { Colors } from '@hs/utils';
import { Button, MenuItem, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
type Order = 'asc' | 'desc';
let sortedRows: any = [];
interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
}

const modifyQuantityFormValidation = Yup.object().shape({
  action: Yup.mixed().required('Please select action type'),
  is_percentage_type: Yup.mixed().required('Please select update type'),
  value: Yup.number()
    .required('Please enter value')
    .typeError('Please enter only numbers'),
});

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
  rowsSelected: any;
  deleteColumn?: (event: any) => void;
  exportColumn?: (event: any) => void;
  modifySelectedColumns?: (event: any) => void;
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
      display: 'flex',
      justifyContent: 'space-between',
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
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
);

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, rowsSelected } = props;
  const [modifyQuantityForm, showModifyQuantityForm] = useState<boolean>(false);
  const cancelSelected = () => {
    props.deleteColumn &&
      props.deleteColumn({
        action_type: 'modify',
        decreased_by: null,
        increased_by: null,
        is_percentage_type: null,
        skus: rowsSelected,
      });
  };

  const approveSelected = () => {
    props.exportColumn && props.exportColumn(rowsSelected);
  };

  const modifySelected = (data) => {
    props.modifySelectedColumns &&
      props.modifySelectedColumns({
        action_type: 'modify',
        decreased_by: data.action === 'decreased_by' ? data.value : null,
        increased_by: data.action === 'increased_by' ? data.value : null,
        is_percentage_type: data.is_percentage_type,
        skus: rowsSelected,
      });
  };

  const showFilters = () => {
    props.showFilters && props.showFilters(true);
  };

  const dropDownList = [
    {
      name: 'action',
      label: 'Action Type',
      defaultValue: '',
      options: [
        { display: 'Increase By', value: 'increased_by' },
        { display: 'Decrease By', value: 'decreased_by' },
      ],
    },
    {
      name: 'is_percentage_type',
      label: 'Update Type',
      defaultValue: '',
      options: [
        { display: 'Percentage', value: 'true' },
        { display: 'Number', value: 'false' },
      ],
    },
  ];

  useEffect(() => {
    showModifyQuantityForm(false);
  }, [numSelected]);

  return (
    <>
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
            <div className="actions">
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10 }}
                onClick={() => {
                  showModifyQuantityForm(!modifyQuantityForm);
                }}
              >
                Modify Quantity
              </Button>
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 10 }}
                onClick={cancelSelected}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 10 }}
                onClick={approveSelected}
              >
                Approve
              </Button>
            </div>
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
      {modifyQuantityForm && (
        <Formik
          initialValues={{ action: '', is_percentage_type: '', value: '' }}
          validationSchema={modifyQuantityFormValidation}
          onSubmit={(values, { setSubmitting }) => {
            modifySelected({ ...values, action_type: 'modify' });
            setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                {dropDownList.map((listObject, index) => {
                  return (
                    <Grid item xs={2} key={listObject.name}>
                      <Field
                        select
                        variant={'outlined'}
                        name={listObject.name}
                        label={listObject.label}
                        component={TextField}
                        type="text"
                        inputProps={{
                          id: `ol-select-type-${index}`,
                        }}
                        fullWidth
                      >
                        {listObject?.options?.map((item: any, lindex) => (
                          <MenuItem key={lindex} value={item.value}>
                            {item.display}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                  );
                })}
                <Grid item xs={1}>
                  <Field
                    component={TextField}
                    name="value"
                    type="text"
                    label="Value"
                    variant={'outlined'}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    size="large"
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      padding: '14px 10px',
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </>
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
  modifySelectedColumns,
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
            modifySelectedColumns={modifySelectedColumns}
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
