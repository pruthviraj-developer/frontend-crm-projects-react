import React, { FC, useState } from 'react';
import { IAccordionProps } from './IAccordion';
import { IconAngleDown } from '@hs/icons';
import {
  AccordionWrapper,
  AccordionTitle,
  AccordionContent,
  AccordionDescription,
  DetailsDescription,
  OtherDetails,
  FeatureAttributesList,
  FeatureAttributesListItem,
  DetailsDescriptionTitle,
  AccordionIcon,
} from './StyledAccordion';

const ACTIVE = 'active';
export const Accordion: FC<IAccordionProps> = ({
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
}: IAccordionProps) => {
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

  const getAccordionDetails = (content: string) => {
    return (
      <AccordionDescription>
        <DetailsDescription
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></DetailsDescription>
      </AccordionDescription>
    );
  };

  const getOtherDetails = (title: string, content?: string) => {
    return (
      <OtherDetails>
        <b>{title}</b>
        <div className={'content'}>{content}</div>
      </OtherDetails>
    );
  };

  return (
    <>
      <AccordionWrapper>
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
          <AccordionDescription>
            {productDesc && (
              <DetailsDescription
                dangerouslySetInnerHTML={{ __html: productDesc }}
              ></DetailsDescription>
            )}
            <DetailsDescription>
              {getOtherDetails(
                'Suitable for',
                simpleSkus[0] && simpleSkus[0].gender
              )}
              {getOtherDetails(
                'Colour',
                simpleSkus[0] && skuAttributes[0].colour
              )}
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
          </AccordionDescription>
        </AccordionContent>
      </AccordionWrapper>
      {showShippingInfo && (
        <AccordionWrapper>
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
            {isReturnable &&
              getAccordionDetails(
                (selectedSku && selectedSku.shippingReturnInfoForSku) ||
                  shippingReturnInfo
              )}
            {!isReturnable && getAccordionDetails(shippingReturnInfo)}
            {isPresale && preOrderDescription && (
              <AccordionDescription>
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
              </AccordionDescription>
            )}
          </AccordionContent>
        </AccordionWrapper>
      )}
      {showBrandDetails && brandDescription && (
        <AccordionWrapper>
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
            {getAccordionDetails(brandDescription)}
          </AccordionContent>
        </AccordionWrapper>
      )}
      {!(showBrandDetails || brandDescription) && (
        <AccordionWrapper>
          <AccordionTitle>By brand {brandName}</AccordionTitle>
        </AccordionWrapper>
      )}
      {moreInfo && (
        <AccordionWrapper>
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
              {getAccordionDetails(moreInfo)}
            </AccordionContent>
          )}
        </AccordionWrapper>
      )}
    </>
  );
};
