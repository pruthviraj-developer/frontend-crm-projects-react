import React, { FC } from 'react';
import { IconTick, IconCrossRed, IconDropDown } from '@hs/icons';
import {
  DeliveryDetailsWrapper,
  DeliveryDetailsContent,
  DeliveryTitle,
  Delivery,
  DeliverIcon,
  DeliveryBadge,
  DeliveryInfo,
  Title,
  PinCode,
  PreOrderInfo,
  SelectedSkuSize,
  SizeSelector,
  SizeSelectorIcon,
} from './StyledDeliveryDetails';
import { IDeliveryDetailsProps } from './IDeliveryDetails';
import { IDeliveryMessagesEntity } from 'types';
import { NextNavLink } from '../next-nav-link/NextNavLink';

export const DeliveryDetails: FC<IDeliveryDetailsProps> = ({
  deliveryMessages,
  isEddDifferentForSKUs,
  preOrderInfo,
  preOrderAction,
  eddColor,
  eddTextColor,
  eddPrefix,
  deliveryMsg,
  pinCode,
  showInternationaPreorder,
  selectedSku,
  openPinCodePopup,
  openSizeSelector,
}: IDeliveryDetailsProps) => {
  const getDeliveryDetails = () => {
    return (
      <>
        <DeliverIcon icon={IconTick} />
        <DeliveryInfo>
          {eddPrefix}
          <DeliveryBadge color={eddTextColor} bgColor={eddColor}>
            {deliveryMsg}
          </DeliveryBadge>
        </DeliveryInfo>
      </>
    );
  };

  const getPreOrderLink = () => {
    return showInternationaPreorder ? (
      <PreOrderInfo>
        <NextNavLink
          color={'#707070'}
          margin="0"
          name={preOrderInfo}
          href={preOrderAction}
        ></NextNavLink>
      </PreOrderInfo>
    ) : (
      ''
    );
  };
  return (
    <DeliveryDetailsWrapper>
      <DeliveryTitle>
        <Title>Delivery {pinCode ? `to ${pinCode}` : ''}</Title>
        <PinCode onClick={openPinCodePopup}>
          {' '}
          {pinCode ? 'Edit' : 'Check'} pincode
        </PinCode>
      </DeliveryTitle>
      {selectedSku && (
        <SelectedSkuSize>
          for size {selectedSku.attributes.size}{' '}
        </SelectedSkuSize>
      )}
      <DeliveryDetailsContent>
        <Delivery>
          {isEddDifferentForSKUs === false && (
            <>
              {getDeliveryDetails()}
              {getPreOrderLink()}
            </>
          )}

          {isEddDifferentForSKUs === true && (
            <>
              {selectedSku && (
                <>
                  {getDeliveryDetails()}
                  {getPreOrderLink()}
                </>
              )}
              {!selectedSku && (
                <SizeSelector onClick={openSizeSelector}>
                  <span>Select a size for delivery information</span>{' '}
                  <SizeSelectorIcon icon={IconDropDown} />
                </SizeSelector>
              )}
            </>
          )}
        </Delivery>

        {deliveryMessages &&
          deliveryMessages.map(
            (
              data: IDeliveryMessagesEntity,
              index: number
            ) => (
              <Delivery key={index}>
                <DeliverIcon icon={data.type ? IconTick : IconCrossRed} />
                <DeliveryInfo>{data.msg}</DeliveryInfo>
              </Delivery>
            )
          )}
      </DeliveryDetailsContent>
    </DeliveryDetailsWrapper>
  );
};
