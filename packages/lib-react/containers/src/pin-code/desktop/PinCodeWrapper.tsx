import React, { FC, useEffect, useContext } from 'react';
import { productDetailsService } from '@hs/services';
import { LoginContext, UserInfoContext } from '@hs/framework';
import { IAddressListProps, IPinCodeProps } from '../IPinCode';
import { PinCodeDesktop } from './PinCode';
import { useQuery } from 'react-query';
const PinCodeWrapper: FC<IPinCodeProps> = ({
  productId,
  pinCode,
  closePinCodePopup,
}: IPinCodeProps) => {
  // const [addressList, setAddressList] = useState<IAllAddressItemsEntityProps[]>(
  //   []
  // );
  const { userInfo } = useContext(UserInfoContext);
  const {
    data: address,
    isSuccess: isAddressListLoaded,
    isLoading,
    error,
  } = useQuery<IAddressListProps>(
    ['addressList'],
    () => productDetailsService.getCustomerAddresses(),
    {
      staleTime: Infinity,
      retry: false,
      enabled: userInfo && userInfo.isLoggedIn,
    }
  );

  const { updateLoginPopup } = useContext(LoginContext);

  useEffect(() => {
    if (error && error['message'] === 'login required') {
      closePinCodePopup();
      updateLoginPopup(true);
    }
  }, [error, closePinCodePopup, updateLoginPopup]);

  return (
    <>
      <PinCodeDesktop
        {...{
          isAddressLoading: isLoading,
          address: isAddressListLoaded ? address?.allAddressItems : undefined,
          productId,
          pinCode,
          closePinCodePopup,
        }}
      />
    </>
  );
};

export default PinCodeWrapper;
