import React, { useState, useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { reorderService } from '@hs/services';
import { DashBoardIcon } from '@hs/icons';
import { IDropdownListData, IDashboardSetData, IDashboardResponse, IFilterPostData, IRecord } from './IDashBorad';
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

const getUpdatedTableData = (filters: Record<string, unknown>) => {
  alert(filters);
};

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

  const dashboardDataFetch = (postData?: Record<string, unknown>) => {
    if (postData) {
      let cKey = postData.constraint;
      let postFilterData = {
        vendor_id: postData.vendor_id,
        brand_id: postData.brand_id,
        constraint: cKey,
        page: '',
        size: '',
      };
      (async () => {
        try {
          const constraint: any = await reorderService.getDashboardFilteredData(postFilterData);
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
            responseData.data.forEach((item1: any) => {
              const nBrand = [];
              nBrand.push(item1.brand);
              item1.brand = nBrand;
            });
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
    ['vendor_id', 'brand_id', 'age_constraints', 'color_constraints'].forEach((ele: string) => {
      if (data[ele]) {
        if (ele === 'age_constraints') {
          const age = [];
          for (let index = 0; index < data[ele].length; index++) {
            const element = data[ele][index];
            age.push({
              from: parseInt(element.from),
              to: parseInt(element.to),
            });
          }
          // postObject[ele] = age;
          postObject['constraint'] = { key: 'age', value: age };
        } else if (ele === 'color_constraints') {
          const color = [];
          for (let index = 0; index < data[ele].length; index++) {
            const element = data[ele][index];
            color.push({
              key: element.key,
            });
          }
          // postObject[ele] = color;
          postObject['constraint'] = { key: 'color', value: color };
        } else {
          postObject[ele] = data[ele]['key'] || data[ele]['id'] || data[ele];
        }
      }
    });
    const attribute = data.attribute.key;
    if (attribute) {
      const age = data.age_constraints;
      const color = data.color_constraints;
      if (attribute === 'color_constraints' && (!color || (color && color.length < 2))) {
        toast.error('Please select minimum 2 colors');
        return;
      } else if (attribute === 'age_constraints') {
        if (!age || (age && age.length < 2)) {
          toast.error('Please select minimum 2 age constraints');
          return;
        }
      }
    } else {
      toast.error('Please select attribute');
      return;
    }

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
              display: 'Vendor *',
              input_type: 'S',
              clearFields: ['brand_id'],
            },
            {
              key: 'attribute',
              display: 'Attribute Values *',
              input_type: 'S',
              options: [
                { key: 'color_constraints', name: 'Color(Minimum 2) *' },
                { key: 'age_constraints', name: 'Age Group(Minimum 2) *' },
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

  const onAttributeChange = (key: any, formData: any) => {
    if (key === 'attribute' && formData.attribute.key === 'color_constraints') {
      const list = removeFromArray(['age_constraints'], [...dropDownsList]);
      (async () => {
        try {
          const colors: any = await reorderService.getColors();
          if (colors) {
            list.push({ ...colors, key: 'color_constraints', display: 'Color *' });
          }
          setDropDownsList([...list]);
        } catch (error) {
          showError(error);
        }
      })();
    } else {
      const list = removeFromArray(['color_constraints'], [...dropDownsList]);
      setDropDownsList([...list]);
    }
  };

  const onDropDownChange = (key: any, formData: any) => {
    if (key === 'attribute') {
      onAttributeChange(key, formData);
    } else if (key === 'vendor_id') {
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
      withJoin: true,
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
    { id: 'gender', label: 'Gender' },
    {
      id: 'constraint_key.name',
      label: 'Attribute',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (row) {
          return <>{row.constraint_key.name}</>;
        }
        return '--';
      },
    },
    {
      id: 'constraint_key.value',
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
            return <>{row.constraint_key.value.map((record: any) => JSON.stringify(record))}</>;
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
    let actionPost;
    if (data.value === 'ENABLE') {
      actionPost = 'DISABLE';
    } else {
      actionPost = 'ENABLE';
    }
    let filterPostData: IFilterPostData = {
      id: data.vendor,
      group_id: data.constraint_key.group_id,
      action: actionPost,
    };
    (async () => {
      try {
        const filterData: any = await reorderService.postDataAction(filterPostData);
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
    title: 'Table testing',
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
