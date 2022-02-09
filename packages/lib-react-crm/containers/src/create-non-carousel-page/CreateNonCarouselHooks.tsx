/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect } from 'react';
import { carouselService, List, SortList } from '@hs/services';

export const useGetList = <ListType extends {}>(
  api: () => Promise<ListType>
) => {
  const [list, setList] = useState<ListType>([] as unknown as ListType);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const list = await api();
        setList(list);
        setLoading(false);
      } catch (error) {
        setList([] as unknown as ListType);
        setLoading(false);
      }
    })();
    return () => {
      setList([] as unknown as ListType);
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
  const userTypeList = [
    { id: 'GU', name: 'Guest User' },
    { id: 'RB', name: 'Repeat Buyer' },
    { id: 'NB', name: 'New Buyer' },
    { id: 'PU', name: 'Power Buyer' },
    { id: 'GUNB', name: 'Guest User New Buyer' },
    { id: 'GURB', name: 'Guest User Repeat Buyer' },
    { id: 'SPU', name: 'Super Power User' },
    { id: 'GUPU', name: 'Guest User Power User' },
  ];

  const data = {
    plp: { list: plpList, isLoading: isPlpLoading },
    sp: { list: spList, isLoading: isSpLoading },
    boutique: { list: boutiqueList, isLoading: isBoutiqueLoading },
    sortList: { list: sortList, isLoading: isSortListLoading },
    userTypeList: { list: userTypeList, isLoading: false },
  };

  return data;
};
