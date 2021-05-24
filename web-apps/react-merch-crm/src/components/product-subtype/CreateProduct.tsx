import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { ICreateProductSubtypeProps, IUrlParamsEntity } from './ICreateProduct';
import { TextField as MuiTextField, Grid, Paper, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { productSubtypeService } from '@hs/services';
import { IProductTypeDropDownProps, OptionType, ISelectedValues } from './IDashboard';
import { useQuery } from 'react-query';

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

const CreateProduct = ({ header }: ICreateProductSubtypeProps) => {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState<ISelectedValues>({});
  const [productSubTye, setProductSubtype] = useState<string>('');
  const params = useParams<IUrlParamsEntity>();

  const { data: categoryData } = useQuery<OptionType[]>('category', productSubtypeService.getCategory, {
    staleTime: Infinity,
    onError: (error: any) => {
      showError(error);
    },
  });

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
    const dataKey = formData[key]?.key || '';
    if (key === 'productCategoryId') {
      setCategoryId(dataKey);
    } else if (key === 'productSubCategoryId') {
      setSubCategoryId(dataKey);
    } else if (key === 'productTypeId') {
      // setProductTypeId(dataKey);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setProductSubtype(e.target.value);
    setSelectedFilters({ ...selectedFilters, [key]: e.target.value });
  };

  const onFiltersSubmit = (actionMessage: string) => {
    const postObject: Record<string, number> = {};
    ['productTypeId', 'productSubtypeName'].forEach((ele: string) => {
      if (selectedFilters[ele]) {
        postObject[ele] = selectedFilters[ele]['key'] || selectedFilters[ele]['id'] || selectedFilters[ele];
      }
    });

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
                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }}>
                        <Field
                          variant="standard"
                          name="category"
                          id="category"
                          value={selectedFilters['productCategoryId'] || null}
                          label="Category"
                          component={Autocomplete}
                          options={categoryData || []}
                          getOptionLabel={(option: IProductTypeDropDownProps) => option.value || option.key}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                            if (event) {
                              const keyName = 'productCategoryId';
                              const formValues: ISelectedValues = { ...selectedFilters, [keyName]: newVal };
                              setSelectedFilters(formValues);
                              onDropDownChange(keyName, formValues);
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label="Category" variant="outlined" />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }}>
                        <Field
                          variant="standard"
                          name="sub_category"
                          id="sub_category"
                          value={selectedFilters['productSubCategoryId'] || null}
                          label="Sub Category"
                          component={Autocomplete}
                          options={subCategoryData || []}
                          getOptionLabel={(option: IProductTypeDropDownProps) => option.value || option.key}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                            if (event) {
                              const keyName = 'productSubCategoryId';
                              const formValues: ISelectedValues = { ...selectedFilters, [keyName]: newVal };
                              setSelectedFilters(formValues);
                              onDropDownChange(keyName, formValues);
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label="Sub Category" variant="outlined" />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }}>
                        <Field
                          variant="standard"
                          name="product_type"
                          id="product_type"
                          value={selectedFilters['productTypeId'] || null}
                          label="Product Type"
                          component={Autocomplete}
                          options={productTypeData || []}
                          getOptionLabel={(option: IProductTypeDropDownProps) => option.value || option.key}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                            if (event) {
                              const keyName = 'productTypeId';
                              const formValues: ISelectedValues = { ...selectedFilters, [keyName]: newVal };
                              setSelectedFilters(formValues);
                              onDropDownChange(keyName, formValues);
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label="Product Type" variant="outlined" />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} style={{ padding: '4px', marginTop: '1rem' }}>
                        <TextField
                          label="Product Subtype"
                          value={selectedFilters['productSubtypeName'] || ''}
                          variant="outlined"
                          fullWidth={true}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e, 'productSubtypeName')
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      spacing={3}
                      style={{ padding: '4px', marginTop: '1rem', marginBottom: '-2.5rem' }}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                          size="large"
                          disabled={productSubTye == ''}
                          style={{
                            fontWeight: 'bold',
                            fontSize: 10,
                            padding: '15px 20px',
                            margin: '0 10px 0px',
                          }}
                        >
                          {header.indexOf('Add') > -1 ? 'Add Product' : 'Update Product'}
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
