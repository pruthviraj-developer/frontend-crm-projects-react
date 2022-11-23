import styled from '@emotion/styled';
import {
  Colors,
  secondaryColor,
  // typography,
  // HsTextAlign,
  // mediaQueriesMaxWidth,
} from '@hs/utils';

const NavBarWrapper = styled.div`
  height: 48px;
  display: block;
  padding: 0 12px;
  position: relative;
  background-color: ${Colors.WHITE};
`;

// const HopscotchImage = styled.div`
//   width: 112px;
//   height: 100%;
// `;

// const Link = styled('a')`
//   color: ${Colors.WHITE};
//   font-weight: ${typography.weight.medium};
//   float: left;
//   padding: 8px 6px;
//   margin-top: 17px;
//   font-size: 1.2rem;
//   font-weight: 600;
//   line-height: 1.33;
//   letter-spacing: 0;
//   text-decoration: none;
// `;

// const RightContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   ${mediaQueriesMaxWidth('xs')`
//       display: block;
//       margin: auto;
//   `};
// `;

// const CartIconWrapper = styled.div`
//   height: 52px;
//   margin-right: 7px;
//   position: relative;
//   ${mediaQueriesMaxWidth('sm')`
//     margin: 0 2px 0 -4px;
//   `};
// `;

// const NavigationIconsWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 4px;
// `;

// const NavLinkWrapper = styled.div`
//   ${mediaQueriesMaxWidth('sm')`
//    display:flex;
//   `};
//   position: relative;
// `;

// const NavIconWrapper = styled.div<{ marginRight?: boolean }>`
//   padding: 4px 6px;
//   margin-right: ${(props) => (props.marginRight ? '6px' : '0')};
// `;

// const NavIconWrapperSearch = styled.div`
//   padding: 4px 6px;
//   margin-right: 6px;
//   ${mediaQueriesMaxWidth('sm')`
//     padding: 0 2px 0 4px;
//     margin-right: 0;
//   `};
// `;

// const NavIconWrapperWishList = styled.div<{ marginRight?: boolean }>`
//   padding: 4px 6px;
//   margin-right: 0;
//   ${mediaQueriesMaxWidth('sm')`
//     padding-right: 0;
//   `};
// `;

// const HelpLink = styled.div`
//   margin-left: 5px;
//   font-weight: 500;
// `;

const NotificationDot = styled.div`
  width: 4px;
  height: 4px;
  opacity: 0.36;
  margin-right: 6px;
  margin-left: 6px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${secondaryColor[300]};
`;

export { NavBarWrapper, NotificationDot };
