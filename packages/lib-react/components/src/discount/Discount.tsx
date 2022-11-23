import React, { FC } from 'react';
import { DiscountWrapper, DiscountIcon, DiscountTitle } from './StyledDiscount';
import { IconPlpOfferCard } from '@hs/icons';
import { IMessageBarProps } from '@hs/framework';
const OFFER_PLP_MESSAGE = 'OFFER_PLP_MESSAGE';
export const Discount: FC<IMessageBarProps> = ({
  message,
  messageType,
}: IMessageBarProps) => {
  return messageType === OFFER_PLP_MESSAGE ? (
    <DiscountWrapper>
      <DiscountIcon icon={IconPlpOfferCard}></DiscountIcon>
      <DiscountTitle>{message}</DiscountTitle>
    </DiscountWrapper>
  ) : (
    <></>
  );
};
