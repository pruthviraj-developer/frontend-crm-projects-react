import React, { FC } from 'react';
import { CreateNonCarouselPage, CreateNonCarouselProps } from '@hs-crm/containers';
import styled from '@emotion/styled';
import { Switch, Route, useParams } from 'react-router-dom';

const StyledCreateorWrapper = styled.div`
  margin-left: 90px;
  width: auto;
`;
const CarouselCreator: FC = () => {
  /* eslint-disable no-unused-vars */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: CreateNonCarouselProps) => {
    // alert(data);
    // console.log(data);
  };
  const params = useParams<{ id: string }>();
  const props: CreateNonCarouselProps = {
    action: onSubmit,
  };
  return (
    <Switch>
      <Route path="/create-carousel">
        <StyledCreateorWrapper>
          <h1>Create Page Carousel</h1>
          <CreateNonCarouselPage {...props} carouselId={''} />
        </StyledCreateorWrapper>
      </Route>
      <Route path="/edit-carousel/:id">
        <StyledCreateorWrapper>
          <h1>Edit Page Carousel</h1>
          <CreateNonCarouselPage {...props} carouselId={params.id} />
        </StyledCreateorWrapper>
      </Route>
    </Switch>
  );
};
export default CarouselCreator;
