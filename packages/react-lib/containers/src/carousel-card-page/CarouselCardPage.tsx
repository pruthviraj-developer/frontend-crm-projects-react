import React from 'react';
import { CarouselCard } from '@hs/components';

export const CarouselCardPage = () => {
  // const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <CarouselCard
      autoCopmpleOptions={{ options: [{ name: 'Test1', value: 'value1' }] }}
    ></CarouselCard>
  );
};
