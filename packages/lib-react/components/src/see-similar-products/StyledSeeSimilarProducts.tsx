import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';

const SeeSimilarProductsWrapper = styled.div`
  font-size: 1.4rem;
  line-height: ${typography.size.s3}px;
  padding: 0 ${typography.size.s3}px ${typography.size.s3}px;
`;

const SizeSoldOut = styled.span`
  opacity: 0.8;
  color: ${Colors.BLACK};
  font-weight: ${typography.weight.regular};
`;

const SeeSimilar = styled.span`
  color: rgba(0, 0, 0, 0.56);
  text-decoration: underline;
  font-weight: ${typography.weight.regular};
  padding-left: ${typography.size.s03}px;
`;

export { SeeSimilarProductsWrapper, SeeSimilar, SizeSoldOut };
