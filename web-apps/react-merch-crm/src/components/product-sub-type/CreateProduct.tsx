import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {
  ICreateProductSubtypeProps,
  IUrlParamsEntity,
  IOptionType,
  IAttributeData,
  IAttributeItems,
  IAttributeValues,
  IAttributeResponse,
  IDeleteItemsType,
  IOptionsType,
  IGetProductResponse,
  IProductDropdowns,
  IProductDropDownProps,
  IAttributeResTypeData,
  ISelectedAttributesType,
  IValueOfSelected,
  Action,
  ActionType,
} from './ICreateProduct';
import { TextField as MuiTextField, Grid, Paper, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TextField } from 'formik-material-ui';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { productSubtypeService } from '@hs/services';
import { IProductTypeDropDownProps, ISelectedValues } from './IDashboard';
import { useQuery } from 'react-query';
import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  categoryId: Yup.string().required('Please select category'),
  subcategoryId: Yup.string().required('Please select sub category'),
  productTypeId: Yup.string().required('Please select product type'),
  productSubtypeName: Yup.string().required('Product sub type name is required'),
  attributeList: Yup.array()
    .of(
      Yup.object().shape({
        attributeId: Yup.string(),
        attributeValues: Yup.array().of(Yup.string()),
      }),
    )
    .required()
    .min(1, 'Please add at least one attribute'),
});

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
  if (error.action === 'FAILURE' && error.messageList) {
    message = error.messageList[0];
  }
  toast.error(message);
};

const initialValues: any = {
  categoryId: '',
  subcategoryId: '',
  productTypeId: '',
  productSubtypeName: '',
  attributeList: [],
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
  const history = useHistory();
  const classes = useStyles();
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [attributes, setAttributes] = useState(initialValues);
  const [attributeListItems, setAttributeListItems] = useState<IAttributeResponse>({});
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [attributeList, dispatchAttributeList] = useReducer(reducer, []);
  const [productTypeId, setProductTypeId] = useState<string | number>('');
  const [recycleAttribute, setRecycleAttribute] = useState<IAttributeResponse>({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const params = useParams<IUrlParamsEntity>();

  const handleClose = () => {
    setDialogStatus(false);
  };

  const { data: categoryData, isSuccess: isCategoryDataSuccess } = useQuery<IOptionType[]>(
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
  const { data: subCategoryData, isSuccess: isSubCategoryDataSuccess } = useQuery<
    IOptionType[],
    Record<string, string>
  >(['subcategory', categoryId], () => productSubtypeService.getSubCategory(categoryId), {
    staleTime: Infinity,
    enabled: categoryId !== '',
  });

  const [subcategoryId, setSubCategoryId] = useState<string | number>('');
  const { data: productTypeData, isSuccess: isProductTypeSuccess } = useQuery<IOptionType[], Record<string, string>>(
    ['producttype', subcategoryId],
    () => productSubtypeService.getProductType(subcategoryId),
    {
      staleTime: Infinity,
      enabled: subcategoryId !== '',
    },
  );

  const { data: attributeData, isSuccess: isAttributeSuccess } = useQuery<IAttributeData, Record<string, string>>(
    ['attributes'],
    () => productSubtypeService.getAttributesList(),
    {
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (isAttributeSuccess) {
      setAttributeListItems(attributeData?.data?.attributes);
    }
  }, [attributeData, isAttributeSuccess]);

  useEffect(() => {
    if (params.id) {
      getProductData();
    }
  }, [params]);

  const getProductData = useCallback(() => {
    (async () => {
      try {
        const productTypeData: IGetProductResponse = await productSubtypeService.getProduct(params.id);
        if (productTypeData) {
          const attributesResponseData: any = {
            categoryId: productTypeData?.data.categoryId,
            subcategoryId: productTypeData?.data.subCategoryId,
            productTypeId: productTypeData?.data.productTypeId,
            productSubtypeName: productTypeData?.data.productSubTypeName || '',
            attributeList: [],
          };

          // const attributesParamUrlResponse: IAttributeResTypeData[] = [];
          productTypeData.data.attributes.forEach((item) => {
            const obj: IAttributeResTypeData = { attributeId: item.type.key, attributeValues: [] };
            item.values.forEach((val: IValueOfSelected) => {
              obj?.attributeValues.push(val.value);
            });
            attributesResponseData.attributeList.push(obj);
          });

          setAttributes({ ...attributesResponseData });

          // setSelectedFilters({
          //   ['categoryId']: { ...category },
          //   ['subcategoryId']: { ...subCategory },
          //   ['productTypeId']: { ...productType },
          //   ['productSubtypeName']: subTypeName,
          // });

          productTypeData.data.attributes.map((eachAttrib) => {
            const newVal = {
              [eachAttrib.type.value]: {
                attributeId: eachAttrib.type.key,
                attributeValue: eachAttrib.uiType === 'MULTI' ? eachAttrib.values : eachAttrib.values[0],
              },
            };
            setSelectedAttributes((prevState: ISelectedAttributesType) => {
              return { ...prevState, ...newVal };
            });
            const attributeValues: IAttributeValues = {
              display: 'Attribute',
              id: eachAttrib.type.key,
              label: eachAttrib.type.value,
              display_position: 5,
              operationType: [],
              uiType: eachAttrib.uiType,
              key: eachAttrib.type.value,
              options: eachAttrib.values,
            };
            dispatchAttributeList([ActionType.addItems, [attributeValues]]);

            const recycle: IAttributeResponse = {};
            Object.keys(attributeListItems).forEach((item) => {
              if (attributeListItems[item].attributeKey === eachAttrib.type.value) {
                recycle[item] = { ...attributeListItems[item] };
              }
            });
            setRecycleAttribute((prevState: IAttributeResponse) => {
              return { ...prevState, ...recycle };
            });

            const recycleList: IAttributeResponse = {};
            Object.keys(attributeListItems).forEach((item) => {
              if (attributeListItems[item].attributeKey !== eachAttrib.type.value) {
                recycleList[item] = { ...attributeListItems[item] };
              }
            });
            setAttributeListItems((prevState: IAttributeResponse) => {
              return { ...prevState, ...recycleList };
            });
          });
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
    } else if (key === 'productType') {
      setProductTypeId(id);
    }
  };

  const handleDelete = (attributeDelete: IDeleteItemsType) => {
    const notAllowed = [attributeDelete.key];
    dispatchAttributeList([ActionType.removeItems, [attributeDelete.key]]);
    const filtered = Object.keys(selectedAttributes)
      .filter((key) => !notAllowed.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = selectedAttributes[key];
        return obj;
      }, {});
    setSelectedAttributes(filtered);
    const recycledAttribList: IAttributeResponse = {};
    Object.keys(recycleAttribute).forEach((item) => {
      if (recycleAttribute[item].attributeKey === attributeDelete.key) {
        recycledAttribList[item] = { ...recycleAttribute[item] };
      }
    });
    setAttributeListItems({ ...attributeListItems, ...recycledAttribList });

    const delFromRecycledAttrib: IAttributeResponse = {};
    Object.keys(recycleAttribute).forEach((item) => {
      if (recycleAttribute[item].attributeKey !== attributeDelete.key) {
        delFromRecycledAttrib[item] = { ...recycleAttribute[item] };
      }
    });
    setRecycleAttribute(delFromRecycledAttrib);
  };

  // const character_format = (str: string) => {
  //   str = str.charAt(0).toUpperCase() + str.slice(1);
  //   str = str.replace(/_/g, ' ');
  //   return str;
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, attributeItm: IAttributeValues) => {
  //   const setVal = {
  //     [attributeItm.key]: {
  //       attributeId: attributeItm.id,
  //       attributeValue: e.target.value,
  //     },
  //   };
  //   setSelectedAttributes({ ...selectedAttributes, ...setVal });
  // };

  const handleListItemClick = (attributeItem: IAttributeItems) => {
    setDialogStatus(false);
    const newVal = {
      [attributeItem.attributeKey]: {
        attributeId: attributeItem.attributeId,
        attributeValue: attributeItem.uiType === 'MULTI' || attributeItem.uiType === 'SINGLE' ? [] : '',
      },
    };
    setSelectedAttributes((prevState: IAttributeValues) => {
      return { ...prevState, ...newVal };
    });

    const attributeValues: IAttributeValues = {
      display: 'Attribute',
      id: attributeItem.attributeId,
      label: attributeItem.attributeName,
      display_position: 5,
      operationType: attributeItem.operationType,
      uiType: attributeItem.uiType,
      key: attributeItem.attributeKey,
      options: attributeItem?.values,
    };
    dispatchAttributeList([ActionType.removeItems, [attributeItem.attributeKey]]);
    dispatchAttributeList([ActionType.addItems, [attributeValues]]);

    const recycle: IAttributeResponse = {};
    Object.keys(attributeListItems).forEach((item) => {
      if (attributeListItems[item].attributeKey === attributeItem.attributeKey) {
        recycle[item] = { ...attributeListItems[item] };
      }
    });
    setRecycleAttribute({ ...recycleAttribute, ...recycle });

    const recycleList: IAttributeResponse = {};
    Object.keys(attributeListItems).forEach((item) => {
      if (attributeListItems[item].attributeKey !== attributeItem.attributeKey) {
        recycleList[item] = { ...attributeListItems[item] };
      }
    });
    setAttributeListItems(recycleList);
  };

  const onFiltersSubmit = (values: any, actions: any) => {
    const actionMessage = header.indexOf('Create') > -1 ? 'added' : 'updated';
    let postObject: Record<string, number> = {};
    ['categoryId', 'subcategoryId', 'productTypeId', 'productSubtypeName'].forEach((ele: string) => {
      if (values[ele]) {
        postObject[ele] = values[ele]['key'] || values[ele]['attributeName'] || values[ele];
      }
    });
    postObject = { ...values, ...postObject };

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

  return (
    <>
      <ProductWrapper>
        <h1>{header}</h1>
        <FiltersWrapper className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={attributes}
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
                          getOptionSelected={(option: IProductTypeDropDownProps, selectedValue: any) =>
                            option.key === selectedValue
                          }
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                            if (event) {
                              setFieldValue('categoryId', newVal);
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
                          getOptionSelected={(option: IProductTypeDropDownProps, selectedValue: any) =>
                            option.key === selectedValue
                          }
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                            if (event) {
                              setFieldValue('subcategoryId', newVal);
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
                          options={productTypeData || []}
                          getOptionLabel={(option: IProductTypeDropDownProps) => option.value || ''}
                          getOptionSelected={(option: IProductTypeDropDownProps, selectedValue: any) =>
                            option.key === selectedValue
                          }
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
                    <Grid container direction="column" justify="center" spacing={3} style={{ marginTop: '1rem' }}>
                      {attributeList &&
                        attributeList.map((attribute: IAttributeValues, index: number) => (
                          <Grid
                            container
                            direction="row"
                            spacing={3}
                            style={{ marginTop: '1rem' }}
                            key={'attribute#' + attribute.key}
                          >
                            <Grid
                              item
                              xs={3}
                              style={{ padding: '4px', marginLeft: '1.2rem' }}
                              key={'attribute#' + attribute.key}
                            >
                              <MuiTextField
                                label="Attribute"
                                disabled={true}
                                value={attribute.label}
                                variant="outlined"
                                fullWidth={true}
                              />
                            </Grid>

                            <Grid item xs style={{ padding: '4px' }} key={'option#' + attribute.key}>
                              <Field
                                variant="standard"
                                multiple={attribute.uiType === 'MULTI' || false}
                                name={`attributeList.${index}.${attribute.key}`}
                                id={'option#' + attribute.key}
                                value={
                                  selectedAttributes[attribute.key].attributeValue ||
                                  values.attributeList[attribute.key] ||
                                  (attribute.uiType === 'MULTI' || attribute.uiType === 'SINGLE' ? [] : null)
                                }
                                label="Select"
                                component={Autocomplete}
                                options={
                                  attributeData?.data.attributes[attribute.key]['values'] || attribute.options || []
                                }
                                getOptionSelected={(option: IOptionsType, selectedValue: IOptionsType) => {
                                  return option.key == selectedValue?.key;
                                }}
                                getOptionLabel={(option: IProductTypeDropDownProps) => option.value || option.key || ''}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: any) => {
                                  const keyName = attribute.key;
                                  const formValues: ISelectedValues = {
                                    ...selectedAttributes,
                                    [keyName]: {
                                      attributeId: attribute.id,
                                      attributeValue: newVal,
                                    },
                                  };
                                  setSelectedAttributes({ ...formValues });
                                  setFieldValue(`attributeList.${index}`, {
                                    ['attributeId']: attribute.id,
                                    ['attributeValues']: newVal.length
                                      ? [...newVal.map((val: any) => val.value)]
                                      : [newVal.value],
                                  });
                                  // onDropDownChange(keyName, attribute);
                                }}
                                renderInput={(params: AutocompleteRenderInputParams) => (
                                  <MuiTextField {...params} label="Select" variant="outlined" />
                                )}
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <Button
                                type="button"
                                disabled={isSubmitting}
                                color="primary"
                                variant="outlined"
                                size="small"
                                className={classes.crossBtn}
                                style={{ top: '-9px' }}
                                onClick={() => {
                                  const attributeItemFilter = values.attributeList.filter(
                                    (attr: any) => attr.attributeId !== attribute.id,
                                  );
                                  setFieldValue('attributeList', attributeItemFilter);
                                  handleDelete(attribute);
                                }}
                              >
                                <DeleteForeverIcon fontSize="large" />
                              </Button>
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
                          type="button"
                          disabled={isSubmitting}
                          color="primary"
                          variant="outlined"
                          size="large"
                          onClick={() => setDialogStatus(true)}
                        >
                          Add Attribute
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant={'contained'}
                          disabled={isSubmitting || !isValid || !dirty}
                          size="large"
                        >
                          {header.indexOf('Create') > -1 ? 'Create Product' : 'Update Product'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <pre>{JSON.stringify(values) + '\n'}</pre>
              </Form>
            )}
          </Formik>

          <Dialog
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby="attribute-dialog"
            open={dialogStatus}
            maxWidth={'lg'}
          >
            <DialogTitle id="attribute-dialog" style={{ textAlign: 'center', borderBottom: '1px solid' }}>
              Select Attribute
            </DialogTitle>
            <List>
              {attributeListItems &&
                Object.keys(attributeListItems).map((eachAttributeListItem: string) => (
                  <ListItem
                    button
                    onClick={() => handleListItemClick(attributeListItems[eachAttributeListItem])}
                    key={eachAttributeListItem}
                  >
                    <ListItemText primary={attributeListItems[eachAttributeListItem]['attributeName']} />
                  </ListItem>
                ))}
              {!isAttributeSuccess ? 'No Data' : ''}
            </List>
          </Dialog>
        </FiltersWrapper>
      </ProductWrapper>
    </>
  );
};
export default CreateProduct;
