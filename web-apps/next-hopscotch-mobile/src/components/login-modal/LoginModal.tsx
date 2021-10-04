import React, { FC } from 'react';
import { IconClose } from '@hs/icons';
import { ILoginModalProps } from './ILoginModal';
import { LoginModalWrapper, SignInContainer } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Footer } from './Footer';
export const LoginModal: FC<ILoginModalProps> = ({}: ILoginModalProps) => {
  const subTitle = 'Sign In';

  const back = () => {
    console.log('back');
  };

  const signInOrJoin = (linkTo: string) => {
    console.log(linkTo);
  };

  const joinUs = {
    footerDescription: 'New to Hopscotch?',
    footerLink: 'join',
    footerLinkText: 'Join us',
    signInOrJoin,
  };

  const signIn = {
    footerDescription: 'Have an account?',
    footerLink: 'signin',
    footerLinkText: 'Sign in',
    signInOrJoin,
  };
  return (
    <LoginModalWrapper>
      <Header active={false} back={back} />
      <SubHeader title={subTitle} />
      <SignInContainer></SignInContainer>
      <Footer {...joinUs} />
    </LoginModalWrapper>
  );
};
