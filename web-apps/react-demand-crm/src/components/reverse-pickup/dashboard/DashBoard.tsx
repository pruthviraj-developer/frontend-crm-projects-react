import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { HSTableV1, FilterPan, Loader } from '@hs-crm/components';
import { HopscotchColumns, MarketPlaceColumns } from './Constant';
import { FilterWrapper, TableWrapper } from './Style';
import { useState } from 'react';
import { IDashboardResponse, IHeaderType, IPageType, ITableDataType, IFilterDataResponse } from './IDashBoard';
import { useQuery, useMutation } from 'react-query';
import { reversepickupService, bulkUploadService } from '@hs/services';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultPageFilters = { pageSize: 10, pageNo: 0 };
const showError = (error: Record<string, string>) => {
  let message = 'Please try later';
  if (error.action === 'FAILURE' && error.messageList[0]) {
    message = error.messageList[0];
  }
  toast.error(message);
};

const DashBoard: FC<{ header: string }> = ({ header }: IHeaderType) => {
  const [postFilterData, setPostFilterData] = useState({});
  const [pageParam, setPageParam] = useState<IPageType>(defaultPageFilters);

  const {
    data: dashboardData,
    isSuccess: isDashboardSuccess,
    isLoading: isDashboardLoading,
  } = useQuery<IDashboardResponse, Record<string, string>>(
    ['dashboardData', postFilterData, pageParam, header],
    () =>
      reversepickupService.getTableData({
        ...pageParam,
        pageNo: pageParam.pageNo + 1,
        ...postFilterData,
        isHopscotchOrder: header === 'Hopscotch',
      }),
    {
      staleTime: Infinity,
      retry: false,
      onError: (error) => {
        showError(error);
      },
    },
  );

  const { data: filterList } = useQuery<IFilterDataResponse, Record<string, string>>(
    ['filterList', header],
    () => reversepickupService.getFilterList(),
    {
      staleTime: Infinity,
      retry: false,
      onError: (error) => {
        showError(error);
      },
    },
  );

  const onChangeHandler = (data: any) => {
    setPageParam(defaultPageFilters);
    setPostFilterData(data);
  };

  const downloadFile = async () => {
    try {
      var res: any = await reversepickupService.getSheetUrl({
        ...pageParam,
        pageNo: pageParam.pageNo + 1,
        ...postFilterData,
        isHopscotchOrder: header === 'Hopscotch',
      });

      const sheetKey = res.data?.sheetKey;
      if (sheetKey) {
        let resp = await bulkUploadService.downloadTemplate({
          action: 'getUrlBySheetKey',
          sheetKey: sheetKey,
        });

        if (resp.data.is_available) {
          window.open(resp.data.url, '_blank');
          resp.data.message !== '' && toast.success(resp.data.message);
        } else {
          toast.warn(resp.data.message);
        }
      }
    } catch (error) {
      toast.error(error && error.message);
    }
    return res;
  };

  const tableData: ITableDataType = {
    title: '',
    count: (dashboardData && dashboardData.data && dashboardData.data.totalRecords) || 0,
    activePage: pageParam.pageNo,
    columns: header === 'Hopscotch' ? HopscotchColumns : MarketPlaceColumns,
    rows: dashboardData && dashboardData.data ? dashboardData.data.dashboardDetails : [],
    rowsPerPage: pageParam.pageSize || 10,
    filterRowsPerPage: [10, 20, 50, 100],
    fetchTableData: setPageParam,
  };

  const { mutate, isLoading: isDownloading } = useMutation(downloadFile);

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <h1>{header}</h1>
      <FilterWrapper>
        {filterList && (
          <FilterPan
            key={header}
            data={header === 'Hopscotch' ? filterList.data.hopscotchFilter : filterList.data.thirdPartyFilter}
            onChange={onChangeHandler}
          />
        )}
        {!isDashboardLoading && (
          <Button
            variant="contained"
            style={{ display: 'flex', marginTop: '9px' }}
            color="primary"
            size="large"
            disabled={isDownloading}
            startIcon={isDownloading ? <CircularProgress size={20} /> : <SaveAltIcon />}
            onClick={() => {
              mutate();
            }}
          >
            Download
          </Button>
        )}
      </FilterWrapper>
      {isDashboardLoading && <Loader />}
      <TableWrapper>
        {!isDashboardLoading && isDashboardSuccess && tableData.rows?.length > 0 && <HSTableV1 {...tableData} />}
        {isDashboardSuccess && tableData.rows?.length === 0 && <h4>No Records Found</h4>}
      </TableWrapper>
    </>
  );
};

export default DashBoard;
