import React, { useState, useEffect } from 'react';
import { FilterListPage, FiltersListPageProps } from '@hs/containers';
import { HsSelectableTable, SelectableTableProps } from '@hs/components';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { reorderService } from '@hs/services';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: '20px',
  },
  header: {
    margin: 10,
    fontSize: 28,
  },
}));

const DashBoardWrapper = styled.div`
  width: 100%;
  margin: 10px 10px 10px 90px;
`;
export const DashBoard = () => {
  const classes = useStyles();
  const [status, setStatus] = useState<string>('Loading');
  const [data, setData] = useState<{ records: Array<any>; count: 0 } | any>({ records: [], count: 0 });
  const [sideBarState, setSideBarSate] = useState({ right: false });
  const [filterParams, setFilterParams] = useState<any>({ page_num: 1, page_size: 10, filters: {} });
  const defaultLabels: any = [
    {
      key: 'total_sku',
      label: 'Total SKUs',
    },
    {
      key: 'total_quantity',
      label: 'Total Quantity',
    },
    {
      key: 'total_amount',
      label: 'Total Amount',
    },
    {
      key: 'total_pid',
      label: 'Total PIDs',
    },
    {
      key: 'suggested_quantity',
      label: 'Suggested Quantity',
    },
    {
      key: 'total_asv',
      label: 'Total ASV',
    },
  ];

  const reasonOptions = [
    {
      display: 'Non due to quality and sizing',
      value: '1kjh',
      key: '1kjh',
      id: '1',
    },
    {
      display: 'Proc high return due to other reason',
      value: 'lkj2',
      key: 'lkj2',
      id: '2',
    },
  ];

  const reasonSideBarOption = {
    isSelect: true,
    name: 'sreason',
    label: 'mReason',
    options: reasonOptions,
    type: 'autocomplete',
  };

  const autoSideBarOption = {
    isSelect: true,
    name: 'areason',
    label: 'Auto Reason',
    options: reasonOptions,
    type: 'autocomplete',
  };

  const updateFiltersList = (e: any) => {
    console.log(e, 'filters');
  };

  const fetchTableData = (e: any) => {
    setData({ records: [], count: 0 });
    setFilterParams({ ...filterParams, page_num: e.pageNo + 1, page_size: e.pageSize });
  };

  const deleteColumn = (e: any) => {
    console.log(e);
  };

  const exportColumn = (e: any) => {
    console.log(e);
  };

  const showFilters = (e: any) => {
    setSideBarSate({ right: e });
  };
  const onSort = (params: any) => {
    console.log(params);
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

  useEffect(() => {
    (async () => {
      try {
        setStatus('Loading');
        const list = await reorderService.getTableData<typeof filterParams, any>(filterParams);
        if (list.action === 'success') {
          setData(list);
        } else {
          setStatus('No Data');
        }
      } catch (error) {
        setStatus('No Data');
      }
    })();
    return () => {
      setData({ records: [], count: 0 });
    };
  }, [filterParams]);

  const selectTableData: SelectableTableProps = {
    columns: [
      'SKU',
      'PID',
      'Country',
      'ASV present',
      'ASV Previous Week',
      'Reason',
      'Age Class',
      'Sub Category',
      'Product Type',
      'Quantity',
      'Cost',
      'Season',
      'Product Sub  Type',
    ],
    rowKeys: [
      'sku',
      'pid',
      'country',
      'asv_present',
      'asv_previous_week',
      'reason',
      'age_class',
      'sub_category',
      'product_type',
      'quantity',
      'cost_price',
      'season',
      'product_sub_type',
    ],
    rows: data && data['records'] ? data['records'] : [],
    selectId: 'sku',
    fetchTableData: fetchTableData,
    deleteColumn: deleteColumn,
    exportColumn: exportColumn,
    stableSort: stableSort,
    showFilters,
    getComparator: getComparator,
    onSort: onSort,
    rowsPerPageOptions: [5, 10, 15, 20],
    displayRowsPerPage: 10,
    currentPage: filterParams.page_num - 1,
    totalRowsCount: data.count || 0,
    setColumnsWidth: {
      asv_previous_week: 40,
      asv_present: 30,
    },
  };
  const filtersData: FiltersListPageProps = {
    sideBar: [reasonSideBarOption, autoSideBarOption],
    toggleSideBar: sideBarState,
    updateFiltersList,
  };
  return (
    <DashBoardWrapper>
      <h1 className={classes.header}>Checks and Balances DashBoard</h1>
      <FilterListPage {...filtersData} />
      {data.count === 0 && <h5> {status} </h5>}
      <Grid container spacing={2}>
        {defaultLabels.map((obj: any) => {
          return data?.[obj.key] ? (
            <Grid item xs={3} key={obj.label}>
              <Paper className={classes.paper}>
                <span color="primary">{obj.label}</span> =&gt; <span>{data[obj.key]}</span>
              </Paper>
            </Grid>
          ) : null;
        })}
      </Grid>
      {data.count > 0 && <HsSelectableTable {...selectTableData} />}
    </DashBoardWrapper>
  );
};
