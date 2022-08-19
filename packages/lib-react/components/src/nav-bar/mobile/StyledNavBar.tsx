import styled from '@emotion/styled';
import { Colors, HsTextAlign, mediaQueriesMaxWidth } from '@hs/utils';

const NavBarWrapper = styled.div`
  background-color: ${Colors.PINK[500]};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: ${HsTextAlign.center};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HopscotchImage = styled.div`
  display: block;
  @media (max-width: 360px) {
    display: none;
  }
`;

const HopscotchShortImage = styled.div`
  display: none;
  @media (max-width: 360px) {
    display: block;
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartIconWrapper = styled.div`
  height: 52px;
  margin-right: 7px;
  position: relative;
  ${mediaQueriesMaxWidth('sm')`
    margin: 0 2px 0 -4px;
  `};
  @media (max-width: 390px) {
    margin-right: 3px;
  }
`;

const NavigationIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const NavIconWrapper = styled.div<{ marginRight?: boolean }>`
  padding: 4px 6px;
  margin-right: ${(props) => (props.marginRight ? '6px' : '0')};
`;

const NavIconWrapperSearch = styled.div`
  padding: 4px 6px;
  margin-right: 6px;
  ${mediaQueriesMaxWidth('sm')`
    padding: 0 2px 0 4px;
    margin-right: 0;
  `};
  @media (max-width: 390px) {
    padding: 4px;
    margin-right: 3px;
  }
`;

const NavIconWrapperWishList = styled.div<{ marginRight?: boolean }>`
  padding: 4px 6px;
  margin-right: 0;
  ${mediaQueriesMaxWidth('sm')`
    padding-right: 0;
  `};
  @media (max-width: 390px) {
    padding: 4px;
  }
`;

const BackIconWrapper = styled.div`
  padding: 5px;
  margin-left: 5px;
`;

export {
  LeftContent,
  RightContent,
  NavBarWrapper,
  NavIconWrapper,
  HopscotchImage,
  CartIconWrapper,
  BackIconWrapper,
  HopscotchShortImage,
  NavIconWrapperSearch,
  NavIconWrapperWishList,
  NavigationIconsWrapper,
};
