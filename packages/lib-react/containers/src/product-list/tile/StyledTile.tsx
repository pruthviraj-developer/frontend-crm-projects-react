import styled from '@emotion/styled';
import { Colors, mediaQueries } from '@hs/utils';

const TileWrapper = styled.div`
  width: 50%;
  cursor: pointer;
  position: relative;
  background-color: ${Colors.WHITE};
  border-right: 1px solid ${Colors.MERCURY};
  border-bottom: 1px solid ${Colors.MERCURY};
  &:hover {
    box-shadow: 0px 4px 20px 0px #e1e1e1;
    mix-blend-mode: multiply;
  }
  ${mediaQueries('xl')`
    width: 33.33333%;
  `};
`;

const ImageContainer = styled.div`
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  position: relative;
`;

export { TileWrapper, ImageContainer };
