import React, { FC } from 'react';
// import { IPopularSearchUrlDeskTopProps } from './IFooterDesktop';
import {
  AppleIcon,
  PlayIcon,
  MailIcon,
  InfoIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  PIntrestIcon,
  HsDarkIcon,
  HsLogoPink,
  ThumbsupIcon,
} from '@hs/icons';
import {
  Copyright,
  ConnectToApps,
  LinkIcons,
  DownloadIcon,
  FooterWrapper,
  FooterSection,
  FooterBlockTitle,
  FooterLinks,
  FooterLink,
  Link,
  FooterBlock,
  FooterEnd,
  FooterLogoIcon,
  FooterLogoIconWrapper,
  // PopularSearches,
  // PopularSearchesTitle,
  // PopularSearchesLinks,
  // PopularSearchesLink,
  StyledIcon,
} from './StyledFooterDesktop';
import { NextNavLink } from '../../next-nav-link';

// import { POPULAR_SEARCH_URLS } from '@hs/utils';

export const FooterDesktop: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      {/* <PopularSearches>
        <PopularSearchesTitle>Popular Searches</PopularSearchesTitle>
        <PopularSearchesLinks>
          {POPULAR_SEARCH_URLS.map(
            (data: IPopularSearchUrlDeskTopProps, index: number) => (
              <PopularSearchesLink key={index} href={data.link}>
                {data.displayName}
              </PopularSearchesLink>
            )
          )}
        </PopularSearchesLinks>
      </PopularSearches> */}
      <FooterSection>
        <FooterBlock>
          <StyledIcon icon={InfoIcon}></StyledIcon>
          <FooterBlockTitle>Need help?</FooterBlockTitle>
          <NextNavLink
            href="/help"
            name="View our knowledge centre"
            margin="8px 0 0 0"
            padding="0"
            fontWeight="400"
            fontSize="12px"
            lineHeight="16px"
            color="#777777"
            hoverColor="#ed54a4"
          />
        </FooterBlock>
        <FooterBlock>
          <StyledIcon icon={MailIcon}></StyledIcon>
          <FooterBlockTitle>24x7 support</FooterBlockTitle>
          <NextNavLink
            href="mailto:wecare@hopscotch.in"
            name="wecare@hopscotch.in"
            margin="8px 0 0 0"
            padding="0"
            fontWeight="400"
            fontSize="12px"
            lineHeight="16px"
            color="#777777"
            hoverColor="#ed54a4"
          />
        </FooterBlock>
        <FooterBlock>
          <StyledIcon icon={HsDarkIcon}></StyledIcon>
          <FooterBlockTitle>Download our apps</FooterBlockTitle>
          <ConnectToApps>
            <LinkIcons
              href="https://itunes.apple.com/in/app/hopscotch-find-something-new/id945949424"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon icon={AppleIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://play.google.com/store/apps/details?id=in.hopscotch.android"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon icon={PlayIcon}></DownloadIcon>
            </LinkIcons>
          </ConnectToApps>
        </FooterBlock>
        <FooterBlock>
          <StyledIcon icon={ThumbsupIcon}></StyledIcon>
          <FooterBlockTitle>Connect with us</FooterBlockTitle>
          <ConnectToApps>
            <LinkIcons
              href="https://www.facebook.com/Hopscotch.India"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon icon={FacebookIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://twitter.com/Hopscotchindia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon icon={TwitterIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://www.instagram.com/hopscotch.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon icon={InstagramIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://www.pinterest.com/hopscotchindia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon icon={PIntrestIcon}></DownloadIcon>
            </LinkIcons>
          </ConnectToApps>
        </FooterBlock>
      </FooterSection>
      <FooterEnd>
        <FooterLinks>
          <Link href="/">
            <FooterLogoIconWrapper>
              <FooterLogoIcon icon={HsLogoPink}></FooterLogoIcon>
            </FooterLogoIconWrapper>
          </Link>
          <FooterLink>
            <NextNavLink
              href="/about/AboutUs"
              name="About Us"
              margin="0px 0 0 0"
              padding="0"
              fontWeight="600"
              fontSize="12px"
              lineHeight="13px"
              color="#a4a4a4"
              hoverColor="#ed54a4"
            />
          </FooterLink>
          <FooterLink>
            <NextNavLink
              href="/about/Terms"
              name="Terms of Service"
              margin="0px 0 0 0"
              padding="0"
              fontWeight="600"
              fontSize="12px"
              lineHeight="13px"
              color="#a4a4a4"
              hoverColor="#ed54a4"
            />
          </FooterLink>
          <FooterLink>
            <NextNavLink
              href="/about/privacy"
              name="Privacy Policy"
              margin="0px 0 0 0"
              padding="0"
              fontWeight="600"
              fontSize="12px"
              lineHeight="13px"
              color="#a4a4a4"
              hoverColor="#ed54a4"
            />
          </FooterLink>
        </FooterLinks>
        <Copyright>
          &#169; 2011-{currentYear} Hopscotch. All rights reserved.
        </Copyright>
      </FooterEnd>
    </FooterWrapper>
  );
};