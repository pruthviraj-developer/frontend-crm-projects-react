import styled from '@emotion/styled';
import { Colors } from '@hs/utils';

export const StyledImageUpload = styled.div<{
  previewHeight: number;
  previewWidth: number;
}>`
  display: 'flex';
  justify-content: space-evenly;
  flex-flow: column;
  align-items: center;
  background: ${Colors.GREY_TINT[500]};
  height: ${(props) => props.previewHeight}px;
  width: ${(props) => props.previewWidth}px;
  :hover {
    box-shadow: 0 0 0 1px ${Colors.PINK[400]}, 0 0 0 2px ${Colors.PINK[400]};
  }
`;
export const StyledImage = styled.img`
  /* border-radius: 5%; */
  display: block;
`;
export const StyledProgress = styled.div<{
  margin: number;
}>`
  padding: ${(props) => props.margin}px;
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
`;
