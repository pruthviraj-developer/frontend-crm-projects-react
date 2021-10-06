import styled from '@emotion/styled';
import { Colors, typography, HsTextAlign } from '@hs/utils';

const NavBarWrapper = styled.div`
  background-color: ${Colors.PINK[500]};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  height: 56px;
  width: 100%;
  display: flex;
  align-items: ${HsTextAlign.center};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const HopscotchImage = styled.div`
  width: 112px;
  height: 100%;
`;

const Link = styled('a')`
  color: ${Colors.WHITE};
  font-weight: ${typography.weight.medium};
  float: left;
  padding: 8px 6px;
  margin-top: 16px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: 0;
  text-decoration: none;
`;

const RightContent = styled.div`
  width: calc(100% - 112px);
`;

const CartIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  margin-top: 4px;
  margin-right: 8px;
  float: right;
  position: relative;
`;

const CartIconQuantity = styled.span`
  font-size: 12px;
  line-height: 13px;
  padding: 1px 4px 4px;
  font-weight: ${typography.weight.medium};
  color: #ed54a4;
  background: ${Colors.WHITE};
  border-radius: 7px;
  text-align: ${HsTextAlign.center};
  min-width: 15px;
  height: 15px;
  text-indent: 0;
  position: absolute;
  top: 10px;
  left: 26px;
`;

export {
  NavBarWrapper,
  HopscotchImage,
  CartIconWrapper,
  CartIconQuantity,
  RightContent,
  Link,
};
