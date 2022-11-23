import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const ProductWrapper = styled.div`
  white-space: nowrap;
  position: relative;
  padding: 16px 0px 32px 8px;
  max-height: 570px;
  overflow: hidden;
  background-color: ${Colors.WHITE};
  border-right: 1px solid ${Colors.MERCURY};
  border-bottom: 1px solid ${Colors.MERCURY};
`;

const ImageTag = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const PlpImageContainer = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  position: absolute;
`;

const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  height: 100%;
`;

const Tags = styled.div`
  font-size: 1rem;
  line-height: 12px;
  font-weight: ${typography.weight.medium};
  left: 4px;
  bottom: 4px;
  position: absolute;
`;

const Tag = styled.span<{ bgActive?: boolean }>`
  padding: 4px 6px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.bgActive ? Colors.YELLOW[100] : Colors.GREEN[1000]};
  &.qty-left {
    background-color: ${Colors.RED[200]};
  }
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  line-height: 16px;
  margin: 0 8px 4px;
  padding: 12px 40px 0 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${typography.weight.regular};
`;

const ProductPriceWrapper = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 16px;
  margin: 0 0 0 8px;
  padding-bottom: 8px;
`;

const ProductPrice = styled.span`
  color: ${Colors.GRAY20};
`;

const ProductVendorPrice = styled.span`
  color: ${Colors.DARKGRAY};
  text-decoration: line-through;
  padding-left: ${typography.size.s04}px;
`;

const ProductDiscountPrice = styled.span`
  color: ${Colors.GREEN[1000]};
  padding-left: ${typography.size.s04}px;
`;

const WishListWrapper = styled.div`
  position: absolute;
  top: 29px;
  right: 25px;
`;

const WishListIcon = styled(SvgIcon)<{ selected?: number }>`
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export {
  ProductWrapper,
  ProductPriceWrapper,
  ImageContainer,
  PlpImageContainer,
  ProductName,
  ProductPrice,
  ProductVendorPrice,
  ProductDiscountPrice,
  Details,
  ImageTag,
  Tags,
  Tag,
  WishListWrapper,
  WishListIcon,
};
