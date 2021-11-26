import styled from '@emotion/styled';
import { typography, Colors, secondaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const DeliveryDetailsWrapper = styled.div`
  padding: ${typography.size.s1}px ${typography.size.s3}px ${typography.size.s06}px;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  color: ${Colors.GRAY20};
  background-color: ${Colors.GRAY50};
  margin: ${typography.size.s5}px 0px 0px 0px;
  font-weight: : ${typography.weight.regular};
`;

const DeliveryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  /* font-size: 14px; */
`;

const Title = styled.span`
  font-weight: ${typography.weight.medium};
  color: ${Colors.GRAY20};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
`;

const PinCode = styled.span`
  color: #ed54a4;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: ${typography.weight.medium};
`;

const DeliveryDetailsContent = styled.div`
  margin-top: ${typography.size.s1}px;
`;

const DeliveryBadge = styled.span<{
  color: string;
  bgColor: string;
}>`
  font-size: 1.2rem;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color || 'rgb(51, 51, 51)'};
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  border-radius: ${typography.size.s04}px;
  margin-left: ${typography.size.s04}px;
  padding: ${typography.size.s03}px ${typography.size.s08}px;
  display: inline-block;
`;

const Delivery = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  color: ${secondaryColor[300]};
  line-height: ${typography.size.s3}px;
  padding-left: ${typography.size.s08}px;
  margin-bottom: ${typography.size.s0}px;
`;

const DeliveryInfo = styled.span`
  margin-left: ${typography.size.s02}px;
`;

const DeliverIcon = styled(SvgIcon)`
  height: ${typography.size.s3}px;
  margin-right: ${typography.size.s02}px;
`;

const PreOrderInfo = styled.span`
  display: inline-block;
  vertical-align: middle;
  & > a {
    text-decoration: underline;
    color: ${secondaryColor[300]};
    padding-left: ${typography.size.s04}px;
  }
`;

const SelectedSkuSize = styled.div`
  opacity: 0.56;
  line-height: 20px;
  font-weight: 400;
  /* font-size: 14px; */
  color: #333;
`;

const SizeSelector = styled.div`
  background-color: #f5f5f5;
  padding: 8px 8px 8px 16px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #dfe1e6;
  height: 36px;
  /* font-size: 14px; */
  color: #707070;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const SizeSelectorIcon = styled(SvgIcon)`
  opacity: 0.5;
`;

export {
  DeliveryDetailsWrapper,
  DeliveryDetailsContent,
  DeliveryTitle,
  DeliveryBadge,
  DeliveryInfo,
  Delivery,
  Title,
  PinCode,
  DeliverIcon,
  PreOrderInfo,
  SelectedSkuSize,
  SizeSelector,
  SizeSelectorIcon,
};
