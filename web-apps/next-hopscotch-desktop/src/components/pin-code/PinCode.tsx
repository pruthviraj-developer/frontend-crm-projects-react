import React, { FC, useState } from 'react';
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
  InputWrapper,
  Label,
} from './StyledPinCode';
import { IPinCodeProps } from './IPinCode';
import { IconDismiss } from '@hs/icons';

const SizeSelector: FC<IPinCodeProps> = ({ pincode, closePinCodePopup }: IPinCodeProps) => {
  const [pin, setPincode] = useState<string>(pincode || '');
  const onSubmit = (event) => {
    event && event.preventDefault();
    console.log(pin);
  };
  return (
    <PinCodeWrapper>
      <Header>Check pincode</Header>
      <ModalClose>
        <IconClose icon={IconDismiss} onClick={closePinCodePopup} />
      </ModalClose>
      <PinCodeBody>
        <Title>Enter your pincode</Title>
        <PinCodeForm onSubmit={onSubmit}>
          <InputWrapper>
            <InputField
              value={pin}
              onChange={(event) => {
                setPincode(event.target.value);
              }}
            />
            <Label className="label">PinCode</Label>
          </InputWrapper>
          <Check>Check</Check>
        </PinCodeForm>
        <ErrorMessage>We’re unable to ​ship to 565656</ErrorMessage>
      </PinCodeBody>
    </PinCodeWrapper>
  );
};
export default SizeSelector;
