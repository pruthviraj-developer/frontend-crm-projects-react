import React, { FC, useState } from 'react';
import { IconClose } from '@hs/icons';
import { ILoginModalProps } from './ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Footer } from './Footer';
const SIGNIN = 'signin';
const JOIN = 'join';
export const LoginModal: FC<ILoginModalProps> = ({}: ILoginModalProps) => {
  const subTitle = 'Sign In';

  const [state, setState] = useState(SIGNIN);
  const back = () => {
    console.log('back');
  };

  const signInOrJoin = (linkTo: string) => {
    setState(state === JOIN ? SIGNIN : JOIN);
  };

  const joinUs = {
    footerDescription: 'New to Hopscotch?',
    footerLink: JOIN,
    footerLinkText: 'Join us',
    signInOrJoin,
  };

  const signIn = {
    footerDescription: 'Have an account?',
    footerLink: SIGNIN,
    footerLinkText: 'Sign in',
    signInOrJoin,
  };
  return (
    <LoginModalWrapper>
      <Header active={false} back={back} />
      <SignInContainer>
        <SubHeader title={subTitle} />
        <SignInWrapper></SignInWrapper>
        <Footer {...(state === JOIN ? signIn : joinUs)} />
      </SignInContainer>
    </LoginModalWrapper>
  );
};
