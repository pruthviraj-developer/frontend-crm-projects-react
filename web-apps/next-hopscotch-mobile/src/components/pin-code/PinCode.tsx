import React, { FC, useState, useEffect, useContext } from 'react';
import { IPinCodeAPIResponseProps, IPinCodeProps, IPinCodeErrorProps } from './IPinCode';
import {
  PinCodeWrapper,
  PinCodeContainer,
  EnterPinCode,
  ErrorMessage,
  PinCodeNumber,
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
} from './StyledPinCode';
import { IconClose } from '@hs/icons';
import { IAddressListProps, IAllAddressItemsEntityProps, IUserInfoProps } from '@/types';
import { productDetailsService, cookiesService } from '@hs/services';
import { LoginContext } from '@hs/framework';
const SUCCESS = 'success';
const CUSTOMER_INFO_COOKIE_NAME = 'hs_customer_info';
const PinCode: FC<IPinCodeProps> = ({ productId, pinCode, closePinCodePopup }: IPinCodeProps) => {
  const [pincode, setPinCode] = useState<string>('');
  const [error, setError] = useState<IPinCodeAPIResponseProps | IPinCodeErrorProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<IAllAddressItemsEntityProps[]>([]);
  const CUSTOMER_INFO: IUserInfoProps = cookiesService.getCookieData(CUSTOMER_INFO_COOKIE_NAME);

  const { updateLoginPopup } = useContext(LoginContext);
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

  const hasAddress = addressList && addressList.length;
  useEffect(() => {
    if (!(CUSTOMER_INFO && CUSTOMER_INFO.isLoggedIn)) {
      return;
    }
    (async () => {
      try {
        setIsLoadingAddress(true);
        const response: IAddressListProps = await productDetailsService.getCustomerAddresses();
        if (response.action === SUCCESS) {
          setAddressList(response.allAddressItems);
        }
      } catch (err) {
        if (error && error.message === 'login required') {
          updateLoginPopup(true);
        }
        setIsLoadingAddress(false);
      }
    })();
  }, [CUSTOMER_INFO]);

  return (
    <PinCodeWrapper>
      <Header>
        <Title> {hasAddress ? 'Edit' : 'Check'} Pincode</Title>
        <CloseIconWrapper onClick={closePinCodePopup}>
          <CloseIcon icon={IconClose} />
        </CloseIconWrapper>
      </Header>
      <PinCodeContainer>
        {hasAddress > 0 && (
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
        {isLoadingAddress && <Loading>Loading address...</Loading>}
        <EnterPinCode>{hasAddress ? 'Or, enter your pincode' : 'Enter your pincode'}</EnterPinCode>
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
