import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';
const SizeSelectorWrapper = styled.div`
  position: relative;
`;

const CustomSizePicker = styled.div<{
  border: Boolean;
}>`
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  &:hover {
    border-color: #a4a4a4;
  }
  border-color: ${(props) => (props.border ? '#a4a4a4' : '#e6e6e6')};
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
  soldOut: Boolean;
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
`;

const SelectPreview = styled.div<{
  borderBottom: Boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 19px 16px 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: ${(props) => (props.borderBottom ? '1px solid #a4a4a4' : 'none')};
`;
const DeliveryDetails = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333333;
  font-size: 12px;
  font-weight: 600;
  line-height: 13px;
  border-radius: 4px;
  background-color: #ffcc33;
  padding: 1px 6px 1px 10px;
`;

const DeliveryIcon = styled(SvgIcon)`
  width: 16px;
  margin-right: 4px;
  margin-top: 1px;
`;

const RecommendedForyou = styled.div`
  position: relative;
  padding: 10px 16px;
  background-color: #3e4855;
  color: #fff;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const SeeSimilarIcon = styled(SvgIcon)``;
const SizeSoldOut = styled.div`
  padding-left: 7px;
  vertical-align: top;
`;
const SeeSimilarProducts = styled.div`
  text-decoration: underline;
  font-weight: 600;
  letter-spacing: 0.2px;
  padding-left: 3px;
`;

export {
  SizeSelectorWrapper,
  CustomSizePicker,
  AngleDownArrow,
  DeliveryIcon,
  SelectSize,
  OptionsPreview,
  Options,
  SelectPreview,
  DeliveryDetails,
  RecommendedForyou,
  SeeSimilarIcon,
  SizeSoldOut,
  SeeSimilarProducts,
};
