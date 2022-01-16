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
  Loading,
  DeliveryAddressesContainer,
  Address,
  Name,
} from './StyledPinCode';

import {
  IPinCodeProps,
  IPinCodeErrorProps,
  IPinCodeAPIResponseProps,
  IAllAddressItemsEntityProps,
} from '../IPinCode';
import { IconDismiss } from '@hs/icons';
import { formatPinCode } from '@hs/framework';
export const PinCodeDesktop: FC<IPinCodeProps> = ({
  address,
  pinCode,
  isAddressLoading,
  isPinCodeLoading,
  closePopup,
  checkPinCode,
  errorPinCode,
}: IPinCodeProps) => {
  const [error, setError] = useState<
    IPinCodeAPIResponseProps | IPinCodeErrorProps | undefined
  >();
  const [pin, setPincode] = useState<string>(
    formatPinCode(pinCode, pinCode) || ''
  );
  const hasAddress = (address && address.length) || 0;

  const onSubmit = (event: React.SyntheticEvent) => {
    event && event.preventDefault();
    setError({ message: '' });
    checkPinCode(pin.toString().replace(/\D/g, ''));
  };

  return (
    <PinCodeWrapper>
      <Header>{hasAddress > 0 ? 'Edit' : 'Check'} pincode</Header>
      <ModalClose>
        <IconClose icon={IconDismiss} onClick={closePopup} />
      </ModalClose>
      <PinCodeBody>
        {hasAddress > 0 && (
          <>
            <Title>Select an address</Title>
            <DeliveryAddressesContainer>
              {address &&
                address.map(
                  (address: IAllAddressItemsEntityProps, index: number) => {
                    return (
                      <Address
                        key={index}
                        onClick={() => {
                          if (address.isServicable) {
                            const pin = address.zipCode || pinCode;
                            if (pin) {
                              checkPinCode(pin);
                            } else {
                              setError({ message: 'Please enter pincode.' });
                            }
                          }
                        }}
                      >
                        <Name>{address.name}</Name>
                        {address.city + ' - ' + address.zipCode}
                      </Address>
                    );
                  }
                )}
            </DeliveryAddressesContainer>
          </>
        )}
        {isAddressLoading && <Loading>Loading address...</Loading>}
        <Title>
          {hasAddress ? 'Or, enter your pincode' : 'Enter your pincode'}
        </Title>

        <PinCodeForm onSubmit={onSubmit}>
          <InputWrapper>
            <InputField
              value={pin}
              onChange={(event) => {
                setPincode(formatPinCode(event.target.value, pin));
              }}
            />
            <Label className="label">Pincode</Label>
          </InputWrapper>
          <Check disabled={pin.length < 7 || isPinCodeLoading} type="submit">
            Check
          </Check>
        </PinCodeForm>
        {error && error.message && <ErrorMessage>{error.message}</ErrorMessage>}
        {errorPinCode && errorPinCode.message && (
          <ErrorMessage>{errorPinCode.message}</ErrorMessage>
        )}
      </PinCodeBody>
    </PinCodeWrapper>
  );
};
