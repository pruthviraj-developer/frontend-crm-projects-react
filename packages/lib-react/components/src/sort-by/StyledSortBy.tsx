import styled from '@emotion/styled';
import { typography, Colors, primaryColor, secondaryColor } from '@hs/utils';

const SortByWrapper = styled.div`
  color: ${Colors.GRAY20};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s4}px;
  padding-right: ${typography.size.s5}px;
  font-weight: ${typography.weight.regular};
`;

const SortByTitle = styled.span`
  color: ${secondaryColor[300]};
  display: inline-block;
`;

const SortingOption = styled.span`
  cursor: pointer;
  font-size: ${typography.size.s2}px;
  margin-left: ${typography.size.m3}px;
  color: ${secondaryColor[300]};
  &:hover {
    color: ${primaryColor[100]};
  }
  &.selected {
    padding-bottom: 6px;
    color: ${primaryColor[100]};
    font-weight: ${typography.weight.medium};
    border-bottom: 2px solid ${primaryColor[100]};
  }
`;

export { SortByWrapper, SortByTitle, SortingOption };
