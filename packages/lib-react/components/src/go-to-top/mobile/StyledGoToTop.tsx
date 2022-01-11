import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';

const GoToTopWrapper = styled.span`
  left: 50%;
  top: 76px;
  right: auto;
  bottom: auto;
  z-index: 5;
  display: flex;
  color: #707070;
  position: fixed;
  cursor: pointer;
  font-weight: 600;
  border-radius: 18px;
  align-items: center;
  background-color: #fff;
  padding: 8px 8px 8px 4px;
  transform: translateX(-50%);
  transition: all 0.25s ease-out;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 4%);
`;

const BackToTopText = styled.span`
  top: 4px;
  color: #000;
  opacity: 0.8;
  font-weight: 400;
  padding-right: 4px;
  line-height: 16px;
`;

const BackToTopIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 6px;
  margin-right: 8px;
  text-align: center;
  border-radius: 14px;
  transform: rotate(90deg);
  background-color: rgba(223, 225, 230, 0.36);
`;

const BackToTopIcon = styled(SvgIcon)`
  margin: 5px 4px 4px;
  opacity: 0.36;
  max-width: 14px;
  max-height: 14px;
`;

export { GoToTopWrapper, BackToTopIconWrapper, BackToTopIcon, BackToTopText };
