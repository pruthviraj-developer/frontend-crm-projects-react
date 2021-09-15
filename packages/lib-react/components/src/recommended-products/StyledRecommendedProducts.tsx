import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const RecommendedProductsWrapper = styled.div``;

const RecommendedProductsTitle = styled.div`
  padding: 24px 0 16px 16px;
  font-size: 18px;
  font-weight: ${typography.weight.medium};
  line-height: 22px;
  border-top: 1px solid #e6e6e6;
`;

const RecommendedMatchingWrapper = styled.div`
  margin: 12px 0 56px;
  font-size: 14px;
  line-height: 20px;
`;

export {
  RecommendedProductsWrapper,
  RecommendedProductsTitle,
  RecommendedMatchingWrapper,
};
