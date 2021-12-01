import React, { FC, useRef, useEffect, useState } from 'react';
import {
  SizeSelectorWrapper,
  CustomSizePicker,
  AngleDownArrow,
  SelectSize,
  SelectPreview,
  OptionsPreview,
  Options,
  Details,
  ItemsLeft,
  DeliveryIcon,
  DeliveryDetails,
  RecommendedForyou,
  SeeSimilarIcon,
  SizeSoldOut,
  SeeSimilarProducts,
} from './StyledSizeSelector';
import { IconAngleDown, IconDeliveryTruck, IconSeeSimilarWhite } from '@hs/icons';
import { ISizeSelectorProps } from './ISizeSelector';

const SizeSelector: FC<ISizeSelectorProps> = ({ showRFYP, goToProductRecommendation }: ISizeSelectorProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<Boolean>(false);
  const elementRef = useRef<any>();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const ref = elementRef && elementRef.current;
    function handleClickOutside(event: any) {
      if (ref && !ref.contains(event.target)) {
        debugger;
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
                <Details>
                  <ItemsLeft>2 left</ItemsLeft>
                  <DeliveryDetails>
                    {/*                     ng-if="sku.availableQuantity > 0 && sku.availableQuantity < 4"
                    ng-bind="sku.availableQuantity + ' left'" */}
                    <DeliveryIcon icon={IconDeliveryTruck} />
                    4-5 weeks
                  </DeliveryDetails>
                </Details>
              </Options>
              <Options soldOut={true}>
                <span>6-12 months</span>
                <Details>
                  <DeliveryDetails>
                    {/*                     ng-if="sku.availableQuantity > 0 && sku.availableQuantity < 4"
                    ng-bind="sku.availableQuantity + ' left'" */}
                    <DeliveryIcon icon={IconDeliveryTruck} />
                    4-5 weeks
                  </DeliveryDetails>
                </Details>
              </Options>
              <Options soldOut={false}>
                <span>1-2 years</span>
                <Details>
                  <DeliveryDetails>
                    {/*                     ng-if="sku.availableQuantity > 0 && sku.availableQuantity < 4"
                    ng-bind="sku.availableQuantity + ' left'" */}
                    <DeliveryIcon icon={IconDeliveryTruck} />
                    4-5 weeks
                  </DeliveryDetails>
                </Details>
              </Options>
              <Options soldOut={false}>2-3 years</Options>
              <Options soldOut={true}>
                <span>3-4 years</span> <span>Sold out</span>
              </Options>
            </OptionsPreview>
            {showRFYP && (
              <RecommendedForyou>
                <SeeSimilarIcon icon={IconSeeSimilarWhite} />
                <SizeSoldOut>Size sold out?</SizeSoldOut>
                <SeeSimilarProducts
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropDownOpen(false);
                    goToProductRecommendation('Size picker');
                  }}
                >
                  See similar products
                </SeeSimilarProducts>
              </RecommendedForyou>
            )}
          </>
        )}
      </CustomSizePicker>
    </SizeSelectorWrapper>
  );
};
export default SizeSelector;
