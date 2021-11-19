import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const LinkTag = styled.a<{
  color: string;
  display: string;
  padding: string;
  margin: string;
  fontweight: string;
  fontSize: string;
  lineHeight: string;
  hoverColor?: string;
}>`
  color: ${(props) => props.color};
  display: ${(props) => props.display};
  font-weight: ${typography.weight.medium};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin || `${typography.size.s3}px 0 0 0`};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  letter-spacing: 0;
  text-decoration: none;
  font-weight: ${(props) => props.fontweight};
  &:hover {
    color: ${(props) => props.hoverColor || props.color};
  }
`;

export { LinkTag };
