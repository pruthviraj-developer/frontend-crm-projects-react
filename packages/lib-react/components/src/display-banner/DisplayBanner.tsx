import React, { FC } from 'react';
import { DisplayBannerWrapper, ImageContainer } from './StyledDisplayBanner';
import Image from 'next/image';
export const DisplayBanner: FC = () => {
  return (
    <DisplayBannerWrapper>
      <ImageContainer>
        <Image
          layout="fill"
          objectFit="fill"
          placeholder="blur"
          draggable={false}
          alt="hoscotch"
          blurDataURL="https://static.hopscotch.in/web2/images/boutique-pattern.png"
          src={'https://static.hopscotch.in/trust-strip.jpg?'}
          loader={({ src, width }) => `${src}&tr=w-${width},c-at_max,n-medium`}
        />
      </ImageContainer>
    </DisplayBannerWrapper>
  );
};
