import React, { useEffect } from 'react';
import { FC, useState } from 'react';
import styled from '@emotion/styled';

import { HsSnackbar, HsSnackbarProps, HSTableV2, HsTableV2Props, tableRowsV2 } from '@hs/components';

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;

const snackBarProps: Pick<HsSnackbarProps, 'open' | 'type' | 'message'> = {
  open: false,
  type: 'error' as const,
  message: 'Test',
};

const Merchandisers: FC = () => {
  const [snackBarError, setSnackBarError] = useState(snackBarProps);
  const [count, setCount] = useState<number>(1);
  const [status, setStatus] = useState<string>('Loading');
  const formatedJsonObject: Record<string, Record<string, number>> = {};
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

  const onSnackBarClose = (open: boolean) => {
    setSnackBarError({ ...snackBarError, open });
  };
  const compare = (a: tableRowsV2, b: tableRowsV2): number => {
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  };
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

  const tableDataV2: HsTableV2Props = {
    columns: tableColumns,
    rows: tableRows,
  };

  useEffect(function () {
    setTimeout(() => {
      setCount(1);
      setStatus('Loading');
    }, 0);
  });

  return (
    <DashBoardWrapper>
      <h1>Merchandisers DashBoard</h1>
      {count > 0 && <HSTableV2 {...tableDataV2} />}
      {count === 0 && <h5> {status}</h5>}
      {snackBarError.open && <HsSnackbar {...snackBarError} onSnackBarClose={onSnackBarClose} />}
    </DashBoardWrapper>
  );
};

export default Merchandisers;
