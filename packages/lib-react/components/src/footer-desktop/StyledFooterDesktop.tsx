import styled from '@emotion/styled';
import { typography, Colors, secondaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const FooterWrapper = styled.footer`
  background-color: ${Colors.WHITE};
  border-top: 1px solid ${Colors.MERCURY};
  margin-top: 68px;
`;

const FooterSection = styled.section`
  display: flex;
  > div {
    flex: 25%;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: center;
  }
`;

const FooterBlock = styled.div`
  height: 168px;
  &:hover {
    background: #f9f9f9;
  }
  &:hover a {
    color: #ed54a4;
  }
`;

const FooterLinks = styled.ul`
  margin: 0;
  padding: ${typography.size.s3}px 0;
  font-weight: 500;
`;

const FooterLink = styled.li`
  display: inline-block;
  &:before {
    content: '\\00b7';
    padding: 0 8px;
  }
  &:first-of-type:before {
    display: none;
  }
`;

const Link = styled('a')`
  color: ${Colors.DARKGRAY};
  text-decoration: none;
`;

const Copyright = styled.div`
  color: ${Colors.DARKGRAY};
  font-weight: ${typography.weight.regular};
  font-size: 12px;
  line-height: 11px;
`;

const StyledIcon = styled(SvgIcon)`
  max-width: ${typography.size.s24}px;
`;

const FooterLogoIcon = styled(SvgIcon)`
  max-width: 100%;
`;

const FooterLogoIconWrapper = styled.div`
  margin-right: 16px;
  display: inline-block;
  vertical-align: sub;
`;

const FooterBlockTitle = styled.h5`
  margin: 10px 0 0 0;
  font-weight: ${typography.weight.medium};
`;

const ConnectToApps = styled.div`
  line-height: 16px;
  margin: 8px 0 0 0;
  color: ${secondaryColor[300]};
`;

const LinkIcons = styled('a')`
  padding: 0;
  margin: 0 4px;
  display: inline-block;
`;

const DownloadIcon = styled(SvgIcon)`
  margin: 0 5px;
  max-width: ${typography.size.s24}px;
`;

const PopularSearches = styled.section`
  margin: 10px 40px;
  padding: 5px;
  border-bottom: 1px solid ${Colors.MERCURY};
`;

const PopularSearchesLinks = styled.div`
  margin: 15px auto;
  display: inline-flex;
  flex-wrap: wrap;
`;

const PopularSearchesTitle = styled.div`
  color: ${Colors.GRAY20};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
`;

const PopularSearchesLink = styled('a')`
  color: ${secondaryColor[100]};
  font-size: ${typography.size.s15}px;
  font-weight: ${typography.weight.regular};
  text-decoration: none;
  line-height: 23px;
  cursor: pointer;
  padding: 0 1px;
  &:after {
    content: '|';
    margin-left: 3px;
  }
  &:last-child:after {
    content: '';
  }
`;

const FooterEnd = styled.div`
  padding: 4px 36px;
  font-size: 12px;
  line-height: 13px;
  font-weight: 600;
  border-top: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
`;

export {
  Copyright,
  ConnectToApps,
  LinkIcons,
  DownloadIcon,
  FooterEnd,
  FooterLogoIcon,
  FooterLogoIconWrapper,
  FooterWrapper,
  FooterSection,
  FooterBlock,
  FooterBlockTitle,
  FooterLinks,
  FooterLink,
  Link,
  PopularSearches,
  PopularSearchesLinks,
  PopularSearchesTitle,
  PopularSearchesLink,
  StyledIcon,
};
