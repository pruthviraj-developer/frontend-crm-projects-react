import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const RecommendedProductsWrapper = styled.div`
  background: #f5f5f5;
`;

const RecommendedProductsTitle = styled.h2`
  padding: 24px 0 16px 16px;
  font-size: 1.8rem;
  font-weight: ${typography.weight.medium};
  line-height: 22px;
  border-top: 1px solid #e6e6e6;
  margin: 0;
`;

const RecommendedMatchingWrapper = styled.div`
  margin: 12px 0 56px;
  /* font-size: 14px; */
  line-height: 20px;
  border-bottom: 1px solid #e6e6e6;
`;

const RecommendedProductWrapper = styled.div`
  left: -12px;
  width: calc(100% + 12px);
  max-width: 100%;
  overflow-x: scroll;
`;
export {
  RecommendedProductsWrapper,
  RecommendedProductWrapper,
  RecommendedProductsTitle,
  RecommendedMatchingWrapper,
};
