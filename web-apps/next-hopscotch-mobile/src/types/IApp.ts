import { ReactElement, ReactNode } from '@/../../../packages/icons/node_modules/@types/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
