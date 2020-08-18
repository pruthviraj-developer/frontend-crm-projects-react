/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
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
import { TableProps } from './IHsTable';

export const HSTable: FC<TableProps> = (props: TableProps) => {
  const state = {
    columns: props.columns,
    data: props.data,
  };

  const DeleteFIcon = forwardRef((props, ref) => (
    <DeleteForeverTwoToneIcon {...props} ref={ref} />
  ));
  DeleteFIcon.displayName = 'Delete';

  const PublishTwoIcon = forwardRef((props, ref) => (
    <PublishTwoToneIcon {...props} ref={ref} />
  ));
  PublishTwoIcon.displayName = 'Publish';

  const FileCopyIcon = forwardRef((props, ref) => (
    <FileCopyTwoToneIcon {...props} ref={ref} />
  ));
  FileCopyIcon.displayName = 'Copy';

  const FirstPIcon = forwardRef((props, ref) => (
    <FirstPage {...props} ref={ref} />
  ));
  FirstPIcon.displayName = 'FirstPage';

  const LastPageIcon = forwardRef((props, ref) => (
    <LastPage {...props} ref={ref} />
  ));
  LastPageIcon.displayName = 'LastPage';

  const NextPageIcon = forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  ));
  NextPageIcon.displayName = 'NextPage';

  const PreviousPage = forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  ));
  PreviousPage.displayName = 'PreviousPage';

  const SortArrow = forwardRef((props, ref) => (
    <ArrowDownward {...props} ref={ref} />
  ));
  SortArrow.displayName = 'Sort';

  const tableIcons = {
    DeleteForeverIcon: DeleteFIcon,
    PublishIcon: PublishTwoIcon,
    Clone: FileCopyIcon,
    FirstPage: FirstPIcon,
    LastPage: LastPageIcon,
    NextPage: NextPageIcon,
    PreviousPage: PreviousPage,
    SortArrow: SortArrow,
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
          icon: tableIcons.PublishIcon,
          tooltip: 'Publish',
          onClick: () => alert('You want to add a new row'),
        },
        {
          icon: tableIcons.Clone,
          tooltip: 'Clone',
          onClick: () => alert('You want to add a new row'),
        },
        {
          icon: tableIcons.DeleteForeverIcon,
          tooltip: 'Delete',
          onClick: () => alert('You want to add a new row'),
        },
      ]}
      icons={tableIcons}
      title={props.title}
      columns={state.columns}
      data={state.data}
      onChangePage={(pageNo: number, pageSize: number) => {
        console.log(pageNo);
        console.log(pageSize);
      }}
    />
  );
};
