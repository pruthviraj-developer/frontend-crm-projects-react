/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { IAccordianProps } from './IAccordion';
import {
  AccordianWrapper,
  AccordionTitle,
  AccordionContent,
  AccordianDescription,
  DetailsDescription,
  DescriptionList,
  DescriptionListItem,
  OtherDetails,
} from './StyledAccordion';

// eslint-disable-next-line no-empty-pattern
export const Accordian: FC<IAccordianProps> = ({}: IAccordianProps) => {
  return (
    <AccordianWrapper>
      <AccordionTitle>Item details</AccordionTitle>
      <AccordionContent>
        <AccordianDescription>
          <DetailsDescription>
            <b>FEATURES:</b>
            <DescriptionList>
              <DescriptionListItem>Material: 100% Cotton</DescriptionListItem>
              <DescriptionListItem>
                The actual product may differ slightly in color from the one
                illustrated in the images..
              </DescriptionListItem>
            </DescriptionList>
            <b>WHAT'S INCLUDED:</b>
            <DescriptionList>
              <DescriptionListItem>1 T-Shirt</DescriptionListItem>
            </DescriptionList>
            <b>CARE:</b>
            <DescriptionList>
              <DescriptionListItem>Gentle Wash</DescriptionListItem>
            </DescriptionList>
            <OtherDetails>
              <b>Suitable for</b>
              <div className={'content'}>Boy's</div>
            </OtherDetails>
            <OtherDetails>
              <b>Colour</b>
              <div className={'content'}>White</div>
            </OtherDetails>
          </DetailsDescription>
        </AccordianDescription>
      </AccordionContent>
    </AccordianWrapper>
  );
};
