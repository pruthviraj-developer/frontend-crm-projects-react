import React, { FC, useState, useEffect, useContext } from 'react';
import { productDetailsService } from '@hs/services';
import { LoginContext, UserInfoContext } from '@hs/framework';
import { IAddressListProps, IPinCodeWrapperProps, IPinCodeAPIResponseProps, IPinCodeErrorProps } from '../IPinCode';
import { useQuery } from 'react-query';
import { PinCodeMobile } from '@hs/components';
export const PinCodeWrapper: FC<IPinCodeWrapperProps> = ({
  productId,
  pinCode,
  closePinCodePopup,
}: IPinCodeWrapperProps) => {
  const { userInfo } = useContext(UserInfoContext);
  const {
    data: address,
    isSuccess: isAddressListLoaded,
    isLoading,
    error: errorLoadingAddress,
  } = useQuery<IAddressListProps>(['addressList'], () => productDetailsService.getCustomerAddresses(), {
    staleTime: Infinity,
    retry: false,
    enabled: userInfo && userInfo.isLoggedIn,
  });

  const [errorPinCode, setPinCodeError] = useState<IPinCodeAPIResponseProps | IPinCodeErrorProps>();
  const [isPinCodeLoading, setIsPinCodeLoading] = useState(false);
  const { updateLoginPopup } = useContext(LoginContext);

  useEffect(() => {
    if (errorLoadingAddress && errorLoadingAddress['message'] === 'login required') {
      closePinCodePopup();
      updateLoginPopup(true);
    }
  }, [errorLoadingAddress, closePinCodePopup, updateLoginPopup]);

  const checkPinCode = (pincode: string) => {
    if (pincode === pinCode) {
      closePinCodePopup();
      return;
    }

    (async () => {
      try {
        setIsPinCodeLoading(false);
        setPinCodeError({ message: '' });
        const response: IPinCodeAPIResponseProps = await productDetailsService.checkForPincode({
          productId,
          pincode,
        });
        setIsPinCodeLoading(false);
        debugger;
        if (!response.serviceable) {
          setPinCodeError({ ...response, message: response.noPinCodeMessage });
        } else {
          closePinCodePopup({ ...response, newPincode: pincode });
        }
      } catch (error) {
        setPinCodeError(error as unknown as IPinCodeAPIResponseProps);
        setIsPinCodeLoading(false);
      }
    })();
  };

  const closePopup = (data: IPinCodeAPIResponseProps) => {
    data ? closePinCodePopup(data) : closePinCodePopup();
  };

  return (
    <>
      <PinCodeMobile
        {...{
          isAddressLoading: isLoading,
          address: isAddressListLoaded ? address?.allAddressItems : undefined,
          productId,
          pinCode,
          closePopup,
          checkPinCode,
          isPinCodeLoading,
          errorPinCode,
        }}
      />
    </>
  );
};
