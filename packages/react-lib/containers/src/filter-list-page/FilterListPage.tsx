import React, { FC , useState, useEffect } from 'react';
import { HsChips } from '@hs/components';
import { HsFilters } from '@hs/components';
import { FiltersListPageProps, IHsFiltersList } from './IFilterListPage';
import { Button } from '@material-ui/core';

export const FilterListPage: FC<FiltersListPageProps> = ({sideBar}: FiltersListPageProps) => {
  const [filters,setFilters] = useState<any>({});
  const [objectsList,setObjectsList] = useState<any>({objectsList:[]});
  const [sideBarState,setSideBarState] = useState<any>({});
  useEffect(() => {
    const objectsList:any = [];
    const keys = Object.keys(filters);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      objectsList.push({ key : element, options : filters[element]});
    }
    setObjectsList({objectsList});
  }, [filters])

  const updateFilters = (data:any) => {
    setFilters(data);
  };

  const updateRemovedFilters = (filters:any) => {
    const data:any = {}
    for (let index = 0; index < filters.length; index++) {
      const element = filters[index];
      if(element.options.length ){
        data[element.key] = element.options
      }
      setFilters(data);
    }
  };

  const data: IHsFiltersList = {
    sideBar,
    sideBarState,
    updateFilters,
    defaultSelectedValues: {},
  };

  const chipsData = {
    objectsList:[...objectsList.objectsList],
    updateRemovedFilters
  };

  return (
    <div>
      <Button onClick={()=>{
        setSideBarState({right:true});
      }}>Show Panel</Button>
      <HsChips  {...chipsData} />
      <HsFilters {...data}/>
    </div>
  );
};
