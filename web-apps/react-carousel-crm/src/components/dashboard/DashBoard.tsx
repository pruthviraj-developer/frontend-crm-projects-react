/* eslint-disable no-console */
import React, { FC, useState, useEffect } from 'react';
import { Button } from '@hs/components';
import { HSTable, TableProps } from '@hs/components';
import { format } from 'date-fns';
import { httpService, carouselService } from '@hs/services';
const DashBoard: FC = () => {
  const [data, setTableData] = useState<TableProps['data']>([]);
  const [filterParams, setFilterParams] = useState<Record<string, unknown>>({ pageSize: 5, pageNo: 0 });
  useEffect(() => {
    carouselService
      .get({
        url: 'carouselservice/carousel/list',
        params: filterParams,
      })
      .then((res: any) => {
        setTableData([...res.records]);
      })
      .catch((error: Error) => console.log('Reason of failure', error.message));
  }, [filterParams]);
  const getUpdatedTableData = (filters: Record<string, unknown>) => {
    setFilterParams(filters);
  };
  const TableData: TableProps = {
    title: 'Table testing',
    columns: [
      { title: 'ID', field: 'id' },
      { title: 'Title', field: 'title' },
      {
        title: 'Sorted By',
        render: (rowData: Record<string, any>) => {
          const sorts = rowData && rowData.sorts ? rowData.sorts : [];
          if (sorts.length) {
            return sorts.join(',');
          }
          return '';
        },
      },
      { title: 'Created By', field: 'createdBy' },
      { title: 'Updated By', field: 'updatedBy' },
      {
        title: 'Created On',
        render: (rowData: Record<string, any>) => {
          if (rowData && rowData.createdOn) {
            return format(new Date(rowData.createdOn), 'dd-MM-yy');
          }
          return 'NA';
        },
      },
      {
        title: 'Last updated',
        render: (rowData: Record<string, any>) => {
          if (rowData && rowData.updatedOn) {
            return format(new Date(rowData.updatedOn), 'dd-MM-yy');
          }
          return 'NA';
        },
      },
    ],
    data: data,
    fetchTableData: getUpdatedTableData,
  };

  // getTableData();
  return (
    <div>
      <h1>DashBoard</h1>
      <Button
        className="primary"
        onClick={() => {
          httpService
            .get({
              url: 'carouselservice/carousel/list',
              params: { pageSize: 20, pageNo: 1 },
            })
            .then((res: any) => {
              setTableData([...res.records]);
            })
            .catch((error: Error) => console.log('Reason of failure', error.message));
        }}
        value={'Test APi'}
      >
        Test Button
      </Button>
      <HSTable {...TableData} />
    </div>
  );
};

export default DashBoard;
