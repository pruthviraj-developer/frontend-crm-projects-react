import React, { createContext, useState, useEffect, FC } from 'react';
import {
  IFunnelData,
  ISegmentData,
  ISortData,
  LOCAL_DATA,
  SESSION_DATA,
  useReadLocalStorage,
  useSessionStorage,
} from '../../storage';
import { ISegmentProperties, ITrackingDataProps } from './ITrackingDataContext';
export const TrackingDataContext = createContext<ITrackingDataProps>(
  {} as ITrackingDataProps
);

const getSortBarData = (sortData?: ISortData) => {
  const data = { sortbar: 'All', sortbar_group: 'All', sort_by: 'System' };
  if (sortData && sortData.sortingTiles && sortData.sortingTiles.length > 0) {
    for (let item = 0; item < sortData.sortingTiles.length; item++) {
      if (sortData.sortingTiles[item].isSelected) {
        data.sortbar_group = '';
        data.sortbar = sortData.sortingTiles[item].name;
        data.sort_by = 'User';
        if (sortData.sortingTiles[item].ageGroups) {
          for (
            let subItem = 0;
            subItem < sortData.sortingTiles[item].ageGroups.length;
            subItem++
          ) {
            if (sortData.sortingTiles[item].ageGroups[subItem].isSelected) {
              data.sortbar_group =
                sortData.sortingTiles[item].ageGroups[subItem].name;
            }
          }
        }
      }
    }
  }
  return data;
};
export const TrackingDataProvider: FC<unknown> = ({ children }) => {
  const [properties, setProperties] = useState<ISegmentProperties>();
  const [funnelData] = useSessionStorage<IFunnelData>(
    SESSION_DATA.OA_DATA,
    null
  );
  const [segmentData] = useSessionStorage<ISegmentData>(
    SESSION_DATA.SEGMENT_DATA,
    null
  );
  const screenMap = useReadLocalStorage<Record<string, string>>([
    LOCAL_DATA.SEGMENT_SCREEN_MAP,
  ]).get(LOCAL_DATA.SEGMENT_SCREEN_MAP);
  const sortbarData =
    useReadLocalStorage<ISortData>([LOCAL_DATA.SORT_DATA]).get(
      LOCAL_DATA.SORT_DATA
    ) || undefined;

  const updateProperties = ({
    from_screen,
    ...properties
  }: ISegmentProperties) => {
    setProperties((prevSate) => ({
      ...prevSate,
      ...properties,
      from_screen: from_screen != null ? screenMap?.[from_screen] : '',
    }));
  };
  useEffect(() => {
    const sortTrackingData = getSortBarData(sortbarData);
    setProperties(() => {
      return {
        funnel: funnelData?.funnel || 'DIRECT',
        funnel_tile: funnelData?.funnel_tile || '',
        funnel_section: funnelData?.funnel_section || '',
        source: funnelData?.source || '',
        section: funnelData?.section,
        subsection: funnelData?.sub_section || '',
        plp: funnelData?.plp || '',
        from_screen:
          segmentData?.from_screen != null
            ? screenMap?.[segmentData.from_screen]
            : '',
        sortbar_group: sortTrackingData.sortbar_group,
        sortbar: sortTrackingData.sortbar,
        character: 'Not applicable',
        sort_by: sortTrackingData.sort_by,
        universal: 'None',
      };
    });
  }, []);

  return (
    <TrackingDataContext.Provider
      value={{
        properties,
        updateProperties,
      }}
    >
      {children}
    </TrackingDataContext.Provider>
  );
};
