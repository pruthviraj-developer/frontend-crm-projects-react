import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
const ProductDetailsWrapper = styled.div`
  display: block;
  min-height: 0;
  background: ${Colors.WHITE};
`;
const RecommendedProductWrapper = styled.div`
  left: -12px;
  width: calc(100% + 12px);
  max-width: 100%;
  overflow-x: scroll;
`;

export { ProductDetailsWrapper, RecommendedProductWrapper };
