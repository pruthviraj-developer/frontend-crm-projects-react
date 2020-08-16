import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Box,
  Button,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { ImageUploader } from 'image-upload/ImageUpload.stories';

const StyledCard = styled(Card)`
  max-width: 230px;
`;
const CarouselCardMUI = () => {
  return (
    <StyledCard variant={'elevation'}>
      <CardHeader></CardHeader>
      <CardContent>
        <CardActionArea>
          <ImageUploader></ImageUploader>
        </CardActionArea>
      </CardContent>
      <Box bgcolor="#3e4855" color="white" p={2} m={1}>
        <Button variant="contained" color="primary" size={'large'}>
          Test
        </Button>
        <Button variant="contained" color={'secondary'} size={'large'}>
          Test
        </Button>
        <Button variant="contained" color="primary" size={'large'}>
          Test
        </Button>
        <Button variant="contained" color={'secondary'} size={'large'}>
          Test
        </Button>
      </Box>
    </StyledCard>
  );
};

export default CarouselCardMUI;
