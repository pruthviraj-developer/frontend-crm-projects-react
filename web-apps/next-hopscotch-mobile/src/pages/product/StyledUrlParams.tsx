import styled from '@emotion/styled';
import { typography, Colors, secondaryColor, fontWeight } from '@hs/utils';
const ProductDetailsWrapper = styled.div`
  display: block;
  min-height: 0;
  background: ${Colors.WHITE};
`;

const RecommendedProducts = styled.div``;

const RecommendedProductsTitle = styled.div`
  padding: 24px 0 16px 16px;
  font-size: 18px;
  font-weight: ${typography.weight.medium};
  line-height: 22px;
  border-top: 1px solid #e6e6e6;
`;

const RecommendedMatching = styled.div`
  margin: 12px 0 56px;
  font-size: 14px;
  line-height: 20px;
`;

const RecommendedMatchingProduct = styled.div`
  margin-bottom: 16px;
  display: block;
  font-size: 14px;
  line-height: 20px;
  padding: 0 12px;
`;

const RecommendedMatchingProductLink = styled('a')`
  color: ${secondaryColor[100]};
  text-decoration: none;
  text-transform: uppercase;
`;

export {
  ProductDetailsWrapper,
  RecommendedProducts,
  RecommendedProductsTitle,
  RecommendedMatching,
  RecommendedMatchingProduct,
  RecommendedMatchingProductLink,
};
