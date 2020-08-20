import React, { FC } from 'react';
import { HSTable } from './HsTable';
import { format } from 'date-fns';
import { HsTableProps } from './IHsTable';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';
import { IconButton } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
export default {
  title: 'Tables',
};

const getUpdatedTableData = (filters: Record<string, unknown>) => {
  alert(filters);
};

// const action = (row: Record<string, unknown>) => {
//   alert(row);
//   console.log(row);
// };

const columns = [
  { id: 'id', label: 'Id', minWidth: 20 },
  { id: 'title', label: 'Title' },
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
function createData(
  title,
  code,
  createdOn,
  updatedOn,
  createdBy,
  population,
  size
) {
  const density = population / size;
  return {
    id: 1,
    title,
    sorts: [title, code],
    createdOn,
    updatedOn,
    createdBy,
    population,
    size,
    density,
    startDate: createdOn,
    endDate: createdOn,
    updatedBy: createdBy,
  };
}
const rows: Array<Record<string, string>> = [];
for (let index = 0; index < 55; index++) {
  const data: Record<string, string> = createData(
    'India',
    'IN',
    '2020-08-17T12:19:00',
    '2020-08-18T16:12:41',
    'info@nstechs.com',
    1324171354,
    3287263
  );
  rows.push(data);
}

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

export const TableComponent: FC = () => <HSTable {...TableData} />;
