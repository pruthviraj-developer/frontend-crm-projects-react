import React, { FC, useState } from 'react';
import { FORM_ERROR_CODES, REGEX_PATTERNS } from '../constants';
import { IUserProps, ILoginErrorMessageBar, ILoginErrorResponse } from '../ILoginModal';
import { MobileWrapper, InputWrapper, InputField, Label } from './StyledMobile';

import { productDetailsService } from '@hs/services';
import { Button, Error, Loader } from '../common';

const reason = { otpReason: 'SIGN_IN', type: 'SMS' };

export const Mobile: FC<IUserProps> = ({ updateForm, switchScreen }: IUserProps) => {
  const [loginId, setLoginId] = useState('');
  const [error, setErrorState] = useState<ILoginErrorMessageBar | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    validateUserMobile();
  };

  const validateUserMobile = () => {
    let error: ILoginErrorMessageBar | null = null;
    const setErrorMessage = (type: string, msg?: string) => {
      error = {
        messageType: 'error',
        message: msg || FORM_ERROR_CODES[type.toUpperCase()],
      };
    };
    let pattern = new RegExp(REGEX_PATTERNS['MOBILE']);
    if (!loginId) {
      setErrorMessage('mobile', 'Required');
    } else if (loginId.length < 10) {
      setErrorMessage('mobile', "Check if you've entered a 10 digit Indian mobile number");
    } else if (!pattern.test(loginId)) {
      setErrorMessage('mobile');
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
    if (value.trim().length > 10) {
      setLoginId(loginId);
      return;
    }
    setLoginId(e.target.value);
    setErrorState(null);
  };

  return (
    <MobileWrapper>
      {loading && <Loader />}
      <form
        onSubmit={(e) => {
          return submitForm(e);
        }}
        noValidate
      >
        <InputWrapper>
          <InputField type="text" value={loginId} onChange={handleOnChange} />
          <Label className="label">Mobile Number</Label>
        </InputWrapper>
        {error && <Error {...{ switchScreen, error }} />}
        <Button disabled={loginId.length != 10} name="SEND OTP" />
      </form>
    </MobileWrapper>
  );
};
