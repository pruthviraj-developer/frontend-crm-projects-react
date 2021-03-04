import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '@hs/utils';
import { toast } from 'react-toastify';
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
const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure') {
    message = error.message;
  }
  toast.error(message);
};

export const Clusters = () => {
  const classes = useStyles();
  const [status, setStatus] = useState<string>(loading);
  const [dropDownsList, setDropDownsList] = useState<any>('');
  const onSubmit = (data: any) => {
    const postObject: Record<string, unknown> = {};
    [
      'vendor_id',
      'brand_id',
      'category_id',
      'sub_category_id',
      'product_type_id',
      'gender',
      'age_constraints',
      'color_constraints',
    ].forEach((ele: string) => {
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
          postObject[ele] = age;
        } else if (ele === 'color_constraints') {
          const color = [];
          for (let index = 0; index < data[ele].length; index++) {
            const element = data[ele][index];
            color.push({
              key: element.key,
            });
          }
          postObject[ele] = color;
        } else {
          postObject[ele] = data[ele]['key'] || data[ele];
        }
      }
    });
    (async () => {
      try {
        const constraint: any = await reorderService.createConstraint(postObject);
        debugger;
        if (constraint.action === 'success') {
          toast(constraint.message || 'Cluster created successfully');
          return;
        }
        showError(constraint);
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

  const onSubCategoryChange = (key: any, formData: any) => {
    let data = formData[key];
    (async () => {
      try {
        const ids = data.key;
        const list = removeFromArray(['product_type_id'], [...dropDownsList]);
        if (ids) {
          const productType: any = await reorderService.getProductTypes({ ids });
          if (productType && productType.pt) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'sub_category_id');
            if (indexFound > -1) {
              const productTypes = {
                key: 'product_type_id',
                display: 'Product Type',
                input_type: 'S',
                options: productType.pt,
              };
              list.splice(indexFound + 1, 0, productTypes);
            }
          }
        }
        setDropDownsList([...list]);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onCategoryChange = (key: any, formData: any) => {
    let data = formData[key];
    (async () => {
      try {
        const ids = data.key;
        const list = removeFromArray(['sub_category_id', 'product_type_id'], [...dropDownsList]);
        if (ids) {
          const subCategories: any = await reorderService.getSubCategories({ ids });
          if (subCategories && subCategories.sub_cat) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'category_id');
            if (indexFound > -1) {
              const subCategoryObject = {
                key: 'sub_category_id',
                display: 'Sub Category',
                input_type: 'S',
                options: subCategories.sub_cat,
                clearFields: ['product_type_id'],
              };
              list.splice(indexFound + 1, 0, subCategoryObject);
            }
          }
        }
        setDropDownsList([...list]);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onAttributeChange = (key: any, formData: any) => {
    if (key === 'attribute' && formData.attribute.key === 'color_constraints') {
      const list = removeFromArray(['age_constraints'], [...dropDownsList]);
      (async () => {
        try {
          const colors: any = await reorderService.getColors();
          if (colors) {
            list.push({ ...colors, key: 'color_constraints' });
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
    if (key === 'category_id') {
      onCategoryChange(key, formData);
    } else if (key === 'sub_category_id') {
      onSubCategoryChange(key, formData);
    } else if (key === 'attribute') {
      onAttributeChange(key, formData);
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
              input_type: 'S',
              clearFields: ['sub_category_id', 'product_type_id'],
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
            {
              key: 'attribute',
              display: 'Attribute Values',
              input_type: 'S',
              options: [
                { key: 'color_constraints', name: 'Color' },
                { key: 'age_constraints', name: 'Age Group(Minimum 2)' },
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

  const data: ReorderFiltersObjectProps = {
    sideBar: [...dropDownsList],
    defaultSelectedValues: {},
    onSubmit: onSubmit,
    onChange: onDropDownChange,
  };

  return (
    <ClusterWrapper>
      <h1 className={classes.header}>Create age color pack constraint</h1>
      {dropDownsList.length === 0 && <h5> {status} </h5>}
      {dropDownsList.length > 0 && <ReorderFiltersList {...data} />}
    </ClusterWrapper>
  );
};
