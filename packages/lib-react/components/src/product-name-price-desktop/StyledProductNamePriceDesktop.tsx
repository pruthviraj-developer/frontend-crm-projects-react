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

const ProductVendorPriceDesktop = styled.span`
  color: ${Colors.DARKGRAY};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  text-decoration: line-through;
  vertical-align: top;
  padding: 1px 0 0 12px;
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

const ProductSoldDesktop = styled.div`
  color: ${Colors.WHITE};
  display: inline-block;
  background-color: #f44;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  margin: ${typography.size.s3}px 0 0 0;
  border-radius: ${typography.size.s04}px;
  padding: ${typography.size.s04}px ${typography.size.s06}px;
`;

export {
  ProductPricingWrapperDesktop,
  ProductNamePriceWrapperDesktop,
  ProductNameDesktop,
  ProductPriceDesktop,
  ProductOfferPriceDesktop,
  ProductVendorPriceDesktop,
  ProductDiscountPriceDesktop,
  ProductSoldDesktop,
};
