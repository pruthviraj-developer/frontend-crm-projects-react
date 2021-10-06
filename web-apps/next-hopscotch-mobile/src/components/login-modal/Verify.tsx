import React, { FC, useState } from 'react';
import { productDetailsService } from '@hs/services';
import { IconErrorMessage } from '@hs/icons';
import { REGEX_PATTERNS } from './constants';
import { IVerifiedDataProps, ILoginErrorResponse, ILoginErrorMessageBar, IVerifyOtpResponeProps } from './ILoginModal';
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
import { Loader } from './loader';
const OTP_LENGTH = 6;
export const Verify: FC<IVerifiedDataProps | any> = (props: IVerifiedDataProps) => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setErrorState] = useState<ILoginErrorMessageBar | null>(null);
  const convertForUI = (str = '') => {
    let pattern = new RegExp(REGEX_PATTERNS.REGEX_MOBILE_NO);
    if (pattern.test(str)) {
      return '+91 ' + str.slice(0, 5) + ' ' + str.slice(5);
    } else {
      return str;
    }
  };

  const resendOtp = () => {
    (async () => {
      try {
        setLoading(true);
        const response: ILoginErrorResponse = await productDetailsService.sendOtp({
          ...props,
          type: undefined,
        });
        setLoading(false);
        if (response.action === 'success') {
          setOtp('');
          setErrorState(null);
        } else {
          setErrorState(response.messageBar);
        }
      } catch (error) {
        const errorRespone = error as unknown as ILoginErrorResponse;
        setLoading(false);
        setErrorState(errorRespone.messageBar);
      }
    })();
  };

  const validateOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const otplength = value.length;
    if (otplength <= OTP_LENGTH) {
      setOtp(e.target.value);
      if (otplength === OTP_LENGTH) {
        (async () => {
          try {
            setLoading(true);
            const verifyOtpResponse: IVerifyOtpResponeProps = await productDetailsService.verifyOtp({
              ...props,
              otp,
              type: undefined,
            });
            setLoading(false);
            if (verifyOtpResponse.action === 'success') {
            } else {
              setErrorState(verifyOtpResponse.messageBar);
            }
          } catch (error) {
            const errorRespone = error as unknown as IVerifyOtpResponeProps;
            setLoading(false);
            setErrorState(errorRespone.messageBar);
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
      <VerifyDetails>
        <div>Enter the OTP sent to your {props.type == 'SMS' ? 'number' : 'email'}</div>
        <LoggedInBy> {convertForUI(props.loginId)} &nbsp;</LoggedInBy>
        <ChangeNumber onClick={props.back}>Change</ChangeNumber>
        <OtpboxWrapper>
          <OtpContainer>
            {[...Array(OTP_LENGTH)].map((x, i) => (
              <OtpSeperator show={otp.length <= i}></OtpSeperator>
            ))}
            <input type="number" onChange={validateOtp} auto-complete="off" value={otp} />
          </OtpContainer>
        </OtpboxWrapper>
        <Resend onClick={resendOtp}>Resend otp</Resend>
      </VerifyDetails>
    </VerifyWrapper>
  );
};
