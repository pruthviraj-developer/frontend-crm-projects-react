import styled from '@emotion/styled';
import { mediaQueries } from '@hs/utils';

const OffersWrapper = styled.div`
  padding: 16px;
  margin-top: 20px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  ${mediaQueries('lg')`
    padding: 16px 0;
 `};
`;

const OffersTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
`;

const SeeAll = styled.h2`
  margin: 0;
  color: #ed54a4;
  padding: 2px 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
`;

const OfferDetails = styled.div`
  color: #0c884a;
  line-height: 20px;
`;

export { OffersWrapper, OffersTitle, OfferDetails, Title, SeeAll };
