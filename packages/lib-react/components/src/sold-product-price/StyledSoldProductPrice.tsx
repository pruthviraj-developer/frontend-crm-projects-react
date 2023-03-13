import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';
import { keyframes }  from '@emotion/core';

const heartbeatAnim = () => keyframes`
 0%{transform: scale( .8 );}
  20%
  {
    transform: scale( 1 );
  }
  40%
  {
    transform: scale( 1.2 );
  }
  60%
  {
    transform: scale( 1 );
  }
  100%
  {
    transform: scale( .9 );
  }
`

const ProductWrapper = styled.div``;

const ProductNamePriceWrapper = styled.div`
  padding: ${typography.size.s3}px ${typography.size.s3}px 0;
  display: flex;
  justify-content: space-between;
`;
const RetailPrice = styled.span`
  font-size: 1.6rem;
  line-height: ${typography.size.s19}px;
`;

const ProductOfferPrice = styled.div``;
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

const ProductName = styled.h1`
  margin: ${typography.size.s07}px 0 0 0;
  /* font-size: ${typography.size.s2}px; */
  line-height: ${typography.size.s5}px;
  padding-bottom: ${typography.size.s08}px;
  font-weight: ${typography.weight.regular};
`;

const WishListWrapper = styled.div`
  height: 40px;
`;

const WishListIcon = styled(SvgIcon)`
  width: 24px;
  height: 24px;
  animation: ${heartbeatAnim} .3s ease-in-out ;
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
