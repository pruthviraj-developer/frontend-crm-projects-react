import styled from '@emotion/styled';
import { typography, Colors, secondaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const DeliveryDetailsWrapper = styled.div`
  background-color: ${Colors.WHITE};
  box-shadow: 0 1px 0 0 ${Colors.MERCURY}, 0 -1px 0 0 ${Colors.MERCURY};
  padding: ${typography.size.s24}px ${typography.size.s3}px ${typography.size.s2}px;
  margin: 0px;
`;

const DeliveryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Title = styled.span`
  font-weight: ${typography.weight.medium};
  color: #333;
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
  font-size: ${typography.size.s1}px;
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
  padding-left: ${typography.size.s08}px;
  margin-bottom: ${typography.size.s0}px;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  color: ${secondaryColor[300]};
  display: flex;
  align-items: center;
`;

const DeliveryInfo = styled.span``;

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
};
