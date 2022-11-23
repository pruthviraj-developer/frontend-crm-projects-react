import React, { FC } from 'react';
import { ISeoHtmlFooterProps } from '../ISeoHtmlFooter';


import {
  
  FooterWrapper,
  FooterSection,
  SeoHtmlContent
  
} from './StyledSeoHtmlFooterDesktop';


export const SeoHtmlFooterDesktop: FC<ISeoHtmlFooterProps> = ({
  description,
}: ISeoHtmlFooterProps) => {
  return (
    <FooterWrapper>
      <FooterSection>
        <SeoHtmlContent dangerouslySetInnerHTML={{__html : description}}>

        </SeoHtmlContent>
      </FooterSection>
    </FooterWrapper>
  );
};
