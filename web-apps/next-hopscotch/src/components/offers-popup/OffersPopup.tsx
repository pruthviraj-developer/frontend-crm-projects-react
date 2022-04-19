import { FC, useContext, useEffect } from 'react';
import { IconClose } from '@hs/icons';
import { useRouter } from 'next/router';
import * as segment from '@/components/segment-analytic';
import { TrackingDataContext, useSegment } from '@hs/framework';
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

export const OffersPopup: FC<IOfferPopupProps> = ({ offersUrl, product_id, closeOffersPopup }: IOfferPopupProps) => {
  let styles = {
    borderRadius: '8px',
    height: 'calc(100vh - 56px)',
    border: 'none',
  };

  let offersNotTracked: boolean = true;
  const router = useRouter();
  const [{ contextData }] = useSegment();
  const { properties: trackingProperties } = useContext(TrackingDataContext);
  useEffect(() => {
    const addDataFunc = (e: MessageEvent<any> | any) => {
      if (e.data) {
        try {
          const data: Record<string, unknown> = JSON.parse(e.data);
          const properties = Object.assign({}, data['properties']);

          switch (data.eventName) {
            case 'fireAnalyticsEvent':
              if (offersNotTracked) {
                offersNotTracked = false;
                segment.trackEvent({
                  evtName: data.event as string,
                  properties: {
                    add_from: 'current=' + location.pathname,
                    product_id,
                    ...properties,
                    ...trackingProperties,
                    universal: undefined,
                  },
                  contextData,
                });
              }
              break;
            case 'navigate':
              // self._window.location.href = self._window.location.origin + data.applink;
              router.push({
                pathname: data.applink as string,
              });
              break;
            default:
              break;
          }
        } catch (ex) {
          console.error('error parsing event data');
          return;
        }
      }
    };
    window.addEventListener('message', addDataFunc);
    return () => window.removeEventListener('keyup', addDataFunc);
  }, []);

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
        <iframe src={offersUrl} width="100%" style={styles}>
          Sorry your browser does not support inline frames.
        </iframe>
      </>
    </OffersScreenWrapper>
  );
};
