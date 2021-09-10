/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { IAccordianProps } from './IAccordion';
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
} from './StyledAccordion';

// eslint-disable-next-line no-empty-pattern
export const Accordian: FC<IAccordianProps> = ({
  productInfo,
}: IAccordianProps) => {
  return (
    <>
      <AccordianWrapper>
        <AccordionTitle>Item details</AccordionTitle>
        <AccordionContent>
          <AccordianDescription>
            {productInfo.productDesc && (
              <DetailsDescription
                dangerouslySetInnerHTML={{ __html: productInfo.productDesc }}
              ></DetailsDescription>
            )}
            <DetailsDescription>
              <OtherDetails>
                <b>Suitable for</b>
                <div className={'content'}>
                  {productInfo.simpleSkus[0] &&
                    productInfo.simpleSkus[0].gender}
                </div>
              </OtherDetails>
              <OtherDetails>
                <b>Colour</b>
                <div className={'content'}>
                  {productInfo.simpleSkus[0] &&
                    productInfo.simpleSkus[0].attributes.colour}
                </div>
              </OtherDetails>
            </DetailsDescription>
            {productInfo.productLevelAttrList &&
              productInfo.productLevelAttrList.length &&
              productInfo.productLevelAttrList.map((subAttr, index: number) => {
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

      {productInfo.showBrandDetails && productInfo.brandDescription && (
        <AccordianWrapper>
          <AccordionTitle>About {productInfo.brandName}</AccordionTitle>
          <AccordionContent>
            <AccordianDescription>
              <DetailsDescription
                dangerouslySetInnerHTML={{
                  __html: productInfo.brandDescription,
                }}
              ></DetailsDescription>
            </AccordianDescription>
          </AccordionContent>
        </AccordianWrapper>
      )}
    </>
  );
};
