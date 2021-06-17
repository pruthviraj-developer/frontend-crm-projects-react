import React, { FC, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Colors } from '@hs/utils';
import { makeStyles } from '@material-ui/core/styles';
import {
  ICreateProductSubtypeProps,
  IUrlParamsEntity,
  IOptionType,
  IOptionsType,
  IGetProductResponse,
  IAttributePostValueType,
  IAttributePostValue,
  IValueOfSelected,
  IPostValues,
  IAttributesData,
  IAttributeListDataResponse,
} from './ICreateProduct';
import { TextField as MuiTextField, Grid, Paper, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { productSubtypeService } from '@hs/services';
import { IProductTypeDropDownProps } from './IDashboard';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { SelectedRectAngle, DeSelectedRectAngle, SvgIcon } from '@hs/icons';
import { useCategory } from './UseCategory.hook';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
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
  crossBtn: {
    position: 'relative',
    top: '-4px',
    fontSize: '1.5rem',
    marginLeft: '-10px',
    width: '100%',
    height: '50px',
    padding: '1.5rem',
    alignSelf: 'center',
    borderRadius: '5px',
  },
  option: {
    paddingLeft: 0,
    fontSize: 14,
  },
}));

const StyledIcon = styled(SvgIcon)`
  margin: 0 20px;
  fill: white;
`;

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
  if (error.action === 'FAILURE' && error.message) {
    message = error.message[0];
  } else {
    message = error.messageList[0];
  }
  toast.error(message);
};

const initialValues: IPostValues = {
  categoryId: '' || { key: '', value: '' },
  subcategoryId: '' || { key: '', value: '' },
  productTypeId: '' || { key: '', value: '' },
  productSubtypeName: '',
  attributeList: [],
};

const CreateProduct: FC<{ header: string }> = ({ header }: ICreateProductSubtypeProps) => {
  const history = useHistory();
  const classes = useStyles();
  const [initialData, setInitialData] = useState(initialValues);
  const [attributeList, setAttributeList] = useState<IAttributesData[]>([]);
  const [productTypeId, setProductTypeId] = useState<string | number>('');

  const params = useParams<IUrlParamsEntity>();

  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required('Please select category'),
    subcategoryId: Yup.string().required('Please select sub category'),
    productTypeId: Yup.string().required('Please select product type'),
    productSubtypeName: Yup.string().required('Product sub type name is required'),
    attributeList: Yup.array()
      .of(
        Yup.object().shape({
          attributeId: Yup.string(),
          attributeValues: Yup.array().of(Yup.string()).required().min(1, 'At least one attribute value is required'),
        }),
      )
      .required()
      .min(attributeList && attributeList.length, 'All attributes are mandatory'),
  });

  const [categoryId, setCategoryId] = useState<string | number>('');
  const [subCategoryId, setSubCategoryId] = useState<string | number>('');
  const {
    categoryList: categoryData,
    subCategoryList: subCategoryData,
    pTList,
  } = useCategory({
    categoryId,
    subCategoryId,
  });

  const { data: attributeListData, isSuccess: isAttributeSuccess } = useQuery<
    IAttributeListDataResponse,
    Record<string, string>
  >(['attributesGet', productTypeId], () => productSubtypeService.getAttributesList(productTypeId), {
    staleTime: Infinity,
    enabled: productTypeId !== '',
    onError: (error: Record<string, string>) => {
      showError(error);
    },
  });

  useEffect(() => {
    if (isAttributeSuccess) {
      attributeListData?.attributes.sort((a: IAttributesData, b: IAttributesData) => {
        if (a.attributeName < b.attributeName) return -1;
        return a.attributeName > b.attributeName ? 1 : 0;
      });
      if (attributeListData) {
        setAttributeList(attributeListData.attributes);
      }
    }
  }, [attributeListData, isAttributeSuccess]);

  useEffect(() => {
    if (params.id) {
      getProductData();
    }
  }, [params]);

  const getProductData = useCallback(() => {
    (async () => {
      try {
        const productTypeData: IGetProductResponse = await productSubtypeService.getProduct(params.id);
        productTypeData.data.attributes.sort((a, b) => {
          if (a.type.value < b.type.value) return -1;
          return a.type.value > b.type.value ? 1 : 0;
        });

        if (productTypeData) {
          const attributesResponseData: IPostValues = {
            categoryId: productTypeData?.data.categoryId,
            subcategoryId: productTypeData?.data.subCategoryId,
            productTypeId: productTypeData?.data.productTypeId,
            productSubtypeName: productTypeData?.data.productSubTypeName || '',
            attributeList: [],
          };

          setCategoryId(attributesResponseData.categoryId.key);
          setSubCategoryId(attributesResponseData.subcategoryId.key);
          setProductTypeId(attributesResponseData.productTypeId.key);

          productTypeData.data.attributes.forEach((item) => {
            const obj: IAttributePostValue = { attributeId: item.type.key, attributeValues: item.values };
            attributesResponseData.attributeList.push(obj);
          });

          setInitialData({ ...attributesResponseData });
        }
      } catch (error) {
        showError(error);
      }
    })();
  }, []);

  const onDropDownChange = (key: string, id: string | number) => {
    if (key === 'categoryId') {
      setCategoryId(id);
    } else if (key === 'subcategoryId') {
      setSubCategoryId(id);
    } else if (key === 'productTypeId') {
      setProductTypeId(id);
    }
  };

  const onFiltersSubmit = (values: any, actions: any) => {
    const actionMessage = header.indexOf('Create') > -1 ? 'added' : 'updated';
    let postObject: any = {};
    ['categoryId', 'subcategoryId', 'productTypeId', 'productSubtypeName'].forEach((ele: string) => {
      if (values[ele]) {
        postObject[ele] = values[ele]['key'] || values[ele];
      }
    });

    const attrList: IAttributePostValue[] = [...values.attributeList];
    const valObj: IAttributePostValueType[] = [];
    attrList.forEach((itm: IAttributePostValue) => {
      if (itm && itm.attributeValues) {
        const fObj: IAttributePostValueType = { attributeId: itm.attributeId, attributeValues: [] };
        fObj.attributeValues = [...fObj.attributeValues, ...itm.attributeValues.map((val) => val.value)];
        valObj.push(fObj);
      }
    });
    postObject = { ...postObject, attributeList: valObj };
    if (actionMessage === 'updated') {
      (async () => {
        try {
          const productPostStatus: Record<string, string> = await productSubtypeService.updateProduct(
            postObject,
            params.id,
          );
          if (productPostStatus.action === 'SUCCESS') {
            toast.success(productPostStatus.messageList[0] || `Product ${actionMessage} successfully`);
            setTimeout(() => {
              history.push('/product-sub-types/product-sub-type');
            }, 5000);
            return;
          }
        } catch (error) {
          actions.setSubmitting(false);
          showError(error);
        }
      })();
    } else {
      (async () => {
        try {
          const productPostStatus: Record<string, string> = await productSubtypeService.addProduct({ ...postObject });
          setInitialData(initialValues);
          if (productPostStatus.action === 'SUCCESS') {
            toast.success(productPostStatus.messageList[0] || `Product ${actionMessage} successfully`);
            setTimeout(() => {
              window.location.reload();
            }, 5000);
            return;
          }
        } catch (error) {
          actions.setSubmitting(false);
          showError(error);
        }
      })();
    }
  };

  const getAllAttributes = (attribute_key: string) => {
    let attributesObject: IValueOfSelected[] = [];
    attributeList.find((obj: IAttributesData) => {
      if (obj.attributeKey === attribute_key) {
        attributesObject = obj.values;
      }
    });
    return attributesObject || [];
  };

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <ProductWrapper>
        <h1>{header}</h1>
        <FiltersWrapper className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={onFiltersSubmit}
          >
            {({ values, isSubmitting, setFieldValue, errors, touched, isValid, dirty }) => (
              <Form autoComplete="off">
                <Grid container direction="column" justify="center" spacing={1}>
                  <Paper className={clsx(classes.paper, classes.filters)} variant="outlined">
                    <Grid container direction="column" justify="center" spacing={3}>
                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key="categoryId">
                        <Field
                          variant="standard"
                          name="categoryId"
                          id="categoryId"
                          disabled={params.id ? true : false}
                          label="Category"
                          component={Autocomplete}
                          options={categoryData || []}
                          getOptionLabel={(option: IProductTypeDropDownProps) => option.value || ''}
                          getOptionSelected={(
                            option: IProductTypeDropDownProps,
                            selectedValue: IProductTypeDropDownProps,
                          ) => option.key === selectedValue.key}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                            if (event) {
                              setFieldValue('categoryId', newVal);
                              setFieldValue('subcategoryId', '');
                              setFieldValue('productTypeId', '');
                              newVal && onDropDownChange('categoryId', newVal.key);
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField
                              {...params}
                              error={touched['categoryId'] && !!errors['categoryId']}
                              helperText={touched['categoryId'] && errors['categoryId']}
                              label="Category"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key="subcategoryId">
                        <Field
                          variant="standard"
                          name="subcategoryId"
                          id="subcategoryId"
                          disabled={params.id ? true : false}
                          label="Sub Category"
                          component={Autocomplete}
                          options={subCategoryData || []}
                          getOptionLabel={(option: IProductTypeDropDownProps) => option.value || ''}
                          getOptionSelected={(
                            option: IProductTypeDropDownProps,
                            selectedValue: IProductTypeDropDownProps,
                          ) => option.key === selectedValue.key}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                            if (event) {
                              setFieldValue('subcategoryId', newVal);
                              setFieldValue('productTypeId', '');
                              newVal && onDropDownChange('subcategoryId', newVal.key);
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField
                              {...params}
                              error={touched['subcategoryId'] && !!errors['subcategoryId']}
                              helperText={touched['subcategoryId'] && errors['subcategoryId']}
                              label="Sub Category"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key="productTypeId">
                        <Field
                          variant="standard"
                          name="productTypeId"
                          id="productTypeId"
                          disabled={params.id ? true : false}
                          label="Product Type"
                          component={Autocomplete}
                          options={pTList || []}
                          getOptionLabel={(option: IProductTypeDropDownProps) => option.value || ''}
                          getOptionSelected={(
                            option: IProductTypeDropDownProps,
                            selectedValue: IProductTypeDropDownProps,
                          ) => option.key === selectedValue.key}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                            if (event) {
                              setFieldValue('productTypeId', newVal);
                              newVal && onDropDownChange('productTypeId', newVal.key);
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField
                              {...params}
                              error={touched['productTypeId'] && !!errors['productTypeId']}
                              helperText={touched['productTypeId'] && errors['productTypeId']}
                              label="Product Type"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key="productSubtypeName">
                        <Field
                          label="Product Subtype"
                          name="productSubtypeName"
                          component={TextField}
                          variant="outlined"
                          fullWidth={true}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('productSubtypeName', e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container direction="column" justify="center" spacing={3}>
                      {attributeList &&
                        attributeList.map((attribute: IAttributesData, index: number) => (
                          <Grid
                            container
                            direction="row"
                            spacing={3}
                            style={{ marginTop: '2rem' }}
                            key={'attributeContainer-' + attribute.attributeKey}
                          >
                            <Grid
                              item
                              xs={3}
                              style={{ padding: '4px', marginLeft: '1.2rem', marginTop: '0.5rem' }}
                              key={'attributeLabel' + attribute.attributeKey}
                            >
                              <MuiTextField
                                label="Attribute"
                                disabled={true}
                                value={attribute.attributeKey + '*'}
                                variant="outlined"
                                fullWidth={true}
                              />
                            </Grid>

                            <Grid
                              item
                              xs
                              style={{ padding: '4px', marginRight: '12px', marginTop: '0.5rem' }}
                              key={'attributeValue-' + attribute.attributeKey}
                            >
                              <Field
                                variant="standard"
                                multiple={true}
                                disableCloseOnSelect={true}
                                name={`attributeList`}
                                limitTags={5}
                                id={attribute.attributeKey}
                                classes={{
                                  option: classes.option,
                                }}
                                value={
                                  (values.attributeList[index] && values.attributeList[index]['attributeValues']) || []
                                }
                                label="Select"
                                component={Autocomplete}
                                options={
                                  [{ value: 'Select All', key: 'all' }].concat(attributeList[index].values) ||
                                  attribute.values ||
                                  []
                                }
                                getOptionSelected={(option: IOptionsType, selectedValue: IOptionsType) => {
                                  return option.key === selectedValue.key;
                                }}
                                defaultValue={[]}
                                getOptionLabel={(option: IProductTypeDropDownProps) => option.value || option.key || ''}
                                renderOption={(option: IValueOfSelected, selectedValue: any) => {
                                  const displayLabel = option.value || option.key;
                                  if (displayLabel && displayLabel.toLowerCase() === 'select all') {
                                    return (
                                      <span style={{ color: Colors.PINK[500], fontSize: 18, paddingLeft: 20 }}>
                                        {displayLabel}
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span style={{ display: 'flex', alignItems: 'center' }}>
                                        {
                                          <StyledIcon
                                            icon={selectedValue.selected ? SelectedRectAngle : DeSelectedRectAngle}
                                          />
                                        }{' '}
                                        {displayLabel}
                                      </span>
                                    );
                                  }
                                }}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IValueOfSelected[]) => {
                                  let filteredValues: IValueOfSelected[] = [];
                                  if (newVal && newVal.length) {
                                    const indx = newVal.findIndex((obj: IValueOfSelected) => obj.key === 'all');
                                    if (indx > -1) {
                                      filteredValues = getAllAttributes(attribute.attributeKey);
                                    }
                                  }
                                  setFieldValue(`attributeList.${index}`, {
                                    ['attributeId']: attribute.attributeId.toString(),
                                    ['attributeValues']:
                                      filteredValues.length > 0
                                        ? [...filteredValues]
                                        : newVal && newVal.length
                                        ? [...newVal]
                                        : [],
                                  });
                                }}
                                renderInput={(params: AutocompleteRenderInputParams) => (
                                  <MuiTextField {...params} label="Select" variant="outlined" />
                                )}
                              />
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="center"
                      spacing={3}
                      style={{ padding: '4px', marginTop: '2rem', marginBottom: '-2.5rem' }}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant={'contained'}
                          disabled={isSubmitting || !isValid || !dirty || initialData == values}
                          size="large"
                        >
                          {header.indexOf('Create') > -1 ? 'Create Product Subtype' : 'Update Product Subtype'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* <pre>{JSON.stringify(values)}</pre> */}
              </Form>
            )}
          </Formik>
        </FiltersWrapper>
      </ProductWrapper>
    </>
  );
};
export default CreateProduct;
