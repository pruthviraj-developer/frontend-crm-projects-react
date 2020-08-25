import styled from '@emotion/styled';
import { Card } from '@material-ui/core';

export const StyledCreateCarouselPage = styled.div`
  .MuiGrid-root {
    flex-grow: 1;
  }
`;
export const StyledChips = styled.div`
  display: 'flex';
  flex-wrap: 'wrap';
  .child {
    margin: 2;
  }
`;
export const StyledCard = styled(Card)`
  max-width: 250px;
  margin-left: 15px;
`;
