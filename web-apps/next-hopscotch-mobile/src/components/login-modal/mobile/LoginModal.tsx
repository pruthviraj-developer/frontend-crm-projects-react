import React, { FC, useState } from 'react';
import { ILoginModalProps, IVerifiedDataProps } from '../ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Verify } from './Verify';
import { Mobile } from './Mobile';
import { Email } from '../email';
import { Error, Footer, HyperLink, IErrorProps, LoginService } from '../common';
import { JoinUs } from '../join-us';

import {
  SIGNIN,
  SIGNUP,
  VERIFY,
  EMAILSIGNIN,
  MOBILESIGNIN,
  SIGN_UP_NOW_LINK,
  SIGN_IN_MOBILE_LINK,
  SIGN_IN_EMAIL_LINK,
} from '../constants';
import { ILoginErrorMessageBar } from './../ILoginModal';

const subTitle = 'Sign in';

const LoginModal: FC<ILoginModalProps> = ({ closeLoginPopup }: ILoginModalProps) => {
  const [currentState, setCurrentState] = useState(SIGNIN);
  const [verified, setVerifiedData] = useState<IVerifiedDataProps>();
  const [user, setUser] = useState<string>(SIGNIN);
  const [loginType, setLoginType] = useState<string>(MOBILESIGNIN);
  const [loginBy, setLoginBy] = useState<string>('');
  const [error, setErrorState] = useState<ILoginErrorMessageBar | null>(null);
  const updateForm = (data: IVerifiedDataProps) => {
    setVerifiedData(data);
    setCurrentState(VERIFY);
  };

  const back = (status?: string | boolean) => {
    if (status === SIGNIN) {
      setCurrentState(SIGNIN);
    } else if (status === MOBILESIGNIN) {
      setLoginType(MOBILESIGNIN);
    } else if (currentState === VERIFY) {
      closeLoginPopup(status);
    } else {
      closeLoginPopup();
    }
    setErrorState(null);
  };

  const updateUserStatus = (status: string, type?: string, error?: ILoginErrorMessageBar) => {
    if (status === SIGNIN) {
      setCurrentState(SIGNIN);
    }
    if (type) {
      setLoginType(type);
    }
    if (error) {
      setErrorState(error);
      const id = error.id;
      if (id) {
        setLoginBy(id);
      }
    } else {
      setErrorState(null);
    }
    setUser(status || SIGNIN);
  };

  const footerConstants = {
    title: 'New to Hopscotch?',
    link: 'Join us',
    updateUserStatus,
    from: SIGNUP,
  };

  const switchScreen = (error: IErrorProps) => {
    const obj = LoginService.getParamsObject(error.actionLink || error.redirectLink);
    setLoginBy('');
    switch (obj.link) {
      case SIGN_IN_EMAIL_LINK:
        updateUserStatus(SIGNIN, EMAILSIGNIN);
        return;
      case SIGN_IN_MOBILE_LINK:
        updateUserStatus(SIGNIN, MOBILESIGNIN);
        return;
      case SIGN_UP_NOW_LINK:
        updateUserStatus(SIGNUP);
        return;
      default:
        return;
    }
  };

  const switchToEmailOrMobile = (loginType: string) => {
    setLoginBy('');
    setLoginType(loginType);
  };

  return (
    <>
      {user === SIGNIN && (
        <LoginModalWrapper>
          <Header
            {...{
              closeLoginPopup,
              back,
              active: currentState === SIGNIN ? (loginType === EMAILSIGNIN ? true : false) : true,
              loginType,
            }}
          />
          <SignInContainer>
            {currentState === SIGNIN && (
              <>
                <SubHeader title={subTitle} />
              </>
            )}
            {error && <Error {...{ switchScreen, error }} />}
            <SignInWrapper>
              {currentState === SIGNIN &&
                (loginType === MOBILESIGNIN ? (
                  <Mobile {...{ updateForm, loginBy, switchScreen }} />
                ) : (
                  <Email {...{ updateForm, loginBy, switchScreen }} />
                ))}
              {currentState === VERIFY && <Verify {...{ ...verified, back }} />}
            </SignInWrapper>
            {currentState != VERIFY && (
              <>
                <HyperLink {...{ switchToEmailOrMobile, loginType }} />
                <Footer {...footerConstants} />
              </>
            )}
          </SignInContainer>
        </LoginModalWrapper>
      )}
      {user === SIGNUP && <JoinUs {...{ updateUserStatus }} />}
    </>
  );
};
export default LoginModal;
