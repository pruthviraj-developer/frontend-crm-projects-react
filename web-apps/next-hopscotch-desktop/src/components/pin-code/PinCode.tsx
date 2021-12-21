import React, { FC, useState, useEffect, useContext } from 'react';
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
  IPinCodeAPIResponseProps,
  IPinCodeErrorProps,
  IAllAddressItemsEntityProps,
  IAddressListProps,
} from './IPinCode';
import { IconDismiss } from '@hs/icons';
import { productDetailsService } from '@hs/services';
import { LoginContext, UserInfoContext } from '@hs/framework';
const SUCCESS = 'success';
const SizeSelector: FC<IPinCodeProps> = ({ productId, pincode, closePinCodePopup }: IPinCodeProps) => {
  const [error, setError] = useState<IPinCodeAPIResponseProps | IPinCodeErrorProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<IAllAddressItemsEntityProps[]>([]);

  const { updateLoginPopup } = useContext(LoginContext);
  const { userInfo } = useContext(UserInfoContext);
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
  const checkPinCodeDetails = (pin: string) => {
    (async () => {
      if (pin === pincode) {
        closePinCodePopup();
        return;
      }
      try {
        setIsLoading(true);
        const response: IPinCodeAPIResponseProps = await productDetailsService.checkForPincode({ productId, pin });
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

  const hasAddress = addressList && addressList.length;
  useEffect(() => {
    if (!(userInfo && userInfo.isLoggedIn)) {
      return;
    }
    (async () => {
      try {
        setIsLoadingAddress(true);
        const response: IAddressListProps = await productDetailsService.getCustomerAddresses();
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

  const onSubmit = (event: React.SyntheticEvent) => {
    event && event.preventDefault();
    checkPinCodeDetails(getDefaultString(pin));
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
        <Title>{hasAddress ? 'Or, enter your pincode' : 'Enter your pincode'}</Title>

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
