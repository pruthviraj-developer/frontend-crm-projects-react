import React, { FC } from 'react';
import CarouselCard from './CarouselCard';
import styled from '@emotion/styled';
import CarouselCardMUI from './CarouselCardMUI';
export default {
  title: 'Card',
};
const StyledCardCntr = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  width: 1000px;
  /* font-size: 10; */
  /* width: 500px; */
  /* height: 500px; */
`;
export const CardMUI: FC = () => (
  <StyledCardCntr>
    <CarouselCardMUI />
  </StyledCardCntr>
);
export const Card: FC = () => (
  <StyledCardCntr>
    <CarouselCard />
  </StyledCardCntr>
);
export const MultipleCard: FC = () => (
  <StyledCardCntr>
    <CarouselCard key="card1" />
    <CarouselCard key="card2" />
    <CarouselCard key="card3" />
    <CarouselCard key="card4" />
    <CarouselCard key="card5" />
    <CarouselCard key="card6" />
  </StyledCardCntr>
);
