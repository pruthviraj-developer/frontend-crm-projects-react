import styled from '@emotion/styled';

const CardTableWrapper = styled.div`
  position: absolute !important;
  width: 100%;
  left: 0px;
  bottom: 0px;
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

const CardWrapper = styled.div<{
  borderColor: string;
}>`
  max-width: 370px;
  width: 33.33%;
  height: 360px;
  border: ${(props) => {
    return `${props.borderColor}`;
  }};
  overflow: hidden;
  position: relative;
  margin: 10px;
  box-sizing: border-box;

  &:hover ${CardTableWrapper} {
    max-height: 100%;
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;
export { CardWrapper, CardImageWrapper, CardImage, CardTableWrapper };
