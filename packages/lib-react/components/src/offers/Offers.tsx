import React, { FC } from 'react';
import {
  OffersWrapper,
  OffersTitle,
  OfferDetails,
  Title,
  SeeAll,
} from './StyledOffers';

import { IOfferDetailsProps } from '@hs/framework';

export const Offers: FC<IOfferDetailsProps> = ({
  title,
  actionText,
  promoDetails,
  seeAllOffers,
}: // saving,
// action,
// cardCount,
// bestPrice,
// actionURI,
// isMerchRule,
// promoOfferText,
// isPromoAvailable,
// bestPricePromoCode,
IOfferDetailsProps) => {
  return (
    <OffersWrapper>
      <OffersTitle>
        <Title> {title}</Title>
        <SeeAll onClick={seeAllOffers}>{actionText}</SeeAll>
      </OffersTitle>
      <OfferDetails>{promoDetails}</OfferDetails>
    </OffersWrapper>
  );
};
