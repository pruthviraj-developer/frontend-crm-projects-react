import React, { FC, useState } from 'react';
import { ILoginModalProps, IVerifiedDataProps } from '../ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper, Description } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Verify } from './Verify';
import { Mobile } from './Mobile';
import { Footer } from '../Footer';
const SIGNIN = 'SIGN_IN';
const VERIFY = 'verify';
const LoginModal: FC<ILoginModalProps> = ({ closeLoginPopup }: ILoginModalProps) => {
  const subTitle = 'Sign in';

  const [currentState, setCurrentState] = useState(SIGNIN);
  const [verified, verifiedData] = useState<IVerifiedDataProps>();

  const updateForm = (data: IVerifiedDataProps) => {
    verifiedData(data);
    setCurrentState(VERIFY);
  };

  const back = (status?: boolean) => {
    if (currentState === VERIFY) {
      closeLoginPopup(status);
      return;
    }
    closeLoginPopup();
  };

  return (
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
            <Description>Your number will be your account identity.</Description>
          </>
        )}
        <SignInWrapper>
          {currentState === SIGNIN && <Mobile {...{ updateForm }} />}
          {currentState === VERIFY && <Verify {...{ ...verified, back }} />}
        </SignInWrapper>
      </SignInContainer>
      <Footer
        {...{
          title: 'New to Hopscotch?',
          link: 'Join us',
        }}
      />
    </LoginModalWrapper>
  );
};
export default LoginModal;
