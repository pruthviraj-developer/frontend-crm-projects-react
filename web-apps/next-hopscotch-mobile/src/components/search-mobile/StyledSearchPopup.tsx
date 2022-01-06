import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';

const SearchPopupWrapper = styled.div`
  font-size: ${typography.size.s1}px;
  line-height: ${typography.size.s2}px;
  font-weight: ${typography.weight.regular};
  background-color: ${Colors.WHITE};
  min-height: 100%;
`;

export { SearchPopupWrapper };
