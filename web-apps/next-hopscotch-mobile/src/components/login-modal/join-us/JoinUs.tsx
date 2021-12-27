import React, { FC, useState } from 'react';
import { Header } from '../common/header/Header';
import { IJoinUsProps, IUserProps } from './IJoinUs';
import { JoinUsWrapper, JoinUsContainer, InputWrapper, InputField, Label, Description } from './StyledJoinUs';
import { Error, Button, SubHeader, Footer } from '../common';
import { SIGNIN, SIGNUP, VERIFY, REQUIRED, REGEX_PATTERNS, FORM_ERROR_CODES } from '../constants';
import { Verify } from '../mobile/Verify';
import { ILoginErrorMessageBar } from '..';

const NAME = 'NAME';
const EMAIL = 'EMAIL';
const MOBILE = 'MOBILE';
export const JoinUs: FC<IJoinUsProps> = ({ updateUserStatus }: IJoinUsProps) => {
  const [currentState, setCurrentState] = useState<string | undefined>(SIGNUP);
  const [verified, setVerifiedState] = useState<IUserProps>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPhoneNo, setErrorPhoneNo] = useState<string | null>(null);

  const footerConstants = {
    title: 'Have an account?',
    link: SIGNIN,
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

  // const validateEmail = () => {
  //   let error: ILoginErrorMessageBar | null = null;
  //   const REGEXEMAIL = new RegExp(REGEX_PATTERNS.REGEX_EMAIL);
  //   const setErrorMessage = (type: string, msg?: string) => {
  //     error = {
  //       message: msg || FORM_ERROR_CODES.EMAIL,
  //     };
  //   };
  //   if (!email) {
  //     setErrorEmail(REQUIRED);
  //   } else if (!REGEXEMAIL.test(email)) {
  //     setErrorEmail(FORM_ERROR_CODES.EMAIL);
  //   }
  //   if (error) {
  //     return true;
  //   }
  //   return false;
  // };

  const clearErrorFields = () => {
    setErrorName(null);
    setErrorEmail(null);
    setErrorPhoneNo(null);
  };

  const validateInput = (value: string, fieldName: string) => {
    const setError = (error: string) => {
      switch (fieldName) {
        case NAME:
          {
            setErrorName(error);
          }
          break;
        case EMAIL:
          {
            setErrorEmail(error);
          }
          break;
        case MOBILE:
          {
            setErrorPhoneNo(error);
          }
          break;
      }
    };
    if (value) {
      let pattern = new RegExp(REGEX_PATTERNS[fieldName]);
      const result = pattern.test(value);
      if (!result) {
        setError(FORM_ERROR_CODES[fieldName]);
        return true;
      }
    } else {
      setError(REQUIRED);
      return true;
    }
  };

  const sendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    clearErrorFields();
    if (validateInput(name, NAME)) {
      return;
    } else if (validateInput(email, EMAIL)) {
      return;
    } else if (validateInput(phoneNo, MOBILE)) {
      return;
    }
    setVerifiedState({ otpReason: 'SIGN_UP', name, email, phoneNo });
    setCurrentState(VERIFY);
  };

  return (
    <JoinUsWrapper>
      {currentState === SIGNUP ? (
        <>
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
              {errorName && <Error {...{ error: { message: errorName } }} />}
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
              {errorEmail && <Error {...{ error: { message: errorEmail } }} />}
              <InputWrapper>
                <InputField
                  type="tel"
                  value={phoneNo}
                  onChange={(event) => {
                    onMobileNumberChange(event.target.value);
                  }}
                />
                <Label className="label">Mobile Number</Label>
                {errorPhoneNo && <Error {...{ error: { message: errorPhoneNo } }} />}
                <Description>Verify your number to create your Account</Description>
                <Button name="Send otp" />
              </InputWrapper>
            </form>
            <Footer {...footerConstants} />
          </JoinUsContainer>
        </>
      ) : (
        <>
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
                setCurrentState(SIGNUP);
              },
            }}
          />
        </>
      )}
    </JoinUsWrapper>
  );
};
