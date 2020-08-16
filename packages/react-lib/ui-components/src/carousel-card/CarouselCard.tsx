import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../button';
import { Colors } from '@hs/utils';
import ImageUploader from 'image-upload/ImageUpload';
import DropDown from 'drop-down/DropDown';

const StyledCard = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  /* align-items: center; */
  height: 400px;
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  background: ${Colors.GREY_TINT[200]};
  position: relative;
  box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.5);
  /* margin: 10px; */
`;
const StyledBottomPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  align-items: center;
  background: #3e4855;
  color: white;
  width: 200px;
  position: absolute;
  bottom: 0;
  height: 130px;
  padding: 10px 10px;
  margin-left: -10px;
  border-bottom-left-radius: 2.5px;
  border-bottom-right-radius: 2.5px;
`;
const onClickS = (value) => {
  setTimeout(() => {
    alert(value);
  }, 1000);
};
const dropDownProps = {
  showList: false,
  isMultiselect: false,
  selectedObjects: [{}],
  onSingleSelect: onClickS,
  //   onMultiSelect: onClick,
  options: ['Test 1', 'Test 12', 'Test 13', 'Test 14', 'Test 5'],
  disabled: false,
  placeholder: 'Position',
  menuWidth: 100,
};

const dropDownProps2 = {
  ...dropDownProps,
  menuWidth: 200,
  placeholder: 'Select PLP',
};

const CarouselCard = () => {
  return (
    <StyledCard>
      <DropDown {...dropDownProps2} />
      <ImageUploader></ImageUploader>
      <StyledBottomPanel>
        <DropDown {...dropDownProps2} />
        <DropDown {...dropDownProps} />
        <Button
          value="Remove"
          className="primary"
          onClick={() => {
            // /console.log('Clicked');
          }}
        ></Button>
        {/* <DropDown {...dropDownProps} /> */}
      </StyledBottomPanel>
    </StyledCard>
  );
};

export default CarouselCard;
