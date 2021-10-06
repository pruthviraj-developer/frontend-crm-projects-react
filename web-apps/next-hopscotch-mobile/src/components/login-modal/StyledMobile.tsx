import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const ActionText = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-decoration: underline;
  padding-left: 4px;
`;

const ErrorIcon = styled(SvgIcon)`
  min-width: 24px;
`;

const MobileWrapper = styled.div`
  postion: relative;
`;

const MobileNumber = styled.input`
  width: 100%;
  height: 48px;
  line-height: 20px;
  padding: 12px;
  border-radius: 4px;
  background-color: #eff1f4;
  border: transparent;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
`;

const Button = styled.button`
  color: #fff;
  border: 0;
  width: 100%;
  min-height: 48px;
  background-color: #ed54a4;
  border-radius: 4px;
  text-align: center;
  letter-spacing: 0.4px;
  font: inherit;
  text-transform: uppercase;
  line-height: 1.14;
  font-size: 14px;
  font-weight: 700;
  margin-top: 12px;
`;

const MessageWrapper = styled.div`
  padding: 8px 12px 0;
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.span`
  margin-left: 8px;
  display: inline-block;
  color: #eb1000;
  font-size: 12px;
`;

export { ActionText, MobileWrapper, MobileNumber, MessageWrapper, Button, ErrorIcon, ErrorMessage };
