import React, { FC, useState } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import { RangeSlider } from '../range-slider';
import { IconAngleDown, CheckBoxWhite } from '@hs/icons';

import {
  IPlpFilter1Props,
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
  //CheckBox,
  FilterList,
  CheckBoxIcon,
  CheckBoxLabelText,
  CheckBoxIconChecked,
  RadioButton,
  RadioButtonChecked,
  PstGenderList,
  PstGenderWrapper,
  RangeSliderWrapper,
} from './StyledFilters';

export const Filters: FC<IPlpFilterProps> = ({
  filterSection,
  clearFilters,
  //updateFilter,
  selectedList = [],
  handleSelectedList,
}: IPlpFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    filterSection?.[0]?.name
  );

  //const [filterData, setFilterData] = useState<any>();
  let selectedListData = {};

  selectedList.map((list: any) => {
    selectedListData = { ...selectedListData, [list.key]: list.param };
  });

  const getSelectedPriceFilter = () => {
    if (selectedListData['priceRangeFilter']) {
      return selectedListData['priceRangeFilter'].split('~').map(Number);
    }
    return null;
  };

  const handleChange = (key, filter, isMultiSelect) => {
    if (selectedListData[key]) {
      if (!isMultiSelect) {
        selectedListData[key] = filter.name;
      } else {
        const list = selectedListData[key].split(',');
        const index = list.indexOf(filter.name);
        if (index !== -1) {
          list.splice(index, 1);
        } else {
          list.push(filter.name);
        }
        selectedListData[key] = list.join(',');
      }
    } else {
      selectedListData = { ...selectedListData, [key]: filter.name };
    }
    handleSelectedList && handleSelectedList({ ...selectedListData });
  };

  const updateRangeFilter = (data, priceRangefilter) => {
    const updatePriceRange = `${data[0]}~${data[1]}`;
    const rangeFilter = {
      ...priceRangefilter,
      id: updatePriceRange,
      name: updatePriceRange,
    };
    handleChange(priceRangefilter.param, rangeFilter, false);
  };

  const getDropDownList = (
    filterObject: IFilterSectionProps,
    filter: IPlpFilter1Props[]
  ) => {
    const list = filter.map((filter: IPlpFilter1Props, subIndex: number) => {
      if (filterObject.uiType === 'pstGenderType') {
        return (
          <PstGenderList
            active={filter.isSelected ? true : false}
            key={subIndex}
            onClick={() => {
              handleChange(filter.param, filter, filterObject.isMultiSelect);
            }}
          >
            {filter.isSelected && (
              <DoneIcon
                key={subIndex}
                style={{ marginRight: '5px', verticalAlign: 'bottom' }}
              />
            )}
            {filter.name}
          </PstGenderList>
        );
      } else if (filterObject.uiType === 'priceRange') {
        const rangeList = filter.id.split('~');
        const updateRangeList = getSelectedPriceFilter();
        const min = +rangeList[0];
        const max = +rangeList[1];
        return (
          <RangeSliderWrapper>
            <RangeSlider
              min={min}
              max={max}
              key={`${updateRangeList}${max}`}
              value={updateRangeList || [min, max]}
              updateRange={(data) => updateRangeFilter(data, filter)}
            />
          </RangeSliderWrapper>
        );
      }
      return (
        <FilterList
          key={subIndex}
          active={filter.isSelected ? true : false}
          onClick={(e) => {
            e.preventDefault();
            // updateFilter &&
            //   updateFilter(filter.param, filter, filterObject.isMultiSelect);
            handleChange(filter.param, filter, filterObject.isMultiSelect);
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
            {/* <CheckBox
              name={filter.sectionTracking}
              type={filterObject.isMultiSelect ? 'checkbox' : 'radio'}
            /> */}
            <CheckBoxLabelText>{filter.name}</CheckBoxLabelText>
          </CheckBoxWrapper>
        </FilterList>
      );
    });

    if (filterObject.uiType === 'pstGenderType') {
      return <PstGenderWrapper key="pstGenderType">{list}</PstGenderWrapper>;
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
            return filterObject.shouldHide || filterObject.uiType === 'MSKU' ? (
              <></>
            ) : (
              <FilterSection key={index}>
                <FilterListTitle
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
