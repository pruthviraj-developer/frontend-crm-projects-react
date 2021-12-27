import React, { FC, useState } from 'react';
import { EmailWrapper, InputWrapper, InputField, Label } from './StyledEmail';
import { Button, Error, Loader } from '../common';
import { productDetailsService } from '@hs/services';
import { FORM_ERROR_CODES, REGEX_PATTERNS } from '../constants';
import { IUserProps, ILoginErrorMessageBar, ILoginErrorResponse } from '../ILoginModal';
const reason = { otpReason: 'SIGN_IN' };

export const Email: FC<IUserProps> = ({ updateForm, switchScreen }: IUserProps) => {
  const [loginId, setLoginId] = useState('');
  const [error, setErrorState] = useState<ILoginErrorMessageBar | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    validateEmail();
  };

  const validateEmail = () => {
    let error: ILoginErrorMessageBar | null = null;
    const REGEXEMAIL = new RegExp(REGEX_PATTERNS.REGEX_EMAIL);
    const setErrorMessage = (type: string, msg?: string) => {
      error = {
        messageType: 'error',
        message: msg || FORM_ERROR_CODES[type.toUpperCase()],
      };
    };
    if (!loginId) {
      setErrorMessage('email', 'Required');
    } else if (!REGEXEMAIL.test(loginId)) {
      setErrorMessage('email', FORM_ERROR_CODES.EMAIL);
    }
    setErrorState(error);
    if (!error) {
      sendOtp();
    }
  };

  const sendOtp = () => {
    (async () => {
      try {
        setLoading(true);
        const response: ILoginErrorResponse = await productDetailsService.sendOtp({
          loginId,
          ...reason,
        });
        setLoading(false);
        if (response.action === 'success') {
          updateForm({
            loginId,
            ...reason,
          });
        } else {
          setErrorState(response.messageBar);
        }
      } catch (error) {
        setLoading(false);
        const errorResponse = error as unknown as ILoginErrorResponse;
        setErrorState(errorResponse.messageBar);
      }
    })();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginId(value);
    setErrorState(null);
  };

  return (
    <EmailWrapper>
      {loading && <Loader />}
      <form
        onSubmit={(e) => {
          return submitForm(e);
        }}
        noValidate
      >
        <InputWrapper>
          <InputField type="text" value={loginId} onChange={handleOnChange} />
          <Label className="label">Email</Label>
        </InputWrapper>
        {error && <Error {...{ switchScreen, error }} />}
        <Button disabled={error ? true : false} name="SEND OTP" />
      </form>
    </EmailWrapper>
  );
};
