import { IProductDetailsAttrsEntity } from 'product/types';
import {
  IProductSchema,
  IProductTrackingProps,
  ICanonicalUrl,
} from './IProductTrackingUtil';

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
    name: defaultSku.productName,
    image:
      productData &&
      Array.isArray(productData.imgurls) &&
      productData.imgurls[0].imgUrlFull,
    sku: productData.id,
    mpn: productData.id,
    description: `Buy ${defaultSku.productName} online in India at ₹${defaultSku.retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`,
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
      '@type': 'Brand',
      name: productData.brandName,
    },
  };
  return JSON.stringify(SchemaData);
};

export const getCanonicalUrl = ({ productData, url }: ICanonicalUrl) => {
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
const getWeek = (date: Date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const week = Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
  );
  return week;
};

export const timeTrackingData = () => {
  const currentTime = new Date();
  const currentOffset = currentTime.getTimezoneOffset();
  const ISTOffset = 330; // IST offset UTC +5:30
  const d = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  return {
    '[time] hour_of_day': d.getHours(),
    '[time] day_of_week': (d.getDay() + 1) % 7,
    '[time] day_of_month': d.getDate(),
    '[time] month_of_year': d.getMonth() + 1,
    '[time] week_of_year': getWeek(d),
  };
};
