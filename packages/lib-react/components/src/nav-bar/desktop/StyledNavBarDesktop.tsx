import styled from '@emotion/styled';
import { Colors, typography, primaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const NavBarWrapper = styled.div`
  background-color: ${Colors.PINK[500]};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  z-index: 1005;
`;
const NavBarCntnr = styled.div`
  max-width: 1400px;
  margin: auto;
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
  height: 54px;
`;

const CartIconWrapper = styled.div`
  height: 52px;
  margin-right: 6px;
  position: relative;
`;

const NavigationIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 10px 0 0;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: center;
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
  padding: 0 ${typography.size.s24}px;
`;

const FilteredBy = styled.span`
  color: #fff;
  opacity: 0.8;
  width: 100px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
  border-radius: 14px;
  margin-left: 4px;
  text-align: center;
  position: relative;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.12);
`;

const FilterWrapper = styled.div`
  margin: 0 32px 0 0;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-right: 15px;
`;

const InputSearch = styled.input`
  border: none;
  border-radius: 0;
  background-color: #ed54a4;
  box-shadow: none;
  color: #fff;
  height: 25px;
  width: 320px;
  border-bottom: 1px solid #ffffff33;
  -webkit-appearance: none;
  font-size: 1.4rem;
  box-sizing: content-box;
  padding: 0;
  margin-left: 14px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &::placeholder {
    color: #f5f5f5;
    font-family: 'Averta', Helvetica, Arial, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
  }
`;

const SearchIconWrapper = styled(SvgIcon)`
  min-width: 24px;
  min-height: 24px;
  margin-top: 4px;
`;

export {
  FilteredBy,
  FilterWrapper,
  NavBarWrapper,
  NavLinkWrapper,
  NavIconWrapper,
  NavigationIconsWrapper,
  HopscotchImage,
  CartIconWrapper,
  RightContent,
  Link,
  HelpLink,
  NotificationBar,
  NotificationBarLinkWrapper,
  SearchWrapper,
  InputSearch,
  SearchIconWrapper,
  NavBarCntnr,
};
