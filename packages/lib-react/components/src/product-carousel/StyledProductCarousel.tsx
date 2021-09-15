import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const CarouselWrapper = styled.div`
  margin: ${typography.size.s3}px auto;
  overflow-x: scroll;
  padding-bottom: 15px;
  white-space: nowrap;
  transition: margin-left 1.5s ease;
`;

export { CarouselWrapper };
