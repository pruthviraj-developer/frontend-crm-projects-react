import React from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { CarouselCardPageProps } from './ICarouselCardPage';

export const CarouselCardPage = (props: CarouselCardPageProps) => {
  return (
    <Card>
      <CardHeader title={'Test'}>
        <Button variant="contained" color="primary" size={'large'}>
          Test||{props.src}
        </Button>
      </CardHeader>
      <CardContent>
        <Button variant="contained" color="primary" size={'large'}>
          Test
        </Button>
      </CardContent>
    </Card>
  );
};
