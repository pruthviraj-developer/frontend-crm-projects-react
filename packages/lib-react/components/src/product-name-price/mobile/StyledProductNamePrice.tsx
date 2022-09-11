import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';
const ProductPricingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0 17px;
`;

const ProductNamePriceWrapper = styled.div`
  width: 90%;
`;

const ProductPrice = styled.span`
  font-size: 1.6rem;
  line-height: 19px;
  font-weight: ${typography.weight.medium};
  color: #333;
`;

const ProductOfferPrice = styled.div`
  display: inline-block;
  margin-left: 4px;
`;

const ProductVendorPrice = styled.span<{ isMrp?: boolean }>`
  color: ${Colors.DARKGRAY};
  line-height: ${typography.size.s2}px;
  font-weight: ${typography.weight.medium};
  text-decoration: ${(props) => (props.isMrp ? 'none' : 'line-through')};
  vertical-align: top;
  padding-left: ${(props) => (props.isMrp ? '8px' : '0')};
`;

const ProductDiscountPrice = styled.span`
  color: #f44;
  vertical-align: top;
  padding-left: ${typography.size.s1}px;
  line-height: ${typography.size.s2}px;
`;

const ProductName = styled.h1`
  margin: 7px 0 0 0;
  font-size: 1.4rem;
  line-height: ${typography.size.s4}px;
  padding-bottom: ${typography.size.s08}px;
  font-weight: ${typography.weight.regular};
`;

const WishListWrapper = styled.div`
  height: 40px;
`;

const WishListIcon = styled(SvgIcon)<{ selected: number }>`
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;

const ProductSold = styled.div`
  padding: ${typography.size.s04}px ${typography.size.s06}px;
  /* font-size: ${typography.size.s2}px; */
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  background-color: #f44;
  margin: ${typography.size.s3}px 0 0 ${typography.size.s3}px;
  color: ${Colors.WHITE};
  display: inline-block;
  border-radius: ${typography.size.s04}px;
`;

export {
  ProductPricingWrapper,
  ProductNamePriceWrapper,
  ProductDiscountPrice,
  ProductVendorPrice,
  ProductOfferPrice,
  ProductPrice,
  ProductSold,
  ProductName,
  WishListWrapper,
  WishListIcon,
};
