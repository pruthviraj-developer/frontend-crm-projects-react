/* eslint-disable no-console */
import React, { FC, useState, useEffect } from 'react';
import { HSTable, HsTableProps } from '@hs/components';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { carouselService } from '@hs/services';

const DashBoardWrapper = styled.div`
  margin-left: 15px;
`;
const DashBoard: FC = () => {
  const [data, setTableData] = useState<Array<Record<string, string>>>([]);
  const [count, setCount] = useState<number>(0);
  const [filterParams, setFilterParams] = useState<Record<string, unknown>>({ pageSize: 5, pageNo: 0 });
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
  const columns = [
    { id: 'id', label: 'Id', minWidth: 20 },
    { id: 'title', label: 'Title' },
    {
      id: 'sorts',
      label: 'Sorted By',
      render: (sorts: Array<string>) => {
        if (sorts && sorts.length) {
          return sorts.join(' ,');
        }
        return '';
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
    { id: 'createdBy', label: 'Created By' },
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
  ];
  const TableData: HsTableProps = {
    title: 'Table testing',
    count: count,
    columns: columns,
    rowsPerPage: 10,
    rows: [...data],
    filterRowsPerPage: [10, 25, 50, 100],
    fetchTableData: getUpdatedTableData,
  };
  return (
    <DashBoardWrapper>
      <h1>DashBoard</h1>
      <HSTable {...TableData} />
    </DashBoardWrapper>
  );
};

export default DashBoard;
