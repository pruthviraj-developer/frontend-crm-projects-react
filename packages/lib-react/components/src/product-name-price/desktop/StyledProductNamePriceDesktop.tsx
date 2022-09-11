import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
const ProductPricingWrapperDesktop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 91.66667%;
`;

const ProductNamePriceWrapperDesktop = styled.div``;

const ProductPriceDesktop = styled.span`
  font-size: 18px;
  line-height: 24px;
  font-weight: ${typography.weight.medium};
  color: #333;
`;

const ProductOfferPriceDesktop = styled.div`
  display: inline-block;
`;

const ProductVendorPriceDesktop = styled.span<{ isMrp?: boolean }>`
  color: ${Colors.DARKGRAY};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  text-decoration: ${(props) => (props.isMrp ? 'none' : 'line-through')};
  vertical-align: top;
  padding: ${(props) => (props.isMrp ? '1px 0 0 12px' : '1px 0 0 0')};
  display: inline-block;
`;

const ProductDiscountPriceDesktop = styled.span`
  color: #f44;
  vertical-align: top;
  padding: 1px 0 0 12px;
  display: inline-block;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
`;

const ProductNameDesktop = styled.h1`
  margin: 0;
  font-size: ${typography.size.s3}px;
  padding-bottom: ${typography.size.s08}px;
  font-weight: ${typography.weight.regular};
  line-height: 22px;
`;
export {
  ProductPricingWrapperDesktop,
  ProductNamePriceWrapperDesktop,
  ProductNameDesktop,
  ProductPriceDesktop,
  ProductOfferPriceDesktop,
  ProductVendorPriceDesktop,
  ProductDiscountPriceDesktop,
};
