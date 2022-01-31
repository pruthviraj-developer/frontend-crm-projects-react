import styled from '@emotion/styled';
import { Colors, mediaQueries } from '@hs/utils';
export const ProductWrapper = styled.div`
  display: flex;
  margin: auto;
  max-width: 1400px;
  /* ${mediaQueries('lg')`
    margin: auto;
  `};
  ${mediaQueries('xl')`
    margin: auto 20px;
  `}; */
`;
export const ProductDetailsWrapper = styled.div`
  background: ${Colors.WHITE};
  width: 100%;
  min-height: 586.5px;
  border-left: 1px solid #e6e6e6;
  padding: 8px 24px 24px;
  display: block;
  width: 41.66667%;
  ${mediaQueries('lg')`
   width: 41.66667%;
  `};
  ${mediaQueries('xl')`
   width: 33.33333%;
  `};
`;
