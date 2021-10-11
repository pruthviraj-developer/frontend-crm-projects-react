import React, { FC, useState } from 'react';
import { IPinCodeAPIResponseProps, IPinCodeProps } from './IPinCode';
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
const PinCode: FC<IPinCodeProps> = ({ addressList, productId, closePinCodePopup }: IPinCodeProps) => {
  const [pincode, setPinCode] = useState<string>('');
  const [error, setError] = useState<IPinCodeAPIResponseProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasAddressList = addressList && addressList.length;
  const checkPincode = (zipCode: string, index: number) => {
    console.log(zipCode, productId, index);
  };

  const checkPinCodeDetails = () => {
    (async () => {
      try {
        setIsLoading(true);
        const response: IPinCodeAPIResponseProps = await productDetailsService.checkForPincode({ productId, pincode });
        console.log(response);
        setIsLoading(false);
        if (!response.serviceable) {
          setError({ ...response, message: response.noPinCodeMessage });
        } else {
          closePinCodePopup();
        }
        if (response.action === 'success') {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
        setError(error as unknown as IPinCodeAPIResponseProps);
        setIsLoading(false);
      }
    })();
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    checkPinCodeDetails();
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
        <CloseIconWrapper>
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
                        checkPincode(address.zipCode, index + 1);
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
            check
          </PinCodeSubmit>
          {error && error.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </PinCodeForm>
      </PinCodeContainer>
    </PinCodeWrapper>
  );
};
export default PinCode;
