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
  const getDefaultString = (val: string) => {
    return val.replace(/\D/g, '');
  };

  const setFormatedValue = (val?: string, pin?: string) => {
    if (val) {
      const value = getDefaultString(val).replace(/^0+/, '');
      if (value.length === 3 && pin && pin.length === 4) {
        return value.substr(0, 2);
      } else if (value.length > 6 && value[0] !== '0') {
        return value.substr(0, 3) + '-' + value.substr(3, 3);
      } else if (value.length > 2) {
        return value.substr(0, 3) + '-' + value.substr(3);
      } else {
        return value;
      }
    }
    return '';
  };
  const [pin, setPincode] = useState<string>(setFormatedValue(pincode, pincode) || '');

  const onSubmit = (event: React.SyntheticEvent) => {
    event && event.preventDefault();
    console.log(getDefaultString(pin));
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
                setPincode(setFormatedValue(event.target.value, pin));
              }}
            />
            <Label className="label">Pincode</Label>
          </InputWrapper>
          <Check>Check</Check>
        </PinCodeForm>
        <ErrorMessage>We’re unable to ​ship to 565656</ErrorMessage>
      </PinCodeBody>
    </PinCodeWrapper>
  );
};
export default SizeSelector;
