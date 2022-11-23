import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { typography, Colors, secondaryColor } from '@hs/utils';

const ViewMoreWrpper = styled.div`
  display: flex;
  justify-content: center;
`;

const ViewMoreButton = styled.button<{ loading: boolean }>`
  width: auto;
  max-width: 360px;
  margin-top: 32px;
  text-align: center;
  padding: 16px 28px;
  border-radius: 4px;
  position: relative;
  font-family: inherit;
  color: ${secondaryColor[300]};
  background-color: ${Colors.WHITE};
  font-size: ${typography.size.s2}px;
  border: 1px solid ${Colors.MERCURY};
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
  cursor: ${(props) => (props.loading ? 'default' : 'pointer')};
  &:hover {
    color: ${Colors.PINK[500]};
  }
`;

const LoaderSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;

const LoaderMask = styled.div`
  width: 16px;
  height: 16px;
  overflow: hidden;
`;

const Mask = styled.div`
  width: 26px;
  height: 26px;
  opacity: 0.6;
  border-radius: 13px;
  border: 3px solid #ed54a4;
`;

const Loading = styled.div`
  width: 26px;
  height: 26px;
  position: absolute;
  top: calc(50% - 13px);
  left: calc(50% - 13px);
  animation: ${LoaderSpin} 0.8s infinite linear;
`;

const ViewMoreText = styled.div<{ loading: boolean }>`
  opacity: ${(props) => (props.loading ? 0 : 1)};
`;

export {
  ViewMoreWrpper,
  ViewMoreButton,
  ViewMoreText,
  Loading,
  LoaderMask,
  Mask,
};
