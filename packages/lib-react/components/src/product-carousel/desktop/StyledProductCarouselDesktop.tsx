import styled from '@emotion/styled';
import { typography, mediaQueries, mediaQueriesMaxWidth } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const CarouselWrapper = styled.div`
  white-space: nowrap;
  position: relative;
  padding: 16px 0px 32px 8px;
  max-height: 570px;
  overflow: hidden;
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
  width: 100%;
  max-height: calc(50vw - 8px);
  height: calc(50vw - 8px);
  display: inline-block;
  ${mediaQueriesMaxWidth('mw820')`
      height: 56vw;
      max-height: 56vw;
  `};
  ${mediaQueries('xl')`
    max-height: 558px;
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
  width: 100%;
  max-width: 564px;
  min-height: 56vw;
`;

const RightArrow = styled.div<{ disabled: boolean }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  border-radius: 24px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  box-shadow: ${(props) =>
    props.disabled
      ? '0 0 0 1px rgb(0 0 0 / 10%)'
      : '0 2px 8px 0 rgb(0 0 0 / 8%)'};
  &:hover {
    box-shadow: ${(props) =>
      props.disabled
        ? '0 0 0 1px rgb(0 0 0 / 10%)'
        : '0 2px 4px 0 rgb(0 0 0 / 16%)'};
    svg {
      path {
        fill: ${(props) => (props.disabled ? '#a4a4a4' : '#ed54a4')};
      }
    }
  }
`;

const LeftArrow = styled.div<{ disabled: boolean }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  border-radius: 24px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  box-shadow: ${(props) =>
    props.disabled
      ? '0 0 0 1px rgb(0 0 0 / 10%)'
      : '0 2px 8px 0 rgb(0 0 0 / 8%)'};
  &.left {
    right: auto;
    transform: rotate(180deg);
  }
  &:hover {
    box-shadow: ${(props) =>
      props.disabled
        ? '0 0 0 1px rgb(0 0 0 / 10%)'
        : '0 2px 4px 0 rgb(0 0 0 / 16%)'};
    svg {
      path {
        fill: ${(props) => (props.disabled ? '#a4a4a4' : '#ed54a4')};
      }
    }
  }
`;

const CarouselIcon = styled(SvgIcon)`
  width: 12px;
  height: 14px;
`;

const Arrows = styled.div`
  top: 257px;
  left: 20px;
  width: 95%;
  padding-left: 6px;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;

export {
  CarouselWrapper,
  ProductCarouselWrapper,
  SimilarItemsLinkWrapper,
  SvgIconsElement,
  SimilarTextElement,
  ProductImageContainer,
  TransparentImgOverlay,
  Arrows,
  LeftArrow,
  RightArrow,
  CarouselIcon,
};
