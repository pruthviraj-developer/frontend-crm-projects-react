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
                {productInfo.simpleSkus[0] && productInfo.simpleSkus[0].gender}
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
              <DetailsDescription key={index}>
                <b>{subAttr.attributeName}</b>
                <DetailsDescriptionTitle>
                  {subAttr.attributeValue}
                </DetailsDescriptionTitle>
                <FeatureAttributesList>
                  {subAttr.productSubAttrList &&
                    subAttr.productSubAttrList.length &&
                    subAttr.productSubAttrList.map((featureAttr, subIndex) => {
                      <FeatureAttributesListItem key={subIndex}>
                        {(featureAttr.isShowAttrName
                          ? `${featureAttr.subAttributeName} : `
                          : '') + featureAttr.attributeValue}
                      </FeatureAttributesListItem>;
                    })}
                </FeatureAttributesList>
              </DetailsDescription>;
            })}
        </AccordianDescription>
      </AccordionContent>
    </AccordianWrapper>
  );
};

{
  /* <div class="detail" ng-repeat="subAttr in vm.product.productLevelAttrList">
<div class="heading" ng-bind="::subAttr.attributeName"></div>
<div class="content">
  <div class="content" ng-bind-html="::subAttr.attributeValue"></div>
  <ul>
    <li ng-repeat="featureAttr in subAttr.productSubAttrList"
      ng-bind="::((featureAttr.isShowAttrName ? featureAttr.subAttributeName + ' : ' : '') + featureAttr.attributeValue)">
    </li>
  </ul>
</div>
</div> */
}
