import styled from '@emotion/styled';
import { mediaQueries } from '@hs/utils';
export const ListItemWrapper = styled.div`
  width: 50%;
  ${mediaQueries('xl')`
    width: 33.33333%;
  `};
`;
