import styled from '@emotion/styled';
import {
  Colors,
  typography,
  HsTextAlign,
  mediaQueriesMaxWidth,
} from '@hs/utils';

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
  z-index: 1000;
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
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: 0;
  text-decoration: none;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${mediaQueriesMaxWidth('mw280')`
      display: block;
      margin: auto;
  `};
`;

const CartIconWrapper = styled.div`
  height: 52px;
  margin-right: 7px;
  position: relative;
  ${mediaQueriesMaxWidth('mw350')`
    margin: 0 2px 0 -4px;
  `};
`;

const NavigationIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const NavLinkWrapper = styled.div`
  ${mediaQueriesMaxWidth('mw350')`
   display:flex;
  `};
  position: relative;
`;

const NavIconWrapper = styled.div<{ marginRight?: boolean }>`
  padding: 4px 6px;
  margin-right: ${(props) => (props.marginRight ? '6px' : '0')};
`;

const NavIconWrapperSearch = styled.div`
  padding: 4px 6px;
  margin-right: 6px;
  ${mediaQueriesMaxWidth('mw350')`
    padding: 0 2px 0 4px;
    margin-right: 0;
  `};
`;

const NavIconWrapperWishList = styled.div<{ marginRight?: boolean }>`
  padding: 4px 6px;
  margin-right: 0;
  ${mediaQueriesMaxWidth('mw350')`
    padding-right: 0;
  `};
`;

const HelpLink = styled.div`
  margin-left: 5px;
  font-weight: 500;
`;

const NotificationDot = styled.div`
  top: 23px;
  left: 55px;
  width: 6px;
  height: 6px;
  position: absolute;
  border-radius: 50%;
  background-color: ${Colors.WHITE};
`;

export {
  NavBarWrapper,
  NavLinkWrapper,
  NavIconWrapper,
  NotificationDot,
  NavIconWrapperSearch,
  NavIconWrapperWishList,
  NavigationIconsWrapper,
  HopscotchImage,
  CartIconWrapper,
  RightContent,
  Link,
  HelpLink,
};
