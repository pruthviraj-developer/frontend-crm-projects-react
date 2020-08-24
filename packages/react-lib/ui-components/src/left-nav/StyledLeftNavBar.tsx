import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Colors, fontWeight } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const StyledLeftNavBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  background-color: ${Colors.GREY_SHADE[500]};
  height: 100vh;
  float: left;
`;
const LinkText = styled.div`
  font-weight: ${fontWeight.medium};
  font-size: 10px;
  text-align: center;
  margin-top: 7px;
  color: white;
`;

const StyledIcon = styled(SvgIcon)`
  margin: 0 20px;
  fill: white;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  opacity: 0.72;
  padding: 18px 8px;
  color: white;
  :hover {
    background-color: ${Colors.BLUE[500]};
    opacity: 1;
  }
  &.active {
    background-color: ${Colors.BLUE[500]};
    opacity: 1;
    ${StyledIcon} {
      fill: ${Colors.PINK[500]};
    }
    ${LinkText} {
      color: ${Colors.PINK[500]};
    }
  }
`;
const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  opacity: 0.72;
  padding: 18px 8px;
  color: white;
  :hover {
    background-color: ${Colors.BLUE[500]};
    opacity: 1;
  }
  &.active {
    background-color: ${Colors.BLUE[500]};
    opacity: 1;
    ${StyledIcon} {
      fill: ${Colors.PINK[500]};
    }
    ${LinkText} {
      color: ${Colors.PINK[500]};
    }
  }
`;

export { StyledLeftNavBar, LinkText, StyledNavLink, StyledLink, StyledIcon };
