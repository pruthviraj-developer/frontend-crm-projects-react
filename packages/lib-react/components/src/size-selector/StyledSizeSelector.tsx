import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';
const SizeSelectorWrapper = styled.div`
  position: relative;
  padding-bottom: 12px;
`;

const CustomSizePicker = styled.div<{
  isOpen: boolean;
}>`
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  &:hover {
    border-color: #a4a4a4;
  }
  border-color: ${(props) => (props.isOpen ? '#a4a4a4' : '#e6e6e6')};
  border-bottom-left-radius: ${(props) => (props.isOpen ? 0 : '5px')};
  border-bottom-right-radius: ${(props) => (props.isOpen ? 0 : '5px')};
`;

const AngleDownArrow = styled(SvgIcon)`
  margin-top: 1px;
`;

const SelectSize = styled.div`
  width: 100%;
  margin: 0px;
  color: #a4a4a4;
  display: block;
  font-size: 14px;
  line-height: 16px;
  border-radius: 4px;
  background-position: right center;
  background-origin: content-box;
  background-repeat: no-repeat;
`;

const OptionsPreview = styled.div`
  width: 100%;
  display: block;
  overflow: auto;
  max-height: 230px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 8px 20px 0 rgb(0 0 0 / 16%);
`;

const Options = styled.div<{
  soldOut: boolean;
}>`
  padding: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  opacity: ${(props) => (props.soldOut ? 0.4 : 1)};
  &:last-child {
    border: none;
  }
  &:hover {
    cursor: ${(props) => (props.soldOut ? 'not-allowed' : 'pointer')};
    background-color: ${(props) => (props.soldOut ? 'inherit' : '#f9f9f9')};
    div {
      display: flex;
    }
  }
`;

const SelectPreview = styled.div<{
  borderBottom: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 19px 16px 16px;
  border-bottom: ${(props) => (props.borderBottom ? '1px solid #a4a4a4' : 0)};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const Details = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 12px;
`;

const ItemsLeft = styled.span`
  color: #fff;
  padding: 3px 6px;
  line-height: 13px;
  margin-right: 5px;
  border-radius: 4px;
  background-color: #707070;
`;

const DeliveryDetails = styled.span`
  color: #333333;
  line-height: 13px;
  border-radius: 4px;
  background-color: #ffcc33;
  padding: 1px 6px 1px 10px;
  display: flex;
  align-items: center;
`;

const DeliveryIcon = styled(SvgIcon)`
  width: 16px;
  margin-top: 1px;
  margin-right: 4px;
`;

const RecommendedForyou = styled.div`
  color: #fff;
  display: flex;
  font-size: 12px;
  line-height: 15px;
  padding: 10px 16px;
  position: relative;
  background-color: #3e4855;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const SeeSimilarIcon = styled(SvgIcon)``;

const SizeSoldOut = styled.div`
  padding-left: 7px;
  vertical-align: top;
`;

const SeeSimilarProducts = styled.div`
  cursor: pointer;
  font-weight: 600;
  padding-left: 3px;
  letter-spacing: 0.2px;
  text-decoration: underline;
`;

const OptionsPreviewList = styled.div`
  left: 0;
  right: 0;
  z-index: 1;
  border: 1px solid #a4a4a4;
  border-top: 0;
  background: #fff;
  position: absolute;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const SelectedSize = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  color: #333;
`;
export {
  SizeSelectorWrapper,
  CustomSizePicker,
  AngleDownArrow,
  DeliveryIcon,
  SelectSize,
  OptionsPreviewList,
  OptionsPreview,
  Options,
  SelectPreview,
  SelectedSize,
  Details,
  ItemsLeft,
  DeliveryDetails,
  RecommendedForyou,
  SeeSimilarIcon,
  SizeSoldOut,
  SeeSimilarProducts,
};
