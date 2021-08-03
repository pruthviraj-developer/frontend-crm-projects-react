import React, { FC } from 'react';
import { IFooterProps } from './Ifooter';
import {
  AppleIcon,
  PlayIcon,
  MailIcon,
  InfoIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  PIntrestIcon,
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
  LinkWithIcons,
  FooterBlock,
  PopularSearches,
  PopularSearchesTitle,
  PopularSearchesLinks,
  PopularSearchesLink,
  StyledIcon,
} from './StyledFooter';
export const Footer: FC<IFooterProps> = ({}: IFooterProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <PopularSearches>
        <PopularSearchesTitle>Popular Searches</PopularSearchesTitle>
        <PopularSearchesLinks>
          <PopularSearchesLink href="/products/15172/boys-sherwani">
            Boys Sherwani
          </PopularSearchesLink>
          <PopularSearchesLink href="/products/15864/girls-party-wear-dresses">
            Girls Party Wear Dresses
          </PopularSearchesLink>
          <PopularSearchesLink href="/products/16270/girls-casual-dresses">
            Girls Casual Dresses
          </PopularSearchesLink>
          <PopularSearchesLink href="/products/16320/girls-gowns">
            Girls Gowns
          </PopularSearchesLink>
          <PopularSearchesLink href="/products/16416/baby-boy-onesies">
            Baby Boy Onesies
          </PopularSearchesLink>
        </PopularSearchesLinks>
      </PopularSearches>
      <FooterSection>
        <FooterBlock>
          <LinkWithIcons href="/helpcenter">
            <StyledIcon icon={InfoIcon}></StyledIcon>
            Need help?
          </LinkWithIcons>
        </FooterBlock>
        <FooterBlock>
          <LinkWithIcons href="/helpcenter">
            <StyledIcon icon={MailIcon}></StyledIcon>
            24x7 support
          </LinkWithIcons>
        </FooterBlock>
        <FooterBlock>
          <FooterBlockTitle>Download our apps</FooterBlockTitle>
          <ConnectToApps>
            <LinkIcons
              href="https://itunes.apple.com/in/app/hopscotch-find-something-new/id945949424"
              target="_blank"
            >
              <DownloadIcon icon={AppleIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://play.google.com/store/apps/details?id=in.hopscotch.android"
              target="_blank"
            >
              <DownloadIcon icon={PlayIcon}></DownloadIcon>
            </LinkIcons>
          </ConnectToApps>
        </FooterBlock>
        <FooterBlock>
          <FooterBlockTitle>Connect with us</FooterBlockTitle>
          <ConnectToApps>
            <LinkIcons
              href="https://www.facebook.com/Hopscotch.India"
              target="_blank"
            >
              <DownloadIcon icon={FacebookIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://twitter.com/Hopscotchindia"
              target="_blank"
            >
              <DownloadIcon icon={TwitterIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://www.instagram.com/hopscotch.in/"
              target="_blank"
            >
              <DownloadIcon icon={InstagramIcon}></DownloadIcon>
            </LinkIcons>
            <LinkIcons
              href="https://www.pinterest.com/hopscotchindia/"
              target="_blank"
            >
              <DownloadIcon icon={PIntrestIcon}></DownloadIcon>
            </LinkIcons>
          </ConnectToApps>
        </FooterBlock>
      </FooterSection>
      <FooterLinks>
        <FooterLink>
          <Link href="/about/AboutUs">About Us</Link>
        </FooterLink>
        <FooterLink>
          <Link href="/about/Terms">Terms of Service </Link>
        </FooterLink>
        <FooterLink>
          <Link href="/about/privacy">Privacy Policy</Link>
        </FooterLink>
      </FooterLinks>
      <Copyright>
        &#169; 2011-{currentYear} Hopscotch. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};
