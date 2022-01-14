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
import { IPinCodeProps, IPinCodeAPIResponseProps, IPinCodeErrorProps, IAllAddressItemsEntityProps } from '../IPinCode';
import { IconDismiss } from '@hs/icons';
import { productDetailsService } from '@hs/services';
import { formatPinCode } from '@hs/framework';
// const SUCCESS = 'success';
export const PinCodeDesktop: FC<IPinCodeProps> = ({
  address,
  pinCode,
  productId,
  isAddressLoading,
  closePinCodePopup,
}: IPinCodeProps) => {
  const [error, setError] = useState<IPinCodeAPIResponseProps | IPinCodeErrorProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pin, setPincode] = useState<string>(formatPinCode(pinCode, pinCode) || '');
  const checkPinCodeDetails = (pin: string) => {
    (async () => {
      if (pin === pinCode) {
        closePinCodePopup();
        return;
      }
      try {
        setIsLoading(true);
        const response: IPinCodeAPIResponseProps = await productDetailsService.checkForPincode({
          productId,
          pincode: pin,
        });
        setIsLoading(false);
        if (!response.serviceable) {
          setError({ ...response, message: response.noPinCodeMessage });
        } else {
          closePinCodePopup({ ...response, newPincode: pin });
        }
      } catch (error) {
        setError(error as unknown as IPinCodeAPIResponseProps);
        setIsLoading(false);
      }
    })();
  };

  const hasAddress = (address && address.length) || 0;

  const onSubmit = (event: React.SyntheticEvent) => {
    event && event.preventDefault();
    checkPinCodeDetails(pin.toString().replace(/\D/g, ''));
  };

  return (
    <PinCodeWrapper>
      <Header>{hasAddress > 0 ? 'Edit' : 'Check'} pincode</Header>
      <ModalClose>
        <IconClose icon={IconDismiss} onClick={closePinCodePopup} />
      </ModalClose>
      <PinCodeBody>
        {hasAddress > 0 && (
          <>
            <Title>Select an address</Title>
            <DeliveryAddressesContainer>
              {address &&
                address.map((address: IAllAddressItemsEntityProps, index: number) => {
                  return (
                    <Address
                      key={index}
                      onClick={() => {
                        if (address.isServicable) {
                          const pin = address.zipCode || pinCode;
                          if (pin) {
                            checkPinCodeDetails(pin);
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
                })}
            </DeliveryAddressesContainer>
          </>
        )}
        {isAddressLoading && <Loading>Loading address...</Loading>}
        <Title>{hasAddress ? 'Or, enter your pincode' : 'Enter your pincode'}</Title>

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
          <Check disabled={pin.length < 7 || isLoading} type="submit">
            Check
          </Check>
        </PinCodeForm>
        {error && error.message && <ErrorMessage>{error.message}</ErrorMessage>}
      </PinCodeBody>
    </PinCodeWrapper>
  );
};
