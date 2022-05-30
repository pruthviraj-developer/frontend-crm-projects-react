import React, { FC, useEffect, useState } from 'react';
import {
  IconAngleDown,
  IconAngleRight,
  CheckBoxWhite,
  IconTickDark,
  IconTickLight,
} from '@hs/icons';

import {
  IPlpFilter1Props,
  IPlpFilter2Props,
  IPlpFilter3Props,
  IPlpFilterProps,
  IFilterSectionProps,
} from './IFilters';

import {
  Title,
  ClearAll,
  ToggleIcon,
  FilterName,
  FiltersHeader,
  FilterSelected,
  FiltersWrapper,
  FilterSection,
  FilterListTitle,
  CheckBoxWrapper,
  ColorList,
  ColorLabel,
  ColorChecked,
  ColorsWrapper,
  CheckBox,
  FilterList,
  CheckBoxIcon,
  CheckBoxLabelText,
  CheckBoxIconChecked,
  RadioButton,
  RadioButtonChecked,
  Wrapper,
  Category,
  CategoryName,
  AllCategories,
  SubCategories,
  SubCategoryName,
  BackToCategories,
  CategoriesList,
  SubCategoryNameList,
  SubCategoryFiltersList,
} from './StyledFilters';

const CATEGORY = 'Category';

export const Filters: FC<IPlpFilterProps> = ({
  filterSection,
  updateFilter,
  clearFilters,
}: IPlpFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    filterSection?.[0]?.name
  );
  const [categories, setCategories] = useState<IPlpFilter1Props | undefined>();
  const [subCategories, setSubCategories] = useState<
    IPlpFilter2Props | undefined
  >();
  const hexToRgb = (hex: string) => {
    //    Please refer to
    //    https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
    let c;
    let rgb;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      rgb = { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255 };
    }
    return rgb;
  };

  const getBrightness = (hex: string) => {
    //    Please refer to
    //    http://www.w3.org/TR/AERT#color-contrast
    const rgb = hexToRgb(hex);
    return rgb && (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 < 128;
  };

  const resetCategories = () => {
    if (categories) {
      updateFilter(categories.param, categories, false, 'clear');
    }
    setCategories(undefined);
    setSubCategories(undefined);
  };

  useEffect(() => {
    if (activeFilter === CATEGORY) {
      const categories = filterSection?.find((data) => data.name === CATEGORY);
      const selectedCategories = categories?.filterList[0].filter.find(
        (data) => data.isSelected
      );
      const selectedSubCategories = selectedCategories?.filter?.find(
        (data) => data.isSelected
      );
      if (selectedSubCategories) {
        setSubCategories(selectedSubCategories);
      }
    }
  }, [filterSection]);

  const resetToAllCategories = () => {
    return (
      <SubCategories onClick={resetCategories}>
        <BackToCategories icon={IconAngleRight} />
        <AllCategories>All Categories</AllCategories>
      </SubCategories>
    );
  };

  const getDropDownList = (
    filterObject: IFilterSectionProps,
    filter: IPlpFilter1Props[]
  ) => {
    const list = filter.map((filter: IPlpFilter1Props, subIndex: number) => {
      if (filterObject.uiType === 'tree') {
        return (
          <Wrapper key={subIndex}>
            <Category
              onClick={() => {
                setCategories(filter);
                updateFilter(filter.param, filter, false, filter.type);
              }}
            >
              <CategoryName>{filter.name}</CategoryName>
              <ToggleIcon
                className="toggleIcon"
                active={false}
                icon={IconAngleRight}
              />
            </Category>
          </Wrapper>
        );
      }
      if (filterObject.uiType === 'colour') {
        return (
          <ColorList
            key={subIndex}
            onClick={() => {
              updateFilter(filter.param, filter, filterObject.isMultiSelect);
            }}
          >
            {filter.isSelected ? (
              <ColorChecked
                bgcolor={filter.value}
                icon={
                  getBrightness(filter.value) ? IconTickLight : IconTickDark
                }
              />
            ) : (
              <ColorLabel bgcolor={filter.value}></ColorLabel>
            )}
          </ColorList>
        );
      }
      return (
        <FilterList
          key={subIndex}
          active={filter.isSelected ? true : false}
          onClick={(e) => {
            e.preventDefault();
            updateFilter(filter.param, filter, filterObject.isMultiSelect);
          }}
        >
          <CheckBoxWrapper>
            {filterObject.isMultiSelect ? (
              filter.isSelected ? (
                <CheckBoxIconChecked icon={CheckBoxWhite} />
              ) : (
                <CheckBoxIcon />
              )
            ) : filter.isSelected ? (
              <RadioButtonChecked icon={CheckBoxWhite} />
            ) : (
              <RadioButton />
            )}
            <CheckBox
              name={filter.sectionTracking}
              type={filterObject.isMultiSelect ? 'checkbox' : 'radio'}
            />
            <CheckBoxLabelText>{filter.name}</CheckBoxLabelText>
          </CheckBoxWrapper>
        </FilterList>
      );
    });

    if (filterObject.uiType === 'colour') {
      return <ColorsWrapper>{list}</ColorsWrapper>;
    }

    // subCategories

    if (activeFilter === CATEGORY && categories?.id && subCategories) {
      return (
        <>
          {resetToAllCategories()}
          <SubCategoryName onClick={resetCategories}>
            {categories?.name}
          </SubCategoryName>
          <CategoriesList>
            <SubCategoryName
              onClick={() => {
                setSubCategories(undefined);
                // updateFilter(subCategories.param, subCategories, false, subCategories.type);

                updateFilter(
                  categories.param,
                  categories,
                  false,
                  categories.type
                );
              }}
            >
              {subCategories?.name}
            </SubCategoryName>
            {subCategories?.filter?.map(
              (subCategory: IPlpFilter3Props, suCategoryIndex: number) => (
                <SubCategoryFiltersList
                  key={suCategoryIndex}
                  active={subCategory.isSelected ? true : false}
                  onClick={() => {
                    updateFilter(
                      subCategory.param,
                      subCategory as unknown as IPlpFilter2Props,
                      true
                    );
                  }}
                >
                  {subCategory.isSelected ? (
                    <CheckBoxIconChecked icon={CheckBoxWhite} />
                  ) : (
                    <CheckBoxIcon />
                  )}
                  <CheckBoxLabelText>{subCategory.name}</CheckBoxLabelText>
                </SubCategoryFiltersList>
              )
            )}
          </CategoriesList>
        </>
      );
    }

    if (activeFilter === CATEGORY && categories?.id) {
      return (
        <>
          {resetToAllCategories()}
          <SubCategoryName onClick={resetCategories}>
            {categories?.name}
          </SubCategoryName>
          <CategoriesList>
            {categories?.filter?.map(
              (category: IPlpFilter2Props, categoryIndex: number) => (
                <SubCategoryNameList
                  // onClick={() => {
                  //   setSubCategories(category);
                  //   debugger;
                  //   updateFilter(category.param, category, false, category.type);
                  // }}
                  onClick={() => {
                    // e.preventDefault();
                    setSubCategories(undefined);
                    updateFilter(
                      category.param,
                      category,
                      false,
                      category.type
                    );
                  }}
                  key={categoryIndex}
                >
                  <SubCategoryName className="subCategory">
                    {category.name}
                  </SubCategoryName>
                  <ToggleIcon
                    className="toggleIcon"
                    active={false}
                    icon={IconAngleRight}
                  />
                </SubCategoryNameList>
              )
            )}
          </CategoriesList>
        </>
      );
    }
    return list;
  };

  return (
    <FiltersWrapper>
      <FiltersHeader>
        <Title>Filters</Title>
        <ClearAll onClick={clearFilters}>Clear All</ClearAll>
      </FiltersHeader>
      {filterSection &&
        filterSection.map(
          (filterObject: IFilterSectionProps, index: number) => {
            return filterObject.shouldHide ? (
              <></>
            ) : (
              <FilterSection key={index}>
                <FilterListTitle
                  isAccordionActive={
                    activeFilter === filterObject.name ? true : false
                  }
                  onClick={() => {
                    setActiveFilter(
                      filterObject.name === activeFilter
                        ? ''
                        : filterObject.name
                    );
                  }}
                >
                  {filterObject.hasSelected &&
                  activeFilter != filterObject.name ? (
                    <FilterSelected />
                  ) : (
                    <></>
                  )}
                  <FilterName>{filterObject.name}</FilterName>
                  <ToggleIcon
                    className="toggleIcon"
                    icon={IconAngleDown}
                    active={activeFilter === filterObject.name ? true : false}
                  />
                </FilterListTitle>
                {activeFilter === filterObject.name &&
                  filterObject.filterList &&
                  filterObject.filterList[0].filter &&
                  getDropDownList(
                    filterObject,
                    filterObject.filterList[0].filter
                  )}
              </FilterSection>
            );
          }
        )}
    </FiltersWrapper>
  );
};
