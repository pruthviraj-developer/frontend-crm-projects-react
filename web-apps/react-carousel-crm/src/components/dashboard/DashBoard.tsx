/* eslint-disable no-console */
import React, { FC, useState, useEffect } from 'react';
import { HSTable, HsTableProps, HsSnackbar, HsSnackbarProps } from '@hs/components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';
import { IconButton } from '@material-ui/core';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { carouselService, tableData, CloneHeroCarouselWithId } from '@hs/services';
import { tableList, tableParams } from '@hs/services';
import { NavLink } from 'react-router-dom';

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;
const DashBoard: FC = () => {
  const onSnackBarClose = (open: boolean) => {
    setSnackBarError({ ...HsSnackBarError, open });
  };
  const snackBarProps = {
    open: false,
    type: 'error' as const,
    message: 'Test',
    onSnackBarClose: onSnackBarClose,
  };
  const [data, setTableData] = useState<tableData>({});
  const [HsSnackBarError, setSnackBarError] = useState<HsSnackbarProps>(snackBarProps);
  const [count, setCount] = useState<number>(0);
  const [filterParams, setFilterParams] = useState<tableParams>({ pageSize: 10, pageNo: 0 }); // page size should be size as rowsperpage
  useEffect(() => {
    (async () => {
      try {
        // console.log('Called');
        const tableData = await carouselService.getTableData(filterParams);
        // console.log('sortList', sortList);
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
          ...snackBarProps,
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  }, [filterParams]);

  const getUpdatedTableData = (filters: tableParams) => {
    setFilterParams(filters);
  };
  const saveCloneData = (res: any) => {
    const postData = { ...res, title: `Cloned ${res.title}` };
    (async () => {
      try {
        const response = await carouselService.createNonHeroCarousel(postData);
        setFilterParams({ ...filterParams });
        if (response.action === 'success') {
          setSnackBarError({
            ...snackBarProps,
            open: true,
            type: 'success',
            message: response.messageDetail ? response.messageDetail.message : 'Refresh the Page to see the status',
          });
        }
      } catch (error) {
        setCount(0);
        let message = 'Try Later';
        if (error.action === 'failure') {
          message = error.messageDetail.message;
        }
        setSnackBarError({
          ...snackBarProps,
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  };
  const cloneAndCreate = (rowData: CloneHeroCarouselWithId) => {
    (async () => {
      try {
        const res = await carouselService.getNonHeroCarouselData<CloneHeroCarouselWithId>(rowData.id);
        delete res['id'];
        saveCloneData(res);
      } catch (responseError) {
        const error = responseError.data || responseError;
        let message = 'Try Later';
        if (error.action === 'failure') {
          message = error.messageDetail.message;
        }
        setSnackBarError({
          ...snackBarProps,
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  };

  const updateStatus = (rowData: CloneHeroCarouselWithId) => {
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
              ...snackBarProps,
              open: true,
              type: 'success',
              message: message,
            });
          } else {
            setSnackBarError({
              ...snackBarProps,
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
  const action = (row: any) => {
    updateStatus(row);
  };
  const columns = [
    { id: 'id', label: 'Id' },
    {
      id: 'title',
      label: 'Title',
      width: 100,
      render: (props: any, data: any) => {
        if (props || data) {
          return (
            <>
              <NavLink to={{ pathname: `/edit-carousel/${data.id}` }}>{data.title}</NavLink>
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
      render: (props: any, data: Record<string, unknown>) => {
        if (data) {
          return (
            <div style={{ display: 'flex' }}>
              <IconButton
                color="primary"
                aria-label="Publish"
                style={{ padding: 0 }}
                onClick={() => {
                  if (props) {
                    props.action({ ...data, type: 'publish' });
                  }
                }}
              >
                <PublishIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="clone"
                style={{ padding: 0 }}
                onClick={() => {
                  if (props) {
                    props.action({ ...data, type: 'clone' });
                  }
                }}
              >
                <FileCopyIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Delete"
                style={{ padding: 0 }}
                onClick={() => {
                  if (props) {
                    props.action({ ...data, type: 'delete' });
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
      <h1>Page Carousel DashBoard</h1>
      <HSTable {...TableData} />
      {HsSnackBarError.open && <HsSnackbar {...HsSnackBarError} />}
    </DashBoardWrapper>
  );
};

export default DashBoard;
