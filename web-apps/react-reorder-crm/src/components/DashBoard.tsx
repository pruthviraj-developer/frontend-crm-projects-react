import React, {useState} from 'react';
import { FilterListPage,FiltersListPageProps } from '@hs/containers';
import { HsSelectableTable, SelectableTableProps } from '@hs/components';
import styled from '@emotion/styled';
interface Props {}

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;


export const DashBoard = (props: Props) => {

  const [sideBarState, setSideBarSate] = useState({right:true});
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

  const updateFiltersList = (e:any) => {
    console.log(e, 'filters');
  };

  const fetchTableData = (e:any) => {
    console.log(e);
  };

  const deleteColumn = (e:any) => {
    console.log(e);
  };

  const exportColumn = (e:any) => {
    console.log(e);
  };

  const showFilters = (e:any) => {
    setSideBarSate({right:e});
  };
  const onSort = (params:any) => {
    console.log(params);
  };
  const descendingComparator = (a:string, b:string, orderBy:any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const getComparator = (order:any, orderBy:any) => {
    return order === 'desc'
      ? (a:any, b:any) => descendingComparator(a, b, orderBy)
      : (a:any, b:any) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array:any, comparator:any) => {
    const stabilizedThis = array.map((el:any, index:any) => [el, index]);
    stabilizedThis.sort((a:any, b:any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el:any) => el[0]);
  };
  const selectTableData: SelectableTableProps = {
    columns: ['Name', 'Calories', 'Fat', 'Cards', 'Protein'],
    rowKeys: ['name', 'calories', 'fat', 'carbs', 'protein'],
    rows: [
      { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
      { name: 'Donut', calories: 452, fat: 25, carbs: 51, protein: 4.9 },
      { name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
      { name: 'Frozen yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
      { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 3.9 },
      { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9,
        carbs: 37,
        protein: 4.3,
      },
      { name: 'Jelly Bean', calories: 375, fat: 0, carbs: 94, protein: 0 },
      { name: 'KitKat', calories: 518, fat: 26, carbs: 65, protein: 7 },
      { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0 },
      { name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2 },
      { name: 'Nougat', calories: 360, fat: 19, carbs: 9, protein: 37 },
      { name: 'Oreo', calories: 437, fat: 18, carbs: 63, protein: 4 },
    ],
    sortingId: 'name',
    selectId: 'name',
    sorting: true,
    fetchTableData: fetchTableData,
    deleteColumn: deleteColumn,
    exportColumn: exportColumn,
    stableSort: stableSort,
    showFilters,
    getComparator: getComparator,
    onSort: onSort,
  };
  const data: FiltersListPageProps = {
    sideBar: [reasonSideBarOption, autoSideBarOption],
    toggleSideBar:sideBarState,
    updateFiltersList
  };
  
  return (
    <DashBoardWrapper>
      <h1>Checks and Balances DashBoard</h1>
        <FilterListPage {...data} />
        <HsSelectableTable {...selectTableData} />
    </DashBoardWrapper>
  );
};
