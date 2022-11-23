import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';

const QuickShopWrapper = styled.div`
  width: 100%;
  bottom: 72px;
  cursor: default;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.96);
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0, 0, 0.2, 1);
  max-height: 0;
`;

const GetItIn = styled.div<{ eddTextColor: string; eddColor: string }>`
  text-align: center;
  padding: 4px 0 4px 0;
  font-size: ${typography.size.s1}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  color: ${(props) => props.eddTextColor || '#fff'};
  background-color: ${(props) => props.eddColor || '#707070'};
  cursor: auto;
`;

const SizeDetails = styled.div`
  padding: 16px 16px 12px;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  display: flex;
  justify-content: space-between;
`;

const SizeLabel = styled.div``;

const QuantityLeft = styled.span`
  margin-left: ${typography.size.s08}px;
  color: ${Colors.RED[200]};
  font-weight: ${typography.weight.regular};
`;

const ViewSizeChart = styled.span`
  cursor: pointer;
  color: ${Colors.PINK[500]};
`;

const SizeSelector = styled.div`
  display: flex;
  flex-flow: wrap;
  max-height: 94px;
  overflow-y: scroll;
  padding: 0 16px 4px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Size = styled.span`
  margin-right: 8px;
  padding: 8px 12px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  border: solid 1px #dfe1e6;
  border-radius: 24px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: rgba(223, 225, 230, 0.36);
  }
  opacity: 0.8;
  &.disabled {
    opacity: 0.36;
    cursor: default;
    background-color: #ffffff;
  }
  &.selected {
    color: #ed54a4;
    border: 1px solid #ed54a4;
  }
`;

const AddToCart = styled.button`
  width: 100%;
  cursor: pointer;
  font-family: inherit;
  color: ${Colors.WHITE};
  text-transform: uppercase;
  border: 1px solid transparent;
  padding: ${typography.size.s1}px 0;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ed54a4;
  &.disabled {
    opacity: 1;
    cursor: default;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export {
  Size,
  GetItIn,
  AddToCart,
  SizeLabel,
  SizeDetails,
  SizeSelector,
  QuantityLeft,
  ViewSizeChart,
  QuickShopWrapper,
};
