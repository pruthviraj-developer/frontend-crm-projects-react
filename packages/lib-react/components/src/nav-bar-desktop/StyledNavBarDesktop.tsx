import styled from '@emotion/styled';
import { Colors, typography, primaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const NavBarWrapper = styled.div`
  background-color: ${Colors.PINK[500]};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const HopscotchImage = styled.div`
  width: 112px;
  height: 100%;
  margin: 0 28px 0 12px;
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
  padding: 0 ${typography.size.s5}px;
  height: 56px;
`;

const CartIconWrapper = styled.div`
  height: 52px;
  margin-right: 7px;
  position: relative;
`;

const CartIconQuantity = styled.span`
  font-size: 12px;
  line-height: 13px;
  font-weight: ${typography.weight.medium};
  color: #ed54a4;
  background: ${Colors.WHITE};
  border-radius: 7px;
  position: absolute;
  top: 10px;
  left: 26px;
  height: 18px;
  min-width: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const IconWrapper = styled(SvgIcon)`
  min-width: 24px;
  min-height: 24px;
`;

const NavigationIconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinkWrapper = styled.div`
  display: flex;
`;

const NotificationBarLinkWrapper = styled.div`
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

const NotificationBar = styled.div`
  background: ${primaryColor[100]};
  color: ${Colors.WHITE};
  font-size: ${typography.size.s1}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.regular};
  display: flex;
  justify-content: end;
  margin: 0 ${typography.size.s5}px;
  padding: 0 ${typography.size.s24}px;
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
  NotificationBar,
  NotificationBarLinkWrapper,
};
