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
            {/* <b>WHAT'S INCLUDED:</b>
            <DescriptionList>
              <DescriptionListItem>1 T-Shirt</DescriptionListItem>
            </DescriptionList> */}
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
        </AccordianDescription>
      </AccordionContent>
    </AccordianWrapper>
  );
};
