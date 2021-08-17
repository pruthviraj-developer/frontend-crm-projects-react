import styled from '@emotion/styled';
import { Colors } from '@hs/utils';
import { Paper, Card } from '@material-ui/core';

export const StyledImageUploadMultiple = styled.div`
  display: flex;
  margin-right: 5px;
`;

export const StyledImageUpload = styled(Paper)`
  padding: 20px;
  max-width: 70vw;
`;

export const StyledCard = styled(Card)`
  max-width: 230px;
`;

export const StyledImage = styled.img`
  border: 1px solid ${Colors.GREY_TINT[500]};
  display: block;
`;

export const StyledUploadMessage = styled.div<{
  height: number;
  width: number;
}>`
  display: flex;
  justify-content: space-around;
  flex-flow: column wrap;
  align-items: center;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background: ${Colors.GREY_TINT[500]};
`;
