import React, { FC } from 'react';
import MaterialTable from 'material-table';
import { TableProps } from './IHsTable';

export const HSTable: FC<TableProps> = (props: TableProps) => {
  const state = {
    columns: props.columns,
    data: props.data,
  };
  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1,
        search: false,
        headerStyle: { fontSize: '12px', fontWeight: 'bold' },
      }}
      actions={[
        {
          icon: 'save',
          tooltip: 'Publish',
          onClick: () => alert('You want to add a new row'),
        },
        {
          icon: 'save',
          tooltip: 'Clone',
          onClick: () => alert('You want to add a new row'),
        },
        {
          icon: 'save',
          tooltip: 'Delete',
          onClick: () => alert('You want to add a new row'),
        },
      ]}
      title={props.title}
      columns={state.columns}
      data={state.data}
      onChangePage={(pageNo: number, pageSize: number) => {
        if (props.fetchTableData) {
          props.fetchTableData({ pageNo, pageSize });
          console.log({ pageNo, pageSize });
        }
      }}
    />
  );
};
