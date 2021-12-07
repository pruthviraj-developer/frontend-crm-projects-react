import React, { FC } from 'react';
import { IconTick, IconCrossRed, IconInfoBlack } from '@hs/icons';
import {
  DeliveryDetailsWrapper,
  DeliveryDetailsContent,
  DeliveryTitle,
  Delivery,
  DeliverIcon,
  DeliveryBadge,
  DeliveryInfo,
  DeliveryInfoIcon,
  Title,
  PinCode,
  PreOrderInfo,
  SelectedSkuSize,
  SizeSelector,
} from './StyledDeliveryDetails';
import { IDeliveryDetailsDesktopProps } from './IDeliveryDetailsDesktop';
import { IProductDetailsDeliveryMessageOrDeliveryMessagesEntity } from 'types';
import { NextNavLink } from '../next-nav-link/NextNavLink';

export const DeliveryDetailsDesktop: FC<IDeliveryDetailsDesktopProps> = ({
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
}: IDeliveryDetailsDesktopProps) => {
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
                  <DeliveryInfoIcon icon={IconInfoBlack} />
                  <span>Select a size for delivery information</span>
                </SizeSelector>
              )}
            </>
          )}
        </Delivery>

        {deliveryMessages &&
          deliveryMessages.map(
            (
              data: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity,
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
