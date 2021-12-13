import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const PinCodeWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 480px;
  border-radius: 4px;
  background-color: ${Colors.WHITE};
  transform: translate(0px, -50%);
`;
const Header = styled.div`
  color: #333;
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  border: solid 1px #e6e6e6;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const ModalClose = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  transform: translate(-12px, 50%);
`;

const IconClose = styled(SvgIcon)``;

const PinCodeBody = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  color: #333;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
`;

const ErrorMessage = styled.div`
  color: #f44;
  margin: 0 12px 12px;
`;

const Check = styled.button`
  border: 0;
  color: #fff;
  padding: 16px;
  cursor: pointer;
  font-weight: 600;
  margin-left: 8px;
  font-size: 1.4rem;
  line-height: 16px;
  border-radius: 4px;
  background-color: #ed54a4;
`;

const PinCodeForm = styled.form`
  padding: 12px 0 8px 0;
  display: flex;
`;

const Label = styled.label`
  pointer-events: none;
  position: absolute;
  font-size: 14px;
  line-height: 14px;
  left: 12px;
  top: 18px;
  transition: 0.2s ease all;
  color: #a4a4a4;
`;

const InputField = styled.input`
  height: 48px;
  width: 173px;
  padding: 12px 16px;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #f44;

  &:focus + ${Label} {
    display: none;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

export {
  PinCodeWrapper,
  Header,
  ModalClose,
  IconClose,
  PinCodeBody,
  Title,
  ErrorMessage,
  Check,
  PinCodeForm,
  InputField,
  InputWrapper,
  Label,
};
