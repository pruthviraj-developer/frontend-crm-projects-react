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
  IOptionType,
  IDeleteItemsType,
  IProductType,
  IProductDropdowns,
  IProductDropDownProps,
  IAttributeListItem,
  ISelectedAttributesType,
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
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = useState<ISelectedValues>({});
  const [attributeListItems, setAttributeListItems] = useState<IAttributeListItem[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<ISelectedAttributesType>({});
  const [attributeList, dispatchAttributeList] = useReducer(reducer, []);
  const [dropDownList, dispatch] = useReducer(reducer, []);
  const [productTypeId, setProductTypeId] = useState<string | number>('');
  const [recycleAttribute, setRecycleAttribute] = useState<IAttributeListItem[]>([]);

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

  const { data: attributeData, isSuccess: isAttributeSuccess } = useQuery<any, Record<string, string>>(
    ['attributes'],
    () => productSubtypeService.getAttributesList(),
    {
      staleTime: 2000,
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
        {
          key: 'productSubTypeName',
          display: 'Product Subtype',
          options: '',
          display_position: 4,
        },
      ];
      dispatch([ActionType.removeItems, ['productCategoryId', 'productSubCategoryId', 'productTypeId']]);
      dispatch([ActionType.addItems, formList]);
    }
  }, [categoryData, subCategoryData, productTypeData, isSubCategoryDataSuccess, isProductTypeSuccess]);

  useEffect(() => {
    if (params.id) {
      (async () => {
        try {
          const productTypeData: IProductType = await productSubtypeService.getDashboardData({}, {});
          if (productTypeData) {
            const fetchedData = productTypeData?.productSubtypeList?.find(
              (subType) => subType.productSubtypeId == params.id,
            );
            const categoryKey = fetchedData?.productCategoryId || '';
            const subCategoryKey = fetchedData?.productSubCategoryId || '';
            // const productTypeKey = fetchedData?.productTypeId || '';

            if (categoryData) {
              const catDat = categoryData?.filter((category) => category.key == categoryKey);
              setCategoryId(categoryKey);
              if (subCategoryData) {
                const subCat = subCategoryData?.filter((subCategory) => subCategory.key == subCategoryKey);
                setSubCategoryId(subCategoryKey);
                // if(productTypeData){
                //   const producDat = productTypeData?.filter((productType) => productType.key == productTypeKey);
                //   setProductTypeId(productTypeKey);
                //   setSelectedFilters({['productTypeId']: {...producDat[0]}});
                // }
                setSelectedFilters({ ['productSubCategoryId']: { ...subCat[0] } });
              }
              setSelectedFilters({ ['productCategoryId']: { ...catDat[0] } });
              dispatch([ActionType.removeItems, ['productSubTypeName']]);
            }
          }
        } catch (error) {
          showError(error);
        }
      })();
    }
  }, [params]);

  useEffect(() => {
    if (isAttributeSuccess) {
      const attributes: IAttributeListItem[] = [];
      Object.keys(attributeData.data.attributes).forEach((item) => {
        attributes.push({ [item]: attributeData.data.attributes[item], ['key']: item });
      });
      setAttributeListItems(attributes);
    }
  }, [attributeData, isAttributeSuccess]);

  const onDropDownChange = (key: string, formData: ISelectedValues) => {
    const dataKey = formData[key]?.key || formData[key]?.attributeValue || formData[key] || '';
    if (key === 'productCategoryId') {
      setCategoryId(dataKey);
      dispatch([ActionType.removeItems, ['productSubTypeName']]);
    } else if (key === 'productSubCategoryId') {
      setSubCategoryId(dataKey);
      dispatch([ActionType.removeItems, ['productSubTypeName']]);
    } else if (key === 'productTypeId') {
      setProductTypeId(dataKey);
    }
  };

  const handleDelete = (attributeDelete: IDeleteItemsType) => {
    const notAllowed = ['attribute#' + attributeDelete.key];
    dispatchAttributeList([ActionType.removeItems, [attributeDelete.key]]);
    const filtered = Object.keys(selectedAttributes)
      .filter((key) => !notAllowed.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = selectedAttributes[key];
        return obj;
      }, {});

    setSelectedAttributes(filtered);

    const addAttributeFiltered = recycleAttribute.filter(
      (item: IAttributeListItem | any) => item.key.replace(/ /g, '_') === attributeDelete.key,
    );
    setAttributeListItems([...attributeListItems, ...addAttributeFiltered]);
    const nRecycleData = recycleAttribute.filter((item) => item.key !== attributeDelete.key);
    setRecycleAttribute(nRecycleData);
  };

  const character_format = (str: string) => {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    str = str.replace(/_/g, ' ');
    return str;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setSelectedAttributes({ ...selectedAttributes, [key]: e.target.value });
  };

  const handleListItemClick = (attributeItem: IAttributeListItem) => {
    setDialogStatus(false);
    const newVal = { key: attributeItem.key, value: attributeItem.key };
    setSelectedAttributes({
      ...selectedAttributes,
      ['attribute#' + attributeItem.key.replace(/ /g, '_')]: newVal,
    });
    const keyLabel = attributeItem.key;
    const attributeValues: IDeleteItemsType = {
      display: 'Attribute',
      display_position: 5,
      operationType: attributeItem[keyLabel].operationType,
      uiType: attributeItem[keyLabel]['uiType'],
      key: keyLabel.replace(/ /g, '_'),
      options: attributeItem[keyLabel]?.values,
    };
    dispatchAttributeList([ActionType.removeItems, [keyLabel]]);
    dispatchAttributeList([ActionType.addItems, [attributeValues]]);
    const recycle: IAttributeListItem[] = attributeListItems.filter(
      (item: IAttributeListItem) => item.key == attributeItem.key,
    );
    setRecycleAttribute([...recycleAttribute, ...recycle]);
    setAttributeListItems(attributeListItems.filter((attrb: IAttributeListItem) => attrb.key !== attributeItem.key));
  };

  const removeDuplicates = (arr: any) => {
    return arr.reduce(
      (p: any, c: any) => {
        const id = [c.attribute.key, c.operation.key].join('|');
        if (p.temp.indexOf(id) === -1) {
          p.out.push(c);
          p.temp.push(id);
        }
        return p;
      },
      {
        temp: [],
        out: [],
      },
    ).out;
  };

  const onFiltersSubmit = (actionMessage: string) => {
    alert(actionMessage);
    const arr: any = [];
    let bArr: any = [];
    Object.keys(selectedAttributes).forEach((record) => {
      const atName = record.split('attribute#')[1];
      if (atName) {
        if (record.includes(atName)) {
          arr.push(record);
        }
        let obj: any = {};
        arr.forEach((eachRecord: any) => {
          if (eachRecord) {
            obj['attribute'] = selectedAttributes['attribute#' + eachRecord.split('#')[1]];
            obj['operation'] = selectedAttributes['operation#' + eachRecord.split('#')[1]];
            obj['option'] = selectedAttributes['option#' + eachRecord.split('#')[1]];
            bArr.push(obj);
            obj = {};
          }
        });
      }
    });

    bArr = removeDuplicates(bArr);
    const newbArr = { attributes: bArr };
    const postObject = { ...selectedFilters, ...newbArr };

    // const postObject: Record<string, number> = {};
    // ['productCategoryId', 'productSubCategoryId', 'productTypeId', 'productSubtypeName'].forEach((ele: string) => {
    //   if (selectedFilters[ele]) {
    //     postObject[ele] = selectedFilters[ele]['key'] || selectedFilters[ele]['attributeName'] || selectedFilters[ele];
    //   }
    // });

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
                        dropDownList.map((singleDropdown) =>
                          singleDropdown.key == 'productSubTypeName' ? (
                            <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }} key={singleDropdown.key}>
                              <TextField
                                label="Product Subtype"
                                value={selectedFilters['productSubTypeName'] || ''}
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
                        attributeList.map((attribute: any) =>
                          attribute.uiType === 'MULTI' || attribute.uiType === 'SINGLE' ? (
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
                                  value={selectedAttributes['attribute#' + attribute.key]['key'] || ''}
                                  variant="outlined"
                                  fullWidth={true}
                                />
                              </Grid>

                              <Grid
                                item
                                xs={3}
                                style={{ padding: '4px', marginLeft: '0rem' }}
                                key={'operation#' + attribute.key}
                              >
                                <Field
                                  variant="standard"
                                  name={'operation#' + attribute.key}
                                  id={'operation#' + attribute.key}
                                  defaultValue={selectedAttributes[attribute.operationType[0]]}
                                  value={
                                    selectedAttributes['operation#' + attribute.key] || attribute.operationType[0] || ''
                                  }
                                  label="Operation"
                                  component={Autocomplete}
                                  options={attribute.operationType || []}
                                  getOptionLabel={(option: IProductTypeDropDownProps) =>
                                    option.displayName || option.key
                                  }
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                                    if (event) {
                                      const keyName = 'operation#' + attribute.key;
                                      const formValues: ISelectedValues = {
                                        ...selectedAttributes,
                                        [keyName]: newVal,
                                      };
                                      setSelectedAttributes(formValues);
                                      onDropDownChange(keyName, attribute);
                                    }
                                  }}
                                  renderInput={(params: AutocompleteRenderInputParams) => (
                                    <MuiTextField {...params} label="Operation" variant="outlined" />
                                  )}
                                />
                              </Grid>

                              <Grid item xs style={{ padding: '4px' }} key={'option#' + attribute.key}>
                                <Field
                                  variant="standard"
                                  name={'option#' + attribute.key}
                                  id={'option#' + attribute.key}
                                  value={selectedAttributes['option#' + attribute.key] || null}
                                  label="Option"
                                  component={Autocomplete}
                                  options={attribute.options || []}
                                  getOptionLabel={(option: IProductTypeDropDownProps) =>
                                    option.displayName || option.key
                                  }
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                                    if (event) {
                                      const keyName = 'option#' + attribute.key;
                                      const formValues: ISelectedValues = {
                                        ...selectedAttributes,
                                        [keyName]: newVal,
                                      };
                                      setSelectedAttributes(formValues);
                                      onDropDownChange(keyName, attribute);
                                    }
                                  }}
                                  renderInput={(params: AutocompleteRenderInputParams) => (
                                    <MuiTextField {...params} label="Option" variant="outlined" />
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
                                  value={selectedAttributes['attribute#' + attribute.key]['key'] || ''}
                                  variant="outlined"
                                  fullWidth={true}
                                />
                              </Grid>
                              <Grid item xs={3} style={{ padding: '4px' }} key={'operation#' + attribute.key}>
                                <Field
                                  variant="standard"
                                  name={'operation#' + attribute.key}
                                  id={'operation#' + attribute.key}
                                  defaultValue={selectedAttributes[attribute.operationType[0]]}
                                  value={
                                    selectedAttributes['operation#' + attribute.key] || attribute.operationType[0] || ''
                                  }
                                  label="Operation"
                                  component={Autocomplete}
                                  options={attribute.operationType || []}
                                  getOptionLabel={(option: IProductTypeDropDownProps) =>
                                    option.displayName || option.key
                                  }
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: IOptionType) => {
                                    if (event) {
                                      const keyName = 'operation#' + attribute.key;
                                      const formValues: ISelectedValues = {
                                        ...selectedAttributes,
                                        [keyName]: newVal,
                                      };
                                      setSelectedAttributes(formValues);
                                      onDropDownChange(keyName, attribute);
                                    }
                                  }}
                                  renderInput={(params: AutocompleteRenderInputParams) => (
                                    <MuiTextField {...params} label="Operation" variant="outlined" />
                                  )}
                                />
                              </Grid>

                              <Grid item xs style={{ padding: '4px' }} key={'option#' + attribute.key}>
                                <TextField
                                  label={character_format(attribute.key)}
                                  value={selectedAttributes['option#' + attribute.key] || ''}
                                  variant="outlined"
                                  fullWidth={true}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e, 'option#' + attribute.key)
                                  }
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
          <Dialog
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby="attribute-dialog"
            open={dialogStatus}
            maxWidth={'lg'}
          >
            <DialogTitle id="attribute-dialog" style={{ textAlign: 'center' }}>
              Select Attribute
            </DialogTitle>
            <List>
              {attributeListItems.map((eachAttributeListItem: any) => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(eachAttributeListItem)}
                  key={eachAttributeListItem.key}
                >
                  <ListItemText primary={eachAttributeListItem.key} />
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
