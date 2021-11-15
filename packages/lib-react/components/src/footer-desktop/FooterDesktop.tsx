import React, { FC } from 'react';
import { IPopularSearchUrlProps } from './IFooterDesktop';
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
  PopularSearches,
  PopularSearchesTitle,
  PopularSearchesLinks,
  PopularSearchesLink,
  StyledIcon,
} from './StyledFooterDesktop';
import { NextNavLink } from '../next-nav-link';

const POPULAR_URL = [
  { displayName: 'Boys Sherwani', link: '/products/15172/boys-sherwani' },
  {
    displayName: ' Girls Party Wear Dresses',
    link: '/products/15864/girls-party-wear-dresses',
  },
  { displayName: 'Girls Jackets', link: '/products/15935/girls-jackets' },
  { displayName: ' Girls Frocks', link: '/products/15936/girls-frocks' },
  { displayName: 'Boys Jackets', link: '/products/15966/boys-jackets' },
  { displayName: 'Girls Leggings', link: '/products/15971/girls-leggings' },
  {
    displayName: 'Girls Casual Dresses',
    link: '/products/16270/girls-casual-dresses',
  },
  { displayName: 'Girls Gowns', link: '/products/16320/girls-gowns' },
  {
    displayName: 'Baby Girl Onesies ',
    link: '/products/16415/baby-girl-onesies',
  },
  {
    displayName: 'Baby Boy Onesies ',
    link: '/products/16416/baby-boy-onesies',
  },
  {
    displayName: 'Baby Girls Rompers',
    link: '/products/16417/baby-girl-rompers',
  },
  { displayName: 'Baby Boy Rompers', link: '/products/16418/baby-boy-rompers' },
  { displayName: 'Baby Clothes ', link: '/baby' },
  { displayName: 'Girls Clothes ', link: '/girls' },
  { displayName: 'Boys Clothes ', link: '/boys' },
  { displayName: 'Boys Tshirts ', link: '/clothing/boys/tshirts' },
  { displayName: 'Girls Tops ', link: '/clothing/girls/tops' },
  { displayName: 'Boys Jeans', link: '/clothing/boys/jeans' },
  { displayName: 'Girls Jeans ', link: '/clothing/girls/jeans' },
  { displayName: 'Boys Shirts ', link: '/clothing/boys/shirts' },
  { displayName: 'Girls Tshirts ', link: '/clothing/girls/tshirts' },
  { displayName: 'Girls Dresses', link: '/clothing/girls/dresses' },
];
// eslint-disable-next-line no-empty-pattern
export const FooterDesktop: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <PopularSearches>
        <PopularSearchesTitle>Popular Searches</PopularSearchesTitle>
        <PopularSearchesLinks>
          {POPULAR_URL.map((data: IPopularSearchUrlProps, index: number) => (
            <PopularSearchesLink key={index} href={data.link}>
              {data.displayName}
            </PopularSearchesLink>
          ))}
        </PopularSearchesLinks>
      </PopularSearches>
      <FooterSection>
        <FooterBlock>
          <div>
            <StyledIcon icon={InfoIcon}></StyledIcon>
          </div>
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
          <div>
            <StyledIcon icon={MailIcon}></StyledIcon>
          </div>
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
          <div>
            <StyledIcon icon={HsDarkIcon}></StyledIcon>
          </div>
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
          <div>
            <StyledIcon icon={ThumbsupIcon}></StyledIcon>
          </div>
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
              fontWeight="400"
              fontSize="12px"
              lineHeight="16px"
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
              fontWeight="400"
              fontSize="12px"
              lineHeight="16px"
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
              fontWeight="400"
              fontSize="12px"
              lineHeight="16px"
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
