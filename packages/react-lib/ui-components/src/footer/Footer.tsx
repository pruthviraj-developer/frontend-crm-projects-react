import React, { FC } from 'react';
import { IFooterProps } from './Ifooter';
import { AppleIcon, PlayIcon, MailIcon, InfoIcon } from '@hs/icons';
import {
  Copyright,
  DownloadApps,
  DownloadIcons,
  DownloadIcon,
  FooterWrapper,
  FooterSection,
  FooterBlockTitle,
  FooterLinks,
  FooterLink,
  Link,
  LinkWithIcons,
  FooterBlock,
  StyledIcon,
} from './FooterCss';
export const Footer: FC<IFooterProps> = ({}: IFooterProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
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
          <DownloadApps>
            <DownloadIcons
              href="https://itunes.apple.com/in/app/hopscotch-find-something-new/id945949424"
              target="_blank"
            >
              <DownloadIcon icon={AppleIcon}></DownloadIcon>
            </DownloadIcons>
            <DownloadIcons
              href="https://play.google.com/store/apps/details?id=in.hopscotch.android"
              target="_blank"
            >
              <DownloadIcon icon={PlayIcon}></DownloadIcon>
            </DownloadIcons>
          </DownloadApps>
        </FooterBlock>
        <FooterBlock>
          <FooterBlockTitle>Connect with us</FooterBlockTitle>
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
