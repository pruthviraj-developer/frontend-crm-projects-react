import styled from '@emotion/styled';
import { typography, HsTextAlign, Colors, secondaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const FooterWrapper = styled.footer`
  font-size: ${typography.size.s1}px;
  line-height: 13px;
  font-weight: ${typography.weight.medium};
  background-color: ${Colors.WHITE};
  margin-top: ${typography.size.m4}px;
  border-top: 1px solid ${Colors.MERCURY};
`;

const FooterSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: ${HsTextAlign.center};
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
  font-size: 9px;
  line-height: 11px;
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

const ConnectToApps = styled.div`
  line-height: 16px;
  margin: ${typography.size.s3}px ${typography.size.s3}px 15px;
  color: ${secondaryColor[300]}px;
`;

const LinkIcons = styled('a')`
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

const PopularSearches = styled.section`
  margin: 5px ${typography.size.s3}px;
  padding: 5px;
  border-bottom: 1px solid ${Colors.MERCURY};
`;

const PopularSearchesLinks = styled.div`
  margin-top: 7px;
  margin-bottom: 7px;
  display: inline-flex;
  flex-wrap: wrap;
`;

const PopularSearchesTitle = styled.div`
  font-size: ${typography.size.s1}px;
  line-height: ${typography.size.s3}px;
`;

const PopularSearchesLink = styled('a')`
  color: ${secondaryColor[100]};
  font-size: ${typography.size.s0}px;
  font-weight: ${typography.weight.regular};
  text-decoration: none;
  line-height: ${typography.size.s3}px;
  &:after {
    content: '|';
    margin-left: 1px;
  }
  &:last-child:after {
    content: '';
  }
`;

export {
  Copyright,
  ConnectToApps,
  LinkIcons,
  DownloadIcon,
  FooterWrapper,
  FooterSection,
  FooterBlock,
  FooterBlockTitle,
  FooterLinks,
  FooterLink,
  Link,
  LinkWithIcons,
  PopularSearches,
  PopularSearchesLinks,
  PopularSearchesTitle,
  PopularSearchesLink,
  StyledIcon,
};
