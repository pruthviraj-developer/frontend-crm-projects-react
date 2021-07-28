import styled from '@emotion/styled';
import { typography, HsTextAlign, Colors } from '@hs/utils';

const FooterWrapper = styled.footer`
  font-size: ${typography.size.s1}px;
  line-height: 13px;
  font-weight: ${typography.weight.medium};
  text-align: ${HsTextAlign.center};
`;

const FooterElements = styled.ul`
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: ${typography.size.s3}px 0 4px 0;
`;

const FooterElement = styled.li``;

const Link = styled('a')`
  color: ${Colors.DARKGRAY};
  text-decoration: none;
`;

const Copyright = styled.div`
  color: ${Colors.DARKGRAY};
  font-weight: ${typography.weight.regular};
  padding-bottom: ${typography.size.s3}px;
  text-align: ${HsTextAlign.center};
`;

export { Copyright, FooterWrapper, FooterElements, FooterElement, Link };
