import { IRecommendedProps } from './IUseRecommendation';

export const useRecommendation = ({
  recommended,
  showmatching,
  id,
  pid,
  section,
}: IRecommendedProps) => {
  const canShow = !!(
    recommended?.recommendProductDetailList &&
    recommended?.recommendProductDetailList?.length > 6
  );
  return {
    section,
    subsection: 'Carousel',
    id,
    pid,
    showmatching,
    products: recommended?.recommendProductDetailList,
    matching: recommended?.recommendMatchingDetailList,
    title: recommended?.recommendationTitle || '',
    canShow,
  };
};
