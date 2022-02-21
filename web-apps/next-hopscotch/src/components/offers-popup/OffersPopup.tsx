import { FC } from 'react';
import { IconClose } from '@hs/icons';
import {
  // Details,
  CloseIcon,
  // PromoClip,
  // PromoCode,
  // ClipTitle,
  // OfferInfo,
  // OfferTerms,
  // OfferTitle,
  // OffersTitle,
  // OfferDetails,
  // ClipTriangle,
  // ClipMainView,
  // BottomContainer,
  // PromoExpiryDetails,
  OffersTitleWrapper,
  // OfferDetailsWrapper,
  OffersScreenWrapper,
} from './StyledOffersPopup';

import { IOfferPopupProps } from './IOffersPopupProps';

export const OffersPopup: FC<IOfferPopupProps> = ({ offersUrl, closeOffersPopup }: IOfferPopupProps) => {
  let styles = {
    borderRadius: '8px',
    height: 'calc(100vh - 56px)',
    border: 'none',
  };
  const onLoad = () => {
    console.log('Iframe loaded');
  };
  return (
    <OffersScreenWrapper>
      <OffersTitleWrapper>
        <CloseIcon onClick={closeOffersPopup} icon={IconClose} />
      </OffersTitleWrapper>
      {/*<OfferDetailsWrapper>
        <OfferDetails>
          <PromoClip>
            <ClipMainView>
              <ClipTitle>Save ₹375s</ClipTitle>
              <ClipTriangle />
            </ClipMainView>
          </PromoClip>
          <Details>
            <OfferTitle>Fifty off</OfferTitle>
            <OfferInfo>offer message</OfferInfo>
            <OfferTerms>See terms</OfferTerms>
          </Details>
          <BottomContainer isPromoAvailable={true}>
            <PromoCode>FIFTY</PromoCode>
            <PromoExpiryDetails></PromoExpiryDetails>
          </BottomContainer>
        </OfferDetails>
      </OfferDetailsWrapper> */}

      <>
        <iframe src={offersUrl} width="100%" style={styles} onLoad={onLoad}>
          Sorry your browser does not support inline frames.
        </iframe>
      </>
    </OffersScreenWrapper>
  );
};
