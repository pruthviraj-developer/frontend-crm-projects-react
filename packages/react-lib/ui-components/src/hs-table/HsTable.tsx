import React, { FC } from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { format } from 'date-fns';
import {
  ChevronRight,
  ChevronLeft,
  FirstPage,
  LastPage,
  ArrowDownward,
} from '@material-ui/icons';

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyTwoTone';
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';

interface TableProps {
  title?: string;
}

export const HSTable: FC<TableProps> = (props: TableProps) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id' },
      { title: 'Title', field: 'title' },
      {
        title: 'Sorted By',
        render: (rowData) => {
          if (rowData && rowData.sorts && rowData.sorts.length) {
            return rowData.sorts.join(',');
          }
          return '';
        },
      },
      { title: 'Created By', field: 'createdBy' },
      { title: 'Updated By', field: 'updatedBy' },
      {
        title: 'Created On',
        render: (rowData) => {
          if (rowData && rowData.createdOn) {
            return format(new Date(rowData.createdOn), 'dd-MM-yy');
          }
          return 'NA';
        },
      },
      {
        title: 'Last updated',
        render: (rowData) => {
          if (rowData && rowData.updatedOn) {
            return format(new Date(rowData.updatedOn), 'dd-MM-yy');
          }
          return 'NA';
        },
      },
    ],
    data: [
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
    ],
  });

  const tableIcons = {
    DeleteForeverIcon: forwardRef((props, ref) => (
      <DeleteForeverTwoToneIcon {...props} ref={ref} />
    )),
    PublishIcon: forwardRef((props, ref) => (
      <PublishTwoToneIcon {...props} ref={ref} />
    )),
    Clone: forwardRef((props, ref) => (
      <FileCopyTwoToneIcon {...props} ref={ref} />
    )),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
  };
  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1,
        search: false,
      }}
      actions={[
        {
          icon: tableIcons.PublishIcon,
          tooltip: 'Publish',
          onClick: (event) => alert('You want to add a new row'),
        },
        {
          icon: tableIcons.Clone,
          tooltip: 'Clone',
          onClick: (event) => alert('You want to add a new row'),
        },
        {
          icon: tableIcons.DeleteForeverIcon,
          tooltip: 'Delete',
          onClick: (event) => alert('You want to add a new row'),
        },
      ]}
      icons={tableIcons}
      title={props.title}
      columns={state.columns}
      data={state.data}
    />
  );
};
