import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';

const PlpHeaderWrapper = styled.div`
  width: 100%;
  padding: ${typography.size.s24}px ${typography.size.s24}px 0;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: ${Colors.GRAY20};
  font-size: ${typography.size.s24}px;
  line-height: ${typography.size.l1}px;
  font-weight: ${typography.weight.regular};
`;
export { PlpHeaderWrapper, Title };
