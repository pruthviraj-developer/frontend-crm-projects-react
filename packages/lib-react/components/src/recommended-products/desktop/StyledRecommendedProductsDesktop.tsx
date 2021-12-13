import styled from '@emotion/styled';
import { typography } from '@hs/utils';

const RecommendedProductsWrapper = styled.div`
  background: #f5f5f5;
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
  left: -12px;
  width: calc(100% + 12px);
  max-width: 100%;
  overflow-x: scroll;
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

export {
  RecommendedMatchingWrapper,
  RecommendedProductsWrapper,
  RecommendedProductWrapper,
  RecommendedProductsTitle,
  RecommendedTitle,
  HrDashedLine,
  Divider,
};
