import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';
import { keyframes } from '@emotion/core';

const ProductListWrapper = styled.div`
  position: relative;
  background-color: ${Colors.WHITE};
  border-right: 1px solid ${Colors.MERCURY};
  border-bottom: 1px solid ${Colors.MERCURY};
  &:hover {
    box-shadow: 0px 4px 20px 0px #e1e1e1;
    mix-blend-mode: multiply;
    z-index: 1;
    .quick-shop {
      display: block;
      .fadeQuickShop {
        max-height: 206px;
      }
    }
  }
  .quick-shop {
    display: block;
    .fadeQuickShop {
      max-height: 0;
    }
  }
`;

const QuickShopWrapper = styled.div``;

const ImageContainer = styled.div`
  cursor: pointer;
  position: relative;
  background: url('https://static.hopscotch.in/web2/images/boutique-pattern.png')
    no-repeat 50%;
  background-size: 50%;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  img{
    width: auto !important;
    height: auto !important;
    min-height: 0 !important;
    min-width: 0 !important;
  }
`;

const Tags = styled.div`
  left: 12px;
  bottom: 86px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 16px;
  position: absolute;
  font-weight: ${typography.weight.medium};
`;

const Tag = styled.span<{ bgActive?: boolean }>`
  padding: 3px 6px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.bgActive ? Colors.YELLOW[100] : Colors.GREEN[1000]};
  &.sold-out {
    background-color: ${Colors.RED[200]};
  }
  &.qty-left {
    background-color: ${Colors.RED[200]};
    color: #fff;
  }
`;

const ProductName = styled.h3`
  color: #333;
  cursor: pointer;
  font-size: 1.4rem;
  margin: 0 12px 4px 12px;
  padding: 12px 40px 0 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${typography.weight.regular};
`;

const ProductPriceWrapper = styled.div`
  height: 72px;
  cursor: default;
  font-size: 1.4rem;
  padding-bottom: 8px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
`;

const ProductPrice = styled.span`
  cursor: pointer;
  color: ${Colors.GRAY20};
`;

const ProductVendorPrice = styled.span`
  cursor: pointer;
  color: ${Colors.DARKGRAY};
  text-decoration: line-through;
  padding-left: ${typography.size.s04}px;
`;

const ProductDiscountPrice = styled.span`
  cursor: pointer;
  color: ${Colors.GREEN[1000]};
  padding-left: ${typography.size.s04}px;
`;

const AnimatePrices = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const Prices = styled.div`
  margin-left: ${typography.size.s1}px;
  animation: ${AnimatePrices} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
`;

export {
  Tag,
  Tags,
  Prices,
  ProductName,
  ProductPrice,
  ImageContainer,
  QuickShopWrapper,
  ProductVendorPrice,
  ProductListWrapper,
  ProductPriceWrapper,
  ProductDiscountPrice,
};
