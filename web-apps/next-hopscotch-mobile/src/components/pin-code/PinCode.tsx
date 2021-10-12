import React, { FC, useState, useEffect } from 'react';
import { IPinCodeAPIResponseProps, IPinCodeProps, IPinCodeErrorProps } from './IPinCode';
import {
  PinCodeWrapper,
  PinCodeContainer,
  EnterPinCode,
  ErrorMessage,
  PinCodeNumber,
  PinCodeForm,
  PinCodeSubmit,
  Header,
  DeliveryAddressesContainer,
  CloseIconWrapper,
  CloseIcon,
  Address,
  Title,
  Name,
} from './StyledPinCode';
import { IconClose } from '@hs/icons';
import { IAddressListProps, IAllAddressItemsEntityProps } from '@/types';
import { productDetailsService } from '@hs/services';
const SUCCESS = 'success';
const PinCode: FC<IPinCodeProps> = ({ productId, pinCode, closePinCodePopup }: IPinCodeProps) => {
  const [pincode, setPinCode] = useState<string>('');
  const [error, setError] = useState<IPinCodeAPIResponseProps | IPinCodeErrorProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<IAllAddressItemsEntityProps[]>([]);

  const checkPinCodeDetails = (pincode: string) => {
    (async () => {
      if (pinCode === pincode) {
        closePinCodePopup();
        return;
      }
      try {
        setIsLoading(true);
        const response: IPinCodeAPIResponseProps = await productDetailsService.checkForPincode({ productId, pincode });
        setIsLoading(false);
        if (!response.serviceable) {
          setError({ ...response, message: response.noPinCodeMessage });
        } else {
          closePinCodePopup({ ...response, newPincode: pincode });
        }
      } catch (error) {
        setError(error as unknown as IPinCodeAPIResponseProps);
        setIsLoading(false);
      }
    })();
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    checkPinCodeDetails(pincode);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getOnlyNumbers = (value: string) => {
      return value.toString().replace(/\D/g, '');
    };

    const value = getOnlyNumbers(e.target.value || '');

    if (value.length === 6 && value.toString()[0] !== '0') {
      setPinCode(value);
    } else if (value.length > 6) {
      setPinCode(pincode);
    } else {
      setPinCode(value);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response: IAddressListProps = await productDetailsService.getCustomerAddresses();

        if (response.action === SUCCESS) {
          setAddressList(response.addressList);
        }
      } finally {
      }
    })();
  }, []);

  return (
    <PinCodeWrapper>
      <Header>
        <Title> {addressList.length ? 'Edit' : 'Check'} Pincode</Title>
        <CloseIconWrapper onClick={closePinCodePopup}>
          <CloseIcon icon={IconClose} />
        </CloseIconWrapper>
      </Header>
      <PinCodeContainer>
        {addressList.length && (
          <>
            <Title>Select an address</Title>
            <DeliveryAddressesContainer>
              {addressList.map((address: IAllAddressItemsEntityProps, index: number) => {
                return (
                  <Address
                    key={index}
                    onClick={() => {
                      if (address.isServicable) {
                        const pin = address.zipCode || pincode;
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
        <EnterPinCode>{addressList.length ? 'Or, enter your pincode' : 'Enter your pincode'}</EnterPinCode>
        <PinCodeForm
          onSubmit={(e) => {
            return submitForm(e);
          }}
          noValidate
        >
          <PinCodeNumber value={pincode} onChange={handleOnChange} placeholder="Pincode" />
          <PinCodeSubmit disabled={pincode.length < 6 || isLoading} type="submit">
            Check
          </PinCodeSubmit>
          {error && error.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </PinCodeForm>
      </PinCodeContainer>
    </PinCodeWrapper>
  );
};
export default PinCode;
