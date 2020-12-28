import React, { FC } from 'react';
import { HSTable } from './HsTable';
import { format } from 'date-fns';
import { HsTableProps } from './IHsTable';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';
import { IconButton } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { SelectedCircle, SvgIcon } from '@hs/icons';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Tables',
  component: HSTable,
};

const getUpdatedTableData = (filters: Record<string, unknown>) => {
  alert(filters);
};

// const action = (row: Record<string, unknown>) => {
//   alert(row);
//   console.log(row);
// };

const StyledIcon = styled(SvgIcon)`
  min-width: 24px;
`;

const columns = [
  {
    id: 'id',
    label: 'Id',
    render: (value: any, rowData: any, isTitle?: boolean) => {
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
              {value}
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
    render: (props: any, data: any, isTitle?: boolean) => {
      if (isTitle) {
        return data.title;
      }
      if (data) {
        return (
          <>
            <NavLink to={{ pathname: `/edit-carousel/${data.id}` }}>
              {data.title}
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
    width: 100,
    render: (sorts) => {
      if (sorts && sorts.length) {
        return sorts.join(' ,');
      }
      return '';
    },
  },
  {
    id: 'startDate',
    label: 'Start Date',
    render: (data) => {
      if (data) {
        return format(new Date(data), 'dd/MM/yyyy, hh:mm aa');
      }
      return '--';
    },
  },
  {
    id: 'endDate',
    label: 'End Date',
    render: (data) => {
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
    render: (data) => {
      if (data) {
        return format(new Date(data), 'dd-MM-yy');
      }
      return '--';
    },
  },
  {
    id: 'updatedOn',
    label: 'Last updated',
    render: (data) => {
      if (data) {
        return format(new Date(data), 'dd-MM-yy');
      }
      return '--';
    },
  },
  {
    label: 'Action',
    render: (props, data) => {
      if (data) {
        return (
          <div style={{ display: 'flex' }}>
            <IconButton
              style={{ margin: '0 5px' }}
              title="Publish"
              color="primary"
              aria-label="Publish"
              onClick={() => {
                if (props) {
                  props.action({ row: data, type: 'publish' });
                }
              }}
            >
              <PublishIcon />
            </IconButton>
            <IconButton
              style={{ margin: '0 5px' }}
              title="Copy"
              color="primary"
              aria-label="Copy"
              onClick={() => {
                if (props) {
                  props.action({ row: data, type: 'copy' });
                }
              }}
            >
              <FileCopyIcon />
            </IconButton>
            <IconButton
              style={{ margin: '0 5px' }}
              title="Delete"
              color="primary"
              aria-label="Delete"
              onClick={() => {
                if (props) {
                  props.action({ row: data, type: 'delete' });
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
const data: any = [
  {
    id: 209,
    title: 'Demo-Test-01',
    sorts: ['Girl 6+ years'],
    startDate: '2020-09-09T17:53:56',
    endDate: '2020-09-10T16:20:00',
    createdBy: 'info@nstechs.com',
    createdOn: '2020-09-09T18:04:00',
    updatedBy: 'info@nstechs.com',
    updatedOn: '2020-09-09T18:05:00',
    active: true,
    type: 1,
    position: 2,
  },
  {
    id: 186,
    title: 'QA-Android-Test-4',
    sorts: ['Sale'],
    startDate: '2020-09-08T15:46:25',
    endDate: '2020-09-30T13:05:00',
    createdBy: 'info@nstechs.com',
    createdOn: '2020-09-08T15:44:13',
    updatedBy: 'info@nstechs.com',
    updatedOn: '2020-09-09T17:47:00',
    active: false,
    type: 2,
    position: 2,
  },
  {
    id: 208,
    title: 'Demo-Test',
    sorts: ['Girl 6+ years'],
    startDate: '2020-09-09T12:33:03',
    endDate: '2020-09-11T12:33:00',
    createdBy: 'info@nstechs.com',
    createdOn: '2020-09-09T16:29:00',
    updatedBy: 'info@nstechs.com',
    updatedOn: '2020-09-09T17:23:00',
    active: true,
    type: 1,
    position: 3,
  },
  {
    id: 207,
    title: 'Qa-Android-Test-8',
    sorts: ['Footwear'],
    startDate: '2020-09-09T12:33:03',
    endDate: '2020-09-12T12:33:00',
    createdBy: 'info@nstechs.com',
    createdOn: '2020-09-09T13:07:07',
    updatedBy: 'info@nstechs.com',
    updatedOn: '2020-09-09T13:07:14',
    active: true,
    type: 1,
    position: 4,
  },
  {
    id: 191,
    title: 'QA-Android-Test-5',
    sorts: ['Sale'],
    startDate: '2020-09-08T16:05:25',
    endDate: '2020-09-11T11:20:00',
    createdBy: 'info@nstechs.com',
    createdOn: '2020-09-08T16:02:42',
    updatedBy: 'info@nstechs.com',
    updatedOn: '2020-09-09T11:18:50',
    active: true,
    type: 1,
    position: 6,
  },
];
const rows = data;

const TableData: HsTableProps = {
  title: 'Table testing',
  count: 250,
  columns: columns,
  rows: rows,
  rowsPerPage: 10,
  filterRowsPerPage: [10, 25, 50, 100],
  fetchTableData: getUpdatedTableData,
  action: action('table-action'),
};

const Template: Story<HsTableProps> = (args) => <HSTable {...args} />;

export const TableComponent = Template.bind({});
TableComponent.args = TableData;
