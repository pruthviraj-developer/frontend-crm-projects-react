import React, { FC, useState } from 'react';
import { ILoginModalProps, IVerifiedDataProps } from './ILoginModal';
import { LoginModalWrapper, SignInContainer, SignInWrapper, Description } from './StyledLoginModal';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Mobile } from './Mobile';
import { Verify } from './Verify';
const SIGNIN = 'SIGN_IN';
const VERIFY = 'verify';
export const LoginModal: FC<ILoginModalProps> = ({ closeLoginPopup }: ILoginModalProps) => {
  const subTitle = 'Sign In';

  const [currentState, setCurrentState] = useState(SIGNIN);
  const [verified, verifiedData] = useState<IVerifiedDataProps | any>({
    type: 'SMS',
    loginId: '7411498813',
    otpReason: SIGNIN,
  });

  const updateForm = (data: IVerifiedDataProps) => {
    verifiedData(data);
    setCurrentState(VERIFY);
  };

  const back = (cartItemQty?: number) => {
    if (currentState === VERIFY) {
      setCurrentState(SIGNIN);
      return;
    }
    closeLoginPopup(cartItemQty);
  };

  return (
    <LoginModalWrapper>
      <Header {...{ closeLoginPopup, back, active: currentState === SIGNIN ? false : true }} />
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
    </LoginModalWrapper>
  );
};
