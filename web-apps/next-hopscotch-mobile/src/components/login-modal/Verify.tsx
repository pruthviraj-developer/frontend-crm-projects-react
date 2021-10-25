import React, { FC, useState, useContext } from 'react';
import { productDetailsService, cookiesService, timeService } from '@hs/services';
import { IconErrorMessage } from '@hs/icons';
import { LoginContext, COOKIE_DATA } from '@hs/framework';
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
export const Verify: FC<IVerifiedDataProps> = ({ back, type, ...props }: IVerifiedDataProps) => {
  const [otp, setOtp] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { updateLoginPopup } = useContext(LoginContext);
  const [error, setErrorState] = useState<ILoginErrorMessageBar | null>(null);
  const convertForUI = (str = '') => {
    const pattern = new RegExp(REGEX_PATTERNS.REGEX_MOBILE_NO);
    if (pattern.test(str)) {
      return '+91 ' + str.slice(0, 5) + ' ' + str.slice(5);
    } else {
      return str;
    }
  };
  let interval: ReturnType<typeof setInterval>;
  const resendOtp = () => {
    (async () => {
      try {
        setLoading(true);
        clearInterval(interval);
        const response: ILoginErrorResponse = await productDetailsService.sendOtp({
          ...props,
        });
        setLoading(false);
        if (response.action === 'success') {
          setOtp('');
          setCounter(30);
          runTimer();
          setErrorState(null);
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
        (async () => {
          try {
            setLoading(true);
            const response: IVerifyOtpResponeProps = await productDetailsService.verifyOtp({
              ...props,
              otp: value,
            });
            setLoading(false);
            if (response.action === 'success' && response.isLoggedIn) {
              const setCookie = (key: string, value: any) => {
                const expireProp = {
                  expires: new Date(timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000),
                };
                cookiesService.setCookies({
                  key,
                  value,
                  options: expireProp,
                });
              };
              setCookie(COOKIE_DATA.CUSTOMER_INFO, response);
              setCookie(COOKIE_DATA.PERSISTENT_TICKET, response.persistentTicket);
              if (response.cartItemQty) {
                setCookie(COOKIE_DATA.CART_ITEM_QTY, response.cartItemQty);
              }
              updateLoginPopup(false);
              back && back(response.cartItemQty);
            } else {
              setErrorState(response.messageBar);
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
        <div>Enter the OTP sent to your {type == 'SMS' ? 'number' : 'email'}</div>
        <LoggedInBy> {convertForUI(props.loginId)} &nbsp;</LoggedInBy>
        <ChangeNumber
          onClick={() => {
            back && back();
          }}
        >
          Change
        </ChangeNumber>
        <OtpboxWrapper>
          <OtpContainer>
            {[...Array(OTP_LENGTH)].map((x, index: number) => (
              <OtpSeperator key={index} show={otp.length <= index}></OtpSeperator>
            ))}
            <input type="number" onChange={validateOtp} auto-complete="off" value={otp} />
          </OtpContainer>
        </OtpboxWrapper>
        {counter > 0 && <Resend convertText={false}>Resend OTP in &nbsp;{counter}s</Resend>}
        {counter === 0 && (
          <Resend convertText={true} onClick={resendOtp}>
            Resend otp
          </Resend>
        )}
      </VerifyDetails>
    </VerifyWrapper>
  );
};
