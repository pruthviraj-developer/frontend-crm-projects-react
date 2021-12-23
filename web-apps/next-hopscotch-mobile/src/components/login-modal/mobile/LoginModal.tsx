import React, { FC, useState } from 'react';
import { ILoginModalProps, IVerifiedDataProps } from '../ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper, Description } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Verify } from './Verify';
import { Mobile } from './Mobile';
import { Footer } from '../common';
import { JoinUs } from '../join-us/JoinUs';
import { SIGNIN, VERIFY } from '../constants';
const subTitle = 'Sign in';

const LoginModal: FC<ILoginModalProps> = ({ closeLoginPopup }: ILoginModalProps) => {
  const [currentState, setCurrentState] = useState(SIGNIN);
  const [verified, verifiedData] = useState<IVerifiedDataProps>();
  const [newUser, setNewUser] = useState<Boolean>(false);

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

  const updateUserStatus = (status?: boolean) => {
    setNewUser(status || false);
  };

  return (
    <>
      {newUser === false && (
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
            <Footer
              {...{
                title: 'New to Hopscotch?',
                link: 'Join us',
                updateUserStatus,
                from: SIGNIN,
              }}
            />
          </SignInContainer>
        </LoginModalWrapper>
      )}
      {newUser && <JoinUs {...{ updateUserStatus }} />}
    </>
  );
};
export default LoginModal;
