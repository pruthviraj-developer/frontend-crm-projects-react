import { IProductDetailsAttrsEntity } from 'product/types';
import { IProductTrackingProps } from './IUseProductTracking';
import { useEffect, useState } from 'react';

const DIFFERENT_FOR_SIZES = 'Different for sizes';

const getTrackingData = ({
  selectedSku,
  productDetails,
}: IProductTrackingProps) => {
  const selectedProductSku = selectedSku || productDetails?.simpleSkus?.[0];
  const attributes = selectedProductSku?.attrs?.reduce(
    (obj: Record<string, string>, item: IProductDetailsAttrsEntity) => (
      (obj[item.name.toLowerCase().replace(/[^0-9a-zA-Z]+|\s+/, '_')] =
        item.value),
      obj
    ),
    {}
  );
  const productTrackData = {
    product_id: productDetails.id,
    sku: productDetails?.simpleSkus.map((sku) => sku.skuId),
    name: productDetails.productName,
    brand: productDetails.brandName,
    price: selectedProductSku.retailPrice,
    mrp: selectedProductSku.regularPrice,
    discount_percentage: selectedProductSku.discount,
    category: productDetails.categoryName,
    subcategory: productDetails.subcategoryName,
    product_type: productDetails.productTypeName,
    subproduct_type: productDetails.subProductTypeName,
    preorder: productDetails.isPresale ? 'yes' : null,
    sale: productDetails.onSale ? 'yes' : null,
    gender: selectedProductSku.gender,
    colour: selectedProductSku?.attributes?.colour,
    low_inventory: selectedProductSku.availableQuantity < 4 ? 'yes' : null,
    delivery_days: selectedProductSku.maxDeliveryDays,
    from_age: productDetails.fromAge,
    to_age: productDetails.toAge,
    sizes: productDetails.simpleSkus.length,
    return: productDetails.isReturnInfoDifferentForSKUs
      ? DIFFERENT_FOR_SIZES
      : selectedProductSku.deliveryMessage?.msg,
    edd:
      productDetails.showSizePickerDropdown &&
      productDetails.isEddDifferentForSKUs
        ? DIFFERENT_FOR_SIZES
        : null,
    v_country: productDetails.country,
    merch_type: selectedProductSku.merchType,
    ...attributes,
  };
  return productTrackData;
};
export const useProductTracking = ({
  selectedSku,
  productDetails,
}: IProductTrackingProps) => {
  const [productTrackData, setData] = useState(() =>
    getTrackingData({ selectedSku, productDetails })
  );
  useEffect(() => {
    setData(getTrackingData({ selectedSku, productDetails }));
  }, [productDetails, selectedSku]);

  return productTrackData;
};
