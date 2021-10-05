import React, { FC, useState } from 'react';
import { IconClose } from '@hs/icons';
import { ILoginModalProps } from './ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Footer } from './Footer';
import { Mobile } from './Mobile';
const SIGNIN = 'signin';
const JOIN = 'join';
export const LoginModal: FC<ILoginModalProps> = ({ closeLoginPopup }: ILoginModalProps) => {
  const subTitle = 'Sign In';

  const [state, setState] = useState(SIGNIN);
  const back = () => {
    if (state === JOIN) {
      setState(state === JOIN ? SIGNIN : JOIN);
      return;
    }
    closeLoginPopup();
  };

  const signInOrJoin = () => {
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
      <Header active={state === SIGNIN ? false : true} back={back} />
      <SignInContainer>
        <SubHeader title={subTitle} />
        <SignInWrapper>
          <Mobile />
        </SignInWrapper>
        <Footer {...(state === SIGNIN ? joinUs : signIn)} />
      </SignInContainer>
    </LoginModalWrapper>
  );
};
