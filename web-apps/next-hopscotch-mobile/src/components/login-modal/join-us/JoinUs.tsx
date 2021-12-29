import React, { FC, useState } from 'react';
import { IJoinUsProps, IUserProps, ISignUpSuccessResponseProps } from './IJoinUs';
import { JoinUsWrapper, JoinUsContainer, InputWrapper, InputField, Label, Description } from './StyledJoinUs';
import { Error, Button, Header, SubHeader, Footer, Loader, loginService } from '../common';
import {
  SIGNIN,
  SIGNUP,
  VERIFY,
  REQUIRED,
  REGEX_PATTERNS,
  FORM_ERROR_CODES,
  SIGN_IN_EMAIL_LINK,
  SIGN_IN_MOBILE_LINK,
  EMAILSIGNIN,
  MOBILESIGNIN,
} from '../constants';
import { Verify } from '../mobile/Verify';
import { productDetailsService } from '@hs/services';
import { ILoginErrorResponse, ILoginErrorMessageBar } from '../ILoginModal';

const NAME = 'NAME';
const EMAIL = 'EMAIL';
const MOBILE = 'MOBILE';
export const JoinUs: FC<IJoinUsProps> = ({ updateUserStatus }: IJoinUsProps) => {
  const [currentState, setCurrentState] = useState<string | undefined>(SIGNUP);
  const [verified, setVerifiedState] = useState<IUserProps>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPhoneNo, setErrorPhoneNo] = useState<string | null>(null);
  const [error, setErrorState] = useState<ILoginErrorMessageBar | null>(null);
  const [successResponse, setSuccessResponse] = useState<ISignUpSuccessResponseProps | undefined>();
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

  const onNumberKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumber = loginService.checkIsNumber(event.keyCode);
    isNumber ? '' : event.preventDefault();
  };

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
    const checkErrorResponse = (errorData: ILoginErrorMessageBar) => {
      const obj = loginService.getParamsObject(errorData.actionLink || errorData.redirectLink);
      switch (obj.link) {
        case SIGN_IN_EMAIL_LINK:
          updateUserStatus(SIGNIN, EMAILSIGNIN, { ...errorData, ...obj });
          return;
        case SIGN_IN_MOBILE_LINK:
          updateUserStatus(SIGNIN, MOBILESIGNIN, { ...errorData, ...obj });
          return;
        default:
          setErrorState(errorData);
          return;
      }
    };
    (async () => {
      try {
        setLoading(true);
        const response: ILoginErrorResponse = await productDetailsService.signUp(verified);
        setLoading(false);
        if (response.action === 'success') {
          setCurrentState(VERIFY);
          setSuccessResponse(response as unknown as ISignUpSuccessResponseProps);
        } else {
          checkErrorResponse(response.messageBar);
        }
      } catch (error) {
        setLoading(false);
        const errorResponse = error as unknown as ILoginErrorResponse;
        checkErrorResponse(errorResponse.messageBar);
      }
    })();
  };

  return (
    <JoinUsWrapper>
      {loading && <Loader />}
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
                  type="number"
                  onKeyDown={onNumberKeyDown}
                  value={phoneNo}
                  onChange={(event) => {
                    onMobileNumberChange(event.target.value);
                  }}
                />
                <Label className="label">Mobile Number</Label>
                {errorPhoneNo && <Error {...{ error: { message: errorPhoneNo } }} />}
                <Description>Verify your number to create your Account</Description>
                {error && <Error {...{ error }} />}
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
          <JoinUsContainer>
            <Verify
              {...{
                email,
                name,
                phoneNo,
                from: SIGNUP,
                loginId: successResponse?.loginId,
                otpReason: successResponse?.otpReason,
                message: successResponse?.textMessage,
                back: () => {
                  setCurrentState(SIGNUP);
                },
              }}
            />
          </JoinUsContainer>
        </>
      )}
    </JoinUsWrapper>
  );
};
