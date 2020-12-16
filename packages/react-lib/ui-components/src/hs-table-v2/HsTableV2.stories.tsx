import React, { FC } from 'react';
import { HSTableV2 } from './HsTableV2';
import { HsTableV2Props, tableRowsV2 } from './IHsTableV2';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Tables V2',
  component: HSTableV2,
};

const formatedJsonObject = {};
const tableColumns: Array<string> = ["PID's", 'Status', 'Priority', 'Action'];
const rowData: Array<tableRowsV2> = [
  {
    pid_count: '200',
    status: 'pending_confirmation',
    priority: 'delayed',
  },
  {
    pid_count: '200',
    status: 'pending_confirmation',
    priority: 'due',
  },
  {
    pid_count: '200',
    status: 'pending',
    priority: 'due',
  },
  {
    pid_count: '200',
    status: 'pending_confirmation',
    priority: 'delayed',
  },
  {
    pid_count: '200',
    status: 'pending_confirmation',
    priority: 'due',
  },
  {
    pid_count: '200',
    status: 'pending_confirmation',
    priority: 'delayed',
  },
  {
    pid_count: '200',
    status: 'pending_confirmation',
    priority: 'due',
  },
  {
    pid_count: '201',
    status: 'fulfillable',
    priority: 'delayed',
  },
  {
    pid_count: '201',
    status: 'fulfillable',
    priority: 'due',
  },
  {
    pid_count: '202',
    status: 'non_fulfillable',
    priority: 'delayed',
  },
  {
    pid_count: '202',
    status: 'non_fulfillable',
    priority: 'due',
  },
  {
    pid_count: '201',
    status: 'fulfillable',
    priority: 'delayed',
  },
  {
    pid_count: '201',
    status: 'fulfillable',
    priority: 'due',
  },
];
const exportColumn = (data) => {
  // console.log(data);
};
function compare(a, b) {
  if (a.status < b.status) {
    return -1;
  }
  if (a.status > b.status) {
    return 1;
  }
  return 0;
}

const tableRows: Array<tableRowsV2> = rowData.sort(compare);
tableRows.forEach((element, index) => {
  if (formatedJsonObject[element.status]) {
    formatedJsonObject[element.status]['count'] += 1;
  } else {
    formatedJsonObject[element.status] = {
      count: 1,
      index,
    };
  }
});
for (const key in formatedJsonObject) {
  const element = formatedJsonObject[key];
  tableRows[element.index]['rowSpan'] = element.count;
}
action(`${tableRows}`);
const tableDataV2: HsTableV2Props = {
  columns: tableColumns,
  rows: tableRows,
  exportColumn: exportColumn,
};

export const Tablev3Component: FC = () => <HSTableV2 {...tableDataV2} />;
