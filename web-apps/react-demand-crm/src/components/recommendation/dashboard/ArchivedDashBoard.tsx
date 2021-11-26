import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { HSTableV1 } from '@hs/components';
import { FilterPan, FilterPanProps } from '@hs/components';
import { IPostDataType, IDashboardDataResponse, IHeaderType, IPageType, ITableDataType } from './IDashBoard';
import { Helmet } from 'react-helmet';
import { ArchivedDashBoardWrapper, ArchivedFilterWrapper, TableWrapper } from './Style';
import { getArchivedFiltersData, dashboardColumns } from './Constant';
import { recommendationService } from '@hs/services';
import { useQuery } from 'react-query';
import { IRecommendationCarouselList } from '../create/IAddEdit';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    paddingTop: '1rem',
    fontSize: 28,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'FAILURE' && error.messageList[0]) {
    message = error.messageList[0];
  }
  toast.error(message);
};

const defaultPageFilters = { pageSize: 10, pageNo: 0 };
const ArchivedDashboard: FC<{ header: string }> = ({ header }: IHeaderType) => {
  const classes = useStyles();
  const [postFilterData, setPostFilterData] = useState({});
  const [filterPage, setFilterPage] = useState<IPageType>(defaultPageFilters);
  const [getFiltersData, setFilterData] = useState(getArchivedFiltersData);

  const { data: dashboardData, isSuccess: isDashboardSuccess } = useQuery<
    IDashboardDataResponse,
    Record<string, string>
  >(
    ['dashboardData', postFilterData, filterPage],
    () =>
      recommendationService.getTableData({
        ...filterPage,
        pageNo: filterPage.pageNo + 1,
        ...postFilterData,
        modelStatuses: 'inactive',
      }),
    {
      staleTime: Infinity,
      onError: (error) => {
        showError(error);
      },
    },
  );

  const tableData: ITableDataType = {
    title: '',
    count: (dashboardData && dashboardData.totalRecords) || 0,
    activePage: filterPage.pageNo,
    columns: dashboardColumns,
    rows: dashboardData ? dashboardData['models'] : [],
    rowsPerPage: filterPage.pageSize || 10,
    filterRowsPerPage: [10, 20, 50, 100],
    fetchTableData: setFilterPage,
  };

  const onChangeHandler = (data: IPostDataType) => {
    setFilterPage(defaultPageFilters);
    setPostFilterData(data);
  };

  let filterData: FilterPanProps = {
    data: getFiltersData,
    onChange: onChangeHandler,
  };

  useEffect(() => {
    (async () => {
      try {
        let listType: IRecommendationCarouselList[] = await recommendationService.getRecommendCarouselTypes();
        if (listType.length > 0) {
          let setupfilterData: any = JSON.parse(JSON.stringify(getArchivedFiltersData));
          setupfilterData.map((row: any) => {
            if (row.key === 'rcType') {
              listType.map((list: any) => {
                row.options.push({ display: list.displayName, key: list.key });
                return list;
              });
            }
            return row;
          });
          setFilterData(setupfilterData);
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <ArchivedDashBoardWrapper>
        <h1 className={classes.header}>{header}</h1>
        <ArchivedFilterWrapper>
          <FilterPan {...filterData} />
        </ArchivedFilterWrapper>
        <TableWrapper>
          {isDashboardSuccess && tableData.rows?.length > 0 && <HSTableV1 {...tableData} />}
          {tableData.rows?.length === 0 && <h4>No Records Found</h4>}
        </TableWrapper>
      </ArchivedDashBoardWrapper>
    </>
  );
};

export default ArchivedDashboard;
