import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { primaryColor } from '@hs/utils';

const LoaderWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  position: fixed;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.5);
`;

const LoadingContainer = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  .dot:nth-child(2) {
    animation-delay: 0.15s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.3s;
  }
  .dot:nth-child(4) {
    animation-delay: 0.45s;
  }
`;

const SpinnerAnimation = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
`;

const SpinningDot = styled.div`
  padding: 6px;
  display: inline;
  border-radius: 50%;
  position: absolute;
  background: ${primaryColor[100]};
  animation: ${SpinnerAnimation} 1s ease-in-out 0s infinite;
`;

export { LoaderWrapper, LoadingContainer, SpinningDot };
