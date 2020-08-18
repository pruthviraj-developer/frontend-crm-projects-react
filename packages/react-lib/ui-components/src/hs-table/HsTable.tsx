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

  const DeleteFIcon = forwardRef((props: any, ref: any) => (
    <DeleteForeverTwoToneIcon {...props} ref={ref} />
  ));
  DeleteFIcon.displayName = 'Delete';

  const PublishTwoIcon = forwardRef((props: any, ref: any) => (
    <PublishTwoToneIcon {...props} ref={ref} />
  ));
  PublishTwoIcon.displayName = 'Publish';

  const FileCopyIcon = forwardRef((props: any, ref: any) => (
    <FileCopyTwoToneIcon {...props} ref={ref} />
  ));
  FileCopyIcon.displayName = 'Copy';

  const FirstPIcon = forwardRef((props: any, ref: any) => (
    <FirstPage {...props} ref={ref} />
  ));
  FirstPIcon.displayName = 'FirstPage';

  const LastPageIcon = forwardRef((props: any, ref: any) => (
    <LastPage {...props} ref={ref} />
  ));
  LastPageIcon.displayName = 'LastPage';

  const NextPageIcon = forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  ));
  NextPageIcon.displayName = 'NextPage';

  const PreviousPage = forwardRef((props: any, ref: any) => (
    <ChevronLeft {...props} ref={ref} />
  ));
  PreviousPage.displayName = 'PreviousPage';

  const SortArrow = forwardRef((props: any, ref: any) => (
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
