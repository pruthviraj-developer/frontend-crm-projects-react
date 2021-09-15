import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const LinkTag = styled.a<{
  color: string;
  padding: string;
  margin: string;
}>`
  color: ${(props) => props.color};
  font-weight: ${typography.weight.medium};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin || `${typography.size.s3}px 0 0 0`};
  font-size: ${typography.size.s1}px;
  line-height: 1.33;
  letter-spacing: 0;
  text-decoration: none;
`;

export { LinkTag };
