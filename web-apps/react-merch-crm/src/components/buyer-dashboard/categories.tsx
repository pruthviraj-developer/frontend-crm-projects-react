import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { Field } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { Grid, TextField as MuiTextField } from '@material-ui/core';
import { useCategory, OptionType } from '@hs-crm/hooks';
import { CategoryPropsType } from './IShareToVendor';

const Categories = ({
  categoryIdName,
  subCategoryIdName,
  productTypeIdName,
  values,
  disabled = false,
}: CategoryPropsType) => {
  const { setFieldValue } = useFormikContext();
  const {
    categoryList,
    isCategoryListLoading,
    setCategoryId,
    subCategoryList,
    isSubCategoryListLoading,
    setSubCategoryId,
    pTList,
    isPTLoading,
  } = useCategory({
    categoryId: values.categoryId,
    subCategoryId: values.subCategoryId,
  });

  useEffect(() => {
    if (values.categoryId) {
      setCategoryId(values.categoryId);
    }
    if (values.subCategoryId) {
      setSubCategoryId(values.subCategoryId);
    }
  }, [values]);

  const displayText = (value: number, list?: OptionType[]): string =>
    value != undefined ? list?.find((option) => option.id == value)?.name || '' : '';

  const getDisplayTextFromArray = (values: Array<number>, list?: OptionType[]) => {
    if (values && values.length && list && list.length) {
      const dataList: Array<OptionType> =
        list?.filter((option) => {
          if (option && option.id) {
            return values.includes(option.id);
          }
        }) || [];
      return dataList;
    }
    return [];
  };

  const getOptionSelected = (option: OptionType, selectedValue: number) => {
    return option.id == selectedValue;
  };
  return (
    <>
      <Grid item xs={3}>
        <Field
          id="categoryId"
          variant="standard"
          label="Category"
          component={Autocomplete}
          name={categoryIdName}
          options={categoryList && categoryList.length ? categoryList : []}
          disabled={disabled || false}
          loading={isCategoryListLoading}
          getOptionLabel={(option: OptionType) => option.name || ''}
          getOptionSelected={getOptionSelected}
          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
            if (event) {
              const id: number | undefined = (newVal && newVal.id) || undefined;
              setCategoryId(id);
              setFieldValue(subCategoryIdName, '');
              setFieldValue(productTypeIdName, []);
              setFieldValue(categoryIdName, id);
              // submitForm();
            }
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <MuiTextField
              {...params}
              label={'Category'}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                value: displayText(values.categoryId, categoryList),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Field
          id="subCategoryId"
          variant="standard"
          label="Sub Category"
          component={Autocomplete}
          name={subCategoryIdName}
          options={subCategoryList || []}
          disabled={disabled || false}
          loading={isSubCategoryListLoading}
          getOptionLabel={(option: OptionType) => option.name || ''}
          getOptionSelected={getOptionSelected}
          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
            if (event) {
              const id: number | undefined = (newVal && newVal.id) || undefined;
              setSubCategoryId(id);
              setFieldValue(subCategoryIdName, id);
              setFieldValue(productTypeIdName, []);
              // submitForm();
            }
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <MuiTextField
              {...params}
              label={'Sub Category'}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                value: displayText(values.subCategoryId, subCategoryList),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Field
          variant="standard"
          label="Product types"
          multiple
          component={Autocomplete}
          disableCloseOnSelect={true}
          name={productTypeIdName}
          options={pTList || []}
          value={getDisplayTextFromArray(values.productTypeId, pTList)}
          disabled={disabled}
          loading={isPTLoading}
          getOptionLabel={(option: OptionType) => option.name || ''}
          // getOptionSelected={getOptionSelected}
          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType[]) => {
            if (event) {
              const ids = newVal.map((data) => data.id);
              setFieldValue(productTypeIdName, ids);
              // submitForm();
            }
          }}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <MuiTextField {...params} label={'Product types'} variant="outlined" />
          )}
        />
      </Grid>
    </>
  );
};
export default Categories;
