import React, { FC, useState } from 'react';
import { IAccordianProps } from './IAccordion';
import { IconAngleDown } from '@hs/icons';
import {
  AccordianWrapper,
  AccordionTitle,
  AccordionContent,
  AccordianDescription,
  DetailsDescription,
  OtherDetails,
  FeatureAttributesList,
  FeatureAttributesListItem,
  DetailsDescriptionTitle,
  AccordionIcon,
} from './StyledAccordion';

const ACTIVE = 'active';
export const Accordian: FC<IAccordianProps> = ({
  skuAttributes = [],
  selectedSku,
  productDesc,
  moreInfo,
  showBrandDetails,
  brandDescription,
  brandName,
  isPresale,
  preOrderDescription,
  productLevelAttrList = [],
  shippingReturnInfo,
  showShippingInfo,
  simpleSkus = [],
  isReturnable,
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
        <AccordionContent className={toggleAccordions.item ? `${ACTIVE}` : ''}>
          <AccordianDescription>
            {productDesc && (
              <DetailsDescription
                dangerouslySetInnerHTML={{ __html: productDesc }}
              ></DetailsDescription>
            )}
            <DetailsDescription>
              <OtherDetails>
                <b>Suitable for</b>
                <div className={'content'}>
                  {simpleSkus[0] && simpleSkus[0].gender}
                </div>
              </OtherDetails>
              <OtherDetails>
                <b>Colour</b>
                <div className={'content'}>
                  {simpleSkus[0] && skuAttributes[0].colour}
                </div>
              </OtherDetails>
            </DetailsDescription>
            {productLevelAttrList.length &&
              productLevelAttrList.map((subAttr, index: number) => {
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
      {showShippingInfo && (
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
            {isReturnable && (
              <AccordianDescription>
                <DetailsDescription
                  dangerouslySetInnerHTML={{
                    __html:
                      (selectedSku && selectedSku.shippingReturnInfoForSku) ||
                      shippingReturnInfo,
                  }}
                ></DetailsDescription>
              </AccordianDescription>
            )}
            {!isReturnable && (
              <AccordianDescription>
                <DetailsDescription
                  dangerouslySetInnerHTML={{
                    __html: shippingReturnInfo,
                  }}
                ></DetailsDescription>
              </AccordianDescription>
            )}
            {isPresale && preOrderDescription && (
              <AccordianDescription>
                <DetailsDescription>
                  <OtherDetails>
                    <b>Pre-order</b>
                    <div
                      className={'content'}
                      dangerouslySetInnerHTML={{
                        __html: preOrderDescription,
                      }}
                    ></div>
                  </OtherDetails>
                </DetailsDescription>
              </AccordianDescription>
            )}
          </AccordionContent>
        </AccordianWrapper>
      )}
      {showBrandDetails && brandDescription && (
        <AccordianWrapper>
          <AccordionTitle
            onClick={() => {
              toggle('about');
            }}
          >
            <span>About {brandName}</span>
            <AccordionIcon
              active={toggleAccordions.item ? true : false}
              icon={IconAngleDown}
            />
          </AccordionTitle>
          <AccordionContent className={toggleAccordions.about ? ACTIVE : ''}>
            <AccordianDescription>
              <DetailsDescription
                dangerouslySetInnerHTML={{
                  __html: brandDescription,
                }}
              ></DetailsDescription>
            </AccordianDescription>
          </AccordionContent>
        </AccordianWrapper>
      )}
      {!(showBrandDetails || brandDescription) && (
        <AccordianWrapper>
          <AccordionTitle>By brand {brandName}</AccordionTitle>
        </AccordianWrapper>
      )}
      {moreInfo && (
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
          {moreInfo && (
            <AccordionContent className={toggleAccordions.more ? ACTIVE : ''}>
              <AccordianDescription>
                <DetailsDescription
                  dangerouslySetInnerHTML={{
                    __html: moreInfo,
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
