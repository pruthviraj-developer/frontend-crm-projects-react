import { IProductDetailsAttrsEntity } from 'product/types';
import { IProductSchema, IProductTrackingProps } from './IProductTrackingUtil';

const DIFFERENT_FOR_SIZES = 'Different for sizes';
export const getProductTrackingData = ({
  selectedSku,
  productData,
}: IProductTrackingProps) => {
  const selectedProductSku = selectedSku || productData?.simpleSkus?.[0];
  const attributes = selectedProductSku?.attrs?.reduce(
    (obj: Record<string, string>, item: IProductDetailsAttrsEntity) => (
      (obj[item.name.toLowerCase().replace(/[^0-9a-zA-Z]+|\s+/, '_')] =
        item.value),
      obj
    ),
    {}
  );
  const productTrackData = {
    product_id: productData.id,
    sku: selectedSku?.skuId || productData?.simpleSkus.map((sku) => sku.skuId),
    name: productData.productName,
    brand: productData.brandName,
    price: selectedProductSku.retailPrice,
    mrp: selectedProductSku.regularPrice,
    discount_percentage: selectedProductSku.discount,
    category: productData.categoryName,
    subcategory: productData.subcategoryName,
    product_type: productData.productTypeName,
    subproduct_type: productData.subProductTypeName,
    preorder: productData.isPresale ? 'yes' : null,
    sale: productData.onSale ? 'yes' : null,
    gender: selectedProductSku.gender,
    colour: selectedProductSku?.attributes?.colour,
    low_inventory: selectedProductSku.availableQuantity < 4 ? 'yes' : null,
    delivery_days: selectedProductSku.maxDeliveryDays,
    from_age: productData.fromAge,
    to_age: productData.toAge,
    sizes: productData.simpleSkus.length,
    return: productData.isReturnInfoDifferentForSKUs
      ? DIFFERENT_FOR_SIZES
      : selectedProductSku.deliveryMessage?.msg,
    edd:
      productData.showSizePickerDropdown && productData.isEddDifferentForSKUs
        ? DIFFERENT_FOR_SIZES
        : productData.edd,
    v_country: productData.country,
    merch_type: selectedProductSku.merchType,
    ...attributes,
  };
  return productTrackData;
};

export const getSchemaData = ({
  defaultSku,
  productData,
  url,
}: IProductSchema) => {
  const SchemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.productName,
    image:
      productData &&
      Array.isArray(productData.imgurls) &&
      productData.imgurls[0].imgUrlFull,
    sku: productData.id,
    mpn: productData.id,
    description: productData.productDesc,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: defaultSku.retailPrice,
      availability: !(defaultSku.availableQuantity > 0)
        ? 'http://schema.org/OutOfStock'
        : 'http://schema.org/InStock',
      url: url,
    },
    brand: {
      '@type': 'Thing',
      name: productData.brandName,
    },
  };
  return JSON.stringify(SchemaData);
};

export const getCanonicalUrl = ({ productData, url }: IProductSchema) => {
  let canonicalURL = '';
  const baseUrl = url.toLowerCase();
  const productURL = baseUrl.substring(baseUrl.lastIndexOf('/'), 0);
  const canonicalProductName = productData.simpleSkus[0].productName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  canonicalURL = `${productURL}/${canonicalProductName}`;
  return canonicalURL;
};
