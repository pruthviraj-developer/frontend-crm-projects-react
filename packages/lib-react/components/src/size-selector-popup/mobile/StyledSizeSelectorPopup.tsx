import styled from '@emotion/styled';
import { typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const DeliveryPincodeContainer = styled.div`
  width: calc(100% - 40px);
  height: 32px;
  margin-left: 20px;
  margin-top: 20px;
  background-color: rgba(9, 173, 224, 0.12);
  border-radius: 4px;
`;

const DeliveryPincode = styled.div`
  /* font-size: 14px; */
  line-height: 20px;
  font-weight: 400;
  color: #000;
  opacity: 0.8;
  text-align: center;
  padding-top: 6px;
  padding-bottom: 8px;
  letter-spacing: 0.2px;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-weight: ${typography.weight.medium};
  /* font-size: ${typography.size.s2}px; */
  line-height: ${typography.size.s3}px;
  padding: ${typography.size.s4}px ${typography.size.s3}px
    ${typography.size.s15}px;
  display: flex;
  justify-content: space-between;
`;

const SizeSelectorPopupWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${typography.size.s24}px ${typography.size.s3}px 0
    ${typography.size.s3}px;
  /* font-size: ${typography.size.s2}px; */
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
`;

const SizeWrapper = styled.div`
  height: 50vh;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: calc(50vh + 36px);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  left: 0;
  background: #fff;
`;

const Size = styled.span`
  font-size: ${typography.size.s3}px;
`;

const SizeLabel = styled.span``;

const ViewSizeChart = styled.span`
  color: #ed54a4;
  letter-spacing: 0.4px;
  /* font-size: ${typography.size.s2}px; */
`;

const OptionsContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: scroll;
  max-height: calc(50vh - 48px - 88px);
`;

const Option = styled.div<{ selected: boolean }>`
  padding: 16px;
  padding-bottom: ${(props) => (props.selected ? 12 : 16)}px;
  background-color: ${(props) =>
    props.selected ? 'rgba(237, 84, 164, 0.04)' : 'inherit'};
`;

const SizeSelector = styled.div<{ selected?: boolean }>`
  font-size: 1.6rem;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.selected ? 'flex-start' : 'center')};
`;

const SoldOutWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SvgIconsElement = styled(SvgIcon)``;

const SoldOut = styled.span`
  letter-spacing: normal;
  color: #f45d53;
  margin-right: 16px;
`;

const DeliveryMessageWrapper = styled.div`
  font-size: 1.2rem;
  line-height: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const DeliveryMessage = styled.span`
  /* font-size: 14px; */
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: #0c884a;
  font-weight: normal;
  display: flex;
  align-items: center;
`;

const DeliveryMessageOval = styled.span`
  width: 4px;
  height: 4px;
  opacity: 0.12;
  background-color: #000000;
  border-radius: 4px;
  margin-left: 8px;
`;

const QuantityLeftOut = styled.span`
  /* font-size: 14px; */
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: #ed7100;
  padding: 4px 8px;
  font-weight: normal;
`;
const SizeSelectorWrapper = styled.div`
  position: fixed;
  min-width: 100%;
  left: 0;
  bottom: 0;
`;
export {
  DeliveryPincodeContainer,
  DeliveryPincode,
  DeliveryMessageWrapper,
  DeliveryMessage,
  DeliveryMessageOval,
  QuantityLeftOut,
  SizeSelectorPopupWrapper,
  SizeWrapper,
  Header,
  Size,
  ViewSizeChart,
  OptionsContainer,
  Option,
  SizeLabel,
  SvgIconsElement,
  SizeSelector,
  SoldOut,
  SoldOutWrapper,
  SizeSelectorWrapper,
};
