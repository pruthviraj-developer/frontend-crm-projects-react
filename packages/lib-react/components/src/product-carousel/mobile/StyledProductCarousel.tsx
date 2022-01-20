import styled from '@emotion/styled';

import { typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';
import Image from 'next/image';
const CarouselWrapper = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  transition: margin-left 1.5s ease;
  position: relative;
`;

const ProductCarouselWrapper = styled.div`
  position: relative;
  /* margin-top: 56px; */
  height: 100vw !important;
`;

const ProductImageContainer = styled.div`
  width: 360px;
  height: 100vw;
  display: inline-block;
  .pdpImages {
    top: 112px !important;
  }
`;

const SvgIconsElement = styled(SvgIcon)``;

const SimilarTextElement = styled.span<{
  width: number;
}>`
  color: #ed54a4;
  padding: ${typography.size.s05}px ${typography.size.s06}px
    ${typography.size.s05}px ${typography.size.s04}px;
  line-height: ${typography.size.s2}px;
  font-weight: ${typography.weight.medium};
  display: ${(props) => (props.width === 140 ? 'block' : 'none')};
`;

const SimilarItemsLinkWrapper = styled.div<{
  width: number;
}>`
  right: 12px;
  bottom: 12px;
  padding: ${typography.size.s06}px;
  background: #fff;
  border-radius: ${typography.size.s24}px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: ${(props) => props.width}px;
  transition: width ease-out 300ms;
`;

const StyledImage = styled(Image)`
  /* width: 100%;
  height: 100%;
  position: relative;
  min-height: 100%;
  min-height: 100%; */
`;

const TransparentImgOverlay = styled.div`
  height: 100%;
  background: #00000000;
  position: absolute;
  top: 0;
  left: 0;
`;

const Dots = styled.div`
  bottom: 13px;
  margin-left: 16px;
  display: flex;
  text-align: left;
  position: absolute;
  justify-content: start;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  padding: 0;
  margin-right: 6px;
  border-radius: 6px;
  transform: ${(props) => (props.active ? 'scale(1.2)' : 'scale(1)')};
  background-color: ${(props) => (props.active ? '#707070' : '#e6e6e6')};
  border: 1px solid #e6e6e6;
`;

export {
  Dot,
  Dots,
  StyledImage,
  SvgIconsElement,
  SimilarTextElement,
  CarouselWrapper,
  ProductCarouselWrapper,
  SimilarItemsLinkWrapper,
  ProductImageContainer,
  TransparentImgOverlay,
};
