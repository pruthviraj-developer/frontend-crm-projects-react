import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import { Colors } from '@hs/utils';

export const StyledCreateCarouselPage = styled.div`
  .MuiGrid-root {
    flex-grow: 1;
  }
`;

export const StyledCreateNonHeroCarouselPage = styled.div`
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

export const StyledCarouselCardPage = styled.div`
  .MuiGrid-root {
    flex-grow: 1;
  }
`;

export const StyledCarouselCard = styled(Card)`
  min-width: 230px;
  padding: 16;
`;
export const StyledFooter = styled.div`
  padding: 15px;
  background-color: ${Colors.GREY_SHADE[500]};
`;
