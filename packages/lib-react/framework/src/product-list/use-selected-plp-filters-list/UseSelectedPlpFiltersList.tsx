import { IPlpFilter1Props, IPlpFilter2Props } from '../../types';
import { useState } from 'react';
export const useSelectedPlpFiltersList = (queryParams: unknown) => {
  const [selectedFilters, updateSelectedFilters] = useState<
    Record<string, string | number | boolean | undefined>
  >(
    queryParams as unknown as Record<
      string,
      string | number | boolean | undefined
    >
  );

  const updateValues = (
    data: Record<string, string | number | boolean | undefined>
  ) => {
    Object.keys(data).forEach(
      (key) => data[key] === undefined && delete data[key]
    );
    updateSelectedFilters(data);
  };

  const setSelectedPlpFiltersList = (
    selectedPlpFilters: Record<string, string | number | boolean | undefined>,
    additionalFilters: Record<string, string | number | boolean | undefined>,
    key?: string,
    data?: IPlpFilter1Props | IPlpFilter2Props,
    isMultiSelect?: boolean,
    type?: string
  ) => {
    if (key === 'update') {
      updateValues({ ...selectedPlpFilters, ...additionalFilters });
    } else if (key) {
      const id = data?.id as string;
      const selectedValues = selectedPlpFilters[key];
      const filters: Record<string, string | number | boolean | undefined> = {
        ...selectedFilters,
        ...selectedPlpFilters,
        ...additionalFilters,
      };
      if (type === 'level1') {
        const levels = data?.filter as unknown as IPlpFilter1Props[];
        const level2 = levels?.[0].param;
        const level3 = levels?.[0]?.filter?.[0]?.param as string;
        updateValues({
          ...filters,
          [key]: id,
          [level2]: undefined,
          [level3]: undefined,
        });
        return;
      } else if (type === 'level2') {
        const levels = data?.filter;
        const level3 = levels?.[0].param as string;
        updateValues({ ...filters, [key]: id, [level3]: undefined });
        return;
      } else if (type === 'clear') {
        const levels = data?.filter as unknown as IPlpFilter1Props[];
        updateValues({
          ...filters,
          [key]: undefined,
          [levels?.[0].param]: undefined,
          [levels?.[0]?.filter?.[0]?.param as string]: undefined,
        });
        return;
      }
      if (selectedValues) {
        if (isMultiSelect) {
          const values = (selectedValues as string).split(',');
          const currentSelectedValueIndex: number = values.indexOf(id);
          if (currentSelectedValueIndex > -1) {
            values.splice(currentSelectedValueIndex, 1);
          } else {
            values.push(id);
          }
          updateValues({
            ...filters,
            [key]: values.length > 1 ? values.join(',') : values[0],
          });
        } else {
          if (data?.param) {
            if (filters[data.param] === data?.id) {
              delete filters[data.param];
            } else {
              filters[data.param] = data?.id;
            }
          }
          updateValues(filters);
        }
      } else {
        updateValues({ ...filters, [key]: id });
      }
    } else {
      updateValues(additionalFilters);
    }
  };
  return {
    selectedFilters,
    setSelectedPlpFiltersList,
  };
};
