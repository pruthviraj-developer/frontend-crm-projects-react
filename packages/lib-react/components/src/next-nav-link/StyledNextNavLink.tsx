import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';

const LinkTag = styled.a`
  color: ${Colors.WHITE};
  font-weight: ${typography.weight.medium};
  float: left;
  padding: 8px 6px;
  margin-top: 16px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: 0;
  text-decoration: none;
`;

export { LinkTag };
