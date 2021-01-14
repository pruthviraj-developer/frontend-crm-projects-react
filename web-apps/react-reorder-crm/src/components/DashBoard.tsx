import React, { useState, useEffect } from 'react';
import { FilterListPage, FiltersListPageProps } from '@hs/containers';
import { HsSelectableTable, SelectableTableProps } from '@hs/components';
import styled from '@emotion/styled';
import { reorderService } from '@hs/services';
// import { Irows, IDashboardData} from './IDashBorad';

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;
export const DashBoard = () => {
  const [data, setData] = useState({ records: [], count: 0 });
  const [sideBarState, setSideBarSate] = useState({ right: false });
  const reasonOptions = [
    {
      display: 'Non due to quality and sizing',
      value: '1kjh',
      key: '1kjh',
      id: '1',
    },
    {
      display: 'Proc high return due to other reason',
      value: 'lkj2',
      key: 'lkj2',
      id: '2',
    },
  ];

  const reasonSideBarOption = {
    isSelect: true,
    name: 'sreason',
    label: 'mReason',
    options: reasonOptions,
    type: 'autocomplete',
  };

  const autoSideBarOption = {
    isSelect: true,
    name: 'areason',
    label: 'Auto Reason',
    options: reasonOptions,
    type: 'autocomplete',
  };

  const updateFiltersList = (e: any) => {
    console.log(e, 'filters');
  };

  const fetchTableData = (e: any) => {
    console.log(e);
  };

  const deleteColumn = (e: any) => {
    console.log(e);
  };

  const exportColumn = (e: any) => {
    console.log(e);
  };

  const showFilters = (e: any) => {
    setSideBarSate({ right: e });
  };
  const onSort = (params: any) => {
    console.log(params);
  };
  const descendingComparator = (a: string, b: string, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const getComparator = (order: any, orderBy: any) => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array: any, comparator: any) => {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  };

  useEffect(() => {
    (async () => {
      try {
        const postData = {
          page_num: 1,
          page_size: 100,
          filters: {},
        };
        const list = await reorderService.getTableData<typeof postData, any>(postData);
        setData(list);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      setData({ records: [], count: 0 });
    };
  }, []);

  const selectTableData: SelectableTableProps = {
    columns: [
      'SKU',
      'PID',
      'Country',
      'ASV present',
      'ASV Previous Week',
      'Reason',
      'Age Class',
      'Sub Category',
      'Product Type',
      'Quantity',
      'Cost',
      'Season',
      'Product Sub  Type',
    ],
    rowKeys: [
      'sku',
      'pid',
      'country',
      'asv_present',
      'asv_previous_week',
      'reason',
      'age_class',
      'sub_category',
      'product_type',
      'quantity',
      'cost_price',
      'season',
      'product_sub_type',
    ],
    rows: data['records'] || [],
    selectId: 'sku',
    fetchTableData: fetchTableData,
    deleteColumn: deleteColumn,
    exportColumn: exportColumn,
    stableSort: stableSort,
    showFilters,
    getComparator: getComparator,
    onSort: onSort,
    rowsPerPageOptions: [5, 10, 15, 20],
    displayRowsPerPage: 10,
    totalRowsCount: data['count'] || 0,
  };
  const filtersData: FiltersListPageProps = {
    sideBar: [reasonSideBarOption, autoSideBarOption],
    toggleSideBar: sideBarState,
    updateFiltersList,
  };

  return (
    <DashBoardWrapper>
      <h1>Checks and Balances DashBoard</h1>
      <FilterListPage {...filtersData} />
      <HsSelectableTable {...selectTableData} />
    </DashBoardWrapper>
  );
};
