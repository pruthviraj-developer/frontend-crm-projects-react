import React, { FC, useState } from 'react';
import { IAccordianProps } from './IAccordion';
import { IconAngleDown } from '@hs/icons';
import {
  AccordianWrapper,
  AccordionTitle,
  AccordionContent,
  AccordianDescription,
  DetailsDescription,
  // DescriptionList,
  // DescriptionListItem,
  OtherDetails,
  FeatureAttributesList,
  FeatureAttributesListItem,
  DetailsDescriptionTitle,
  AccordionIcon,
} from './StyledAccordion';

const ACTIVE = 'active';
// eslint-disable-next-line no-empty-pattern
export const Accordian: FC<IAccordianProps> = ({
  productData,
  skuAttributes = [],
  sku,
}: IAccordianProps) => {
  const [toggleAccordions, setToggleAccordions] = useState({
    item: false,
    shipping: false,
    about: false,
    more: false,
  });
  const toggle = (name: string) => {
    setToggleAccordions({
      ...toggleAccordions,
      [name]: !toggleAccordions[name],
    });
  };
  return (
    <>
      <AccordianWrapper>
        <AccordionTitle
          onClick={() => {
            toggle('item');
          }}
        >
          <span>Item details</span>
          <AccordionIcon
            active={toggleAccordions.item ? true : false}
            icon={IconAngleDown}
          />
        </AccordionTitle>
        <AccordionContent
          className={toggleAccordions.item ? `${ACTIVE} Pruthvi` : ''}
        >
          <AccordianDescription>
            {productData.productDesc && (
              <DetailsDescription
                dangerouslySetInnerHTML={{ __html: productData.productDesc }}
              ></DetailsDescription>
            )}
            <DetailsDescription>
              <OtherDetails>
                <b>Suitable for</b>
                <div className={'content'}>
                  {productData.simpleSkus[0] &&
                    productData.simpleSkus[0].gender}
                </div>
              </OtherDetails>
              <OtherDetails>
                <b>Colour</b>
                <div className={'content'}>
                  {productData.simpleSkus[0] && skuAttributes[0].colour}
                </div>
              </OtherDetails>
            </DetailsDescription>
            {productData.productLevelAttrList &&
              productData.productLevelAttrList.length &&
              productData.productLevelAttrList.map((subAttr, index: number) => {
                return (
                  subAttr.isShowAttr && (
                    <DetailsDescription margin={true} key={index}>
                      <b>{subAttr.attributeName}</b>
                      {subAttr.attributeValue && (
                        <DetailsDescriptionTitle>
                          {subAttr.attributeValue}
                        </DetailsDescriptionTitle>
                      )}
                      <FeatureAttributesList>
                        {subAttr.productSubAttrList &&
                          subAttr.productSubAttrList.length &&
                          subAttr.productSubAttrList.map(
                            (featureAttr, subIndex) => {
                              return (
                                featureAttr.attributeValue && (
                                  <FeatureAttributesListItem key={subIndex}>
                                    {(featureAttr.isShowAttrName
                                      ? `${featureAttr.subAttributeName} : `
                                      : '') + featureAttr.attributeValue}
                                  </FeatureAttributesListItem>
                                )
                              );
                            }
                          )}
                      </FeatureAttributesList>
                    </DetailsDescription>
                  )
                );
              })}
          </AccordianDescription>
        </AccordionContent>
      </AccordianWrapper>
      {productData.showShippingInfo && (
        <AccordianWrapper>
          <AccordionTitle
            onClick={() => {
              toggle('shipping');
            }}
          >
            <span>Shipping and returns</span>
            <AccordionIcon
              active={toggleAccordions.item ? true : false}
              icon={IconAngleDown}
            />
          </AccordionTitle>
          <AccordionContent className={toggleAccordions.shipping ? ACTIVE : ''}>
            {productData.isReturnable && (
              <AccordianDescription>
                <DetailsDescription
                  dangerouslySetInnerHTML={{
                    __html:
                      (sku && sku.shippingReturnInfoForSku) ||
                      productData.shippingReturnInfo,
                  }}
                ></DetailsDescription>
              </AccordianDescription>
            )}
            {!productData.isReturnable && (
              <AccordianDescription>
                <DetailsDescription
                  dangerouslySetInnerHTML={{
                    __html: productData.shippingReturnInfo,
                  }}
                ></DetailsDescription>
              </AccordianDescription>
            )}
            {productData.isPresale && productData.preOrderDescription && (
              <AccordianDescription>
                <DetailsDescription>
                  <OtherDetails>
                    <b>Pre-order</b>
                    <div
                      className={'content'}
                      dangerouslySetInnerHTML={{
                        __html: productData.preOrderDescription,
                      }}
                    ></div>
                  </OtherDetails>
                </DetailsDescription>
              </AccordianDescription>
            )}
          </AccordionContent>
        </AccordianWrapper>
      )}
      {productData.showBrandDetails && productData.brandDescription && (
        <AccordianWrapper>
          <AccordionTitle
            onClick={() => {
              toggle('about');
            }}
          >
            <span>About {productData.brandName}</span>
            <AccordionIcon
              active={toggleAccordions.item ? true : false}
              icon={IconAngleDown}
            />
          </AccordionTitle>
          <AccordionContent className={toggleAccordions.about ? ACTIVE : ''}>
            <AccordianDescription>
              <DetailsDescription
                dangerouslySetInnerHTML={{
                  __html: productData.brandDescription,
                }}
              ></DetailsDescription>
            </AccordianDescription>
          </AccordionContent>
        </AccordianWrapper>
      )}
      {!(productData.showBrandDetails || productData.brandDescription) && (
        <AccordianWrapper>
          <AccordionTitle>By brand {productData.brandName}</AccordionTitle>
        </AccordianWrapper>
      )}
      {productData.moreInfo && (
        <AccordianWrapper>
          <AccordionTitle
            onClick={() => {
              toggle('more');
            }}
          >
            <span>More Info</span>
            <AccordionIcon
              active={toggleAccordions.item ? true : false}
              icon={IconAngleDown}
            />
          </AccordionTitle>
          {productData.moreInfo && (
            <AccordionContent className={toggleAccordions.more ? ACTIVE : ''}>
              <AccordianDescription>
                <DetailsDescription
                  dangerouslySetInnerHTML={{
                    __html: productData.moreInfo,
                  }}
                ></DetailsDescription>
              </AccordianDescription>
            </AccordionContent>
          )}
        </AccordianWrapper>
      )}
    </>
  );
};
