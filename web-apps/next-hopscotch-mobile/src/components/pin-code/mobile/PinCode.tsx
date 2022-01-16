import React, { FC, useState } from 'react';
import { IPinCodeAPIResponseProps, IAllAddressItemsEntityProps, IPinCodeErrorProps, IPinCodeProps } from '../IPinCode';
import {
  PinCodeWrapper,
  PinCodeContainer,
  EnterPinCode,
  ErrorMessage,
  PinCodeForm,
  PinCodeSubmit,
  Loading,
  Header,
  DeliveryAddressesContainer,
  CloseIconWrapper,
  CloseIcon,
  Address,
  Title,
  Name,
  InputWrapper,
  InputField,
  Label,
} from './StyledPinCode';
import { IconClose } from '@hs/icons';
import { formatPinCode } from '@hs/framework';

export const PinCodeMobile: FC<IPinCodeProps> = ({
  address,
  pinCode,
  isAddressLoading,
  isPinCodeLoading,
  closePopup,
  checkPinCode,
  errorPinCode,
}: IPinCodeProps) => {
  const [error, setError] = useState<IPinCodeAPIResponseProps | IPinCodeErrorProps | undefined>();
  const [pin, setPincode] = useState<string>(formatPinCode(pinCode, pinCode) || '');
  const hasAddress = (address && address.length) || 0;

  const onSubmit = (event: React.SyntheticEvent) => {
    event && event.preventDefault();
    setError({ message: '' });
    checkPinCode(pin.toString().replace(/\D/g, ''));
  };

  return (
    <PinCodeWrapper>
      <Header>
        <Title> {hasAddress ? 'Edit' : 'Check'} Pincode</Title>
        <CloseIconWrapper onClick={closePopup}>
          <CloseIcon icon={IconClose} />
        </CloseIconWrapper>
      </Header>
      <PinCodeContainer>
        {hasAddress > 0 && (
          <>
            <Title>Select an address</Title>
            <DeliveryAddressesContainer>
              {address &&
                address.map((addr: IAllAddressItemsEntityProps, index: number) => {
                  return (
                    <Address
                      key={index}
                      onClick={() => {
                        if (addr.isServicable) {
                          const pin = addr.zipCode || pinCode;
                          if (pin) {
                            checkPinCode(pin);
                          } else {
                            setError({ message: 'Please enter pincode.' });
                          }
                        }
                      }}
                    >
                      <Name>{addr.name}</Name>
                      {addr.city + ' - ' + addr.zipCode}
                    </Address>
                  );
                })}
            </DeliveryAddressesContainer>
          </>
        )}
        {isAddressLoading && <Loading>Loading address...</Loading>}
        <EnterPinCode>{hasAddress ? 'Or, enter your pincode' : 'Enter your pincode'}</EnterPinCode>
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
          <PinCodeSubmit disabled={pin.length < 7 || isPinCodeLoading} type="submit">
            Check
          </PinCodeSubmit>
          {error && error.message && <ErrorMessage>{error.message}</ErrorMessage>}
          {errorPinCode && errorPinCode.message && <ErrorMessage>{errorPinCode.message}</ErrorMessage>}
        </PinCodeForm>
      </PinCodeContainer>
    </PinCodeWrapper>
  );
};
