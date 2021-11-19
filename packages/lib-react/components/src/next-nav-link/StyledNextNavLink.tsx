import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const LinkTag = styled.a<{
  color: string;
  display: string;
  padding: string;
  margin: string;
  fontweight: string;
  fontsize: string;
}>`
  color: ${(props) => props.color};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin || `${typography.size.s3}px 0 0 0`};
  font-size: ${(props) => props.fontsize};
  line-height: 16px;
  letter-spacing: 0;
  text-decoration: none;
  font-weight: ${(props) => props.fontweight};
`;

export { LinkTag };
