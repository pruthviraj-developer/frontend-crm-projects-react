import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';

const GoToTopWrapper = styled.span`
  z-index: 5;
  right: 64px;
  bottom: 32px;
  display: flex;
  color: #707070;
  position: fixed;
  cursor: pointer;
  font-weight: 600;
  padding: 6px 8px 6px 4px;
  border-radius: 4px;
  align-items: center;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 4px 0 rgb(51 51 51 / 20%);
`;

const BackToTopText = styled.span`
  color: #707070;
  /* font-size: 14px; */
  font-weight: 600;
  line-height: 16px;
  position: relative;
  padding-left: 4px;
  padding-right: 4px;
`;

const BackToTopIconWrapper = styled.div``;

const BackToTopIcon = styled(SvgIcon)`
  max-width: 24px;
  max-height: 24px;
`;

export { GoToTopWrapper, BackToTopIconWrapper, BackToTopIcon, BackToTopText };
