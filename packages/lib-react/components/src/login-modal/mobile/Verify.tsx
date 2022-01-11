import React, { FC, useState, useContext } from 'react';
import { productDetailsService } from '@hs/services';
import { IconErrorMessage, IconInfoMessage } from '@hs/icons';
import { LoginContext } from '@hs/framework';
import { REGEX_PATTERNS, SIGNUP, SIGNIN } from '../constants';
import { ILoginErrorResponse, ILoginErrorMessageBar } from './IVerify';
import { IVerifiedDataProps } from '../ILoginModal';
import {
  ChangeNumber,
  VerifyWrapper,
  LoggedInBy,
  OtpboxWrapper,
  OtpContainer,
  OtpSeperator,
  Resend,
  MessageWrapper,
  ErrorMessage,
  ErrorIcon,
  VerifyDetails,
} from './StyledVerify';
import { Loader } from '../common';
const OTP_LENGTH = 6;
export const Verify: FC<IVerifiedDataProps> = ({
  back,
  name,
  type,
  from,
  email,
  message,
  phoneNo,
  loginId,
  otpReason,
}: IVerifiedDataProps) => {
  const [otp, setOtp] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { verifyOtp } = useContext(LoginContext);
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setErrorState] = useState<ILoginErrorMessageBar | undefined>();
  const convertForUI = (str = '') => {
    const pattern = new RegExp(REGEX_PATTERNS.REGEX_MOBILE_NO);
    if (pattern.test(str)) {
      return '+91 ' + str.slice(0, 5) + ' ' + str.slice(5);
    } else {
      return str;
    }
  };
  let interval: ReturnType<typeof setInterval>;

  const resetVariables = () => {
    setOtp('');
    setCounter(30);
    runTimer();
  };
  const resendOtp = () => {
    setSuccess(undefined);
    setErrorState(undefined);
    if (from === SIGNUP) {
      (async () => {
        try {
          setLoading(true);
          const response: ILoginErrorResponse =
            await productDetailsService.signUp({
              email,
              name,
              otpReason,
              phoneNo,
            });
          setLoading(false);
          if (response.action === 'success') {
            resetVariables();
            setSuccess(response.messageBar.message || response?.textMessage);
          } else {
            setErrorState(response.messageBar);
          }
        } catch (error) {
          setLoading(false);
          const errorResponse = error as unknown as ILoginErrorResponse;
          setErrorState(errorResponse.messageBar);
        }
      })();
    } else {
      (async () => {
        try {
          setLoading(true);
          clearInterval(interval);
          const response: ILoginErrorResponse =
            await productDetailsService.sendOtp({
              type,
              loginId,
              otpReason: 'SIGN_IN',
            });
          setLoading(false);
          if (response.action === 'success') {
            resetVariables();
            setSuccess(response.messageBar.message);
          } else {
            setErrorState(response.messageBar);
          }
        } catch (error) {
          const errorRespone = error as unknown as ILoginErrorResponse;
          setLoading(false);
          setCounter(0);
          setErrorState(errorRespone.messageBar);
        }
      })();
    }
  };

  const runTimer = () => {
    let count = 30;
    interval = setInterval(() => {
      count--;
      setCounter(count);
      if (count === 0) {
        clearInterval(interval);
        return;
      }
    }, 1000);
  };

  const validateOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const otplength = value.length;
    if (otplength <= OTP_LENGTH) {
      setOtp(e.target.value);
      if (otplength === OTP_LENGTH) {
        setSuccess(undefined);
        setErrorState(undefined);
        (async () => {
          try {
            setLoading(true);
            const response = await verifyOtp({
              loginId,
              otpReason,
              otp: value,
            });
            setLoading(false);
            if (response.action === 'success' && response.isLoggedIn) {
              back && back(true);
            } else {
              setErrorState(response.messageBar);
            }
          } catch (error) {
            setLoading(false);
            const errorResponse = error as unknown as ILoginErrorMessageBar;
            setErrorState(errorResponse);
          }
        })();
      }
    }
  };
  return (
    <VerifyWrapper>
      {loading && <Loader />}
      {error && (
        <MessageWrapper>
          <ErrorIcon icon={IconErrorMessage} />
          <ErrorMessage>{error.message}</ErrorMessage>
        </MessageWrapper>
      )}
      {success && (
        <MessageWrapper active={true}>
          <ErrorIcon icon={IconInfoMessage} />
          <ErrorMessage>{success}</ErrorMessage>
        </MessageWrapper>
      )}
      <VerifyDetails>
        <div>
          {message ||
            `Enter the OTP sent to your ${type == 'SMS' ? 'number' : 'email'}`}
        </div>
        <LoggedInBy> {convertForUI(loginId)} &nbsp;</LoggedInBy>
        <ChangeNumber
          onClick={() => {
            back && back(SIGNIN);
          }}
        >
          Change
        </ChangeNumber>
        <OtpboxWrapper>
          <OtpContainer>
            {Array(OTP_LENGTH)
              .fill(0)
              .map((_, index: number) => (
                <OtpSeperator
                  key={index}
                  show={otp.length <= index}
                ></OtpSeperator>
              ))}
            <input
              type="number"
              onChange={validateOtp}
              auto-complete="off"
              value={otp}
            />
          </OtpContainer>
        </OtpboxWrapper>
        {counter > 0 && (
          <Resend convertText={false}>Resend OTP in &nbsp;{counter}s</Resend>
        )}
        {counter === 0 && (
          <Resend convertText={true} onClick={resendOtp}>
            Resend otp
          </Resend>
        )}
      </VerifyDetails>
    </VerifyWrapper>
  );
};
