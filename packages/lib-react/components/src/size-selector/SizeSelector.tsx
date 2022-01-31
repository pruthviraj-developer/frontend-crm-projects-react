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
  SelectedSize,
  SizeSoldOut,
  SeeSimilarProducts,
  ErrorMessage,
} from './StyledSizeSelector';
import {
  IconAngleDown,
  IconDeliveryTruck,
  IconSeeSimilarWhite,
} from '@hs/icons';
import { ISizeSelectorProps } from './ISizeSelector';
import { ISimpleSkusEntityProps } from '@hs/framework';
const ADD_TO_CART_BUTTON = 'Add to cart button';
export const SizeSelector: FC<ISizeSelectorProps> = ({
  showRFYP,
  simpleSkus,
  selectedSku,
  onSizeSelect,
  goToProductRecommendation,
  isAddtoCartClicked = false,
  canOpenDropDown = false,
  onDropDownClose,
}: ISizeSelectorProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const elementRef = useRef<any>();

  useEffect(() => {
    if (canOpenDropDown) setIsDropDownOpen(canOpenDropDown);
  }, [canOpenDropDown]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const ref = elementRef && elementRef.current;
    function handleClickOutside(event: MouseEvent) {
      if (ref && !ref.contains(event.target)) {
        setIsDropDownOpen(false);
        onDropDownClose();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickInside = () => {
    setIsDropDownOpen(true);
  };

  const getSize = () => {
    return (
      <SelectedSize>
        <span>{selectedSku?.attributes.size}</span>
        {selectedSku?.availableQuantity &&
          selectedSku?.availableQuantity < 4 && (
            <span>Only {selectedSku?.availableQuantity} left</span>
          )}
      </SelectedSize>
    );
  };

  return (
    <SizeSelectorWrapper ref={elementRef} onClick={handleClickInside}>
      <CustomSizePicker isOpen={isDropDownOpen}>
        <SelectPreview borderBottom={isDropDownOpen}>
          <SelectSize>{selectedSku ? getSize() : 'Select a size'}</SelectSize>
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
                      onClick={(e) => {
                        if (sku.availableQuantity > 0) {
                          e.stopPropagation();
                          onSizeSelect(sku, ADD_TO_CART_BUTTON);
                          setIsDropDownOpen(false);
                        }
                      }}
                    >
                      <span>{sku.attributes.size}</span>
                      {sku.availableQuantity < 1 ? (
                        <span>Sold out</span>
                      ) : (
                        <Details>
                          {sku.availableQuantity < 4 && (
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
                })}
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
          </OptionsPreviewList>
        )}
      </CustomSizePicker>
      {isAddtoCartClicked && !selectedSku && (
        <ErrorMessage>Please select a size</ErrorMessage>
      )}
    </SizeSelectorWrapper>
  );
};
