import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';
import { keyframes } from '@emotion/core';

const GoToCartDesktopWrapper = styled.div``;

const GoToCartButtonAnimate = keyframes`
  0% {
    top: 0px;
  }
  50% {
    top: -10px;
  }
  100% {
    top: 0px;
  }
`;

const GoToCartButton = styled.button`
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 16px;
  position: relative;
  letter-spacing: normal;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  text-transform: uppercase;
  border: 1px solid transparent;
  background-color: #ed54a4;
  color: ${Colors.WHITE};
  margin: ${typography.size.s3}px 0 ${typography.size.s08}px 0;
  padding: ${typography.size.s3}px;
  &:hover {
    background-color: #e8288d;
    color: #fff;
  }
  animation: ${GoToCartButtonAnimate} 1s ease-in-out 0s 1;
`;

export { GoToCartDesktopWrapper, GoToCartButton };
