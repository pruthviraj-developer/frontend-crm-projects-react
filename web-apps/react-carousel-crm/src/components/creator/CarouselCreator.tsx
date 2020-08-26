import React, { FC } from 'react';
import { CreateNonCarouselPage, CreateCarouselProps } from '@hs/containers';
import styled from '@emotion/styled';

const StyledCreateorWrapper = styled.div`
  margin-left: 90px;
  width: auto;
`;
const CarouselCreator: FC = () => {
  const onSubmit = (data: any) => {
    alert(data);
    console.log(data);
  };

  const props: CreateCarouselProps = {
    action: onSubmit,
  };
  return (
    <StyledCreateorWrapper>
      <h1>Create Page Carousel</h1>
      <CreateNonCarouselPage {...props} />
    </StyledCreateorWrapper>
  );
};
export default CarouselCreator;
