import React, { FC, useState } from 'react';
import { ILoginModalProps, IVerifiedDataProps } from '../ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper, Description } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Verify } from './Verify';
import { Mobile } from './Mobile';
import { Footer, IErrorProps } from '../common';
import { JoinUs } from '../join-us/JoinUs';

import { SIGNIN, SIGNUP, VERIFY, SIGN_UP_NOW_LINK, SIGN_IN_MOBILE_LINK, SIGN_IN_EMAIL_LINK } from '../constants';
import { HyperLink } from '../common/hyper-link/HyperLink';

const subTitle = 'Sign in';

const LoginModal: FC<ILoginModalProps> = ({ closeLoginPopup }: ILoginModalProps) => {
  const [currentState, setCurrentState] = useState(SIGNIN);
  const [verified, verifiedData] = useState<IVerifiedDataProps>();
  const [user, setUser] = useState<string>(SIGNIN);

  const updateForm = (data: IVerifiedDataProps) => {
    verifiedData(data);
    setCurrentState(VERIFY);
  };

  const back = (status?: string | boolean) => {
    if (currentState === VERIFY) {
      closeLoginPopup(status);
      return;
    }
    closeLoginPopup();
  };

  const updateUserStatus = (status?: string) => {
    if (status === SIGNIN) {
      setCurrentState(SIGNIN);
    }
    setUser(status || SIGNIN);
  };

  const footerConstants = {
    title: 'New to Hopscotch?',
    link: 'Join us',
    updateUserStatus,
    from: SIGNUP,
  };

  const getParamsObject = (deepLink: string) => {
    if (deepLink.indexOf('?') == -1) {
      return { link: deepLink };
    }
    let hashes = deepLink.slice(deepLink.indexOf('?') + 1).split('&');
    let link = deepLink.slice(0, deepLink.indexOf('?'));
    let object = hashes.reduce((params, hash) => {
      let [key, val] = hash.split('=');
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
    return { ...object, link };
  };

  const switchScreen = (error: IErrorProps) => {
    let obj = getParamsObject(error.actionLink || error.redirectLink);
    switch (obj.link) {
      case SIGN_IN_EMAIL_LINK:
        // userDetail.loginId = userDetail.email;
        this.switchFunc(SIGNIN);
        return;
      case SIGN_IN_MOBILE_LINK:
        // userDetail.loginId = userDetail.phoneNo || userDetail.loginId;
        this.switchFunc(SIGNIN);
        return;
      case SIGN_UP_NOW_LINK:
        // if (obj.id) {
        //   if (new RegExp(REGEX_MOBILE_NO).test(obj.id)) {
        //     userDetail = { ...userDetail, phoneNo: obj.id };
        //   } else {
        //     userDetail = { ...userDetail, email: obj.id };
        //   }
        // }
        this.switchFunc(SIGNUP);
        return;
      default:
        return;
    }
  };

  return (
    <>
      {user === SIGNIN && (
        <LoginModalWrapper>
          <Header
            {...{
              closeLoginPopup,
              back,
              active: currentState === SIGNIN ? false : true,
            }}
          />
          <SignInContainer>
            {currentState === SIGNIN && (
              <>
                <SubHeader title={subTitle} />
              </>
            )}
            <SignInWrapper>
              {currentState === SIGNIN && <Mobile {...{ updateForm, switchScreen }} />}
              {currentState === VERIFY && <Verify {...{ ...verified, back }} />}
            </SignInWrapper>
            <HyperLink />
            <Footer {...footerConstants} />
          </SignInContainer>
        </LoginModalWrapper>
      )}
      {user === SIGNUP && <JoinUs {...{ updateUserStatus }} />}
    </>
  );
};
export default LoginModal;
