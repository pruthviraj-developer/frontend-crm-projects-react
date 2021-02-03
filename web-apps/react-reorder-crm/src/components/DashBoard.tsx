import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FilterListPage, FiltersListPageProps } from '@hs/containers';
import { HsSelectableTable, SelectableTableProps } from '@hs/components';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { reorderService } from '@hs/services';
import { Colors } from '@hs/utils';

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
  },
  header: {
    margin: 10,
    fontSize: 28,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  dialogDescription: {
    color: Colors.PINK[500],
    fontSize: 16,
    fontWeight: 600,
  },
}));

const loading = 'Loading';
const quantityFilterDropDown = [{"options":[{"key":">","value":">"},{"key":"<","value":"<"},{"key":"=","value":"="},{"key":">=","value":">="},{"key":"<=","value":"<="}],
"key":"operator","input_type":"S","display":"Select operator"}];
const DashBoardWrapper = styled.div`
  width: 100%;
  margin: 10px 10px 10px 90px;
`;
export const DashBoard = () => {
  const classes = useStyles();
  const [status, setStatus] = useState<string>(loading);
  const [data, setData] = useState<{ records: Array<any>; count: 0 } | any>({ records: [], count: 0 });
  const [confirmDialog, showConfirmDialog] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const [actionRows, setActionRows] = useState<any>({});
  const [sideBarState, setSideBarState] = useState({ right: false });
  const [sideBarFilters, setSideBarFilters] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
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

  const removeFromFilters = (arrayList:Array<any>) => {
    const list = [...arrayList];
    let data = [...sideBarFilters];
    for (let no = 0; no < list.length; no++) {
      const element = list[no];
      const index = data.findIndex((obj: any) => obj.name === element);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
    setSideBarFilters([...data]);
  };

  const updatedFilter = (key: any, values: any) => {
    if (key === 'category_id') {
      removeFromFilters(['sub_cat', 'pt']);
      let data = [...sideBarFilters];
      (async () => {
        try {
          const ids = values.map((obj: any) => obj.key).toString();
          if (ids.length) {
            const subCategories: any = await reorderService.getSubCategories({ ids });
            if (subCategories && subCategories.sub_cat) {
              const subCategoryObject = {
                name: 'sub_cat',
                type: 'autocomplete',
                label: 'Sub Category',
                isSelect: true,
                options: subCategories.sub_cat,
              };
              const indexFound = data.findIndex((obj: any) => obj.name === 'category_id');
              if (indexFound > -1) {
                data.splice(indexFound + 1, 0, subCategoryObject);
                setSideBarFilters([...data]);
                return;
              }
            }
          }
        } catch (e) {}
      })();
    }
    if (key === 'sub_cat') {
      removeFromFilters(['pt']);
      let data = [...sideBarFilters];
      (async () => {
        try {
          const ids = values.map((obj: any) => obj.key).toString();
          if (ids.length) {
            const productType: any = await reorderService.getProductTypes({ ids });
            if (productType && productType.pt) {
              const productTypes = {
                name: 'pt',
                type: 'autocomplete',
                label: 'Product Type',
                isSelect: true,
                options: productType.pt,
              };
              const indexFound = data.findIndex((obj: any) => obj.name === 'sub_cat');
              if (indexFound > -1) {
                data.splice(indexFound + 1, 0, productTypes);
                setSideBarFilters([...data]);
                return;
              }
            }
          }
        } catch (e) {}
      })();
    }
  };

  const updateFiltersList = (filters: any) => {
    let data = [...sideBarFilters];
    const removeFromSideBar = (filtersList: Array<string>) => {
      const list = [...filtersList];
      for (let no = 0; no < list.length; no++) {
        const element = list[no];
        const index = data.findIndex((obj: any) => obj.name === element);
        if (index > -1) {
          data.splice(index, 1);
        }
      }
      setSideBarFilters([...data]);
    };
    if (!filters.category_id || (filters.category_id && filters.category_id.length === 0)) {
      delete filters.sub_cat;
      delete filters.pt;
      removeFromSideBar(['sub_cat', 'pt']);
    } else if (!filters.sub_cat || (filters.sub_cat && filters.sub_cat.length === 0)) {
      delete filters.pt;
      removeFromSideBar(['pt']);
    }
    setSelectedFilters(filters);
    setFilterParams({ ...filterParams, page_num: 1 });
  };

  const fetchTableData = (e: any) => {
    setData({ records: [], count: 0 });
    setFilterParams({ ...filterParams, page_num: e.pageNo + 1, page_size: e.pageSize });
  };

  const updateOrders = (data: any, successMessage?: string) => {
    (async () => {
      let message = 'Please try later';
      try {
        const updateData = await reorderService.updateOrders<typeof data, any>(data);
        if (updateData.action === 'success') {
          toast.success(updateData.message || successMessage);
          setFilterParams({ ...filterParams, page_num: 1 });
          return;
        }
        toast.error(updateData.message || message);
      } catch (error) {
        if (error.action === 'failure') {
          message = error.message || message;
        }
        toast.error(message);
      }
    })();
  };

  const deleteColumn = (postObject: any) => {
    showConfirmDialog(true);
    setActionRows(postObject);
    const total = postObject.skus.length;
    setConfirmationMessage(`Cancel quantity for ${total} ${total > 1 ? 'SKUs?' : 'SKU'}`);
  };

  const exportColumn = (postObject: any) => {
    showConfirmDialog(true);
    setActionRows(postObject);
    const total = postObject.skus.length;
    setConfirmationMessage(`Approve quantity for ${total} ${total > 1 ? 'SKUs?' : 'SKU'}`);
  };

  const modifySelectedColumns = (postObject: any) => {
    updateOrders(postObject, 'Updated Successfully.');
  };

  const handleDialogClose = () => {
    showConfirmDialog(false);
  };

  const updateAction = () => {
    if (actionRows.action_type === 'cancel') {
      updateOrders(actionRows, 'Canceled Successfully.');
    } else {
      updateOrders(actionRows, 'Approved Successfully.');
    }
    handleDialogClose();
  };

  const showFilters = (e: any) => {
    setSideBarState({ right: e });
  };
  const onSort = (params: any) => {
    // console.log(params);
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
    const filtersList = [
      {
        name: 'category_id',
        type: 'autocomplete',
        label: 'Category',
        isSelect: true,
        isSingle: true,
      },
      {
        name: 'vendor_id',
        type: 'autocomplete',
        label: 'Vendor',
        isSelect: true,
        isSingle: true,
      },
      {
        name: 'reason',
        type: 'autocomplete',
        label: 'Reason',
        isSelect: true,
        isSingle: true,
      },
      {
        name: 'age',
        type: 'autocomplete',
        label: 'Age',
        isSelect: true,
        isSingle: true,
      },
      {
        name: 'gender',
        type: 'autocomplete',
        label: 'Gender',
        isSelect: true,
        isSingle: true,
      },
      {
        name: 'buyers',
        type: 'autocomplete',
        label: 'Buyers',
        isSelect: true,
        isSingle: true,
      },
    ];
    (async () => {
      try {
        const list = [];
        const filters: any = await reorderService.getFilters();
        if (filters) {
          for (let index = 0; index < filtersList.length; index++) {
            const element = filtersList[index];
            if (filters[element.name]) {
              list.push({ ...element, options: filters[element.name] });
            }
          }
          const skuAttributes = filters.sku_attribute || [];
          setSideBarFilters([...list, ...skuAttributes, ...quantityFilterDropDown]);
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const singleSelectlist = ['category_id', 'vendor_id', 'reason', 'age', 'gender', 'buyer'];
        const filterKeys: Array<string> = Object.keys(selectedFilters);
        const filters: any = {};
        for (let index = 0; index < filterKeys.length; index++) {
          const element = selectedFilters[filterKeys[index]];
          if(filterKeys[index] !== 'quantity'){
            if (selectedFilters[filterKeys[index]].length) {
              let data = element.map((data: Record<string, any>) => data.key) || [];
              if (singleSelectlist.includes(filterKeys[index])) {
                filters[filterKeys[index]] = data[0];
              } else {
                filters[filterKeys[index]] = data.toString();
              }
            }
          } else {
            filters[filterKeys[index]] = element;
          }
        }
        if(filters.operator && (!filters.quantity)){
          toast.error('Enter quantity');
          return;
        }
        setStatus(loading);
        setData({ records: [], count: 0 });
        const postObject = { ...filterParams, filters };
        const list = await reorderService.getTableData<typeof postObject, any>(postObject);
        if (list.action === 'success') {
          if (list.records.length) {
            setData(list);
            return;
          }
          setStatus('No Data');
        } else {
          setStatus('No Data');
        }
      } catch (error) {
        setStatus('No Data');
      }
    })();
  }, [filterParams, selectedFilters]);

  const selectTableData: SelectableTableProps = {
    columns: [
      'SKU',
      'PID',
      'Country',
      'ASV present',
      'ASV Previous Week',
      'Reason',
      'Age Class',
      'Category',
      'Sub Category',
      'Product Type',
      'Quantity',
      'Modified Quantity',
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
      'category',
      'sub_category',
      'product_type',
      'quantity',
      'modified_quantity',
      'cost_price',
      'season',
      'product_sub_type',
    ],
    rows: data && data['records'] ? data['records'] : [],
    selectId: 'sku',
    fetchTableData: fetchTableData,
    deleteColumn: deleteColumn,
    exportColumn: exportColumn,
    modifySelectedColumns: modifySelectedColumns,
    stableSort: stableSort,
    showFilters,
    getComparator: getComparator,
    onSort: onSort,
    rowsPerPageOptions: [5, 10, 15, 20],
    displayRowsPerPage: filterParams.page_size || 10,
    currentPage: filterParams.page_num - 1,
    totalRowsCount: data.count || 0,
    setColumnsWidth: {
      asv_previous_week: 40,
      asv_present: 30,
    },
  };
  const filtersData: FiltersListPageProps = {
    sideBar: [...sideBarFilters],
    toggleSideBar: sideBarState,
    updateFiltersList,
    updatedFilter,
  };
  return (
    <DashBoardWrapper>
      <h1 className={classes.header}>Checks and Balances DashBoard</h1>
      <FilterListPage {...filtersData} />
      {data.count === 0 && <h5> {status} </h5>}
      <Grid container spacing={2} style={{ marginBottom: '5px' }}>
        {defaultLabels.map((obj: any) => {
          const labelObj = data?.[obj.key] ? true : data && data[obj.key] === 0 ? true : undefined;
          return labelObj ? (
            <Grid item xs={3} key={obj.label}>
              <Paper className={classes.paper}>
                <span color="primary">{obj.label}</span> =&gt; <span>{data[obj.key]}</span>
              </Paper>
            </Grid>
          ) : null;
        })}
      </Grid>
      {data.count > 0 && <HsSelectableTable {...selectTableData} />}
      <Dialog
        open={confirmDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span className={classes.dialogTitle}>Confirmation</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span className={classes.dialogDescription}>{confirmationMessage}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleDialogClose}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={updateAction} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </DashBoardWrapper>
  );
};
