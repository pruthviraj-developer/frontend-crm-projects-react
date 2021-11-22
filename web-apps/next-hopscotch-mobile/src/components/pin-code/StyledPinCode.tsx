import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const PinCodeWrapper = styled.span`
  position: fixed;
  max-width: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: ${Colors.WHITE};
`;

const Header = styled.div`
  padding: 16px 0;
  border: solid 1px #e6e6e6;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  position: relative;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate(0, -50%);
  display: inline-flex;
`;

const CloseIcon = styled(SvgIcon)`
  opacity: 0.5;
`;

const Title = styled.div`
  color: #333;
  font-weight: ${typography.weight.medium};
`;

const PinCodeContainer = styled.div`
  padding: 24px;
`;

const EnterPinCode = styled.div`
  font-weight: 600;
  color: #333;
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
  /* font-size: 14px; */
`;

const Name = styled.div`
  margin-bottom: 4px;
`;

const PinCodeNumber = styled.input`
  width: 100%;
  max-width: 173px;
  display: inline-block;
  vertical-align: middle;
  height: 48px;
  line-height: 20px;
  padding: 12px;
  border-radius: 4px;
  background-color: #eff1f4;
  border: transparent;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
`;

const PinCodeForm = styled.form`
  padding-top: 12px;
`;

const PinCodeSubmit = styled.button<{ disabled: boolean }>`
  background-color: #ed54a4;
  opacity: 1;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.6)' : '#fff')};
  margin-left: 8px;
  border: none;
  width: 91px;
  display: inline-block;
  vertical-align: middle;
  /* font-size: 14px; */
  line-height: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  border-radius: 4px;
  padding: 16px;
`;

const ErrorMessage = styled.div`
  margin-top: 0px;
  margin-right: 12px;
  margin-bottom: 12px;
  margin-left: 12px;
  color: #f44;
  font-size: 1.2rem;
  line-height: 16px;
`;

const Loading = styled.div`
  font-size: 1.8rem;
  line-height: 16px;
  color: ${Colors.PINK[500]};
`;

export {
  PinCodeWrapper,
  PinCodeContainer,
  DeliveryAddressesContainer,
  EnterPinCode,
  ErrorMessage,
  PinCodeNumber,
  PinCodeForm,
  PinCodeSubmit,
  Loading,
  Header,
  CloseIconWrapper,
  CloseIcon,
  Title,
  Name,
  Address,
};
