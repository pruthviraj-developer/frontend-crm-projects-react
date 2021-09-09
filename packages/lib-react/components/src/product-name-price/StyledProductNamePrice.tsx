import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';
const ProductPricingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0;
`;

const ProductNamePriceWrapper = styled.div`
  width: 90%;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  line-height: 19px;
`;

const ProductOfferPrice = styled.div`
  display: inline-block;
`;

const ProductVendorPrice = styled.span`
  color: ${Colors.DARKGRAY};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  text-decoration: line-through;
  vertical-align: top;
  padding-left: ${typography.size.s08}px;
`;

const ProductDiscountPrice = styled.span`
  color: #f44;
  vertical-align: top;
  padding-left: ${typography.size.s08}px;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
`;

const ProductName = styled.h1`
  margin: 7px 0 0 0;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s5}px;
  padding-bottom: ${typography.size.s08}px;
  font-weight: ${typography.weight.regular};
`;

const WishListWrapper = styled.div`
  height: 40px;
`;

const WishListIcon = styled(SvgIcon)`
  fill: #bbb;
  opacity: 0.5;
`;

export {
  ProductPricingWrapper,
  ProductNamePriceWrapper,
  ProductDiscountPrice,
  ProductVendorPrice,
  ProductOfferPrice,
  ProductPrice,
  ProductName,
  WishListWrapper,
  WishListIcon,
};
