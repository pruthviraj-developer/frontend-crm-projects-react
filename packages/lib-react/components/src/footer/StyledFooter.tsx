import styled from '@emotion/styled';
import { typography, HsTextAlign, Colors, secondaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const FooterWrapper = styled.footer`
  font-size: 1.2rem;
  line-height: 13px;
  font-weight: ${typography.weight.medium};
  background-color: ${Colors.WHITE};
  margin-top: ${typography.size.m4}px;
  margin-bottom: 90px;
  border-top: 1px solid ${Colors.MERCURY};
`;

const FooterSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: ${HsTextAlign.center};
  > div {
    flex: 50%;
    box-sizing: border-box;
  }
`;

const FooterBlock = styled.div`
  border-right: 1px solid ${Colors.GRAY50};
  border-bottom: 1px solid ${Colors.GRAY50};
`;

const FooterLinks = styled.ul`
  margin: 0;
  list-style: none;
  padding: ${typography.size.s3}px 0 4px 0;
  text-align: center;
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
  font-size: 0.9rem;
  line-height: 11px;
  padding-bottom: ${typography.size.s3}px;
  text-align: ${HsTextAlign.center};
`;

const StyledIcon = styled(SvgIcon)`
  margin: 0 5px;
  fill: ${Colors.WHITE};
  max-width: ${typography.size.s3}px;
`;

const FooterBlockTitle = styled.h5`
  margin: 19px 0 0 0;
  font-weight: ${typography.weight.medium};
`;

const ConnectToApps = styled.div`
  line-height: 16px;
  margin: ${typography.size.s1}px auto;
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
  fill: ${Colors.WHITE};
  max-width: ${typography.size.s3}px;
`;

// const PopularSearches = styled.section`
//   margin: 5px ${typography.size.s3}px;
//   padding: 5px;
//   border-bottom: 1px solid ${Colors.MERCURY};
// `;

// const PopularSearchesLinks = styled.div`
//   margin-top: 7px;
//   margin-bottom: 7px;
//   display: inline-flex;
//   flex-wrap: wrap;
// `;

// const PopularSearchesTitle = styled.div`
//   font-size: 1.2rem;
//   line-height: ${typography.size.s3}px;
// `;

// const PopularSearchesLink = styled('a')`
//   color: ${secondaryColor[100]};
//   font-size: 1rem;
//   font-weight: ${typography.weight.regular};
//   text-decoration: none;
//   line-height: ${typography.size.s3}px;
//   &:after {
//     content: '|';
//     margin-left: 1px;
//   }
//   &:last-child:after {
//     content: '';
//   }
// `;

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
  // PopularSearches,
  // PopularSearchesLinks,
  // PopularSearchesTitle,
  // PopularSearchesLink,
  StyledIcon,
};
