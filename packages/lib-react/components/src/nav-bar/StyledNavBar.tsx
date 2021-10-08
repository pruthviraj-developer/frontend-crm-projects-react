import styled from '@emotion/styled';
import { Colors, typography, HsTextAlign } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

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
  z-index: 1003;
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
  margin-top: 17px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: 0;
  text-decoration: none;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CartIconWrapper = styled.div`
  height: 52px;
  margin-right: 7px;
  position: relative;
`;

const CartIconQuantity = styled.span`
  font-size: 12px;
  line-height: 13px;
  padding: 2px 2px 1px 1px;
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

const IconWrapper = styled(SvgIcon)`
  min-width: 24px;
  min-height: 24px;
`;

const NavigationIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const NavLinkWrapper = styled.div`
  padding-top: 1px;
`;

const NavIconWrapper = styled.div<{ marginRight?: boolean }>`
  padding: 4px 6px;
  margin-right: ${(props) => (props.marginRight ? '6px' : '0')};
`;

const HelpLink = styled.div`
  margin-left: 5px;
  font-weight: 500;
`;

export {
  NavBarWrapper,
  NavLinkWrapper,
  NavIconWrapper,
  NavigationIconsWrapper,
  HopscotchImage,
  CartIconWrapper,
  CartIconQuantity,
  RightContent,
  Link,
  IconWrapper,
  HelpLink,
};
