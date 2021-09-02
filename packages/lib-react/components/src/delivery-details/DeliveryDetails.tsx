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
} from './StyledDeliveryDetails';
import { IDeliveryDetailsProps } from './IDeliveryDetails';

export const DeliveryDetails: FC<IDeliveryDetailsProps> =
  ({}: IDeliveryDetailsProps) => {
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
              Get it in <DeliveryBadge>4-5 weeks</DeliveryBadge>
            </DeliveryInfo>
          </Delivery>
          <Delivery>
            <DeliverIcon icon={IconTick} fill={'#bbb'} />
            <DeliveryInfo>Cash on delivery available.</DeliveryInfo>
          </Delivery>
          <Delivery>
            <DeliverIcon icon={IconCrossRed} fill={'#bbb'} />
            <DeliveryInfo>This product is Non-exchangeable</DeliveryInfo>
          </Delivery>
        </DeliveryDetailsContent>
      </DeliveryDetailsWrapper>
    );
  };
