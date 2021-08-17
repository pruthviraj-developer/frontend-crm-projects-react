import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
import { Card } from '@material-ui/core';

export const StyledCarouselPage = styled.div`
  .MuiGrid-root {
    flex-grow: 1;
  }
`;

export const StyledCard = styled(Card)`
  max-width: 230px;
  padding: 16;
`;
export const StyledFooter = styled.div`
  padding: 15px;
  background-color: ${Colors.GREY_SHADE[500]};
`;
