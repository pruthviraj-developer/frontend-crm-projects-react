import React, { FC, useRef, useEffect, useState } from 'react';
import {
  SizeSelectorWrapper,
  CustomSizePicker,
  AngleDownArrow,
  SelectSize,
  SelectPreview,
  OptionsPreview,
  OptionsPreviewList,
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
import { ISimpleSkusEntityProps } from '@hs/framework';
const ADD_TO_CART_BUTTON = 'Add to cart button';
const SizeSelector: FC<ISizeSelectorProps> = ({
  showRFYP,
  simpleSkus,
  onSizeSelect,
  goToProductRecommendation,
}: ISizeSelectorProps) => {
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
      <CustomSizePicker isOpen={isDropDownOpen}>
        <SelectPreview borderBottom={isDropDownOpen}>
          <SelectSize>Select a size</SelectSize>
          <AngleDownArrow icon={IconAngleDown} />
        </SelectPreview>
        {isDropDownOpen && (
          <OptionsPreviewList>
            <OptionsPreview>
              {simpleSkus &&
                simpleSkus.map((sku: ISimpleSkusEntityProps, index: number) => {
                  return (
                    <Options
                      soldOut={sku.availableQuantity < 1 ? true : false}
                      key={index}
                      onClick={() => {
                        if (sku.availableQuantity > 0) {
                          onSizeSelect(sku, ADD_TO_CART_BUTTON);
                        }
                      }}
                    >
                      <span>{sku.attributes.size}</span>
                      {sku.availableQuantity < 1 ? (
                        <span>Sold out</span>
                      ) : (
                        <Details>
                          {sku.availableQuantity < 4 && sku.availableQuantity > 0 && (
                            <ItemsLeft>{sku.availableQuantity} left</ItemsLeft>
                          )}
                          <DeliveryDetails>
                            <DeliveryIcon icon={IconDeliveryTruck} />
                            {/* {sku.eddPrefix + ' ' + sku.deliveryMsg} */}
                            {sku.deliveryMsg}
                          </DeliveryDetails>
                        </Details>
                      )}
                    </Options>
                  );
                })
              }
            </OptionsPreview>
            {
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
            }
          </OptionsPreviewList>
        )}
      </CustomSizePicker>
    </SizeSelectorWrapper>
  );
};
export default SizeSelector;
