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
  ISelectedAttributesType,
  IValueOfSelected,
  Action,
  ActionType,
} from './ICreateProduct';
import { TextField as MuiTextField, Grid, Paper, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { productSubtypeService } from '@hs/services';
import { IProductTypeDropDownProps, ISelectedValues } from './IDashboard';
import { useQuery } from 'react-query';
import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

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
    toast.error(message);
  } else {
    message = error.messageList[0];
    toast.success(message);
  }
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
  const [selectedFilters, setSelectedFilters] = useState<ISelectedValues>({});
  const [attributeListItems, setAttributeListItems] = useState<IAttributeResponse>({});
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [attributeList, dispatchAttributeList] = useReducer(reducer, []);
  const [dropDownList, dispatch] = useReducer(reducer, []);
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
    if (isCategoryDataSuccess) {
      const formList: IProductDropdowns[] = [
        {
          key: 'categoryId',
          display: 'Category',
          options: categoryData,
          display_position: 1,
        },
        {
          key: 'subcategoryId',
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
        {
          key: 'productSubtypeName',
          display: 'Product Subtype',
          options: '',
          display_position: 4,
        },
      ];
      dispatch([ActionType.removeItems, ['categoryId', 'subcategoryId', 'productTypeId']]);
      dispatch([ActionType.addItems, formList]);
    }
  }, [categoryData, subCategoryData, productTypeData, isSubCategoryDataSuccess, isProductTypeSuccess]);

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
          const category = productTypeData?.data.categoryId;
          const subCategory = productTypeData?.data.subCategoryId;
          const productType = productTypeData?.data.productTypeId;
          const subTypeName = productTypeData?.data.productSubTypeName || '';

          setSelectedFilters({
            ['categoryId']: { ...category },
            ['subcategoryId']: { ...subCategory },
            ['productTypeId']: { ...productType },
            ['productSubtypeName']: subTypeName,
          });

          productTypeData.data.attributes.map((eachAttrib) => {
            const newVal = {
              [eachAttrib.type.value]: {
                attributeId: eachAttrib.type.key,
                attributeValue: eachAttrib.uiType === 'MULTI' ? eachAttrib.values : eachAttrib.values[0],
              },
            };
            setSelectedAttributes((prevState: any) => {
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
            setRecycleAttribute((prevState: any) => {
              return { ...prevState, ...recycle };
            });

            const recycleList: IAttributeResponse = {};
            Object.keys(attributeListItems).forEach((item) => {
              if (attributeListItems[item].attributeKey !== eachAttrib.type.value) {
                recycleList[item] = { ...attributeListItems[item] };
              }
            });
            setAttributeListItems((prevState: any) => {
              return { ...prevState, ...recycleList };
            });
          });
        }
      } catch (error) {
        showError(error);
      }
    })();
  }, []);

  const onDropDownChange = (key: string, formData: ISelectedValues) => {
    const dataKey = formData[key]?.key || formData[key]?.attributeValue || formData[key] || '';
    if (key === 'categoryId') {
      setCategoryId(dataKey);
      dispatch([ActionType.removeItems, ['productSubtypeName']]);
    } else if (key === 'subcategoryId') {
      setSubCategoryId(dataKey);
      dispatch([ActionType.removeItems, ['productSubtypeName']]);
    } else if (key === 'productType') {
      setProductTypeId(dataKey);
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

  const character_format = (str: string) => {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    str = str.replace(/_/g, ' ');
    return str;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, attributeItm: IAttributeValues) => {
    const setVal = {
      [attributeItm.key]: {
        attributeId: attributeItm.id,
        attributeValue: e.target.value,
      },
    };
    setSelectedAttributes({ ...selectedAttributes, ...setVal });
  };

  const handleListItemClick = (attributeItem: IAttributeItems) => {
    setDialogStatus(false);
    const newVal = {
      [attributeItem.attributeKey]: {
        attributeId: attributeItem.attributeId,
        attributeValue: attributeItem.uiType === 'MULTI' || attributeItem.uiType === 'SINGLE' ? [] : '',
      },
    };
    setSelectedAttributes((prevState: any) => {
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

  const onFiltersSubmit = (actionMessage: string) => {
    let postObject: Record<string, number> = {};
    ['categoryId', 'subcategoryId', 'productTypeId', 'productSubtypeName'].forEach((ele: string) => {
      if (selectedFilters[ele]) {
        postObject[ele] = selectedFilters[ele]['key'] || selectedFilters[ele]['attributeName'] || selectedFilters[ele];
      }
    });

    const mObj: any = [];
    Object.keys(selectedAttributes).forEach((ele) => {
      const valueOfArr = [];
      if (selectedAttributes[ele]) {
        if (typeof selectedAttributes[ele]['attributeValue'] == 'string') {
          mObj.push({
            attributeId: selectedAttributes[ele]['attributeId'],
            attributeValues: [selectedAttributes[ele]['attributeValue']],
          });
        }
        if (typeof selectedAttributes[ele]['attributeValue'] == 'object') {
          if (selectedAttributes[ele]['attributeValue']['value']) {
            mObj.push({
              attributeId: selectedAttributes[ele]['attributeId'],
              attributeValues: [selectedAttributes[ele]['attributeValue']['value']],
            });
          } else {
            for (const [, value] of Object.entries<IValueOfSelected>(selectedAttributes[ele]['attributeValue'])) {
              valueOfArr.push(value.value);
            }

            mObj.push({ attributeId: selectedAttributes[ele]['attributeId'], attributeValues: valueOfArr });
          }
        }
      }
    });

    postObject = { ...postObject, attributeList: mObj };

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
            initialValues={{}}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              const actionKey = header.indexOf('Create') > -1 ? 'added' : 'updated';
              onFiltersSubmit(actionKey);
            }}
          >
            {() => (
              <Form autoComplete="off">
                <Grid container direction="column" justify="center" spacing={1}>
                  <Paper className={clsx(classes.paper, classes.filters)} variant="outlined">
                    <Grid container direction="column" justify="center" spacing={3}>
                      {dropDownList &&
                        dropDownList.map((singleDropdown) =>
                          singleDropdown.key == 'productSubtypeName' ? (
                            <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key={singleDropdown.key}>
                              <TextField
                                label="Product Subtype"
                                value={selectedFilters['productSubtypeName'] || ''}
                                variant="outlined"
                                fullWidth={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const keyName = singleDropdown.key;
                                  const formValues: ISelectedValues = { ...selectedFilters, [keyName]: e.target.value };
                                  setSelectedFilters(formValues);
                                }}
                              />
                            </Grid>
                          ) : (
                            <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key={singleDropdown.key}>
                              <Field
                                variant="standard"
                                name={singleDropdown.key}
                                id={singleDropdown.key}
                                disabled={params.id ? true : false}
                                value={selectedFilters[singleDropdown.key] || null}
                                label={singleDropdown.display}
                                component={Autocomplete}
                                options={singleDropdown.options || []}
                                getOptionLabel={(option: IProductTypeDropDownProps) =>
                                  option.value || option.key || option.attributeName || option
                                }
                                onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
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
                          ),
                        )}
                    </Grid>
                    <Grid container direction="column" justify="center" spacing={3} style={{ marginTop: '1rem' }}>
                      {attributeList &&
                        attributeList.map((attribute: IAttributeValues) =>
                          attribute.uiType === 'SINGLE' || attribute.uiType === 'MULTI' ? (
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
                                <TextField
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
                                  name={'option#' + attribute.key}
                                  id={'option#' + attribute.key}
                                  value={
                                    selectedAttributes[attribute.key].attributeValue ||
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
                                  getOptionLabel={(option: IProductTypeDropDownProps) =>
                                    option.value || option.key || ''
                                  }
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                                    if (event) {
                                      const keyName = attribute.key;
                                      const formValues: ISelectedValues = {
                                        ...selectedAttributes,
                                        [keyName]: {
                                          attributeId: attribute.id,
                                          attributeValue: newVal,
                                        },
                                      };
                                      setSelectedAttributes({ ...formValues });
                                      onDropDownChange(keyName, attribute);
                                    }
                                  }}
                                  renderInput={(params: AutocompleteRenderInputParams) => (
                                    <MuiTextField {...params} label="Select" variant="outlined" />
                                  )}
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Button
                                  type="button"
                                  color="primary"
                                  variant="outlined"
                                  size="small"
                                  className={classes.crossBtn}
                                  style={{ top: '-9px' }}
                                  onClick={() => handleDelete(attribute)}
                                >
                                  <DeleteForeverIcon fontSize="large" />
                                </Button>
                              </Grid>
                            </Grid>
                          ) : (
                            <Grid
                              container
                              direction="row"
                              spacing={3}
                              style={{ marginTop: '1rem' }}
                              key={'attributeList#' + attribute.key}
                            >
                              <Grid
                                item
                                xs={3}
                                style={{ padding: '4px', marginLeft: '1.2rem' }}
                                key={'attribute#' + attribute.key}
                              >
                                <TextField
                                  label="Attribute"
                                  disabled={true}
                                  value={attribute.label}
                                  variant="outlined"
                                  fullWidth={true}
                                />
                              </Grid>

                              <Grid item xs style={{ padding: '4px' }} key={'option#' + attribute.key}>
                                <TextField
                                  label={character_format(attribute.key)}
                                  value={selectedAttributes[attribute.key].attributeValue || ''}
                                  variant="outlined"
                                  fullWidth={true}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, attribute)}
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Button
                                  type="button"
                                  color="primary"
                                  variant="outlined"
                                  size="small"
                                  className={classes.crossBtn}
                                  style={{ top: '-9px' }}
                                  onClick={() => handleDelete(attribute)}
                                >
                                  <DeleteForeverIcon fontSize="large" />
                                </Button>
                              </Grid>
                            </Grid>
                          ),
                        )}
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
                          color="primary"
                          variant="outlined"
                          size="large"
                          style={{
                            fontWeight: 'bold',
                            fontSize: 10,
                            padding: '15px 20px',
                            width: '100%',
                          }}
                          onClick={() => setDialogStatus(true)}
                        >
                          Add Attribute
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                          size="large"
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
