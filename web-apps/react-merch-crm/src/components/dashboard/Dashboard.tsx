import React from 'react';
import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import CancelIcon from '@material-ui/icons/Cancel';
import ExposureIcon from '@material-ui/icons/Exposure';
import { IconButton } from '@material-ui/core';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { HSTableV1, HsTableProps } from '@hs/components';
import { sosService, sosTableData, sosErrorMessage, sosTableParams, tableParams, updateSosParams } from '@hs/services';
import { toast } from 'react-toastify';

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;

const DashBoard: FC = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sosData, setTableData] = useState<sosTableData>({});
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<string>('Loading');
  const [filterParams, setFilterParams] = useState<sosTableParams>({ pageSize: 10, pageNum: 0 });
  const pathName = location.pathname;
  const setToaster = (toasterType: Record<string, string>) => {
    if (toasterType.type === 'error') {
      toast.error(toasterType.message);
    } else {
      toast(toasterType.message);
    }
  };

  const updateSos = (data: Record<string, string>) => {
    let postData: updateSosParams = {};
    ['country', 'status', 'action_type', 'action_value'].forEach((key: string) => {
      const value: string = data && data[key];
      postData = { ...postData, [key]: value };
    });
    postData['sos_id'] = data['sosId'];
    postData['expiry_time'] = data['expiryTime'];
    (async () => {
      const showError = (error: sosErrorMessage) => {
        let message = 'Try Later';
        const status = error.status && error.status.toLowerCase();
        if (status === 'failure') {
          message = error.errorMessage;
        } else if (error.field_errors) {
          for (let index = 0; index < error.field_errors.length; index++) {
            const element = error.field_errors[index];
            setToaster({
              type: 'error',
              message: element.message,
            });
          }
          return;
        }
        setToaster({
          type: 'error',
          message: message,
        });
      };
      try {
        const response = await sosService.updateSos(postData);
        if (!response) {
          setToaster({
            message: 'Updated successfully',
          });
          setFilterParams({ ...filterParams });
        } else {
          showError(response);
        }
      } catch (error) {
        showError(error);
      }
    })();
  };

  const dropDownMenu = (rowData: Record<string, string>, data: Record<string, unknown>) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (row: Record<string, string>) => {
      if (row && row.action_type) {
        const postData: Record<string, string> = { ...rowData, ...row };
        updateSos(postData);
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
                  handleClose({ action_type: 'extend', action_value: value });
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

  const cancelButton = (rowData: Record<string, unknown>, data: Record<string, string>) => {
    const value: string = data && data['action_value'];
    if (!data || !value) {
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
            const postData: Record<string, string> = {
              ...rowData,
              action_type: data.action_value.toLowerCase(),
              action_value: value.toLowerCase(),
            };
            updateSos(postData);
          }}
        >
          <CancelIcon />
        </IconButton>
      </span>
    );
  };

  const generateActionColumns = (data: Record<string, string>) => {
    const dataList: any = [];
    const actionList: any = data && data.availableActions;
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
    setFilterParams({ pageSize: filters.pageSize, pageNum: filters.pageNo });
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
      render: true,
    },
    { id: 'buyerEmail', label: 'Buyer Email' },
    {
      label: 'Action',
      render: (props: Record<string, unknown>, data: Record<string, string>) => {
        if (props && data) {
          return <div style={{ display: 'flex' }}>{generateActionColumns(data)}</div>;
        }
        return '--';
      },
    },
  ];

  const TableData: HsTableProps = {
    title: 'Sos Dashboard',
    count: count,
    columns: columns,
    rows: (sosData && sosData.records) || [],
    rowsPerPage: 10,
    filterRowsPerPage: [10, 25, 50, 100],
    fetchTableData: getUpdatedTableData,
  };

  useEffect(() => {
    const showNoDataMessage = () => {
      setCount(0);
      setStatus('No data');
    };
    (async () => {
      try {
        let tableData: any = { totalRecords: 0 };
        const params = { ...filterParams, pageNum: filterParams.pageNum + 1 };
        tableData = await sosService.getTableData(params);
        if (tableData && tableData.totalRecords) {
          setTableData(tableData);
          setCount(tableData.totalRecords);
        } else {
          showNoDataMessage();
        }
      } catch (error) {
        let message = 'Try Later';
        const errorStatus = error.status && error.status.toLowerCase;
        const status = (errorStatus && errorStatus()) || null;
        showNoDataMessage();
        if (status === 'failure') {
          message = error.messageDetail.message;
        }
        setToaster({
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
      {count === 0 && <h5> {status}</h5>}
    </DashBoardWrapper>
  );
};

export default DashBoard;
