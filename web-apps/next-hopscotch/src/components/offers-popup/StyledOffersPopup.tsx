import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const OffersScreenWrapper = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 440px;
  position: fixed;
  background-color: ${Colors.WHITE};
`;

const OffersTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  font-family: inherit;
  letter-spacing: 0.2px;
  display: inline-block;
  color: rgba(0, 0, 0, 0.8);
  margin: 16px 0 16px 20px;
`;

const CloseIcon = styled(SvgIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const OffersTitleWrapper = styled.div`
  top: 16px;
  width: 100%;
  z-index: 100;
  opacity: 0.85;
  padding: 0 20px;
  position: fixed;
  display: flex;
  align-items: center;
`;

const OfferDetailsWrapper = styled.div`
  top: 64px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  position: relative;
  letter-spacing: 0.2px;
  margin: 14px 0 28px 0;
`;

const OfferDetails = styled.div`
  z-index: 2;
  display: block;
  padding: 0px 24px;
  position: relative;
  border-radius: 12px;
  background: url(https://qastatic.hopscotch.in/fstatic/pattern_geometric.png?tr=orig-true?version=1551970362783) center
    center / cover no-repeat rgb(62, 72, 85);
`;

const Details = styled.div`
  padding: 24px 0px;
`;

const OfferTitle = styled.h4`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 12px;
`;

const OfferInfo = styled.span`
  opacity: 0.72;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: #ffffff;
  padding-right: 4px;
  :active {
    opacity: 0.56;
  }
  -webkit-tap-highlight-color: transparent;
`;

const OfferTerms = styled.span`
  opacity: 0.72;
  font-family: Averta;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: #ffffff;
  text-decoration: underline;
  :hover {
    opacity: 0.5;
  }
  :active {
    opacity: 0.72;
  }
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
`;

const PromoClip = styled.div`
  top: 32px;
  right: -4px;
  z-index: 4;
  position: absolute;
`;

const ClipTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: ${Colors.WHITE};
`;

const ClipMainView = styled.div`
  background-color: rgb(87, 187, 138);
  margin: 0px;
  border-radius: 4px 4px 0px;
  box-shadow: rgb(0 168 79) 0px -1px 0px 0px inset;
  padding: 4px 8px;
`;

const ClipTriangle = styled.div`
  right: 0px;
  width: 0px;
  height: 0px;
  bottom: -4px;
  border: 2px solid;
  position: absolute;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-color: rgb(12, 136, 74) transparent transparent rgb(12, 136, 74);
`;

const BottomContainer = styled.div<{ isPromoAvailable?: boolean }>`
  display: flex;
  flex-direction: coloumn;
  justify-content: space-between;
  margin-top: ${(props) => (props.isPromoAvailable ? '29' : `24`)}px;
`;

const PromoCode = styled.h5`
  margin: 0;
  color: white;
  font-size: 14px;
  line-height: 1.15;
`;

const PromoExpiryDetails = styled.span`
  opacity: 0.72;
  color: #ffffff;
  margin-top: 2px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

export {
  Details,
  CloseIcon,
  PromoClip,
  PromoCode,
  ClipTitle,
  ClipTriangle,
  ClipMainView,
  OfferInfo,
  OfferTitle,
  OfferTerms,
  OffersTitle,
  OfferDetails,
  PromoExpiryDetails,
  OffersTitleWrapper,
  OffersScreenWrapper,
  OfferDetailsWrapper,
  BottomContainer,
};
