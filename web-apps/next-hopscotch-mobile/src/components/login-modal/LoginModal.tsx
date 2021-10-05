import React, { FC, useState } from 'react';
import { ILoginModalProps, IVerifiedDataProps } from './ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper, Description } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Mobile } from './Mobile';
import { Verify } from './Verify';
const SIGNIN = 'signin';
const VERIFY = 'verify';
export const LoginModal: FC<ILoginModalProps> = ({ closeLoginPopup }: ILoginModalProps) => {
  const subTitle = 'Sign In';

  const [state, setState] = useState(VERIFY);
  const [verified, verifiedData] = useState<IVerifiedDataProps | any>({
    type: 'SMS',
    loginId: '7411498813',
    otpReason: SIGNIN,
  });

  const updateForm = (data: IVerifiedDataProps) => {
    verifiedData(data);
    useState(VERIFY);
  };

  const back = () => {
    if (state === VERIFY) {
      setState(state === VERIFY ? SIGNIN : VERIFY);
      return;
    }
    closeLoginPopup();
  };

  const signInOrJoin = () => {
    setState(state === VERIFY ? SIGNIN : VERIFY);
  };

  const VERIFYIN = {
    footerDescription: 'New to Hopscotch?',
    footerLink: VERIFY,
    footerLinkText: 'verify us',
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
      <Header {...{ closeLoginPopup, back, active: state === SIGNIN ? false : true }} />
      <SignInContainer>
        {state === SIGNIN && (
          <>
            <SubHeader title={subTitle} />
            <Description>Your number will be your account identity.</Description>
          </>
        )}
        <SignInWrapper>
          {state === SIGNIN && <Mobile {...{ updateForm }} />}
          {state === VERIFY && <Verify {...verified} />}
        </SignInWrapper>
      </SignInContainer>
    </LoginModalWrapper>
  );
};
