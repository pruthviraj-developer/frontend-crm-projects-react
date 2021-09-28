import styled from '@emotion/styled';
//import { typography } from '@hs/utils';

const CarouselWrapper = styled.div`
  overflow-x: scroll;
  padding-bottom: 15px;
  white-space: nowrap;
  transition: margin-left 1.5s ease;
  position: relative;
`;

const ProductImageContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  top: 56px;
`;

export { CarouselWrapper, ProductImageContainer };
