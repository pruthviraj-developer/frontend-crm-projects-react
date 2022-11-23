import React from 'react';
import { useState, forwardRef } from 'react';
import { ListItemWrapper } from './StyledListItem';
import { ProductInfoDesktop } from '@hs/components';
// import { IListItemProps } from 'product-list/IProductListPage';
import {
  useProduct,
  useOneSize,
  useDeliveryDetails,
  ISimpleSkusEntityProps,
} from '@hs/framework';

const ListItem = forwardRef(
  ({
    onClick,
    href,
    productData,
    isComingSoon,
    disableAddToCart,
    addToCartFromPlp,
    openSizeChartPopup,
    trackSizeSelectEvent,
  }: any) => {
    const [selectedSku, setSelectedSku] = useState<ISimpleSkusEntityProps>();
    const {
      isTile,
      qtyLeft,
      quantity,
      discount,
      isPresale,
      simpleSkus,
      retailPrice,
      regularPrice,
      hasSizeChart,
      retailPriceMax,
      isProductSoldOut,
    } = useProduct({ productData, selectedSku });
    const { isOneSize } = useOneSize({
      productData: productData,
    });
    const deliveryDetailsData = useDeliveryDetails({
      selectedSku: selectedSku,
      productData: productData,
    });
    const onSizeSelect = (sku?: ISimpleSkusEntityProps) => {
      setSelectedSku(sku);
      if (sku) {
        trackSizeSelectEvent(productData, sku);
      }
    };
    const addToCart = (sku: ISimpleSkusEntityProps) => {
      addToCartFromPlp(productData, sku, retailPrice, isOneSize);
    };

    const openSizeChart = (from_location: string) => {
      openSizeChartPopup(productData, from_location);
    };

    const disableQuickShop =
      quantity === 0 ? true : false || isTile || isComingSoon;

    return (
      <ListItemWrapper className='productItem' id={productData.id}>
        <a href={href} target="_blank" onClick={onClick} rel="noreferrer">
          <ProductInfoDesktop
            {...{
              isTile,
              qtyLeft,
              quantity,
              discount,
              addToCart,
              isPresale,
              isOneSize,
              simpleSkus,
              selectedSku,
              retailPrice,
              isComingSoon,
              regularPrice,
              onSizeSelect,
              hasSizeChart,
              openSizeChart,
              retailPriceMax,
              disableAddToCart,
              disableQuickShop,
              isProductSoldOut,
              name: productData.name,
              imageUrl: productData.mediumImg,
              sizePickerDropdownLabel: productData?.sizePickerDropdownLabel,
              ...deliveryDetailsData,
            }}
          />
        </a>
      </ListItemWrapper>
    );
  }
);
export default ListItem;
