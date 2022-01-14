import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const PinCodeWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 480px;
  border-radius: 4px;
  background-color: ${Colors.WHITE};
  transform: translate(0px, -28px);
`;

const Header = styled.div`
  color: #333;
  padding: 16px;
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
  font-weight: 600;
  line-height: 16px;
`;

const ErrorMessage = styled.div`
  color: #f44;
  font-size: 1.2rem;
  margin: 0 12px 12px;
`;

const Check = styled.button<{ disabled: boolean }>`
  border: 0;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.6)' : '#fff')};
  padding: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 600;
  margin-left: 8px;
  /* font-size: 1.4rem; */
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
  /* font-size: 14px; */
  line-height: 14px;
  left: 12px;
  top: 18px;
  transition: 0.2s ease all;
  color: #a4a4a4;
`;

const InputField = styled.input`
  height: 48px;
  width: 173px;
  outline: none;
  padding: 16px 16px 0 12px;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #e6e6e6;
  &:focus + .label {
    top: 10px;
  }
  &:not([value='']) + .label {
    top: 10px;
  }
  &:hover {
    border: 1px solid #a4a4a4;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const DeliveryAddressesContainer = styled.div`
  padding: 12px 0 24px;
  white-space: nowrap;
  overflow: scroll;
`;

const Address = styled.div`
  display: inline-block;
  border: 1px solid #a4a4a4;
  border-radius: 4px;
  font-weight: 400;
  color: #707070;
  margin-right: 8px;
  padding: 16px;
  cursor: pointer;
  /* font-size: 1.4rem; */
  line-height: 16px;
  &:hover {
    color: #ed54a4;
    border-color: #e6e6e6;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  }
`;

const Name = styled.div`
  margin-bottom: 4px;
`;

const Loading = styled.div`
  font-size: 1.8rem;
  line-height: 16px;
  color: ${Colors.PINK[500]};
`;

export {
  Name,
  Check,
  Title,
  Label,
  Header,
  Address,
  Loading,
  IconClose,
  ModalClose,
  InputField,
  PinCodeBody,
  PinCodeForm,
  InputWrapper,
  ErrorMessage,
  PinCodeWrapper,
  DeliveryAddressesContainer,
};
