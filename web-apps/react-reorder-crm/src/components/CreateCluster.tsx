import { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { reorderService } from '@hs/services';
import {
  ReorderFiltersList,
  ReorderFiltersObjectProps,
  ReorderFiltersOptions,
  ReorderFiltersProps,
} from '@hs/components';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import { useQuery } from 'react-query';
import {
  FilterType,
  Brand,
  Action,
  ActionType,
  ICreateConstraintType,
  ISubCategory,
  IProductTypes,
  ISelectedValues,
  SkuAttributeEntity,
} from '../types/ICreateCluster';
import { useReducer } from 'react';
const navItems: LeftNavBarProps = {
  navList: [{ linkUrl: '/create-cluster', linkText: 'Create cluster', icon: DashBoardIcon }],
};

const ClusterWrapper = styled.div`
  width: 100%;
  margin: 10px 10px 10px 90px;
`;

const loading = 'Loading';
const tryLater = 'Please try later';
const attributeOptions: Array<ReorderFiltersOptions> = [
  { key: 'color_constraints', name: 'Color(Minimum 2) *', type: 'color' },
  { key: 'age_constraints', name: 'Age Group(Minimum 2) *', type: 'age' },
];
const showError = (error: ICreateConstraintType | Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure') {
    message = error.message;
  }
  toast.error(message);
};
const reducer = (state: ReorderFiltersProps[], [type, payload]: Action): ReorderFiltersProps[] => {
  switch (type) {
    case ActionType.removeItems:
      return state.filter((item) => !(payload as string[]).includes(item.key));
    case ActionType.addItems:
      return [...state, ...(payload as ReorderFiltersProps[])].sort((a, b) => a.display_position - b.display_position);
  }
  return state;
};

const CreateCluster = () => {
  const [status, setStatus] = useState<string>(loading);
  const [dropDownsList, dispatch] = useReducer(reducer, []);
  const [defaultSelectedValues, setDefaultSelectedValues] = useState<ISelectedValues>({});
  const params = useParams<{ id: string; group_id: string }>();
  const { data: filtersData, isSuccess: isFilterSuccess } = useQuery<FilterType, Record<string, string>>(
    'filters',
    reorderService.getFilters,
    {
      staleTime: Infinity,
      onError: (error) => {
        showError(error);
        setStatus(tryLater);
      },
    },
  );
  const [vendorId, setVendorId] = useState<string | number>('');
  const { data: brandData, isSuccess: isBrandSuccess, isFetching: isBrandFetching } = useQuery<
    Brand,
    Record<string, string>
  >(['brands', vendorId], () => reorderService.getBrands({ vendorId: vendorId }), {
    staleTime: Infinity,
    enabled: vendorId !== '',
  });

  const [categoryId, setCategoryId] = useState<string | number>('');
  const { data: subCategories, isSuccess: isSubCatSuccess, isFetching: isSubCatFetching } = useQuery<
    ISubCategory,
    Record<string, string>
  >(['subCategories', categoryId], () => reorderService.getSubCategories({ ids: categoryId }), {
    staleTime: Infinity,
    enabled: categoryId !== '',
    onError: (error) => {
      showError(error);
    },
  });

  const [subCategoryId, setSubCategoryId] = useState<string | number>('');
  const { data: productsList, isSuccess: isProductSuccess, isFetching: isProductFetching } = useQuery<
    IProductTypes,
    Record<string, string>
  >(['productsList', subCategoryId], () => reorderService.getProductTypes({ ids: subCategoryId }), {
    staleTime: Infinity,
    enabled: subCategoryId !== '',
    onError: (error) => {
      showError(error);
    },
  });

  const [attributeId, setAttributeId] = useState<string | number>('');
  const { data: colorsList, isSuccess: isColorsListSuccess, isFetching: isColorsListFetching } = useQuery<
    SkuAttributeEntity,
    Record<string, string>
  >(['colorsList', attributeId], () => reorderService.getColors(), {
    staleTime: Infinity,
    enabled: attributeId === 'color_constraints',
    onError: (error) => {
      showError(error);
    },
  });

  useEffect(() => {
    if (isFilterSuccess) {
      console.log(filtersData);
      let formList: ReorderFiltersProps[] = [
        {
          key: 'vendor_id',
          display: 'Vendor *',
          input_type: 'S',
          clearFields: ['brand_id'],
          options: filtersData?.vendor_id,
          disabled: params.id ? true : false,
          display_position: 1,
        },
        {
          key: 'category_id',
          display: 'Category',
          input_type: 'S',
          options: filtersData?.category_id,
          clearFields: ['sub_category_id', 'product_type_id'],
          display_position: 3,
        },
        {
          key: 'gender',
          display: 'Gender',
          input_type: 'S',
          options: filtersData?.gender,
          display_position: 6,
        },
        {
          key: 'attribute',
          display: 'Attribute Values *',
          input_type: 'S',
          options: attributeOptions,
          display_position: 7,
        },
      ];
      dispatch([ActionType.addItems, formList]);
    }
  }, [filtersData, isFilterSuccess]);

  useEffect(() => {
    if (isBrandSuccess) {
      if (brandData && brandData.brandList && brandData.brandList.length) {
        const brand: ReorderFiltersProps = {
          key: 'brand_id',
          display: 'Brand *',
          disabled: params.id ? true : false,
          input_type: 'S',
          options: brandData.brandList,
          display_position: 2,
        };
        dispatch([ActionType.addItems, [brand]]);
      } else {
        !isBrandFetching && vendorId !== '' && toast.info('Brands are not available select different vendor');
      }
    }
  }, [brandData, vendorId, isBrandSuccess, isBrandFetching]);

  useEffect(() => {
    if (isSubCatSuccess) {
      if (subCategories && subCategories.sub_cat && subCategories.sub_cat.length) {
        const subCategoryObject = {
          key: 'sub_category_id',
          display: 'Sub Category',
          input_type: 'S',
          options: subCategories.sub_cat,
          display_position: 4,
          clearFields: ['product_type_id'],
        };
        dispatch([ActionType.addItems, [subCategoryObject]]);
      } else {
        !isSubCatFetching &&
          categoryId !== '' &&
          toast.info('Sub categories are not available select different category');
      }
    }
  }, [subCategories, categoryId, isSubCatSuccess, isSubCatFetching]);

  useEffect(() => {
    if (isProductSuccess) {
      if (productsList && productsList.pt && productsList.pt.length) {
        const productTypes = {
          key: 'product_type_id',
          display: 'Product Type',
          input_type: 'S',
          options: productsList.pt,
          display_position: 5,
        };
        dispatch([ActionType.addItems, [productTypes]]);
      } else {
        !isProductFetching &&
          subCategoryId !== '' &&
          toast.info('Product types are not available please select different sub category');
      }
    }
  }, [productsList, subCategoryId, isProductSuccess, isProductFetching]);

  useEffect(() => {
    if (isColorsListSuccess) {
      if (colorsList && colorsList.options && colorsList.options.length) {
        dispatch([
          ActionType.addItems,
          [{ ...colorsList, key: 'color_constraints', display: 'Color *', display_position: 8 }],
        ]);
      } else {
        !isColorsListFetching &&
          attributeId === 'color_constraints' &&
          toast.info('Colors are not available try later');
      }
    }
  }, [colorsList, attributeId, isColorsListSuccess, isColorsListFetching]);

  useEffect(() => {
    if (params.id && params.group_id) {
      const response = {
        action: 'success',
        message: '',
        params: null,
        statusCode: 200,
        data: {
          id: 5,
          vendor_id: { key: 13472, value: '123', second: 123, first: 13472 },
          brand_id: { id: 14505, display: 'Si Noir' },
          category_id: { key: 373, value: 'Apparel - Children', second: 'Apparel - Children', first: 373 },
          sub_category_id: { key: 426, value: 'Bottoms', second: 'Bottoms', first: 426 },
          product_type_id: { key: 1608, value: 'Palazzos', second: 'Palazzos', first: 1608 },
          gender: { key: 'GIRL', value: 'Girl', second: 'Girl', first: 'GIRL' },
          //  constraint_key: {
          //    name:'color',
          //    group_id:2,
          //    value:[{display: 'Blue', key: 'Blue'}, {
          //     'display': 'Purple',
          //     'key': 'Purple'
          //     }]
          //  }
          constraint_key: {
            name: 'age',
            group_id: 2,
            value: [
              { from: 5, to: 8 },
              { from: 1, to: 3 },
            ],
          },
        },
      };
      const data = response.data;
      const attributeData = attributeOptions.find((attribute) => attribute.type === data.constraint_key.name);
      let attributes = {};
      const attributeKey = attributeData?.key || '';
      setVendorId(data.vendor_id.key);
      setCategoryId(data.category_id.key);
      setSubCategoryId(data.sub_category_id.key);
      setAttributeId(attributeKey);
      if (attributeData) {
        attributes = { attribute: attributeData };
      }
      setDefaultSelectedValues({
        vendor_id: data.vendor_id,
        brand_id: data.brand_id,
        category_id: data.category_id,
        sub_category_id: data.sub_category_id,
        product_type_id: data.product_type_id,
        gender: data.gender,
        [attributeKey]: data.constraint_key.value,
        ...attributes,
      });
    }
  }, [params]);

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
          postObject[ele] = data[ele]['key'] || data[ele]['id'] || data[ele];
        }
      }
    });
    const attribute = data.attribute.key;
    if (attribute) {
      const age = data.age_constraints;
      const color = data.color_constraints;
      if (attribute === 'color_constraints' && (!color || (color && color.length < 2))) {
        toast.error('Please select minimum 2 colors');
        return;
      } else if (attribute === 'age_constraints') {
        if (!age || (age && age.length < 1)) {
          toast.error('Please select minimum age constraint');
          return;
        }
      }
    } else {
      toast.error('Please select attribute');
      return;
    }
    (async () => {
      try {
        const constraint: ICreateConstraintType = await reorderService.createConstraint(postObject);
        if (constraint.action === 'success') {
          toast.success(constraint.message || 'Cluster created successfully');
          setTimeout(() => {
            window.location.reload();
          }, 8000);
          return;
        }
        showError(constraint);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onDropDownChange = (key: string, formData: Record<string, Record<string, string>>) => {
    let dataKey = formData[key]?.key || '';
    if (key === 'category_id') {
      dispatch([ActionType.removeItems, ['sub_category_id', 'product_type_id']]);
      setCategoryId(dataKey);
    } else if (key === 'sub_category_id') {
      dispatch([ActionType.removeItems, ['product_type_id']]);
      setSubCategoryId(dataKey);
    } else if (key === 'attribute') {
      const attributeKey: string = formData.attribute.key;
      attributeKey === 'color_constraints' && dispatch([ActionType.removeItems, ['age_constraints']]);
      attributeKey === 'age_constraints' && dispatch([ActionType.removeItems, ['color_constraints']]);
      setAttributeId(attributeKey);
    } else if (key === 'vendor_id') {
      dispatch([ActionType.removeItems, ['brand_id']]);
      setVendorId(dataKey);
    }
  };

  const data: ReorderFiltersObjectProps = {
    sideBar: [...dropDownsList],
    defaultSelectedValues: defaultSelectedValues,
    onSubmit: onSubmit,
    onChange: onDropDownChange,
  };

  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path="/">
          <ClusterWrapper>
            <h1>Vendor casepack setup</h1>
            {dropDownsList.length === 0 && <h5> {status} </h5>}
            {dropDownsList.length > 0 && <ReorderFiltersList {...data} />}
          </ClusterWrapper>
        </Route>
        <Route path="/edit-cluster/:id/:group_id">
          <ClusterWrapper>
            <h1>Edit vendor casepack setup</h1>
            {dropDownsList.length === 0 && <h5> {status} </h5>}
            {dropDownsList.length > 0 && <ReorderFiltersList {...data} />}
          </ClusterWrapper>
        </Route>
      </Switch>
    </>
  );
};

export default CreateCluster;
