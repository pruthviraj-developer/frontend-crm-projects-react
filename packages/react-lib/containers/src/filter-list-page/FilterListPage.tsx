import React, { FC, useState, useEffect } from 'react';
import { HsChips } from '@hs/components';
import { HsFilters } from '@hs/components';
import { FiltersListPageProps, IHsFiltersList } from './IFilterListPage';
// import { Button } from '@material-ui/core';

export const FilterListPage: FC<FiltersListPageProps> = ({
  sideBar,
  toggleSideBar,
  updateFiltersList,
  updatedFilter,
}: FiltersListPageProps) => {
  const [filters, setFilters] = useState<any>({});
  const [objectsList, setObjectsList] = useState<any>({ objectsList: [] });
  const [sideBarState, setSideBarState] = useState<any>(toggleSideBar);
  useEffect(() => {
    const objectsList: any = [];
    const keys = Object.keys(filters);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      objectsList.push({ key: element, options: filters[element] });
    }
    setObjectsList({ objectsList });
  }, [filters]);

  useEffect(() => {
    setSideBarState(toggleSideBar);
  }, [toggleSideBar]);

  const updateFilters = (data: any) => {
    setFilters(data);
    updateFiltersList(data);
  };

  const updateFilter = (key: any, values: any) => {
    updatedFilter(key, values);
  };
  const updateRemovedFilters = (filters: any) => {
    const data: any = {};
    for (let index = 0; index < filters.length; index++) {
      const element = filters[index];
      if (element.options.length) {
        data[element.key] = element.options;
      }
    }
    if (!data.category_id) {
      delete data.sub_cat;
      delete data.pt;
    } else if (!data.sub_cat) {
      delete data.pt;
    }
    setFilters(data);
    updateFiltersList(data);
  };

  const data: IHsFiltersList = {
    sideBar,
    sideBarState,
    updateFilters,
    updateFilter,
    defaultSelectedValues: {},
  };

  const chipsData = {
    objectsList: [...objectsList.objectsList],
    updateRemovedFilters,
  };

  return (
    <div>
      <HsChips {...chipsData} />
      <HsFilters {...data} />
    </div>
  );
};
