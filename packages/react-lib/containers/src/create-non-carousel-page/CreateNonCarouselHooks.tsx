/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect } from 'react';
import { carouselService, List, SortList } from '@hs/services';

export const useGetList = <ListType extends {}>(
  api: () => Promise<ListType>
) => {
  const [list, setList] = useState<ListType>(([] as unknown) as ListType);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const list = await api();
        setList(list);
        setLoading(false);
      } catch (error) {
        setList(([] as unknown) as ListType);
        setLoading(false);
      }
    })();
    return () => {
      setList(([] as unknown) as ListType);
      setLoading(false);
    };
  }, []);

  return [list, isLoading];
};

export const useGetCarouselList = () => {
  const [plpList, isPlpLoading] = useGetList<List>(carouselService.getPlpList);
  const [spList, isSpLoading] = useGetList<List>(carouselService.getSpList);
  const [boutiqueList, isBoutiqueLoading] = useGetList<List>(
    carouselService.getBoutiqueList
  );
  const [sortList, isSortListLoading] = useGetList<SortList>(
    carouselService.getSortList
  );

  const data = {
    plp: { list: plpList, isLoading: isPlpLoading },
    sp: { list: spList, isLoading: isSpLoading },
    boutique: { list: boutiqueList, isLoading: isBoutiqueLoading },
    sortList: { list: sortList, isLoading: isSortListLoading },
  };

  return data;
};
