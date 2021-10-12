import React, { FC } from 'react';
import { IconTick, IconCrossRed } from '@hs/icons';
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
} from './StyledDeliveryDetails';
import { IDeliveryDetailsProps, DeliveryMessageOrDeliveryMessagesEntity } from './IDeliveryDetails';

import { NextNavLink } from '@hs/components';

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
}: IDeliveryDetailsProps) => {
  const getPreOrderLink = () => {
    return showInternationaPreorder ? (
      <PreOrderInfo>
        <NextNavLink color={'#707070'} margin="0" name={preOrderInfo} href={preOrderAction}></NextNavLink>
      </PreOrderInfo>
    ) : (
      ''
    );
  };
  return (
    <DeliveryDetailsWrapper>
      <DeliveryTitle>
        <Title>Delivery {pinCode ? `to ${pinCode}` : ''}</Title>
        <PinCode onClick={openPinCodePopup}> {pinCode ? 'Edit' : 'Check'} pincode</PinCode>
      </DeliveryTitle>
      <DeliveryDetailsContent>
        <Delivery>
          {isEddDifferentForSKUs === false && (
            <>
              <DeliverIcon icon={IconTick} fill={'#bbb'} />
              <DeliveryInfo>
                {eddPrefix}
                <DeliveryBadge color={eddTextColor} bgColor={eddColor}>
                  {deliveryMsg}
                </DeliveryBadge>
              </DeliveryInfo>
              {getPreOrderLink()}
            </>
          )}

          {isEddDifferentForSKUs === true && (
            <>
              {selectedSku && (
                <>
                  <DeliverIcon icon={IconTick} fill={'#bbb'} />
                  <DeliveryInfo>
                    {selectedSku.eddPrefix}
                    <DeliveryBadge color={selectedSku.eddTextColor} bgColor={selectedSku.eddColor}>
                      {selectedSku.deliveryMsg}
                    </DeliveryBadge>
                  </DeliveryInfo>
                  {getPreOrderLink()}
                </>
              )}
              {!selectedSku && <div>select size</div>}
            </>
          )}
        </Delivery>

        {deliveryMessages &&
          deliveryMessages.map((data: DeliveryMessageOrDeliveryMessagesEntity, index: number) => (
            <Delivery key={index}>
              <DeliverIcon icon={data.type ? IconTick : IconCrossRed} fill={'#bbb'} />
              <DeliveryInfo>{data.msg}</DeliveryInfo>
            </Delivery>
          ))}
      </DeliveryDetailsContent>
    </DeliveryDetailsWrapper>
  );
};
