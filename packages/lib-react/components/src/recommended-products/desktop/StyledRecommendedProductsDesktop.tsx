import styled from '@emotion/styled';
import { typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const RecommendedProductsWrapper = styled.div`
  background: #f5f5f5;
  max-width: 1400px;
  margin: auto;
`;

const RecommendedProductsTitle = styled.div`
  border-top: 1px solid #e6e6e6;
  padding: 4rem 0 2.8rem;
  text-align: center;
`;

const RecommendedTitle = styled.span`
  font-size: 2.4rem;
  line-height: 2.9rem;
  font-weight: ${typography.weight.medium};
`;

const RecommendedMatchingWrapper = styled.div`
  margin: 12px 0 56px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecommendedProductWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HrDashedLine = styled.hr`
  width: 48px;
  background-color: #ed54a4;
  height: 2px;
  border: none;
  margin: 0.8rem auto auto;
`;

const Divider = styled.div`
  margin: auto 12px;
  width: 1px;
  background: #a4a4a4;
  height: 30px;
`;

const Scroller = styled.div`
  top: 32%;
  z-index: 1;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background: #fff;
  position: absolute;
  border-radius: 24px;
  transition: box-shadow 0.25s ease;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  align-items: center;
  justify-content: space-around;
  right: 26px;
  &.left {
    left: 26px;
    right: auto;
    transform: rotate(180deg);
  }
`;

const CarouselIcon = styled(SvgIcon)`
  &:hover {
    fill: red;
  }
`;

const CarouselListWrapper = styled.div`
  overflow-x: visible;
  padding-bottom: 15px;
  white-space: nowrap;
  transition: margin-left 1.5s ease;
  display: inline-block;
`;

export {
  RecommendedMatchingWrapper,
  RecommendedProductsWrapper,
  RecommendedProductWrapper,
  RecommendedProductsTitle,
  RecommendedTitle,
  HrDashedLine,
  Divider,
  Scroller,
  CarouselIcon,
  CarouselListWrapper,
};
