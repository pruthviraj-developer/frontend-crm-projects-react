import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<T = unknown> = AppProps & {
  Component: NextPageWithLayout<T>;
};
