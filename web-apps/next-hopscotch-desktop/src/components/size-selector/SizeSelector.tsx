import React, { FC, useRef, useEffect, useState } from 'react';
import {
  SizeSelectorWrapper,
  CustomSizePicker,
  AngleDownArrow,
  DeliveryIcon,
  SelectSize,
  SelectPreview,
  OptionsPreview,
  Options,
  DeliveryDetails,
  RecommendedForyou,
  SeeSimilarIcon,
  SizeSoldOut,
  SeeSimilarProducts,
} from './StyledSizeSelector';
import { IconAngleDown, IconDeliveryTruck, IconSeeSimilarWhite } from '@hs/icons';

const SizeSelector: FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<Boolean>(false);
  const elementRef = useRef<any>();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const ref = elementRef && elementRef.current;
    function handleClickOutside(event: any) {
      if (ref && !ref.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickInside = () => {
    setIsDropDownOpen(true);
  };

  return (
    <SizeSelectorWrapper ref={elementRef} onClick={handleClickInside}>
      <CustomSizePicker border={isDropDownOpen}>
        <SelectPreview borderBottom={isDropDownOpen}>
          <SelectSize>Select a size</SelectSize>
          <AngleDownArrow icon={IconAngleDown} />
        </SelectPreview>
        {isDropDownOpen && (
          <>
            <OptionsPreview>
              <Options soldOut={false}>
                <span>6-12 months</span>
                <DeliveryDetails>
                  <DeliveryIcon icon={IconDeliveryTruck} />
                  4-5 weeks
                </DeliveryDetails>
              </Options>
              <Options soldOut={true}>6-12 months</Options>
              <Options soldOut={false}>1-2 years</Options>
              <Options soldOut={false}>2-3 years</Options>
              <Options soldOut={true}>
                <span>3-4 years</span> <span>Sold out</span>
              </Options>
            </OptionsPreview>
            <RecommendedForyou>
              <SeeSimilarIcon icon={IconSeeSimilarWhite} />
              <SizeSoldOut>Size sold out?</SizeSoldOut>
              <SeeSimilarProducts>See similar products</SeeSimilarProducts>
            </RecommendedForyou>
          </>
        )}
      </CustomSizePicker>
    </SizeSelectorWrapper>
  );
};
export default SizeSelector;
