import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const VerifyWrapper = styled.div`
  postion: relative;
  margin-top: 20px;
  text-align: center;
  margin-bottom: 16px;
`;

const LoggedInBy = styled.span`
  font-weight: 600;
`;

const ChangeNumber = styled.span`
  color: #000;
  font-size: 14px;
  text-decoration: underline;
  opacity: 0.56;
  letter-spacing: 0.2px;
`;

const OtpboxWrapper = styled.div`
  margin: 24px 0 0;
`;

const OtpContainer = styled.div`
  height: 48px;
  width: 190px;
  background-color: #eff1f4;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  input {
    height: inherit;
    width: 208px;
    background-color: transparent;
    border: 1px solid transparent;
    outline: transparent;
    letter-spacing: 15px;
    font-size: 24px;
    padding-left: 16px;
    position: absolute;
  }
`;

const OtpSeperator = styled.div<{ show: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: #dfe1e6;
  border: 1px solid #dfe1e6;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

const Resend = styled.button`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.14;
  letter-spacing: 0.4px;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  color: rgba(0, 0, 0, 0.56);
  padding: 10px 12px;
  border: none;
  margin-top: 6px;
  background: none;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #ffe0e0;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.span`
  margin-left: 16px;
  color: #000;
  font-size: 12px;
  text-align: left;
  line-height: 16px;
`;

const ErrorIcon = styled(SvgIcon)`
  min-width: 24px;
`;

const VerifyDetails = styled.div`
  padding-top: 12px;
`;
export {
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
};
