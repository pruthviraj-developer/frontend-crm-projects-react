import styled from '@emotion/styled';
import { typography, HsTextAlign, Colors, secondaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const FooterWrapper = styled.footer`
  font-size: ${typography.size.s1}px;
  line-height: 13px;
  font-weight: ${typography.weight.medium};
  text-align: ${HsTextAlign.center};
  background-color: ${Colors.WHITE};
`;

const FooterSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  > div {
    flex: 50%;
  }
`;

const FooterBlock = styled.div`
  border-right: 1px solid ${Colors.GRAY50};
  border-bottom: 1px solid ${Colors.GRAY50};
`;

const FooterLinks = styled.ul`
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: ${typography.size.s3}px 0 4px 0;
`;

const FooterLink = styled.li``;

const Link = styled('a')`
  color: ${Colors.DARKGRAY};
  text-decoration: none;
`;

const LinkWithIcons = styled('a')`
  color: ${Colors.GRAY20};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  height: 48px;
`;

const Copyright = styled.div`
  color: ${Colors.DARKGRAY};
  font-weight: ${typography.weight.regular};
  padding-bottom: ${typography.size.s3}px;
  text-align: ${HsTextAlign.center};
`;

const StyledIcon = styled(SvgIcon)`
  margin: 0 5px;
  fill: white;
  max-width: ${typography.size.s3}px;
`;

const FooterBlockTitle = styled.h5`
  margin: 19px 0 0 0;
  font-weight: ${typography.weight.medium};
`;

const DownloadApps = styled.div`
  line-height: 16px;
  margin: 10px 10px 15px;
  color: ${secondaryColor[300]}px;
`;

const DownloadIcons = styled('a')`
  border: 1px solid ${Colors.MERCURY};
  border-radius: 14px;
  padding: 0;
  margin: 0 4px;
  display: inline-block;
  height: ${typography.size.m3}px;
`;

const DownloadIcon = styled(SvgIcon)`
  margin: 0 5px;
  fill: white;
  max-width: ${typography.size.s3}px;
`;
export {
  Copyright,
  DownloadApps,
  DownloadIcons,
  DownloadIcon,
  FooterWrapper,
  FooterSection,
  FooterBlock,
  FooterBlockTitle,
  FooterLinks,
  FooterLink,
  Link,
  LinkWithIcons,
  StyledIcon,
};
