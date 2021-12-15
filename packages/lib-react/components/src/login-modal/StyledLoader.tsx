import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const CartLoaderWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  background-color: transparent;
`;
const CartSpinner = styled.div`
  position: absolute;
  left: 50%;
  z-index: 1000;
  top: 25%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  position: relative;
  text-align: center;
  margin: 0 auto;
`;

const CircleAnimate = keyframes`
50% {
  -webkit-transform:translateY(-20px);
}
`;

const Bullet = styled.div`
  position: relative;
  top: 20px;
  background-color: #3e4855;
  display: inline-block;
  height: 12px;
  width: 12px;
  border: transparent;
  border-radius: 12px;
  margin: 4px;
  animation-name: jump;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  .circle:nth-of-type(1) {
    animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .circle:nth-of-type(2) {
    animation-delay: 0.13s;
    animation-delay: 0.13s;
  }
  .circle:nth-of-type(3) {
    animation-delay: 0.16s;
    animation-delay: 0.16s;
  }
  .circle:nth-of-type(4) {
    animation-delay: 0.19s;
    animation-delay: 0.19s;
  }
  .circle:nth-of-type(5) {
    animation-delay: 0.22s;
    animation-delay: 0.22s;
  }
  animation: ${CircleAnimate} 1s ease-in-out 0s infinite;
`;
export { CartLoaderWrapper, CartSpinner, Spinner, Bullet };
