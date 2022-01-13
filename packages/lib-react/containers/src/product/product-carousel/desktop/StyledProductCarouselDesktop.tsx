import styled from '@emotion/styled';
import { typography, mediaQueries } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const CarouselWrapper = styled.div`
  white-space: nowrap;
  position: relative;
  padding: 16px 0px 32px 8px;
  max-height: 570px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const ProductCarouselWrapper = styled.div`
  padding-left: 8px;
  background: #fff;
  position: relative;
  width: 58.33333%;
  ${mediaQueries('lg')`
    width: 58.33333%;
 `};
  ${mediaQueries('xl')`
    width: 66.66667%;
  `};
`;

const ProductImageContainer = styled.div`
  height: 468px;
  max-width: 558px;
  min-width: 558px;
  display: inline-block;
  ${mediaQueries('xl')`
    height: 558px;
  `};
`;

const SvgIconsElement = styled(SvgIcon)``;

const SimilarTextElement = styled.span<{
  width: number;
}>`
  color: #ed54a4;
  padding: ${typography.size.s05}px ${typography.size.s06}px;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s2}px;
  font-weight: ${typography.weight.medium};
  display: ${(props) => (props.width === 140 ? 'block' : 'none')};
`;

const SimilarItemsLinkWrapper = styled.div<{
  width: number;
}>`
  top: 28px;
  height: 46px;
  right: 28px;
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

const TransparentImgOverlay = styled.div`
  height: 100%;
  background: #00000000;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 558px;
  min-width: 558px;
`;

const RightArrow = styled.div<{ disabled: boolean }>`
  top: 28.3%;
  right: 26px;
  width: 48px;
  height: 48px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  position: absolute;
  border-radius: 24px;
  background: #fff;
  box-shadow: ${(props) =>
    props.disabled
      ? '0 0 0 1px rgb(0 0 0 / 10%)'
      : '0 2px 8px 0 rgb(0 0 0 / 8%)'};
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%);
  }
`;
const LeftArrow = styled.div<{ disabled: boolean }>`
  top: 28.3%;
  left: 26px;
  width: 48px;
  height: 48px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  position: absolute;
  border-radius: 24px;
  background: #fff;
  box-shadow: ${(props) =>
    props.disabled
      ? '0 0 0 1px rgb(0 0 0 / 10%)'
      : '0 2px 8px 0 rgb(0 0 0 / 8%)'};
  &.left {
    right: auto;
    transform: rotate(180deg);
  }
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%);
  }
`;

const CarouselIcon = styled(SvgIcon)`
  width: 12px;
  height: 14px;
  &:hover {
    fill: red;
  }
`;

export {
  CarouselWrapper,
  ProductCarouselWrapper,
  ProductImageContainer,
  SimilarItemsLinkWrapper,
  SvgIconsElement,
  SimilarTextElement,
  TransparentImgOverlay,
  RightArrow,
  LeftArrow,
  CarouselIcon,
};
