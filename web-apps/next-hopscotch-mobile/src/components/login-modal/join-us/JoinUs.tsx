import React, { FC, useState } from 'react';
import { Header } from '../common/header/Header';
import { IJoinUsProps, IUserProps } from './IJoinUs';
import { JoinUsWrapper, JoinUsContainer, InputWrapper, InputField, Label, Description } from './StyledJoinUs';
import { Button, SubHeader, Footer } from '../common';
import { SIGNIN, SIGNUP, VERIFY } from '../constants';
import { Verify } from '../mobile/Verify';

export const JoinUs: FC<IJoinUsProps> = ({ updateUserStatus }: IJoinUsProps) => {
  const [currentState, setCurrentState] = useState<string | undefined>(SIGNUP);
  const [verified, setVerifiedState] = useState<IUserProps>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const footerConstants = {
    title: 'Have an account?',
    link: 'Sign in',
    from: SIGNIN,
    updateUserStatus,
  };

  const back = (status?: string) => {
    if (status != SIGNIN) {
      setCurrentState(status);
    } else {
      updateUserStatus(SIGNIN);
    }
  };

  const onNameChange = (e: string) => {
    const toTitleCase = (str: string) => {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    setName(toTitleCase(e));
  };

  const onEmailChange = (e: string) => {
    setEmail(e.trim());
  };

  const onMobileNumberChange = (e: string) => {
    const value = e.trim();
    if (value.length > 10) {
      return;
    }
    setPhoneNo(value);
  };

  const sendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    setVerifiedState({
      name: 'Aksjaksj',
      email: 'dskjkadj@gmail.com',
      loginId: '6676767676',
      phoneNo: '6676767676',
      type: 'SMS',
      otpReason: 'SIGN_UP',
    });
    setCurrentState(VERIFY);
  };

  return (
    <>
      {currentState === SIGNUP && (
        <JoinUsWrapper>
          <Header
            {...{
              back,
              active: false,
              backStatus: SIGNIN,
            }}
          />
          <JoinUsContainer>
            <SubHeader title="Join us" />
            <form
              onSubmit={(e) => {
                return sendOtp(e);
              }}
              noValidate
            >
              <InputWrapper isFirst={true}>
                <InputField
                  type="text"
                  value={name}
                  onChange={(event) => {
                    onNameChange(event.target.value);
                  }}
                />
                <Label className="label">Full Name</Label>
              </InputWrapper>
              <InputWrapper>
                <InputField
                  type="email"
                  value={email}
                  onChange={(event) => {
                    onEmailChange(event.target.value);
                  }}
                />
                <Label className="label">Email Address</Label>
              </InputWrapper>
              <InputWrapper>
                <InputField
                  type="tel"
                  value={phoneNo}
                  onChange={(event) => {
                    onMobileNumberChange(event.target.value);
                  }}
                />
                <Label className="label">Mobile Number</Label>
                <Description>Verify your number to create your Account</Description>
                <Button name="Send otp" />
              </InputWrapper>
            </form>
            <Footer {...footerConstants} />
          </JoinUsContainer>
        </JoinUsWrapper>
      )}
      {currentState === VERIFY && (
        <JoinUsWrapper>
          <Header
            {...{
              back,
              active: true,
              backStatus: SIGNUP,
            }}
          />
          <Verify
            {...{
              ...verified,
              back: () => {
                debugger;
                setCurrentState(SIGNUP);
              },
            }}
          />
        </JoinUsWrapper>
      )}
    </>
  );
};
// SEND OTP
