import styled from '@emotion/styled';
import 'react-multi-carousel/lib/styles.css';
import { typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';
import Image from 'next/image';
const CarouselWrapper = styled.div`
  overflow: initial;
  position: relative;
  white-space: nowrap;
  text-align: center;
  left: 0;
  padding: 16px 36px 32px 8px;
`;

const ProductCarouselWrapper = styled.div`
  position: relative;
`;

const ProductImageContainer = styled.div`
  width: 360px;
  height: 360px;
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

export {
  CarouselWrapper,
  ProductCarouselWrapper,
  ProductImageContainer,
  SimilarItemsLinkWrapper,
  SvgIconsElement,
  SimilarTextElement,
  StyledImage,
};
