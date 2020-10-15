import React from 'react';
import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import CancelIcon from '@material-ui/icons/Cancel';
import ExposureIcon from '@material-ui/icons/Exposure';
import { IconButton } from '@material-ui/core';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { HSTableV1, HsTableProps, HsSnackbar, HsSnackbarProps } from '@hs/components';
import { carouselService } from '@hs/services';
import { tableParams } from '@hs/services';

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;

const snackBarProps: Pick<HsSnackbarProps, 'open' | 'type' | 'message'> = {
  open: false,
  type: 'error' as const,
  message: 'Test',
};

const DashBoard: FC = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackBarError, setSnackBarError] = useState(snackBarProps);
  const [count, setCount] = useState<number>(111);
  const [filterParams, setFilterParams] = useState<tableParams>({ pageSize: 10, pageNo: 0 }); // page size should be size as rowsperpage
  const pathName = location.pathname;
  const onSnackBarClose = (open: boolean) => {
    setSnackBarError({ ...snackBarError, open });
  };

  const dropDownMenu = (rowData: Record<string, unknown>, data: Record<string, unknown>) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (row?: Record<any, unknown>) => {
      if (row) {
        // console.log(rowData,row);
      }
      setAnchorEl(null);
    };
    const actionValue: any = data && data['action_value'];
    if (!data || !actionValue) {
      return '';
    }
    const dropDownMenuList = actionValue.split(',');
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
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {dropDownMenuList.map((value: string, index: number) => {
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

  const cancelButton = (rowData: Record<string, unknown>, data: Record<string, unknown>) => {
    const actionValue: any = data && data['action_value'];
    if (!data || !actionValue) {
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
            // console.log({ row: rowData, type: data.action_value });
          }}
        >
          <CancelIcon />
        </IconButton>
      </span>
    );
  };

  const generateActionColumns = (data: Record<string, unknown>) => {
    const dataList: any = [];
    const actionList: any = (data && data.availableActions) || null;
    if (!actionList || !actionList.length) {
      return '--';
    }
    for (let index = 0; index < actionList.length; index++) {
      const element = actionList[index];
      const type = element.action_type && element.action_type.toLowerCase();
      if (type === 'extend') {
        dataList.push(dropDownMenu(data, element));
      } else if (type === 'cancel') {
        dataList.push(cancelButton(data, element));
      }
    }
    return <div>{dataList}</div>;
  };

  const getUpdatedTableData = (filters: tableParams) => {
    setFilterParams(filters);
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
      render: (props: Record<string, unknown>, data: Record<string, unknown>) => {
        if (props && data) {
          return <div style={{ display: 'flex' }}>{generateActionColumns(data)}</div>;
        }
        return '--';
      },
    },
  ];

  const tdata: any = [
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

  const TableData: HsTableProps = {
    title: 'Table testing',
    count: 250,
    columns: columns,
    rows: [...tdata],
    rowsPerPage: 10,
    filterRowsPerPage: [10, 25, 50, 100],
    fetchTableData: getUpdatedTableData,
  };

  useEffect(() => {
    (async () => {
      try {
        let tableData: any = { totalRecords: 0 };
        const params = { ...filterParams, pageNo: filterParams.pageNo + 1 };
        if (pathName === '/dashboard') {
          tableData = await carouselService.getTableData(params);
        } else {
          tableData = await carouselService.getArchivedTableData(params);
        }
        //setTableData(tableData);
        setCount(tableData.totalRecords || 0);
      } catch (error) {
        let message = 'Try Later';
        if (error.action === 'failure') {
          message = error.messageDetail.message;
        }
        setSnackBarError({
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  }, [filterParams, pathName]);

  return (
    <DashBoardWrapper>
      <h1>SOS DashBoard</h1>
      {count > 0 && <HSTableV1 {...TableData} />}
      {count === 0 && <h5> Loading or no data</h5>}
      {snackBarError.open && <HsSnackbar {...snackBarError} onSnackBarClose={onSnackBarClose} />}
    </DashBoardWrapper>
  );
};

export default DashBoard;
