import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  display: inline-block;
  margin: 0 0 8px 8px;
  position: relative;
`;

const SaleRetailPrice = styled.h3`
  margin: 8px 0 0 0;
  font-weight: ${typography.weight.regular};
  font-size: 1.4rem;
  line-height: ${typography.size.s3}px;
  text-align: center;
`;

const TransparentImgOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: #00000000;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #e6e6e6;
`;

const CarouselList = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export { CarouselList, ImageWrapper, TransparentImgOverlay, SaleRetailPrice };
