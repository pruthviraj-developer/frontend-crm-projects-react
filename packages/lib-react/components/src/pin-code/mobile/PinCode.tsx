import React, { FC, useState, useEffect, useContext } from 'react';
import {
  IPinCodeAPIResponseProps,
  IPinCodeProps,
  IPinCodeErrorProps,
} from '../IPinCode';
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
import { IAddressListProps, IAllAddressItemsEntityProps } from '../IPinCode';
import { productDetailsService } from '@hs/services';
import { LoginContext, UserInfoContext } from '@hs/framework';
const SUCCESS = 'success';
export const PinCodeMobile: FC<IPinCodeProps> = ({
  productId,
  pinCode,
  closePinCodePopup,
}: IPinCodeProps) => {
  const [error, setError] = useState<
    IPinCodeAPIResponseProps | IPinCodeErrorProps
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<IAllAddressItemsEntityProps[]>(
    []
  );

  const getDefaultString = (val: string) => {
    return val.toString().replace(/\D/g, '');
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
  const [pincode, setPinCode] = useState<string>(
    setFormatedValue(pinCode, pinCode) || ''
  );

  const { updateLoginPopup } = useContext(LoginContext);
  const { userInfo } = useContext(UserInfoContext);
  const checkPinCodeDetails = (pincode: string) => {
    (async () => {
      if (pinCode === pincode) {
        closePinCodePopup();
        return;
      }
      try {
        setIsLoading(true);
        const response: IPinCodeAPIResponseProps =
          await productDetailsService.checkForPincode({ productId, pincode });
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
    checkPinCodeDetails(getDefaultString(pincode));
  };

  const hasAddress = addressList && addressList.length;
  useEffect(() => {
    if (!(userInfo && userInfo.isLoggedIn)) {
      return;
    }
    (async () => {
      try {
        setIsLoadingAddress(true);
        const response: IAddressListProps =
          await productDetailsService.getCustomerAddresses();
        if (response.action === SUCCESS) {
          setAddressList(response.allAddressItems);
        }
      } catch (error) {
        if (error && error['message'] === 'login required') {
          closePinCodePopup();
          updateLoginPopup(true);
        }
      } finally {
        setIsLoadingAddress(false);
      }
    })();
  }, [userInfo, closePinCodePopup, updateLoginPopup]);

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
              {addressList.map(
                (address: IAllAddressItemsEntityProps, index: number) => {
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
                }
              )}
            </DeliveryAddressesContainer>
          </>
        )}
        {isLoadingAddress && <Loading>Loading address...</Loading>}
        <EnterPinCode>
          {hasAddress ? 'Or, enter your pincode' : 'Enter your pincode'}
        </EnterPinCode>
        <PinCodeForm
          onSubmit={(e) => {
            return submitForm(e);
          }}
          noValidate
        >
          <PinCodeNumber
            value={pincode}
            onChange={(event) => {
              setPinCode(setFormatedValue(event.target.value, pincode));
            }}
            placeholder="Pincode"
          />
          <PinCodeSubmit
            disabled={pincode.length < 7 || isLoading}
            type="submit"
          >
            Check
          </PinCodeSubmit>
          {error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </PinCodeForm>
      </PinCodeContainer>
    </PinCodeWrapper>
  );
};
