import { useReadLocalStorage } from '../..';
export const useSelectedSort = () => {
  let sortingTilesList: any = [];
  let sortingTitle;
  const sortedFiltersData: any = useReadLocalStorage(['sortData']);
  const sortData = sortedFiltersData.get('sortData');
  if (sortData && sortData.expiry > new Date().getTime()) {
    sortingTilesList = sortData.sortingTiles;
  }

  if (sortingTilesList && sortingTilesList.length) {
    for (let item = 0; item < sortingTilesList.length; item++) {
      if (sortingTilesList[item].isSelected) {
        const name = sortingTilesList[item].name;
        const ageGroups = sortingTilesList[item].ageGroups;
        sortingTitle = name;
        if (ageGroups) {
          for (let subItem = 0; subItem < ageGroups.length; subItem++) {
            if (ageGroups[subItem].isSelected) {
              sortingTitle = ageGroups[subItem].displayName;
            }
          }
        }
      }
    }
  }
  return sortingTitle;
};
