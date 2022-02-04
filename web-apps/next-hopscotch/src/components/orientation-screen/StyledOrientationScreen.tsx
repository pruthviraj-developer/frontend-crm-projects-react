import styled from '@emotion/styled';
import { typography, Colors, secondaryColor, primaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';
import { keyframes } from '@emotion/core';
import OrientationScreen from './OrientationScreen';

const AnimateSccreen = keyframes`
0% {
  opacity: 0;
}
50% {
    opacity: 0.5;
}
100% {
    opacity: 1;
}
`;

const OrientationScreenWrapper = styled.div`
  position: fixed;
  overflow: auto;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${AnimateSccreen} fadein 1.5s normal;
`;

const Orientation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3e4855;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const OrientationIcon = styled(SvgIcon)`
  margin-bottom: 50px;
`;

const OrientationMessage = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0 10px 0;
`;

const OrientationDescription = styled.p`
  opacity: 0.72;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 0 10px 0;
  letter-spacing: 0.2px;
`;

const Details = styled.div`
  color: #fff;
  width: 420px;
  text-align: center;
  font-style: normal;
  font-stretch: normal;
  font-family: inherit;
  letter-spacing: normal;
`;

export { OrientationScreenWrapper, OrientationDescription, OrientationMessage, OrientationIcon, Orientation, Details };
