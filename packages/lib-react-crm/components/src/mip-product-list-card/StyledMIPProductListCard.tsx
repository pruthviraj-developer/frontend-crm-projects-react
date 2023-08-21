import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

const CardTableWrapper = styled.div<{ hasButton: boolean }>`
  position: absolute !important;
  width: ${(props) => {
    if (props.hasButton) {
      return `calc(100% - 8px)`;
    } else {
      return '100%';
    }
  }};
  left: ${(props) => {
    if (props.hasButton) {
      return `5px`;
    } else {
      return '0px';
    }
  }};
  bottom: ${(props) => {
    if (props.hasButton) {
      return `38px`;
    } else {
      return '0px';
    }
  }};
  z-index: 30;
  max-height: 0;
  transition: max-height 0.5s ease-out;
  overflow: hidden;
  .MuiTableCell-head {
    font-weight: 400 !important;
  }
  .MuiTableCell-root {
    padding: 4px 20px;
  }
`;

const CardWrapper = styled.div`
  max-width: 370px;
  width: 33.33333%;
  height: 360px;
  overflow: hidden;
  position: relative;
  /* margin: 5px; */
  padding: 4px;
  box-sizing: border-box;

  &:hover ${CardTableWrapper} {
    max-height: 500px;
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const CardImage = styled.img`
  width: 100%;
`;
const CardOverlay = styled.div<{
  borderColor: string;
}>`
  width: calc(100% - 6px);
  height: 100%;
  position: absolute;
  z-index: 26;
  box-sizing: border-box;
  border: ${(props) => {
    if (props.borderColor) {
      return `4px solid ${props.borderColor}`;
    } else {
      return 'none';
    }
  }};
  top: 0px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  z-index: 10;
  button {
    flex-grow: 1 !important;
    color: #fff !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    border-radius: 0px !important;
  }
`;

const CullButton = styled(Button)`
  background-color: #ff0100 !important;
`;

const KeepButton = styled(Button)`
  background-color: #028e77 !important;
`;

export {
  CardWrapper,
  CardImageWrapper,
  CardImage,
  ButtonWrapper,
  CullButton,
  KeepButton,
  CardTableWrapper,
  CardOverlay,
};
