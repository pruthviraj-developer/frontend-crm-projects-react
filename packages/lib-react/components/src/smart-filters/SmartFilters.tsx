import React, { FC, useEffect, useState } from 'react';
import {
  Filter,
  CloseIcon,
  FiltersList,
  CarouselIcon,
  SelectedFilter,
  SmartFiltersWrapper,
  FiltersCarouseWrapper,
  Arrows,
  ArrowButton,
  ArrowWrapper,
} from './StyledSmartFilters';
import { IconCarouselCaret, IconClearYellow } from '@hs/icons';
import { ISmartFilterProps } from '@hs/framework';
import {
  IProductListSmartFilterSection,
  IProductListSmartFilterTile,
  IProductListAppliedSmartFilters,
} from '@hs/framework';
import { useKeenSlider } from 'keen-slider/react';
export const SmartFilters: FC<ISmartFilterProps> = ({
  productListName,
  filters,
  addSmartFilter,
  removeSmartFilter,
}: ISmartFilterProps) => {
  const [loaded, setLoaded] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [slideIndexArray, setSlideIndexArray] = useState<number[]>([]);
  const [currentSlideNum, setCurrentSlideNum] = React.useState(0);
  const [maxSlideNum, setMaxSlideNum] = React.useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: false,
    mode: 'snap',
    rtl: false,
    slides: { perView: 'auto',spacing : 8 },
    slideChanged(slider) {
      
      let progress = slider.track.details.progress;
      let count = slider.track.details.slides.length;
      let currentSlide = progress * count;
      let maxSlide = slider.track.details.maxIdx;
      let absSlide = slider.track.details.abs;
      
      
      if(progress != undefined || progress != null){
        if(progress == 0){
          setShowRightArrow(true);
          setShowLeftArrow(false);
        }else if(progress > 0 && progress < 1){
          setShowRightArrow(true);
          setShowLeftArrow(true);
        }else{
          setShowRightArrow(false);
          setShowLeftArrow(true);
        }

      }
      
      if(absSlide == 0){
        setShowLeftArrow(false);
      }
      if(currentSlide>maxSlide){
        setShowRightArrow(false);
      }
      
    },
    created() {
      setLoaded(true);
    },
    updated(){
      let progress = instanceRef?.current?.track.details.progress;
      if(progress != undefined || progress != null){
        if(progress == 0){
          setShowRightArrow(true);
          setShowLeftArrow(false);
        }else if(progress > 0 && progress < 1){
          setShowRightArrow(true);
          setShowLeftArrow(true);
        }else{
          setShowRightArrow(false);
          setShowLeftArrow(true);
        }
    }
  },
});


// useEffect(()=>{
//   setTimeout(()=>{
//     let progress = instanceRef.current?.track.details.progress;
//     console.dir(progress)
//   },0)
  
//   // if(maxSlideNum == 0){
//   //   console.dir('inside If')
//   //   setMaxSlideNum(slideIndexArray.length)
//   // }
// },[currentSlideNum])


  useEffect(()=>{
      let progress = instanceRef?.current?.track.details.progress;
      if(progress != undefined || progress != null){
        if(progress == 0){
          setShowRightArrow(true);
          setShowLeftArrow(false);
        }else if(progress > 0 && progress < 1){
          setShowRightArrow(true);
          setShowLeftArrow(true);
        }else{
          setShowRightArrow(false);
          setShowLeftArrow(true);
        }

      }
  },[instanceRef])

  useEffect(()=>{
    let slider  = instanceRef.current ? instanceRef.current : null;
    if(slider)
    {
      setSlideIndexArray([]);
      setMaxSlideNum(0);
      setCurrentSlideNum(0)
      slider.update(undefined,0)
    }
  },[filters])

  const Arrow = (props: { left?: boolean; onClick: (e) => void }) => {
    return (
      <>
        {props.left ? (
          <ArrowButton onClick={props.onClick} className="left">
            <CarouselIcon icon={IconCarouselCaret} />
          </ArrowButton>
        ) : (
          <ArrowButton onClick={props.onClick}>
            <CarouselIcon icon={IconCarouselCaret} />
          </ArrowButton>
        )}
      </>
    );
  };

  return (
    <SmartFiltersWrapper>
      <FiltersList>
        {productListName ? (
           <SelectedFilter isDefault={true}>
            {productListName.replace(/\+/g, ' ')}
          </SelectedFilter>
          ) : <></> }
        {filters?.appliedSmartFilters.map(
          (appliedFilter: IProductListAppliedSmartFilters, index: number) => {
            return (
              <SelectedFilter
                key={index}
                isDefault={false}
                onClick={() => {
                  removeSmartFilter(appliedFilter);
                }}
              >
                {appliedFilter.name}
                <CloseIcon icon={IconClearYellow} />
              </SelectedFilter>
            );
          }
        )}
      </FiltersList>
      { filters?.smartFilterSections && filters?.smartFilterSections?.length > 0 ? (
        <FiltersCarouseWrapper>
          <FiltersList ref={sliderRef} className="keen-slider">
            {filters?.smartFilterSections.map(
              (smartFilterSection: IProductListSmartFilterSection) => {
                return smartFilterSection.smartFilterTiles.map(
                  (
                    smartFilterTile: IProductListSmartFilterTile,
                    index: number
                  ) => {
                    return (
                      <Filter
                        key={index}
                        onClick={() => {
                          addSmartFilter(
                            smartFilterSection.sectionType,
                            smartFilterTile
                          );
                        }}
                        className="keen-slider__slide"
                        id={'carousel-' + index}
                      >
                        {smartFilterTile.name}
                      </Filter>
                    );
                  }
                );
              }
            )}
          </FiltersList>
          {loaded && instanceRef?.current && (
            <Arrows>
              {instanceRef.current?.track?.details?.progress >= 0 && showLeftArrow ? (
                <ArrowWrapper className="left">
                  <Arrow
                    left
                    onClick={(e) => {
                      e.stopPropagation();
                      // instanceRef.current?.prev();
                      // let slides = instanceRef.current ? instanceRef.current.track.details.slides : [];
                      // let absIdxSlideArray = slides.filter((item)=>item.portion == 1);
                      // let absIdxSlide = absIdxSlideArray[0].abs;
                      // let backScrollSlideNum = absIdxSlide - 1; 
                      // setCurrentSlideNum(backScrollSlideNum);
                      // let backScrollSlideNum = 0;
                      setCurrentSlideNum((prevSlideNum)=>{
                        
                        let currentSlideNum = prevSlideNum > 0 ? prevSlideNum - 1 : 0;
                        if(currentSlideNum){
                          let backScrollSlideNum = slideIndexArray[currentSlideNum - 1];
                          instanceRef.current?.moveToIdx(backScrollSlideNum);
                        }else{
                          instanceRef.current?.moveToIdx(0);
                        }
                        
                        return currentSlideNum;
                      })
                      
                    }}
                  />
                </ArrowWrapper>
              ) : (
                <></>
              )}

              {instanceRef.current?.track?.details?.progress < 1 && showRightArrow ? (
                <ArrowWrapper>
                  <Arrow
                    onClick={(e) => {
                      e.stopPropagation();
                      let slides = instanceRef.current ? instanceRef.current.track.details.slides : [];
                      let absIdxSlideArray = slides.filter((item)=>item.portion == 1);
                      let absIdxSlide = absIdxSlideArray[absIdxSlideArray.length - 1].abs;
                      let nextScrollSlideNum = absIdxSlide - 1; 
                      // setCurrentSlideNum(nextScrollSlideNum)
                      instanceRef.current?.moveToIdx(nextScrollSlideNum);
                      if(!slideIndexArray[currentSlideNum + 1] && (maxSlideNum == 0 || (slideIndexArray.length < maxSlideNum && currentSlideNum < maxSlideNum)))
                      {
                        let newSlideIndexArray = [...slideIndexArray,nextScrollSlideNum];
                        setSlideIndexArray(newSlideIndexArray);
                      }
                      setCurrentSlideNum((prevSlideNum)=>{
                        return prevSlideNum + 1;
                      })
                    }}
                  />
                </ArrowWrapper>
              ) : (
                <></>
              )}
            </Arrows>
          )}
        </FiltersCarouseWrapper>
      ) : (
        <></>
      )}
    </SmartFiltersWrapper>
  );
};
