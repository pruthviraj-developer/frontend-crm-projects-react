import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';
const SizeSelectorWrapper = styled.div`
  position: relative;
`;

const CustomSizePicker = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 16px 19px 16px 16px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  &:hover {
    border-color: #a4a4a4;
  }
`;

const AngleDownArrow = styled(SvgIcon)`
  margin-top: 1px;
`;

const SelectSize = styled.div`
  font-size: 14px;
  line-height: 16px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  display: block;
  width: 100%;
  border-radius: 4px;
  color: #a4a4a4;
  background-position: right center;
  background-origin: content-box;
  background-repeat: no-repeat;
`;

export { SizeSelectorWrapper, CustomSizePicker, AngleDownArrow, SelectSize };
