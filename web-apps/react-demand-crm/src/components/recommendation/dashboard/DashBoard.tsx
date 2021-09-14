import React, { FC, useState, useEffect } from 'react';
import {
  HsSelectableTable,
  SelectableTableProps,
  DatePickerComponent,
  DatePickerComponentPropsType,
} from '@hs/components';
import { FilterPan, FilterPanProps } from '@hs/components';
import { IPostDataType, IDashboardDataResponse, IdialogFromSubmit } from './IDashBoard';
import { Helmet } from 'react-helmet';
import { DashBoardWrapper, FilterWrapper } from './Style';
import { getFiltersData, dashboardColumns } from './Constant';
import { RecommendationTableToolbar } from './RecommendationTableToolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '@hs/utils';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { recommendationService } from '@hs/services';

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

var defaultPageFilters = { pageNo: 1, pageSize: 10 };

let getDafultDate = new Date();
getDafultDate.setDate(getDafultDate.getDate() - 1);
let year = getDafultDate.getFullYear();
let month = ('0' + (getDafultDate.getMonth() + 1)).slice(-2);
let date = ('0' + getDafultDate.getDate()).slice(-2);
var oneDayBeforeDate = '' + year + '-' + month + '-' + date;

const DashBoard: FC<{ header: string }> = ({ header }) => {
  const classes = useStyles();
  const [filterParams, setFilterParams] = useState<any>(defaultPageFilters);
  const [status, setStatus] = useState<string>('Loading');
  const [confirmDialog, showConfirmDialog] = useState(false);
  const [isShowFilters, setIsShowFilters] = useState(true);
  const [actionRows, setActionRows] = useState<any>({});
  const [dashboardData, setdashboardData] = useState<{ models: Array<any>; totalRecords: 0 } | any>({
    models: [],
    totalRecords: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const data: IDashboardDataResponse = await recommendationService.getTableData(filterParams);
        if (data.action === 'success') {
          if (data?.models?.length) {
            setdashboardData(data);
            return;
          } else {
            setdashboardData({
              models: [],
              totalRecords: 0,
            });
            setStatus('No Data');
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        error.message && toast.error(error.message);
        setStatus('Something went wrong..');
      }
    })();
  }, [filterParams]);

  const fetchTableData = (e: any) => {
    setFilterParams({ ...filterParams, pageNo: e.pageNo + 1, pageSize: e.pageSize });
  };

  const handleDialogClose = () => {
    showConfirmDialog(false);
  };

  const runSubmit = () => {
    if (!actionRows['rundate']) {
      runIds({ ...actionRows, rundate: oneDayBeforeDate });
    } else {
      runIds(actionRows);
    }
    handleDialogClose();
  };

  const run = (postObject: any) => {
    showConfirmDialog(true);
    setActionRows(postObject);
  };

  const deactivate = (postObject: any) => {
    setActionRows(postObject);
    deactivateIds(postObject);
  };

  const showFilters = (flag: boolean) => {
    setIsShowFilters(flag);
  };

  const Msg = (props: any) => (
    <div>
      {props.id}: <span dangerouslySetInnerHTML={{ __html: props.msg }} />
    </div>
  );
  const deactivateIds = (data: IdialogFromSubmit) => {
    console.log(data);
    (async () => {
      let message = 'Please try later';
      try {
        const updateData = await recommendationService.deactivateData<typeof data, any>(data);
        if (updateData.action === 'success') {
          if (Object.keys(updateData.successMessage).length) {
            for (const [key, value] of Object.entries(updateData.successMessage)) {
              toast.success(<Msg id={key} msg={value} />);
            }
          }
          if (Object.keys(updateData.failureMessage).length) {
            for (const [key, value] of Object.entries(updateData.failureMessage)) {
              toast.error(<Msg id={key} msg={value} />);
            }
          }
        }
      } catch (error) {
        if (error.action === 'failure') {
          message = error.message || message;
        }
        toast.error(message);
      }
    })();
  };

  const runIds = (data: IdialogFromSubmit) => {
    (async () => {
      let message = 'Please try later';
      try {
        const updateData = await recommendationService.runData<typeof data, any>(data);
        if (updateData.action === 'success') {
          if (Object.keys(updateData.successMessage).length) {
            for (const [key, value] of Object.entries(updateData.successMessage)) {
              toast.success(<Msg id={key} msg={value} />);
            }
          }
          if (Object.keys(updateData.failureMessage).length) {
            for (const [key, value] of Object.entries(updateData.failureMessage)) {
              toast.error(<Msg id={key} msg={value} />);
            }
          }
        }
      } catch (error) {
        if (error.action === 'failure') {
          message = error.message || message;
        }
        toast.error(message);
      }
    })();
  };

  const selectTableData: SelectableTableProps = {
    rows: dashboardData && dashboardData['models'] ? dashboardData['models'] : [],
    columns: dashboardColumns,

    rowsPerPageOptions: [5, 10, 15, 20],
    displayRowsPerPage: filterParams.pageSize || 10,
    totalRowsCount: dashboardData.totalRecords || 0,
    currentPage: filterParams.pageNo - 1,
    selectId: 'id',
    sortingId: 'id',
    fetchTableData,
    tableToolbar: (numSelected = 0, rowsSelected = []) => (
      <RecommendationTableToolbar
        numSelected={numSelected}
        rowsSelected={rowsSelected}
        run={run}
        deactivate={deactivate}
        showFilters={showFilters}
      />
    ),
  };

  const onChangeHandler = (data: IPostDataType) => {
    setFilterParams({ ...defaultPageFilters, ...data });
  };

  const onChangeDialogHandler = ({ rundate }: IPostDataType) => {
    setActionRows({ ...actionRows, rundate });
  };

  const filterPanData: FilterPanProps = {
    data: getFiltersData,
    onChange: onChangeHandler,
  };

  const dialogdatePicker: DatePickerComponentPropsType = {
    display: 'run date',
    keyName: 'rundate',
    selectedDate: oneDayBeforeDate,
    setSelectedDate: onChangeDialogHandler,
    customCss: {
      maxWidth: 400,
    },
  };

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <h1 className={classes.header}>{header}</h1>
      {isShowFilters && (
        <FilterWrapper>
          <FilterPan key={header} {...filterPanData} />
        </FilterWrapper>
      )}
      <DashBoardWrapper>
        {dashboardData.totalRecords === 0 && <h4> {status} </h4>}
        {dashboardData.totalRecords > 0 && <HsSelectableTable key={header} {...selectTableData} />}
        <Dialog
          open={confirmDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            <span className={classes.dialogTitle}>Confirmation</span>
          </DialogTitle>
          <DialogContent>
            {/* <FilterPan {...dialogdatePicker} /> */}
            <DatePickerComponent {...dialogdatePicker} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleDialogClose}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={runSubmit} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </DashBoardWrapper>
    </>
  );
};

export default DashBoard;
