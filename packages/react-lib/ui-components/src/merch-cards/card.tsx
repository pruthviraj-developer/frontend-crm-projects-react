import React, { useState } from 'react';
import styled from '@emotion/styled';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { CardProps } from './Icard';
import Carousel from 'react-elastic-carousel';
import clsx from 'clsx';

const CardContainer = styled.div`
  color: rgba(0, 0, 0, 0.87);
  border: 0;
  display: flex;
  position: relative;
  font-size: 0.875rem;
  word-wrap: break-word;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
  margin: 5px;
  border-radius: 6px;
  flex-direction: column;
  max-width: 275px;
`;

const ImageContainer = styled.div`
  margin-top: 5px;
  border-radius: 6px;
  transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1);
`;

const CardBodyContainer = styled.div`
  flex: 1 1 auto;
  padding: 0px 15px;
  position: relative;
`;

const Description = styled.p`
  color: #999;
  text-align: center;
  white-space: break-spaces;
  font-size: 12px;
  font-weight: 300;
  margin: 5px;
`;

const useStyles = makeStyles(() =>
  createStyles({
    'card-image': {
      width: '100%',
      boxShadow:
        '0 5px 15px -8px rgb(0 0 0 / 24%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
      borderRadius: '6px',
      pointerEvents: 'none',
      maxHeight: 200,
      minHeight: 200,
      minWidth: 200
    },
    'card-button': {
      borderRadius: '0 0 6px 6px',
      fontWeight: 700,
    },
    'selected-pid': {
      backgroundColor: '#de0707',
    },
    carousel: {
      margin: '0 20px',
    },
    'image-container': {
    },
    'catalog-attribute': {
      color: '#ED54A4',
    }
  })
);

export const Card = ({
  actionButton,
  buttonType,
  cardsList,
  updateDecisionType,
  defaultKey,
  carouselKey,
  page,
  totalRecords,
  onPageChange,
  updatePids,
}: CardProps) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState<any>({});
  const selectPid = (type, data) => {
    if (selectedData[type] && selectedData[type][data.pid]) {
      delete selectedData[type][data.pid];
    } else {
      if (selectedData[type]) {
        selectedData[type][data.pid] = data.updateDecisionType;
      } else {
        selectedData[type] = { [data.pid]: data.updateDecisionType };
      }
    }
    setSelectedData({ ...selectedData });
    updatePids && updatePids(selectedData);
  };

  const pageArrows = ({ type, onClick }) => {
    const previousArrow = type === 'PREV';
    const nextArrow = type === 'NEXT';
    const pointer = previousArrow ? '<' : '>';
    const cardsLength = (cardsList?.length || 0) < 4 ? true : false;
    const disabledPreviousArrow = previousArrow && (page === 0);
    const disableBoth = (page === 0) && cardsLength;
    const disabledNextArrow = nextArrow && (totalRecords - (page + 1) * 4  > 0 ? false : true);
    return (
      <Button style={{fontSize:'35px', color: (disabledPreviousArrow || disableBoth || disabledNextArrow) ? '#00000042' : '#ED54A4'}} 
      onClick={onClick}
      disabled={disabledPreviousArrow || disableBoth || disabledNextArrow}>
        {pointer}
      </Button>
    )
  }
  return (
    <Grid container>
      <Carousel
        renderArrow={pageArrows}
        itemsToShow={4}
        itemsToScroll={4}
        isRTL={false}
        itemPosition={'START'}
        showEmptySlots={true}
        preventDefaultTouchmoveEvent={true}
        disableArrowsOnEnd={false}
        enableMouseSwipe={false}
        enableSwipe={false}
        pagination={false}
        onNextStart={(nextItemObject) => {
          if (nextItemObject) {
            onPageChange &&
              onPageChange({
                defaultKey,
              });
          }
        }}
        onPrevStart={(nextItemObject) => {
          if (nextItemObject) {
            onPageChange &&
              onPageChange({
                defaultKey,
                isPrevious: 1,
              });
          }
        }}
        className={classes['carousel']}
      >
        {cardsList &&
          cardsList.map((data, index) => (
            <Grid item key={index}>
              <CardContainer>
                <CardBodyContainer>
                  <ImageContainer className={classes['image-container']}>
                    <img
                      className={classes['card-image']}
                      src={data.imageUrl}
                      alt={`Pid - ${data.pid}`}
                    />
                  </ImageContainer>
                  <Description>
                    {data.attributes &&
                      data.attributes.map((obj, keyIndex) => (
                        <span key={keyIndex} style={{display: 'block', textAlign: 'left'}} >
                          {obj.label}:{' '}
                          <b className={classes['catalog-attribute']}>
                            {obj.value || 'NA'}
                          </b>{' '}
                        </span>
                      ))}
                  </Description>
                </CardBodyContainer>
                <Button
                  color={buttonType}
                  variant={'contained'}
                  size={'large'}
                  className={clsx({
                    [classes['card-button']]: true, //always applies
                    [classes['selected-pid']]:
                      selectedData[carouselKey] &&
                      selectedData[carouselKey][data.pid],
                  })}
                  onClick={() => {
                    selectPid(carouselKey, { updateDecisionType, pid: data.pid });
                  }}
                >
                  {selectedData[carouselKey] &&
                  selectedData[carouselKey][data.pid]
                    ? 'Cancel'
                    : actionButton}
                </Button>
              </CardContainer>
            </Grid>
          ))}
      </Carousel>
    </Grid>
  );
};
