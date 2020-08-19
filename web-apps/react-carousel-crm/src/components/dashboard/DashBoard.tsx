/* eslint-disable no-console */
import React, { FC, useState, useEffect } from 'react';
import { HSTable, HsTableProps } from '@hs/components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';
import { IconButton } from '@material-ui/core';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { carouselService } from '@hs/services';

const DashBoardWrapper = styled.div`
  margin-left: 15px;
`;
const DashBoard: FC = () => {
  const [data, setTableData] = useState<Array<Record<string, string>>>([]);
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
  const cloneAndCreate = (rowData: Record<string, unknown>) => {
    carouselService
      .get({
        url: `carouselservice/carousel/${rowData.id}`,
      })
      .then((res: any) => {
        delete res.id;
        const postData = { ...res, title: `Cloned ${res.title}` };
        carouselService
          .post({
            url: 'carouselservice/carousel',
            data: postData,
          })
          .then((responseData: any) => {
            if (responseData.action === 'success') {
              setFilterParams({ pageSize: filterParams.pageSize, pageNo: 0 });
            }
          })
          .catch((error: Error) => console.log('Reason for post failure', error.message));
      })
      .catch((error: Error) => console.log('Reason of failure', error.message));
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
          }
        })
        .catch((error: Error) => console.log('Reason of failure', error.message));
    } else {
      const id = '';
      carouselService
        .get({
          url: `carouselservice/carousel/publish/${id}`,
        })
        .then((res: any) => {
          setTableData([...res.records]);
          setCount(res.totalRecords);
        })
        .catch((error: Error) => console.log('Reason of failure', error.message));
    }
  };
  const action = (row: Record<string, unknown>) => {
    updateStatus(row);
  };
  const columns = [
    { id: 'id', label: 'Id', minWidth: 20 },
    { id: 'title', label: 'Title' },
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
    { id: 'createdBy', label: 'Created By', width: 50 },
    { id: 'updatedBy', label: 'Updated By' },
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
    </DashBoardWrapper>
  );
};

export default DashBoard;
