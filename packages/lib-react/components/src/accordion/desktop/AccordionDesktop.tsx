import React, { FC, useState } from 'react';
import {
  IAccordionProps,
  AccordionProductSubAttrListEntityProps,
} from '../IAccordion';
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
  AccordionToggleIcon,
  AccordionIcon,
} from './StyledAccordionDesktop';

const ACTIVE = 'active';
export const AccordionDesktop: FC<IAccordionProps> = ({
  selectedSku,
  productDesc,
  moreInfo,
  isPresale = 0,
  preOrderDescription,
  productLevelAttrList = [],
  shippingReturnInfo,
  showShippingInfo,
  simpleSkus = [],
  isReturnable,
}: IAccordionProps) => {
  const [toggleAccordions, setToggleAccordions] = useState({
    item: true,
    shipping: false,
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

  const getAccordionTitle = (toggleElement: string, title: string) => {
    return (
      <AccordionTitle
        onClick={() => {
          toggle(toggleElement);
        }}
      >
        <span>{title}</span>
        <AccordionToggleIcon
          active={toggleAccordions[toggleElement] ? true : false}
        >
          <AccordionIcon icon={IconAngleDown} />
        </AccordionToggleIcon>
      </AccordionTitle>
    );
  };

  const getFeatureAttributesList = (
    productSubAttrList: AccordionProductSubAttrListEntityProps[] = []
  ) => {
    return productSubAttrList.length ? (
      <FeatureAttributesList>
        {productSubAttrList.map((featureAttr, subIndex) => {
          return (
            featureAttr.attributeValue && (
              <FeatureAttributesListItem key={subIndex}>
                {(featureAttr.isShowAttrName
                  ? `${featureAttr.subAttributeName} : `
                  : '') + featureAttr.attributeValue}
              </FeatureAttributesListItem>
            )
          );
        })}
      </FeatureAttributesList>
    ) : (
      ''
    );
  };

  return (
    <>
      <AccordionWrapper>
        {getAccordionTitle('item', 'Item details')}
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
                simpleSkus[0] && simpleSkus[0].attributes.colour
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
                      {getFeatureAttributesList(
                        (subAttr && subAttr.productSubAttrList) || []
                      )}
                    </DetailsDescription>
                  )
                );
              })}
          </AccordionDescription>
        </AccordionContent>
      </AccordionWrapper>
      {showShippingInfo && (
        <AccordionWrapper>
          {getAccordionTitle('shipping', 'Shipping and returns')}
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
      {moreInfo && (
        <AccordionWrapper>
          {getAccordionTitle('more', 'More Info')}
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
