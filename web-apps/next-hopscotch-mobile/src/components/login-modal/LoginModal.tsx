import React, { FC, useState } from 'react';
import { ILoginModalProps } from './ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper, Description } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
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
      <Header {...{ closeLoginPopup }} />
      <SignInContainer>
        <SubHeader title={subTitle} />
        <Description>Your number will be your account identity.</Description>
        <SignInWrapper>
          <Mobile />
        </SignInWrapper>
      </SignInContainer>
    </LoginModalWrapper>
  );
};
