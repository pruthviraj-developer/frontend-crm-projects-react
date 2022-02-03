import React, { FC } from 'react';
// import { IPopularSearchUrlProps } from './IFooter';
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
  // PopularSearches,
  // PopularSearchesTitle,
  // PopularSearchesLinks,
  // PopularSearchesLink,
  StyledIcon,
} from './StyledFooter';

// const POPULAR_URL = [
//   { displayName: 'Boys Sherwani', link: '/products/15172/boys-sherwani' },
//   {
//     displayName: ' Girls Party Wear Dresses',
//     link: '/products/15864/girls-party-wear-dresses',
//   },
//   { displayName: 'Girls Jackets', link: '/products/15935/girls-jackets' },
//   { displayName: ' Girls Frocks', link: '/products/15936/girls-frocks' },
//   { displayName: 'Boys Jackets', link: '/products/15966/boys-jackets' },
//   { displayName: 'Girls Leggings', link: '/products/15971/girls-leggings' },
//   {
//     displayName: 'Girls Casual Dresses',
//     link: '/products/16270/girls-casual-dresses',
//   },
//   { displayName: 'Girls Gowns', link: '/products/16320/girls-gowns' },
//   {
//     displayName: 'Baby Girl Onesies ',
//     link: '/products/16415/baby-girl-onesies',
//   },
//   {
//     displayName: 'Baby Boy Onesies ',
//     link: '/products/16416/baby-boy-onesies',
//   },
//   {
//     displayName: 'Baby Girls Rompers',
//     link: '/products/16417/baby-girl-rompers',
//   },
//   { displayName: 'Baby Boy Rompers', link: '/products/16418/baby-boy-rompers' },
//   { displayName: 'Baby Clothes ', link: '/baby' },
//   { displayName: 'Girls Clothes ', link: '/girls' },
//   { displayName: 'Boys Clothes ', link: '/boys' },
//   { displayName: 'Boys Tshirts ', link: '/clothing/boys/tshirts' },
//   { displayName: 'Girls Tops ', link: '/clothing/girls/tops' },
//   { displayName: 'Boys Jeans', link: '/clothing/boys/jeans' },
//   { displayName: 'Girls Jeans ', link: '/clothing/girls/jeans' },
//   { displayName: 'Boys Shirts ', link: '/clothing/boys/shirts' },
//   { displayName: 'Girls Tshirts ', link: '/clothing/girls/tshirts' },
//   { displayName: 'Girls Dresses', link: '/clothing/girls/dresses' },
// ];
// eslint-disable-next-line no-empty-pattern
export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      {/* <PopularSearches>
        <PopularSearchesTitle>Popular Searches</PopularSearchesTitle>
        <PopularSearchesLinks>
          {POPULAR_SEARCH_URLS.map(
            (data: IPopularSearchUrlProps, index: number) => (
              <PopularSearchesLink key={index} href={data.link}>
                {data.displayName}
              </PopularSearchesLink>
            )
          )}
        </PopularSearchesLinks>
      </PopularSearches> */}
      <FooterSection>
        <FooterBlock>
          <LinkWithIcons href="/helpcenter">
            <StyledIcon icon={InfoIcon}></StyledIcon>
            Need help?
          </LinkWithIcons>
        </FooterBlock>
        <FooterBlock>
          <LinkWithIcons
            href="mailto:wecare@hopscotch.in"
            target="_blank"
            rel="noopener noreferrer"
          >
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
