import React, { FC, useState } from 'react';
import { FORM_ERROR_CODES, REGEX_PATTERNS } from './constants';
import { IMobileProps, ILoginErrorResponse, ILoginErrorMessageBar, IVerifiedDataProps } from './ILoginModal';
import {
  ActionText,
  MobileWrapper,
  MobileNumber,
  Button,
  MessageWrapper,
  ErrorMessage,
  ErrorIcon,
} from './StyledMobile';

import { IconErrorMessage } from '@hs/icons';
import { productDetailsService } from '@hs/services';

const reason = { otpReason: 'SIGN_IN', type: 'SMS' };

export const Mobile: FC<IMobileProps> = ({ updateForm }: IMobileProps) => {
  const [loginId, setLoginId] = useState('');
  const [error, setErrorState] = useState<ILoginErrorMessageBar | null>(null);

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
    if (!error) {
      sendOtp();
    }
  };

  const sendOtp = () => {
    (async () => {
      try {
        const response: ILoginErrorResponse = await productDetailsService.sendOtp({
          loginId,
          ...reason,
        });
        if (response.action === 'success') {
          updateForm({
            loginId,
            ...reason,
          });
        } else {
          setErrorState(response.messageBar);
        }
      } catch (error) {
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

  const action = () => {
    if (error && error.actionLink) {
      window.location.href = `${window.location.protocol}//${window.location.host}/${error.actionLink}`;
    }
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
          <MessageWrapper onClick={action}>
            <ErrorIcon icon={IconErrorMessage} />
            <ErrorMessage>
              {error.message}
              {error.actionLink && <ActionText>{error.actionText}</ActionText>}
            </ErrorMessage>
          </MessageWrapper>
        )}
        <Button type="submit">SEND OTP</Button>
      </form>
    </MobileWrapper>
  );
};
