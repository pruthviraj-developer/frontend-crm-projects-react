import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
const ProductDetailsWrapper = styled.div`
  display: block;
  min-height: 0;
  background: ${Colors.WHITE};
  padding-bottom: 88px;
`;

const CartNotification = styled.div`
  width: 240px;
  height: 96px;
  position: relative;
  border-radius: 4px;
`;

const CartLink = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
`;

const CartHeader = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #333;
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const CartMessage = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin: 4px 0 6px;
  color: #707070;
`;

const CartLinkText = styled.div`
  font-weight: 600;
  color: #ed54a4;
  font-size: 12px;
  line-height: 16px;
`;

const CartNotificationDetails = styled.div`
  padding-left: 12px;
`;

export {
  ProductDetailsWrapper,
  CartNotification,
  CartNotificationDetails,
  CartLink,
  CartHeader,
  CartMessage,
  CartLinkText,
};

// .atc-nudge-container {
//   box-shadow: 0 4px 14px 0 rgba(0, 0, 0, .16);
//   width: 240px;
//   height: 96px;
//   position: relative;
//   overflow: hidden;
//   border-radius: 4px
// }

// .atc-nudge-wrapper {
//   position: absolute
// }

// .atc-nudge {
//   width: 224px;
//   height: 96px;
//   background: #fff
// }

// .atc-nudge .hs-icon-v2,
// .atc-nudge .icon-nudge-promotion-mobile {
//   margin-top: 8px;
//   display: inline-block;
//   width: 80px;
//   height: 88px;
//   background-repeat: no-repeat;
//   background-size: 72px;
//   position: relative;
//   top: 5px;
//   left: 5px
// }

// .atc-nudge .details {
//   margin: 27px 16px 18px 4px;
//   vertical-align: top
// }

// .atc-nudge .details .title {
//   font-size: 13px;
//   line-height: 16px;
//   font-weight: 500;
//   margin-bottom: 4px;
//   color: #333
// }

// .atc-nudge .details .desc {
//   width: 124px;
//   font-size: 11px;
//   line-height: 16px;
//   color: #707070
// }

// .cart-nudge {
//   background: #fff
// }

// .cart-nudge .nudge-info-section {
//   padding: 0 16px;
//   font-size: 13px;
//   line-height: 16px;
//   font-weight: 500
// }
