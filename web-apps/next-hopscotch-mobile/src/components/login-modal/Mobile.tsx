import React, { FC, useState } from 'react';
import { FORM_ERROR_CODES, REGEX_PATTERNS } from './constants';
import { IMobileProps } from './ILoginModal';
import { MobileWrapper, MobileNumber, Button, MessageWrapper, ErrorMessage, ErrorIcon } from './StyledMobile';

import { IconErrorMessage } from '@hs/icons';

export const Mobile: FC<IMobileProps> = ({}: IMobileProps) => {
  const [loginId, setLoginId] = useState('');
  const [error, setErrorState] = useState(null);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    validateUserMobile();
  };

  const validateUserMobile = () => {
    let error = null;
    const setErrorMessage = (type: string, msg?: string) => {
      error = {
        messageType: 'error',
        message: msg || FORM_ERROR_CODES[type.toUpperCase()],
      };
    };
    if (!loginId) {
      setErrorMessage('mobile', 'Required');
    } else if (loginId.length < 10) {
      setErrorMessage('mobile', "Check if you've entered a 10 digit Indian mobile number");
    } else if (!REGEX_PATTERNS.MOBILE.test(loginId)) {
      setErrorMessage('mobile');
    }
    setErrorState(error);
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
      <form
        onSubmit={(e) => {
          return submitForm(e);
        }}
        noValidate
      >
        <MobileNumber value={loginId} onChange={handleOnChange} placeholder="Mobile Number" />
        {error && (
          <MessageWrapper>
            <ErrorIcon icon={IconErrorMessage} />
            <ErrorMessage> {error && error['message']} </ErrorMessage>
          </MessageWrapper>
        )}
        <Button type="submit">SEND OTP</Button>
      </form>
    </MobileWrapper>
  );
};
