import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {
  ICreateProductSubtypeProps,
  IUrlParamsEntity,
  IProductDropdowns,
  IProductDropDownProps,
  Action,
  ActionType,
} from './ICreateProduct';
import { TextField as MuiTextField, Grid, Paper, Button } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { productSubtypeService } from '@hs/services';
import { IProductTypeDropDownProps, OptionType, ISelectedValues } from './IDashboard';
import { useQuery } from 'react-query';
import { useReducer } from 'react';

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
  filters: {
    paddingBottom: theme.spacing(2),
  },
}));

const ProductWrapper = styled.div`
  width: 95%;
  margin: 10px 10px 10px 90px;
`;

const FiltersWrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 1rem;
`;

const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure' && error.message) {
    message = error.message;
  }
  toast.error(message);
};

const reducer = (state: IProductDropDownProps[], [type, payload]: Action): IProductDropDownProps[] => {
  switch (type) {
    case ActionType.removeItems:
      return state.filter((item) => !(payload as string[]).includes(item.key));
    case ActionType.addItems:
      return [...state, ...(payload as IProductDropDownProps[])].sort(
        (a, b) => a.display_position - b.display_position,
      );
  }
};

const CreateProduct = ({ header }: ICreateProductSubtypeProps) => {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState<ISelectedValues>({});
  const [dropDownList, dispatch] = useReducer(reducer, []);
  const [productTypeId, setProductTypeId] = useState<string | number>('');
  // const [productSubTye, setProductSubtype] = useState<string | number>('');

  let subTypeArr = [];
  const params = useParams<IUrlParamsEntity>();

  const { data: categoryData, isSuccess: isCategoryDataSuccess } = useQuery<OptionType[]>(
    'category',
    productSubtypeService.getCategory,
    {
      staleTime: Infinity,
      onError: (error: any) => {
        showError(error);
      },
    },
  );

  const [categoryId, setCategoryId] = useState<string | number>('');
  const { data: subCategoryData } = useQuery<OptionType[], Record<string, string>>(
    ['subcategory', categoryId],
    () => productSubtypeService.getSubCategory(categoryId),
    {
      staleTime: Infinity,
      enabled: categoryId !== '',
    },
  );

  const [subcategoryId, setSubCategoryId] = useState<string | number>('');
  const { data: productTypeData } = useQuery<OptionType[], Record<string, string>>(
    ['producttype', subcategoryId],
    () => productSubtypeService.getProductType(subcategoryId),
    {
      staleTime: Infinity,
      enabled: subcategoryId !== '',
    },
  );

  useEffect(() => {
    if (isCategoryDataSuccess) {
      const formList: IProductDropdowns[] = [
        {
          key: 'productCategoryId',
          display: 'Category',
          options: categoryData,
          display_position: 1,
        },
        {
          key: 'productSubCategoryId',
          display: 'Sub Category',
          options: subCategoryData,
          display_position: 2,
        },
        {
          key: 'productTypeId',
          display: 'Product Type',
          options: productTypeData,
          display_position: 3,
        },
      ];
      dispatch([ActionType.removeItems, ['productCategoryId', 'productSubCategoryId', 'productTypeId']]);
      dispatch([ActionType.addItems, formList]);
    }
  }, [categoryData, subCategoryData, productTypeData]);

  useEffect(() => {
    if (params.cat_id && params.subcat_id && params.prod_type_id) {
      (async () => {
        try {
          const productTypeData: OptionType[] = await productSubtypeService.getProductType(params.subcat_id);
          if (categoryData) {
            const catData = categoryData.find((category) => category.key == params.cat_id);
            const categoryKey = catData?.key || '';
            if (categoryKey) {
              setCategoryId(categoryKey);
              setSelectedFilters({ ...selectedFilters, ['productCategoryId']: catData });
              if (subCategoryData) {
                const subCatData = subCategoryData.find((subCategory) => subCategory.key == params.subcat_id);
                const subCategoryKey = subCatData?.key || '';
                if (subCategoryKey) {
                  setSubCategoryId(subCategoryKey);
                  setSelectedFilters({ ...selectedFilters, ['productSubCategoryId']: subCatData });
                  if (productTypeData) {
                    const prodTypeData = productTypeData.find((prodType) => prodType.key == params.prod_type_id);
                    const prodTypeKey = prodTypeData?.key || '';
                    if (prodTypeKey) {
                      setSelectedFilters({ ...selectedFilters, ['productTypeId']: prodTypeData });
                    }
                  }
                }
              }
            }
          }
        } catch (error) {
          showError(error);
        }
      })();
    }
  }, [params]);

  const onDropDownChange = (key: string, formData: ISelectedValues) => {
    const dataKey = formData[key]?.key || formData[key]?.attributeValue || formData[key] || '';
    if (key === 'productCategoryId') {
      setCategoryId(dataKey);
      dispatch([ActionType.removeItems, ['productSubtypeId', 'attributeVal']]);
    } else if (key === 'productSubCategoryId') {
      setSubCategoryId(dataKey);
      dispatch([ActionType.removeItems, ['productSubtypeId', 'attributeVal']]);
    } else if (key === 'productTypeId') {
      setProductTypeId(dataKey);
      dispatch([ActionType.removeItems, ['productSubtypeId', 'attributeVal']]);
    } else if (key === 'productSubtypeId') {
      subTypeArr = dataKey;
      // setProductSubtype(formData[key]?.attributeName);
      const attributeValues = {
        display: 'Attribute Value',
        display_position: 4,
        key: 'attributeVal',
        options: subTypeArr,
      };
      dispatch([ActionType.removeItems, ['attributeVal']]);
      dispatch([ActionType.addItems, [attributeValues]]);
    }
  };

  const handleAddClick = () => {
    if (categoryId && subcategoryId && productTypeId) {
      (async () => {
        try {
          const attribData: any = await productSubtypeService.getAttributes(364);
          if (attribData.status === 'SUCCESS') {
            const attribute = {
              display: 'Product Subtype',
              display_position: 4,
              key: 'productSubtypeId',
              options: attribData.productSubType.attributeList,
            };
            dispatch([ActionType.removeItems, ['productSubtypeId', 'attributeVal']]);
            selectedFilters['productSubtypeId'] = '';
            selectedFilters['attributeVal'] = '';
            dispatch([ActionType.addItems, [attribute]]);
          }
        } catch (error) {
          showError(error);
        }
      })();
    }
  };

  const onFiltersSubmit = (actionMessage: string) => {
    const postObject: Record<string, number> = {};
    ['productCategoryId', 'productSubCategoryId', 'productTypeId', 'productSubtypeId', 'attributeVal'].forEach(
      (ele: string) => {
        if (selectedFilters[ele]) {
          postObject[ele] =
            selectedFilters[ele]['key'] || selectedFilters[ele]['attributeName'] || selectedFilters[ele];
        }
      },
    );

    (async () => {
      try {
        const productPostStatus: Record<string, string> = await productSubtypeService.addProduct({ ...postObject });
        if (productPostStatus.status === 'SUCCESS') {
          toast.success(productPostStatus.messageList || `Product ${actionMessage} successfully`);
          setTimeout(() => {
            window.location.reload();
          }, 8000);
          return;
        }
        showError({});
      } catch (error) {
        showError(error);
      }
    })();
  };

  return (
    <>
      <ProductWrapper>
        <h1>{header}</h1>
        <FiltersWrapper className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={{}}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              const actionKey = header.indexOf('Add') > -1 ? 'added' : 'updated';
              onFiltersSubmit(actionKey);
            }}
          >
            {() => (
              <Form autoComplete="off">
                <Grid container direction="column" justify="center" spacing={1}>
                  <Paper className={clsx(classes.paper, classes.filters)} variant="outlined">
                    <Grid container direction="column" justify="center" spacing={3}>
                      {dropDownList &&
                        dropDownList.map((singleDropdown) => (
                          <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key={singleDropdown.key}>
                            <Field
                              variant="standard"
                              name={singleDropdown.key}
                              id={singleDropdown.key}
                              value={selectedFilters[singleDropdown.key] || null}
                              label={singleDropdown.display}
                              component={Autocomplete}
                              options={singleDropdown.options || []}
                              getOptionLabel={(option: IProductTypeDropDownProps) =>
                                option.value || option.key || option.attributeName || option
                              }
                              onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                                if (event) {
                                  const keyName = singleDropdown.key;
                                  const formValues: ISelectedValues = { ...selectedFilters, [keyName]: newVal };
                                  setSelectedFilters(formValues);
                                  onDropDownChange(keyName, formValues);
                                }
                              }}
                              renderInput={(params: AutocompleteRenderInputParams) => (
                                <MuiTextField {...params} label={singleDropdown.display} variant="outlined" />
                              )}
                            />
                          </Grid>
                        ))}
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      spacing={3}
                      style={{ padding: '4px', marginTop: '1rem', marginBottom: '-2.5rem' }}
                    >
                      <Grid item>
                        <Button
                          type="button"
                          color="primary"
                          variant="outlined"
                          size="large"
                          disabled={productTypeId == ''}
                          style={{
                            fontWeight: 'bold',
                            fontSize: 10,
                            padding: '15px 20px',
                            width: '100%',
                          }}
                          onClick={handleAddClick}
                        >
                          Add Product Subtype
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                          size="large"
                          disabled={productTypeId == ''}
                          style={{
                            fontWeight: 'bold',
                            fontSize: 10,
                            padding: '15px 20px',
                            width: '100%',
                          }}
                        >
                          {header.indexOf('Create') > -1 ? 'Create Product' : 'Update Product'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Form>
            )}
          </Formik>
        </FiltersWrapper>
      </ProductWrapper>
    </>
  );
};
export default CreateProduct;
