import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '@hs/utils';
import { reorderService } from '@hs/services';
import { ReorderFiltersList, ReorderFiltersProps, ReorderFiltersObjectProps } from '@hs/components';

const useStyles = makeStyles((theme) => ({
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

const ClusterWrapper = styled.div`
  width: 100%;
  margin: 10px 10px 10px 90px;
`;
const loading = 'Loading';

export const Clusters = () => {
  const classes = useStyles();
  const [status, setStatus] = useState<string>(loading);
  const [dropDownsList, setDropDownsList] = useState<any>('');
  const onSubmit = (e: Record<string, unknown>) => {
    console.log(e);
  };

  const onSubCategoryChange = (key: any, formData: any) => {
    console.log(key, formData);
  };

  const onCategoryChange = useCallback(
    (key: any, formData: any) => {
      console.log(key, formData);
      let data = formData[key];
      (async () => {
        try {
          const ids = data.map((obj: any) => obj.key).toString();
          if (ids.length) {
            const subCategories: any = await reorderService.getSubCategories({ ids });
            if (subCategories && subCategories.sub_cat) {
              const list = [...dropDownsList];
              const indexFound = dropDownsList.findIndex((obj: any) => obj.name === 'category_id');
              if (indexFound > -1) {
                const subCategoryObject = {
                  key: 'sub_cat',
                  display: 'Sub Category',
                  input_type: 'S',
                  options: subCategories.sub_cat,
                  onChange: onSubCategoryChange,
                  multi: true,
                };
                list.splice(indexFound + 1, 0, subCategoryObject);
                setDropDownsList([...list]);
                return;
              }
            }
          }
        } catch (e) {}
      })();
    },
    [dropDownsList],
  );

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
            },
            {
              key: 'brand_id',
              display: 'Brand',
              input_type: 'S',
            },
            {
              key: 'category_id',
              display: 'Category',
              multi: true,
              input_type: 'S',
              onChange: onCategoryChange,
            },
            {
              key: 'gender',
              display: 'Gender',
              input_type: 'S',
            },
            {
              key: 'age',
              display: 'Age',
              input_type: 'S',
            },
          ];
          dropDownsList.forEach((element: ReorderFiltersProps) => {
            if (filters[element.key]) {
              element['options'] = filters[element.key];
            }
          });
          setDropDownsList([...dropDownsList]);
        }
      } catch (e) {
        setStatus('Try Later');
      }
    })();
  }, [onCategoryChange]);

  const data: ReorderFiltersObjectProps = {
    sideBar: [...dropDownsList],
    defaultSelectedValues: {},
    onSubmit: onSubmit,
  };

  return (
    <ClusterWrapper>
      <h1 className={classes.header}>Checks and Balances DashBoard</h1>
      {dropDownsList.length === 0 && <h5> {status} </h5>}
      {dropDownsList.length > 0 && <ReorderFiltersList {...data} />}
    </ClusterWrapper>
  );
};
