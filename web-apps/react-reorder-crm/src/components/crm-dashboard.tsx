import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
// import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '@hs/utils';
import { toast } from 'react-toastify';
import { reorderService } from '@hs/services';
import {
  ReorderFiltersList,
  ReorderFiltersProps,
  ReorderFiltersObjectProps,
  HSTableV1,
  HsTablePropsV1,
} from '@hs/components';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/create-cluster', linkText: 'Create cluster', icon: DashBoardIcon },
    { linkUrl: '/reorder-crm-dashboard', linkText: 'Reorder Dashboard', icon: DashBoardIcon },
  ],
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  header: {
    margin: 10,
    fontSize: 28,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  dialogDescription: {
    color: Colors.PINK[500],
    fontSize: 16,
    fontWeight: 600,
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
  const [dropDownsList, setDropDownsList] = useState<any>('');
  const [rows, setRows] = useState<any>();
  const [selectedEd, setSelectedEd] = useState('');
  // const [state, setState] = useState<{ ed: string | number; name: string }>({
  //   ed: '',
  //   name: 'hai',
  // });

  // const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
  //   const name = event.target.name as keyof typeof state;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
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
    (async () => {
      try {
        const url = 'https://run.mocky.io/v3/51385f17-156a-4af2-a5c8-6644df0cc0d5';
        const resData = () => {
          axios.get(url).then((responseData) => {
            console.log(responseData);
            responseData.data.data.forEach((item1: any) => {
              const nBrand = [];
              nBrand.push(item1.brand);
              item1.brand = nBrand;
            });
            setRows([...responseData.data.data]);
          });
        };
        resData();
        // const constraint: any = await reorderService.createConstraint(postObject);
        // if (constraint.action === 'success') {
        //   toast.success(constraint.message || 'Cluster created successfully');
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 8000);
        //   return;
        // }
        // showError(constraint);
      } catch (error) {
        showError(error);
      }
    })();
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

  // const data: any = [
  //   {
  //     id: 209,
  //     vendor: 'Demo-Test-01',
  //     brand: ['Girl 6+ years'],
  //     category: '2020-09-09T17:53:56',
  //     sub_category: '2020-09-10T16:20:00',
  //     product_type: 'info@nstechs.com',
  //     attribute: '2020-09-09T18:04:00',
  //     gender: 'info@nstechs.com',
  //     values: '2020-09-09T18:05:00',
  //     active: true,
  //     type: 1,
  //     position: 2,
  //   },
  //   {
  //     id: 186,
  //     vendor: 'QA-Android-Test-4',
  //     brand: ['Sale'],
  //     category: '2020-09-08T15:46:25',
  //     sub_category: '2020-09-30T13:05:00',
  //     product_type: 'info@nstechs.com',
  //     attribute: '2020-09-08T15:44:13',
  //     gender: 'info@nstechs.com',
  //     values: '2020-09-09T17:47:00',
  //     active: false,
  //     type: 2,
  //     position: 2,
  //   },
  //   {
  //     id: 208,
  //     vendor: 'Demo-Test',
  //     brand: ['Girl 6+ years', 'Foot wear'],
  //     category: '2020-09-09T12:33:03',
  //     sub_category: '2020-09-11T12:33:00',
  //     product_type: 'info@nstechs.com',
  //     attribute: '2020-09-09T16:29:00',
  //     gender: 'info@nstechs.com',
  //     values: '2020-09-09T17:23:00',
  //     active: true,
  //     type: 1,
  //     position: 3,
  //   },
  //   {
  //     id: 207,
  //     vendor: 'Qa-Android-Test-8',
  //     brand: ['Footwear'],
  //     category: '2020-09-09T12:33:03',
  //     sub_category: '2020-09-12T12:33:00',
  //     product_type: 'info@nstechs.com',
  //     attribute: '2020-09-09T13:07:07',
  //     gender: 'info@nstechs.com',
  //     values: '2020-09-09T13:07:14',
  //     active: false,
  //     type: 1,
  //     position: 4,
  //   },
  //   {
  //     id: 191,
  //     vendor: 'QA-Android-Test-5',
  //     brand: ['Sale'],
  //     category: '2020-09-08T16:05:25',
  //     sub_category: '2020-09-11T11:20:00',
  //     product_type: 'info@nstechs.com',
  //     attribute: '2020-09-08T16:02:42',
  //     gender: 'info@nstechs.com',
  //     values: '2020-09-09T11:18:50',
  //     active: true,
  //     type: 1,
  //     position: 6,
  //   },
  // ];
  // const rows = data;
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
      customRender: (row: any, isTitle?: boolean) => {
        if (isTitle) {
          return row.brand;
        }
        if (row) {
          return (
            <>
              <NavLink to={{ pathname: `/edit-carousel/${row.id}` }}>{row.brand}</NavLink>
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
      customRender: (row: any, isTitle?: boolean) => {
        // if (isTitle) {
        //   return row.title;
        // }
        if (row) {
          return <>{row.constraint_key.name}</>;
        }
        return '--';
      },
    },
    {
      id: 'constraint_key.value',
      label: 'Values',
      customRender: (row: any, isTitle?: boolean) => {
        // if (isTitle) {
        //   return row.title;
        // }
        if (row) {
          return <>{row.constraint_key.value.map((record: any) => JSON.stringify(record))}</>;
        }
        return '--';
      },
    },
    {
      label: 'Action',
      render: (props: any, data: any) => {
        if (data) {
          return (
            <div style={{ display: 'flex' }}>
              {/* <Checkbox checked={false} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} /> */}
              <FormControl className={classes.formControl}>
                <InputLabel id="enable-disable-label">Enable/Disable</InputLabel>
                <Select
                  name={selectedEd + 'Option'}
                  labelId="enable-disable-label"
                  value={selectedEd}
                  onChange={handleActionED}
                >
                  <MenuItem value="enable">Enable</MenuItem>
                  <MenuItem value="disable">Disable</MenuItem>
                </Select>
              </FormControl>
            </div>
          );
        }
      },
      withIcon: true,
    },
  ];

  const handleActionED = (e: any) => {
    // let val;
    // if (e.target.value == 1) {
    //   val = 0;
    // } else {
    //   val = 1;
    // }
    setSelectedEd((e.target.name = e.target.value));
    // alert('Enable/Disable = ' + e.id);
  };

  const tabData: HsTablePropsV1 = {
    title: 'Table testing',
    count: 250,
    columns: columns,
    rows: rows,
    rowsPerPage: 10,
    filterRowsPerPage: [10, 25, 50, 100],
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
