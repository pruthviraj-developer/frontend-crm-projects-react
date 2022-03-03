import React, { FC, useState } from 'react';
import { ILoginModalProps, IVerifiedDataProps } from '../ILoginModal';
import {
  LoginModalWrapper,
  SignInContainer,
  SignInWrapper,
} from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Verify } from './Verify';
import { Mobile } from './Mobile';
import { Email } from '../email';
import { Error, Footer, HyperLink, IErrorProps, loginService } from '../common';
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
  REGEX_PATTERNS,
} from '../constants';
import { ILoginErrorMessageBar } from './../ILoginModal';

const subTitle = 'Sign in';
const EVENTS = {
  JOIN_VIEWED: 'join_viewed',
  LOGIN_VIEWED: 'login_viewed',
  OTP_SENT: 'otp_sent',
  OTP_VERIFIED: 'otp_verified',
};
const REGEXEMAIL = new RegExp(REGEX_PATTERNS.REGEX_EMAIL);
const LoginModal: FC<ILoginModalProps> = ({
  closeLoginPopup,
  trackEvent,
}: ILoginModalProps) => {
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
      const isEmail: boolean = REGEXEMAIL.test(verified?.loginId || '');
      const properties = {
        verification_reason: verified?.otpReason || 'SIGN_IN',
      };
      if (isEmail) {
        properties['authentication_type'] = 'Email';
        properties['email'] = verified?.loginId;
      } else {
        properties['authentication_type'] = 'Mobile';
        properties['mobile'] = verified?.loginId;
      }
      trackEvent(EVENTS.OTP_VERIFIED, properties);
      closeLoginPopup(status);
    } else {
      closeLoginPopup();
    }
    setErrorState(null);
  };

  const updateUserStatus = (
    status: string,
    type?: string,
    error?: ILoginErrorMessageBar
  ) => {
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
    let authentication_type = 'Email';
    let EVENT: string = EVENTS.JOIN_VIEWED;
    if (status === SIGNIN) {
      EVENT = EVENTS.LOGIN_VIEWED;
      authentication_type = 'Mobile';
    }
    trackEvent(EVENT, {
      from_screen: 'Product details',
      authentication_type,
      validation_type: 'OTP',
    });
  };

  const footerConstants = {
    title: 'New to Hopscotch?',
    link: 'Join us',
    updateUserStatus,
    from: SIGNUP,
  };

  const switchScreen = (error: IErrorProps) => {
    const obj = loginService.getParamsObject(
      error.actionLink || error.redirectLink
    );
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
    let authentication_type = 'Email';
    if (loginType === MOBILESIGNIN) {
      authentication_type = 'Mobile';
    }
    trackEvent(EVENTS.LOGIN_VIEWED, {
      from_screen: 'Product details',
      authentication_type,
      validation_type: 'OTP',
    });
  };

  return (
    <>
      {user === SIGNIN && (
        <LoginModalWrapper>
          <Header
            {...{
              closeLoginPopup,
              back,
              active:
                currentState === SIGNIN
                  ? loginType === EMAILSIGNIN
                    ? true
                    : false
                  : true,
              loginType,
              currentState,
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
                  <Mobile
                    {...{ trackEvent, updateForm, loginBy, switchScreen }}
                  />
                ) : (
                  <Email
                    {...{ trackEvent, updateForm, loginBy, switchScreen }}
                  />
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
