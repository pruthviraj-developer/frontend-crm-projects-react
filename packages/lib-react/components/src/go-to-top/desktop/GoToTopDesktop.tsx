import React, { FC, useEffect, useState } from 'react';

import {
  GoToTopWrapper,
  BackToTopIconWrapper,
  BackToTopIcon,
  BackToTopText,
} from './StyledGoToTop';
import { IconArrowTop } from '@hs/icons';
type Timer = ReturnType<typeof setTimeout>;
export const GoToTopDesktop: FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  useEffect(() => {
    let timeOut: Timer;
    let lastScrollTop = 0;
    const handleScroll = () => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        const currentScrollTop = window.scrollY;
        const difference = currentScrollTop - lastScrollTop;
        if (currentScrollTop > 500) {
          setShowBackToTop(true);
        } else if (currentScrollTop < 500) {
          setShowBackToTop(false);
        }
        if (difference < 0 && currentScrollTop > 500) {
          // Scrolling up, and below a certain height
          setShowBackToTop(true);
        } else if (difference > 20 || currentScrollTop <= 500) {
          setShowBackToTop(false);
        }
        lastScrollTop = currentScrollTop;
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return showBackToTop === true ? (
    <GoToTopWrapper>
      <BackToTopIconWrapper>
        <BackToTopIcon icon={IconArrowTop}></BackToTopIcon>
      </BackToTopIconWrapper>
      <BackToTopText>Back to top</BackToTopText>
    </GoToTopWrapper>
  ) : (
    <></>
  );
};
