import React, { useState, useEffect } from 'react';
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

  const onSubCategoryChange = (key: any, formData: any) => {
    let data = formData[key];
    (async () => {
      try {
        const ids = data.map((obj: any) => obj.key).toString();
        const list = removeFromArray(['pt'], [...dropDownsList]);
        if (ids.length) {
          const productType: any = await reorderService.getProductTypes({ ids });
          if (productType && productType.pt) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'sub_cat');
            if (indexFound > -1) {
              const productTypes = {
                key: 'pt',
                display: 'Product Type',
                input_type: 'S',
                options: productType.pt,
                multi: true,
              };
              list.splice(indexFound + 1, 0, productTypes);
            }
          }
        }
        setDropDownsList([...list]);
      } catch (e) {}
    })();
  };

  const onCategoryChange = (key: any, formData: any) => {
    let data = formData[key];
    (async () => {
      try {
        const ids = data.map((obj: any) => obj.key).toString();
        const list = removeFromArray(['sub_cat', 'pt'], [...dropDownsList]);
        if (ids.length) {
          const subCategories: any = await reorderService.getSubCategories({ ids });
          if (subCategories && subCategories.sub_cat) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'category_id');
            if (indexFound > -1) {
              const subCategoryObject = {
                key: 'sub_cat',
                display: 'Sub Category',
                input_type: 'S',
                options: subCategories.sub_cat,
                multi: true,
                clearFields: ['pt'],
              };
              list.splice(indexFound + 1, 0, subCategoryObject);
            }
          }
        }
        setDropDownsList([...list]);
      } catch (e) {}
    })();
  };

  const onDropDownChange = (key: any, formData: any) => {
    console.log(key, formData);
    if (key === 'category_id') {
      onCategoryChange(key, formData);
    } else if (key === 'sub_cat') {
      onSubCategoryChange(key, formData);
    }
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
              clearFields: ['sub_cat', 'pt'],
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
  }, []);

  const data: ReorderFiltersObjectProps = {
    sideBar: [...dropDownsList],
    defaultSelectedValues: {},
    onSubmit: onSubmit,
    onChange: onDropDownChange,
  };

  return (
    <ClusterWrapper>
      <h1 className={classes.header}>Checks and Balances DashBoard</h1>
      {dropDownsList.length === 0 && <h5> {status} </h5>}
      {dropDownsList.length > 0 && <ReorderFiltersList {...data} />}
    </ClusterWrapper>
  );
};
