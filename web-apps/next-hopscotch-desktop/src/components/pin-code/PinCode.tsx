import React, { FC } from 'react';
import {
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
} from './StyledPinCode';
import { IPinCodeProps } from './IPinCode';
import { IconDismiss } from '@hs/icons';

const SizeSelector: FC<IPinCodeProps> = ({ pincode, closePinCodePopup }: IPinCodeProps) => {
  return (
    <PinCodeWrapper>
      <Header>Check pincode</Header>
      <ModalClose>
        <IconClose icon={IconDismiss} onClick={closePinCodePopup} />
      </ModalClose>
      <PinCodeBody>
        <Title>Enter your pincode</Title>
        <PinCodeForm>
          <InputField placeholder="PinCode" />
          <Check>Check</Check>
        </PinCodeForm>
        <ErrorMessage>We’re unable to ​ship to 565656</ErrorMessage>
      </PinCodeBody>
    </PinCodeWrapper>
  );
};
export default SizeSelector;
