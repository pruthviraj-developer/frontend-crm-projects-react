import React, { FC } from 'react';
import { HSTableV1 } from './HsTableV1';
import { HsTablePropsV1 } from './IHsTableV1';
import CancelIcon from '@material-ui/icons/Cancel';
import ExposureIcon from '@material-ui/icons/Exposure';
import { IconButton } from '@material-ui/core';
import { action } from '@storybook/addon-actions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default {
  title: 'Tables',
};

const getUpdatedTableData = (filters: Record<string, unknown>) => {
  alert(filters);
};

const dropDownMenu = (rowData, data) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (row?: Record<string, unknown>) => {
    if (row) {
      action(rowData, row);
    }
    setAnchorEl(null);
  };

  if (!data || (!data && data.action_value)) {
    return '';
  }

  const dropDownMenuList = data.action_value.split(',');
  return (
    <span>
      <IconButton
        style={{ margin: '0 5px' }}
        title="Extend"
        color="primary"
        aria-label="Extend"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ExposureIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {dropDownMenuList.map((value, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                handleClose({ type: 'extend', value });
              }}
            >
              {' '}
              {value} hours
            </MenuItem>
          );
        })}
      </Menu>
    </span>
  );
};

const cancelButton = (rowData, data) => {
  if (!data || (!data && data.action_value)) {
    return '';
  }
  return (
    <span>
      <IconButton
        style={{ margin: '0 5px' }}
        title="Delete"
        color="primary"
        aria-label="Delete"
        onClick={() => {
          const obj: any = { row: rowData, type: data.action_value };
          action(obj);
        }}
      >
        <CancelIcon />
      </IconButton>
    </span>
  );
};

const generateActionColumns = (data: Record<string, string>) => {
  const dataList: any = [];
  const actionList = (data && data.availableActions) || null;
  if (!actionList || !actionList.length) {
    return '--';
  }
  for (let index = 0; index < actionList.length; index++) {
    const element: any = actionList[index];
    const type = element.action_type && element.action_type.toLowerCase();
    if (type == 'extend') {
      dataList.push(dropDownMenu(data, element));
    } else if (type == 'cancel') {
      dataList.push(cancelButton(data, element));
    }
  }
  return <div>{dataList}</div>;
};

const columns = [
  {
    id: 'sosId',
    label: 'SOS ID',
    withIcon: true,
    render: true,
  },
  {
    id: 'country',
    label: 'Country',
  },
  {
    id: 'vendorName',
    label: 'Vendor Name',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'expiryTime',
    label: 'Expiry Time',
    withDate: true,
    render: true,
  },
  { id: 'buyerEmail', label: 'Buyer Email' },
  {
    label: 'Action',
    render: (data) => {
      if (data) {
        return (
          <div style={{ display: 'flex' }}>{generateActionColumns(data)}</div>
        );
      }
      return '--';
    },
  },
];

const data: any = [
  {
    sosId: 1,
    country: 'India',
    vendorName: 'Akash Singhi',
    buyerEmail: 'ngwms_receiving@hopscotch.in',
    status: 'SHIPPING',
    expiryTime: '2020-01-09T18:04:00',
    isFirstSOS: 1,
    configuration: 'Out-Right/Random-Received/India',
    availableActions: [
      {
        action_type: 'EXTEND',
        action_value: '24,48',
      },
    ],
  },
  {
    sosId: 2,
    country: 'India',
    vendorName: 'Akash Singhi',
    buyerEmail: 'ngwms_receiving@hopscotch.in',
    status: 'SHIPPING',
    expiryTime: '2020-02-09T18:04:00',
    isFirstSOS: 1,
    configuration: 'Out-Right/Random-Received/India',
    availableActions: [
      {
        action_type: 'CANCEL',
        action_value: 'Cancel',
      },
    ],
  },
  {
    sosId: 3,
    country: 'India',
    vendorName: 'Akash Singhi',
    buyerEmail: 'ngwms_receiving@hopscotch.in',
    status: 'SHIPPING',
    expiryTime: '2020-03-09T18:04:00',
    isFirstSOS: 1,
    configuration: 'Out-Right/Random-Received/India',
    availableActions: [
      {
        action_type: 'EXTEND',
        action_value: '24,48',
      },
      {
        action_type: 'CANCEL',
        action_value: 'Cancel',
      },
    ],
  },
  {
    sosId: 4,
    country: 'India',
    vendorName: 'Akash Singhi',
    buyerEmail: 'ngwms_receiving@hopscotch.in',
    status: 'SHIPPING',
    expiryTime: '2020-04-09T18:04:00',
    isFirstSOS: 1,
    configuration: 'Out-Right/Random-Received/India',
    availableActions: [
      {
        action_type: 'EXTEND',
        action_value: '24,48',
      },
    ],
  },
];

const rows = data;

const TableData: HsTablePropsV1 = {
  title: 'Table testing',
  count: 250,
  columns: columns,
  rows: rows,
  rowsPerPage: 10,
  filterRowsPerPage: [10, 25, 50, 100],
  fetchTableData: getUpdatedTableData,
  action: action('table-action'),
};

export const TableSOSComponent: FC = () => <HSTableV1 {...TableData} />;
