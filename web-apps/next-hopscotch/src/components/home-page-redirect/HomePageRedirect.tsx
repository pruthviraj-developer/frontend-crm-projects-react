import React, { useEffect } from 'react';

export const HomePageRedirect = () => {
  useEffect(() => {
    window.location.href = window.location.origin;
  }, []);

  return <></>;
};
