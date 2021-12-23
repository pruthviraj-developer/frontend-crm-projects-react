import React, { FC, useState } from 'react';
import { Header } from '../common/header/Header';
import { IJoinUsProps } from './IJoinUs';
import { JoinUsWrapper, JoinUsContainer, InputWrapper, InputField, Label, Description } from './StyledJoinUs';
import { Button, SubHeader, Footer } from '../common';
import { SIGNIN, JOIN_US, VERIFY } from '../constants';

export const JoinUs: FC<IJoinUsProps> = ({ updateUserStatus }: IJoinUsProps) => {
  const [currentState, setCurrentState] = useState(SIGNIN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const updateForm = () => {
    console.log('close');
    setCurrentState(VERIFY);
  };

  const back = (status?: boolean) => {
    console.log('close', status);
    if (currentState === VERIFY) {
      return;
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

  return (
    <JoinUsWrapper>
      <Header
        {...{
          closeLoginPopup: updateForm,
          back,
          active: false,
        }}
      />
      <JoinUsContainer>
        <SubHeader title="Join us" />
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
        <Footer
          {...{
            title: 'Have an account?',
            link: 'Sign in',
            from: JOIN_US,
            updateUserStatus,
          }}
        />
      </JoinUsContainer>
    </JoinUsWrapper>
  );
};
// SEND OTP
