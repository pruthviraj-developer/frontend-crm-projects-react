import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';

const RecommendedMatchingWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 24px;
  letter-spacing: 0.2px;
  background-color: #fff;
  border: 1px solid #dfe1e6;
  text-transform: uppercase;
  &:hover {
    background: #dfe1e65c;
  }
`;

const SvgIconsElement = styled(SvgIcon)``;

export { RecommendedMatchingWrapper, SvgIconsElement };
