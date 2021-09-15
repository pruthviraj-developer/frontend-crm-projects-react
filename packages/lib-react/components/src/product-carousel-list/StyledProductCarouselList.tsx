import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const CarouselListWrapper = styled.div`
  overflow-x: scroll;
  padding-bottom: 15px;
  white-space: nowrap;
  transition: margin-left 1.5s ease;
  display: inline-block;
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  display: inline-block;
  margin: 0 0 8px 8px;
`;

const SaleRetailPrice = styled.h3`
  margin: 8px 0 0 0;
  font-weight: ${typography.weight.regular};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  text-align: center;
`;

export { CarouselListWrapper, ImageWrapper, SaleRetailPrice };
