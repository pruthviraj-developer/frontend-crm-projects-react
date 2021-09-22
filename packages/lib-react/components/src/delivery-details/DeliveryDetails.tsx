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
import {
  IDeliveryDetailsProps,
  DeliveryMessageOrDeliveryMessagesEntity,
} from './IDeliveryDetails';
import { NextNavLink } from '../next-nav-link';

export const DeliveryDetails: FC<IDeliveryDetailsProps> = ({
  deliveryDetails,
  isSkuInternational,
  skuInternationalPreOrderInfo,
  skuInternationalPreOrderAction,
  isProductInternational,
  productInternationalPreOrderInfo,
  productInternationalPreOrderAction,
  eddColor,
  eddTextColor,
  eddPrefix,
  deliveryMsg,
}: IDeliveryDetailsProps) => {
  return (
    <DeliveryDetailsWrapper>
      <DeliveryTitle>
        <Title>Delivery</Title>
        <PinCode>Check pincode</PinCode>
      </DeliveryTitle>
      <DeliveryDetailsContent>
        <Delivery>
          <DeliverIcon icon={IconTick} fill={'#bbb'} />
          <DeliveryInfo>
            {eddPrefix}
            <DeliveryBadge color={eddTextColor} bgColor={eddColor}>
              {deliveryMsg}
            </DeliveryBadge>
          </DeliveryInfo>

          {isSkuInternational && (
            <PreOrderInfo>
              <NextNavLink
                color={'#707070'}
                name={skuInternationalPreOrderInfo}
                href={skuInternationalPreOrderAction}
              ></NextNavLink>
            </PreOrderInfo>
          )}
          {isProductInternational && (
            <PreOrderInfo>
              <a
                target="_blank"
                href={productInternationalPreOrderAction}
                rel="noreferrer"
              >
                {productInternationalPreOrderInfo}
              </a>
            </PreOrderInfo>
          )}
        </Delivery>

        {deliveryDetails.map(
          (data: DeliveryMessageOrDeliveryMessagesEntity, index: number) => (
            <Delivery key={index}>
              <DeliverIcon
                icon={data.type ? IconTick : IconCrossRed}
                fill={'#bbb'}
              />
              <DeliveryInfo>{data.msg}</DeliveryInfo>
            </Delivery>
          )
        )}
      </DeliveryDetailsContent>
    </DeliveryDetailsWrapper>
  );
};
