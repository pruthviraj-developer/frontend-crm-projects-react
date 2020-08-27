import { useState, useEffect } from 'react';
import { carouselService, List } from '@hs/services';

export const useGetList = (api: () => Promise<List>) => {
  const [list, setList] = useState<List>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const list = await api();
        setList(list);
        setLoading(false);
      } catch (error) {
        setList([]);
        setLoading(false);
      }
    })();
    return () => {
      setList([]);
      setLoading(false);
    };
  }, []);

  return [list, isLoading];
};

export const useGetCarouselList = () => {
  const [plpList, isPlpLoading] = useGetList(carouselService.getPlpList);
  const [spList, isSpLoading] = useGetList(carouselService.getSpList);
  const [boutiqueList, isBoutiqueLoading] = useGetList(
    carouselService.getBoutiqueList
  );

  const data = {
    plp: { list: plpList, isLoading: isPlpLoading },
    sp: { list: spList, isLoading: isSpLoading },
    boutique: { list: boutiqueList, isLoading: isBoutiqueLoading },
  };

  return data;
};
