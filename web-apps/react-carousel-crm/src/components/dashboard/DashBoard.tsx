/* eslint-disable no-console */
import React, { FC, useState, useEffect } from 'react';
import { HSTable, HsTableProps, HsSnackbar, HsSnackbarProps } from '@hs/components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';
import { IconButton } from '@material-ui/core';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { carouselService } from '@hs/services';

const DashBoardWrapper = styled.div`
  margin-left: 5px;
`;
const DashBoard: FC = () => {
  const onSnackBarClose = (open: any) => {
    setSnackBarError({ ...HsSnackBarError, open });
  };
  const snackBarProps = {
    open: false,
    type: 'error' as const,
    message: 'Test',
    onSnackBarClose: onSnackBarClose,
  };
  const [data, setTableData] = useState<Array<Record<string, string>>>([]);
  const [HsSnackBarError, setSnackBarError] = useState<HsSnackbarProps>(snackBarProps);

  const [count, setCount] = useState<number>(0);
  const [filterParams, setFilterParams] = useState<Record<string, unknown>>({ pageSize: 10, pageNo: 0 }); // page size should be size as rowsperpage
  useEffect(() => {
    carouselService
      .get({
        url: 'carouselservice/carousel/list',
        params: filterParams,
      })
      .then((res: any) => {
        setTableData([...res.records]);
        setCount(res.totalRecords);
      })
      .catch((error: Error) => console.log('Reason of failure', error.message));
  }, [filterParams]);
  const getUpdatedTableData = (filters: Record<string, unknown>) => {
    setFilterParams(filters);
  };
  const saveCloneData = (res: any) => {
    const postData = { ...res, title: `Cloned ${res.title}` };
    carouselService
      .post({
        url: 'carouselservice/carousel',
        data: postData,
      })
      .then((responseData: any) => {
        if (responseData.action === 'success') {
          setFilterParams({ ...filterParams });
          const obj = responseData.messageDetail;
          setSnackBarError({
            ...snackBarProps,
            open: true,
            type: 'success',
            message: obj.message,
          });
        }
      })
      .catch((errorResponse: any) => {
        const data: any = errorResponse && errorResponse.data ? errorResponse.data : errorResponse;
        const obj = data && data.messageDetail ? data.messageDetail : {};
        const type = obj.messageType ? obj.messageType.toLowerCase() : 'error';
        setSnackBarError({
          ...snackBarProps,
          open: true,
          type,
          message: obj.message,
        });
      });
  };
  const cloneAndCreate = (rowData: Record<string, unknown>) => {
    carouselService
      .get({
        url: `carouselservice/carousel/${rowData.id}`,
      })
      .then((res: any) => {
        delete res.id;
        saveCloneData(res);
      })
      .catch((error: any) => {
        const data: any = error.data;
        const obj = data.messageDetail;
        const type = obj.messageType ? obj.messageType.toLowerCase() : 'error';
        setSnackBarError({
          ...snackBarProps,
          open: true,
          type: type,
          message: error.message,
        });
      });
  };
  const updateStatus = (rowData: Record<string, unknown>) => {
    if (rowData.type === 'clone') {
      cloneAndCreate(rowData);
    } else if (rowData.type === 'delete') {
      carouselService
        .delete({
          url: `carouselservice/carousel/${rowData.id}`,
        })
        .then((responseData: any) => {
          if (responseData.action === 'success') {
            setFilterParams({ ...filterParams });
            const obj = responseData.messageDetail;
            setSnackBarError({
              ...snackBarProps,
              open: true,
              type: 'success',
              message: obj.message,
            });
          }
        })
        .catch((error: Error) => console.log('Reason of failure', error.message));
    } else {
      carouselService
        .put({
          url: `carouselservice/carousel/publish/${rowData.id}`,
        })
        .then((responseData: any) => {
          if (responseData.action === 'success') {
            setFilterParams({ ...filterParams });
            const obj = responseData.messageDetail;
            setSnackBarError({
              ...snackBarProps,
              open: true,
              type: 'success',
              message: obj.message,
            });
          }
        })
        .catch((error: Record<string, unknown>) => {
          const data: any = error.data;
          const obj = data.messageDetail;
          const type = obj.messageType ? obj.messageType.toLowerCase() : 'error';
          setSnackBarError({
            ...snackBarProps,
            open: true,
            type,
            message: obj.message,
          });
        });
    }
  };
  const action = (row: Record<string, unknown>) => {
    updateStatus(row);
  };
  const columns = [
    { id: 'id', label: 'Id' },
    { id: 'title', label: 'Title', width: 100 },
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
  const TableData: HsTableProps = {
    title: 'Table testing',
    count: count,
    columns: columns,
    rowsPerPage: 10, // Should be same as page size
    rows: [...data],
    filterRowsPerPage: [10, 25, 50, 100],
    fetchTableData: getUpdatedTableData,
    action: action,
  };
  return (
    <DashBoardWrapper>
      <h1>DashBoard</h1>
      <HSTable {...TableData} />
      {HsSnackBarError.open && <HsSnackbar {...HsSnackBarError} />}
    </DashBoardWrapper>
  );
};

export default DashBoard;
