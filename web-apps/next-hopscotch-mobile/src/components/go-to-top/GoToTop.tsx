import React, { FC, useEffect, useState } from 'react';

import { GoToTopWrapper, BackToTopIconWrapper, BackToTopIcon, BackToTopText } from './StyledGoToTop';
import { BackIcon } from '@hs/icons';

const GoToTop: FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const scrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };
  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    let lastScrollTop = 0;
    const handleScroll = () => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        let currentScrollTop = window.scrollY;
        let difference = currentScrollTop - lastScrollTop;
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
      clearTimeout(timeOut);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return showBackToTop === true ? (
    <GoToTopWrapper onClick={scrollToTop}>
      <BackToTopIconWrapper>
        <BackToTopIcon icon={BackIcon}></BackToTopIcon>
      </BackToTopIconWrapper>
      <BackToTopText>Back to top</BackToTopText>
    </GoToTopWrapper>
  ) : null;
};
export default GoToTop;
