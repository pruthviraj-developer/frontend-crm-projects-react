/* eslint-disable no-console */
/* eslint react/prop-types: 0 */
import React, { FC, useState, useEffect } from 'react';
import { HSTable, HsTableProps, HsSnackbar, HsSnackbarProps } from '@hs-crm/components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';
import { IconButton } from '@material-ui/core';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { carouselService, tableData, CloneHeroCarouselWithId } from '@hs/services';
import { tableList, tableParams } from '@hs/services';
import { NavLink, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { SelectedCircle, SvgIcon } from '@hs/icons';
import { IDashboardProps } from './IDashBoard';
const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;
const StyledIcon = styled(SvgIcon)`
  min-width: 24px;
`;

const snackBarProps: Pick<HsSnackbarProps, 'open' | 'type' | 'message'> = {
  open: false,
  type: 'error' as const,
  message: 'Test',
};

const DashBoard: FC<IDashboardProps> = ({ title }) => {
  // const snackBarProps = {
  //   open: false,
  //   type: 'error' as const,
  //   message: 'Test',
  //   onSnackBarClose: onSnackBarClose,
  // };
  const history = useHistory();
  const location = useLocation();
  const [data, setTableData] = useState<tableData>({});
  const [snackBarError, setSnackBarError] = useState(snackBarProps);
  const [count, setCount] = useState<number>(0);
  const [isUrlChanged, setUrlChanged] = useState<number>(0);
  const [filterParams, setFilterParams] = useState<tableParams>({ pageSize: 10, pageNo: 0 }); // page size should be size as rowsperpage
  const onSnackBarClose = (open: boolean) => {
    setSnackBarError({ ...snackBarError, open });
  };

  useEffect(() => {
    (async () => {
      try {
        let tableData: tableData = { totalRecords: 0 };
        const params = { ...filterParams, pageNo: filterParams.pageNo + 1 };
        if (location.pathname === '/dashboard') {
          tableData = await carouselService.getTableData(params);
        } else {
          tableData = await carouselService.getArchivedTableData(params);
        }
        setTableData(tableData);
        setCount(tableData.totalRecords || 0);
      } catch (error) {
        setTableData({});
        setCount(0);
        let message = 'Try Later';
        if (error.action === 'failure') {
          message = error.messageDetail.message;
        }
        setSnackBarError({
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  }, [filterParams]);

  useEffect(() => {
    if (isUrlChanged) {
      setTableData({});
      setCount(0);
      setFilterParams({ pageSize: 10, pageNo: 0 });
    } else {
      setUrlChanged(1);
    }
  }, [location]);

  const getUpdatedTableData = (filters: tableParams) => {
    setFilterParams(filters);
  };
  const saveCloneData = (res: Record<string, unknown>) => {
    const postData = { ...res, title: `Cloned ${res.title}` };
    (async () => {
      try {
        const response = await carouselService.createNonHeroCarousel(postData);
        if (response.action === 'success') {
          setSnackBarError({
            open: true,
            type: 'success',
            message: response.messageDetail ? response.messageDetail.message : 'Refresh the Page to see the status',
          });
          const value = response.messageDetail ? response.messageDetail.value : undefined;
          if (value) {
            history.push(`edit-carousel/${value}`);
          }
        }
      } catch (error) {
        setCount(0);
        let message = 'Try Later';
        if (error.action === 'failure') {
          message = error.messageDetail.message;
        }
        setSnackBarError({
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  };
  const cloneAndCreate = (rowData: tableList) => {
    (async () => {
      try {
        const res = await carouselService.getNonHeroCarouselData<CloneHeroCarouselWithId>(rowData.id);
        delete res?.id;
        saveCloneData(res);
      } catch (responseError) {
        const error = responseError.data || responseError;
        let message = 'Try Later';
        if (error.action === 'failure') {
          message = error.messageDetail.message;
        }
        setSnackBarError({
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  };

  const updateStatus = (rowData: tableList) => {
    if (rowData.type === 'clone') {
      cloneAndCreate(rowData);
    } else if (rowData.type === 'delete') {
      (async () => {
        try {
          const res = await carouselService.deleteNonHeroCarouselData(rowData.id);
          const message = res.messageDetail ? res.messageDetail.message : 'Refresh the Page to see the status';
          if (res.action === 'success') {
            setFilterParams({ ...filterParams });
            setSnackBarError({
              open: true,
              type: 'success',
              message: message,
            });
          } else {
            setSnackBarError({
              open: true,
              type: 'error',
              message: message,
            });
          }
        } catch (error) {
          const data = error.data || error;
          let message = 'Try Later';
          if (data.action === 'failure') {
            message = data.messageDetail.message;
          }
          setSnackBarError({
            ...snackBarProps,
            open: true,
            type: 'error',
            message: message,
          });
        }
      })();
    } else {
      (async () => {
        try {
          const res = await carouselService.updateNonHeroCarouselData(rowData.id);
          console.log(res);
          if (res.action === 'success') {
            const message = res.messageDetail ? res.messageDetail.message : 'Published successfully';
            setFilterParams({ ...filterParams });
            setSnackBarError({
              ...snackBarProps,
              open: true,
              type: 'success',
              message: message,
            });
          } else {
            throw res;
          }
        } catch (error) {
          const data = error.data || error;
          let message = 'Try Later';
          if (data.action === 'failure') {
            message = data.messageDetail.message;
          }
          setSnackBarError({
            ...snackBarProps,
            open: true,
            type: 'error',
            message: message,
          });
        }
      })();
    }
  };
  const action = (row: tableList) => {
    updateStatus(row);
  };
  const columns = [
    {
      id: 'id',
      label: 'Id',
      render: (value: number, rowData: tableList, isTitle?: boolean) => {
        if (isTitle) {
          return value;
        }
        if (rowData) {
          return (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <NavLink to={{ pathname: `/edit-carousel/${rowData.id}` }}> {value}</NavLink>
                {rowData.active && <StyledIcon icon={SelectedCircle} />}
              </div>
            </>
          );
        }
        return '--';
      },
    },
    {
      id: 'title',
      label: 'Title',
      width: 100,
      render: (props: string, data: tableList, isTitle?: boolean) => {
        if (isTitle) {
          return data.title;
        }
        if (props || data) {
          return (
            <>
              <NavLink to={{ pathname: `/edit-carousel/${data.id}` }}>
                {data.title} {data.navigation && '(Navigation)'}
              </NavLink>
            </>
          );
        }
        return '--';
      },
    },
    {
      id: 'sorts',
      label: 'Sorted By',
      width: 150,
      render: (sorts: Array<string>) => {
        if (sorts && sorts.length) {
          return sorts.join(' ,');
        }
        return '--';
      },
    },
    {
      id: 'startDate',
      label: 'Start Date',
      render: (data: string) => {
        if (data) {
          return format(new Date(data), 'dd/MM/yyyy, hh:mm aa');
        }
        return '--';
      },
    },
    {
      id: 'endDate',
      label: 'End Date',
      render: (data: string) => {
        if (data) {
          return format(new Date(data), 'dd/MM/yyyy, hh:mm aa');
        }
        return '--';
      },
    },
    { id: 'createdBy', label: 'Created By', width: 200 },
    { id: 'updatedBy', label: 'Updated By', width: 200 },
    {
      id: 'createdOn',
      label: 'Created On',
      render: (data: string) => {
        if (data) {
          return format(new Date(data), 'dd-MM-yy');
        }
        return '--';
      },
    },
    {
      id: 'updatedOn',
      label: 'Last updated',
      render: (data: string) => {
        if (data) {
          return format(new Date(data), 'dd-MM-yy');
        }
        return '--';
      },
    },
    {
      label: 'Action',
      render: (props: HsTableProps, data: Record<string, unknown>) => {
        if (data) {
          return (
            <div style={{ display: 'flex' }}>
              <IconButton
                style={{ marginLeft: '5px', padding: '6px' }}
                title="Publish"
                color="primary"
                aria-label="Publish"
                onClick={() => {
                  if (props) {
                    props.action && props.action({ ...data, type: 'publish' });
                  }
                }}
              >
                <PublishIcon />
              </IconButton>
              <IconButton
                style={{ marginLeft: '5px', padding: '6px' }}
                title="Copy"
                color="primary"
                aria-label="clone"
                onClick={() => {
                  if (props) {
                    props.action && props.action({ ...data, type: 'clone' });
                  }
                }}
              >
                <FileCopyIcon />
              </IconButton>
              <IconButton
                style={{ marginLeft: '5px', padding: '6px' }}
                title="Delete"
                color="primary"
                aria-label="Delete"
                onClick={() => {
                  if (props) {
                    props.action && props.action({ ...data, type: 'delete' });
                  }
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </div>
          );
        }
        return '--';
      },
    },
  ];
  const records: Array<tableList> = data.records || [];
  const TableData: HsTableProps = {
    title: 'Table testing',
    count: count,
    columns: columns,
    rowsPerPage: 10, // Should be same as page size
    rows: [...records],
    filterRowsPerPage: [10, 25, 50, 100],
    fetchTableData: getUpdatedTableData,
    action: action,
  };
  return (
    <DashBoardWrapper>
      <h1>{title}</h1>
      {count > 0 && <HSTable {...TableData} />}
      {count === 0 && <h5> Loading or no data</h5>}
      {snackBarError.open && <HsSnackbar {...snackBarError} onSnackBarClose={onSnackBarClose} />}
    </DashBoardWrapper>
  );
};

export default DashBoard;
