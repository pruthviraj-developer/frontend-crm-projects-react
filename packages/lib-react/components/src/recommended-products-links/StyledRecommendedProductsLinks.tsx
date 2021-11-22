import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const RecommendedProductsLinksWrapper = styled.div<{
  isProductSoldOut?: boolean;
}>`
  margin: 8px 0 ${(props) => (props.isProductSoldOut ? 16 : 8)}px 0;
  /* font-size: ${typography.size.s2}px; */
  line-height: ${typography.size.s5}px;
  color: rgba(0, 0, 0, 0.8);
  padding: 0 ${typography.size.s3}px;
  font-weight: ${typography.weight.regular};
  & .see-similiar-link {
    text-decoration: underline;
    color: rgba(0, 0, 0, 0.56);
  }
`;
export { RecommendedProductsLinksWrapper };
