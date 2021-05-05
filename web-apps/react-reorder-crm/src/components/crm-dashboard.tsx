import React, { useState, useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { reorderService } from '@hs/services';
import { DashBoardIcon } from '@hs/icons';
import { IDropdownListData, IDashboardSetData, IFilterPostData, IFilterParams } from './IDashBorad';
import {
  LeftNavBar,
  LeftNavBarProps,
  ReorderFiltersList,
  ReorderFiltersProps,
  ReorderFiltersObjectProps,
  HSTableV1,
  HsTablePropsV1,
} from '@hs/components';
import { toast } from 'react-toastify';

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/create-cluster', linkText: 'Create cluster', icon: DashBoardIcon },
    { linkUrl: '/reorder-crm-dashboard', linkText: 'Reorder Dashboard', icon: DashBoardIcon },
  ],
};

const useStyles = makeStyles((theme) => ({
  header: {
    margin: 10,
    fontSize: 28,
  },
  clearFilters: {
    fontSize: '12px',
    marginTop: '5px',
    padding: '10px 0',
  },
}));

const ClusterWrapper = styled.div`
  width: 100%;
  margin: 10px 10px 10px 90px;
`;

const loading = 'Loading';
const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure') {
    message = error.message;
  }
  toast.error(message);
};

const CrmDashboard = () => {
  const classes = useStyles();
  const [status, setStatus] = useState<string>(loading);
  const [dropDownsList, setDropDownsList] = useState<Array<IDropdownListData>>([]);
  const [rows, setRows] = useState<Array<IDashboardSetData>>([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({ size: 10, page: 0 });

  const getUpdatedTableData = (filters: any) => {
    setFilterParams({ size: filters.size, page: filters.page });
  };

  const dashboardDataFetch = (postData?: Record<string, unknown>) => {
    if (postData) {
      let postFilterData = {
        vendor_id: postData.vendor_id,
        brand_id: postData.brand_id,
        constraint: postData.attribute === 'age' ? { key: 'age' } : { key: 'color' },
      };
      (async () => {
        try {
          const params = { ...filterParams, page: filterParams.page + 1 };
          const constraint: any = await reorderService.getDashboardFilteredData({ ...postFilterData, ...params });
          if (constraint.action === 'success') {
            toast.success(constraint.message || 'Data found');
            setRows(constraint.data);
            return;
          }
          showError(constraint);
        } catch (error) {
          showError(error);
        }
      })();
    } else {
      (async () => {
        try {
          const response = await reorderService.getDashboardData();
          if (response) {
            const responseData: any = response;
            setRows(responseData.data);
          } else {
            showError({
              status: 'failure',
              errorMessage: 'Data not available',
            });
          }
        } catch (error) {
          showError(error);
        }
      })();
    }
  };

  const onSubmit = (data: any) => {
    const postObject: Record<string, unknown> = {};
    ['vendor_id', 'brand_id', 'attribute'].forEach((ele: string) => {
      if (data[ele]) {
        postObject[ele] = data[ele]['key'] || data[ele]['id'] || data[ele];
      }
    });
    dashboardDataFetch(postObject);
  };

  const removeFromArray = (elements: Array<any>, filtersList: Array<any>) => {
    const list = [...filtersList];
    [...elements].forEach((ele: string) => {
      const removeElement = list.findIndex((obj: any) => obj.key === ele);
      if (removeElement > -1) {
        list.splice(removeElement, 1);
      }
    });
    return list;
  };

  useEffect(() => {
    (async () => {
      try {
        const filters: any = await reorderService.getFilters();
        if (filters) {
          const dropDownsList = [
            {
              key: 'vendor_id',
              display: 'Vendor',
              input_type: 'S',
              clearFields: ['brand_id'],
            },
            {
              key: 'attribute',
              display: 'Attribute Values',
              input_type: 'S',
              options: [
                { key: 'color', name: 'Color' },
                { key: 'age', name: 'Age' },
              ],
            },
          ];
          dropDownsList.forEach((element: ReorderFiltersProps) => {
            if (filters[element.key]) {
              element['options'] = filters[element.key];
            }
          });
          setDropDownsList([...dropDownsList]);
        }
      } catch (error) {
        setStatus(tryLater);
        showError(error);
      }
    })();
  }, []);

  const onVendorChange = (key: any, formData: any) => {
    let data = formData[key];
    const list = removeFromArray(['brand_id'], [...dropDownsList]);
    if (data) {
      const id = data.key;
      (async () => {
        try {
          const brands: any = await reorderService.getBrands({ vendorId: id });
          if (brands && brands.brandList && brands.brandList.length) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'vendor_id');
            if (indexFound > -1) {
              const brand = {
                key: 'brand_id',
                display: 'Brand *',
                input_type: 'S',
                options: brands.brandList,
              };
              list.splice(indexFound + 1, 0, brand);
            }
          } else {
            toast.info('Brands are not available select different vendor');
          }
          setDropDownsList([...list]);
        } catch (error) {
          showError(error);
          setDropDownsList([...list]);
        }
      })();
    } else {
      setDropDownsList([...list]);
    }
  };

  const onDropDownChange = (key: any, formData: any) => {
    if (key === 'vendor_id') {
      onVendorChange(key, formData);
    }
  };

  const reorderData: ReorderFiltersObjectProps = {
    sideBar: [...dropDownsList],
    defaultSelectedValues: {},
    onSubmit: onSubmit,
    onChange: onDropDownChange,
  };

  const columns = [
    {
      id: 'id',
      label: 'Id',
      withIcon: true,
      render: true,
    },
    {
      id: 'vendor',
      label: 'Vendor',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (isTitle) {
          return row.brand;
        }
        if (row) {
          return (
            <>
              <NavLink to={{ pathname: `/edit-cluster/${row.id}/${row.constraint_key.group_id}` }}>{row.brand}</NavLink>
            </>
          );
        }
        return '--';
      },
    },
    {
      id: 'brand',
      label: 'Brand',
      width: 100,
      withJoin: false,
      render: true,
    },
    {
      id: 'category',
      label: 'Category',
      withDate: false,
      render: true,
    },
    {
      id: 'sub_category',
      label: 'Sub Category',
      withDate: false,
      render: true,
    },
    { id: 'product_type', label: 'Product Type', width: 80 },
    { id: 'gender', label: 'Gender', width: 80 },
    {
      id: 'attribute',
      label: 'Attribute',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (row) {
          return <>{row.constraint_key.name}</>;
        }
        return '--';
      },
    },
    {
      id: 'value',
      label: 'Values',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (row) {
          if (row.constraint_key.name === 'age') {
            return (
              <>
                {row.constraint_key.value.map((record: any, index: number) => (
                  <li key={'ageLi' + index}>{'From: ' + record.from + ', To: ' + record.to}</li>
                ))}
              </>
            );
          } else {
            return <>{row.constraint_key.value.join(',')}</>;
          }
        }
        return '--';
      },
    },
    {
      label: 'Action',
      render: (props: any, data: IDashboardSetData) => {
        if (data) {
          return (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.clearFilters}
              onClick={(e) => handleAction(data)}
            >
              {data.value}
            </Button>
          );
        }
      },
      withIcon: false,
    },
  ];

  const handleAction = (data: IDashboardSetData) => {
    let filterPostData: IFilterPostData = {
      id: data.vendor,
      group_id: data.constraint_key.group_id,
      action: data.value === 'ENABLE' ? 'DISABLE' : 'ENABLE',
    };
    (async () => {
      try {
        const filterData: any = await reorderService.updateDashboardAction(filterPostData);
        if (filterData.action === 'success') {
          toast.success(filterData.message || 'Data found');
          setRows(filterData.data);
          return;
        }
        showError(filterData);
      } catch (error) {
        showError(error);
      }
    })();
  };

  useEffect(() => {
    dashboardDataFetch();
  }, []);

  const tabData: HsTablePropsV1 = {
    title: 'Dashboard Table',
    count: rows.length,
    columns: columns,
    rows: rows,
    rowsPerPage: 5,
    filterRowsPerPage: [5, 10, 15, 20],
    fetchTableData: getUpdatedTableData,
  };

  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path="/">
          <ClusterWrapper>
            <h1 className={classes.header}>Crm Dashboard Page</h1>
            {dropDownsList.length === 0 && <h5> {status} </h5>}
            {dropDownsList.length > 0 && <ReorderFiltersList {...reorderData} />}
            <br />
            {tabData.rows && <HSTableV1 {...tabData} />}
          </ClusterWrapper>
        </Route>
      </Switch>
    </>
  );
};

export default CrmDashboard;
