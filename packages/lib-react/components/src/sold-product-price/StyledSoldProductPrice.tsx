import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const ProductWrapper = styled.div``;

const ProductNamePriceWrapper = styled.div`
  padding: ${typography.size.s3}px ${typography.size.s3}px 0;
  display: flex;
  justify-content: space-between;
`;
const RetailPrice = styled.span`
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.s19}px;
`;

const ProductOfferPrice = styled.div``;
const ProductSold = styled.div`
  padding: ${typography.size.s04}px ${typography.size.s06}px;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  background-color: #f44;
  margin: ${typography.size.s3}px 0 0 ${typography.size.s3}px;
  color: ${Colors.WHITE};
  display: inline-block;
  border-radius: ${typography.size.s04}px;
`;

const ProductName = styled.h1`
  margin: ${typography.size.s07}px 0 0 0;
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
  ProductWrapper,
  ProductNamePriceWrapper,
  ProductOfferPrice,
  RetailPrice,
  ProductName,
  ProductSold,
  WishListWrapper,
  WishListIcon,
};
