import React, { FC, useState } from 'react';
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
import { IAllAddressItemsEntityProps } from '@/types';
import { productDetailsService } from '@hs/services';
const PinCode: FC<IPinCodeProps> = ({ addressList, productId, pinCode, closePinCodePopup }: IPinCodeProps) => {
  const [pincode, setPinCode] = useState<string>('');
  const [error, setError] = useState<IPinCodeAPIResponseProps | IPinCodeErrorProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasAddressList = addressList && addressList.length;

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

  return (
    <PinCodeWrapper>
      <Header>
        <Title> {hasAddressList ? 'Edit' : 'Check'} Pincode</Title>
        <CloseIconWrapper onClick={closePinCodePopup}>
          <CloseIcon icon={IconClose} />
        </CloseIconWrapper>
      </Header>
      <PinCodeContainer>
        {hasAddressList && (
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
        <EnterPinCode>{hasAddressList ? 'Or, enter your pincode' : 'Enter your pincode'}</EnterPinCode>
        <PinCodeForm
          onSubmit={(e) => {
            return submitForm(e);
          }}
          noValidate
        >
          <PinCodeNumber value={pincode} onChange={handleOnChange} placeholder="Pincode" />
          {/* {error && (
            <MessageWrapper onClick={action}>
              <ErrorIcon icon={IconErrorMessage} />
              <ErrorMessage>
                {error.message}
                {error.actionLink && <ActionText>{error.actionText}</ActionText>}
              </ErrorMessage>
            </MessageWrapper>
          )} */}
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
