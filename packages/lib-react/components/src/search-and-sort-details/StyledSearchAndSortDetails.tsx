import styled from '@emotion/styled';
import { mediaQueries, typography } from '@hs/utils';

const SearchAndSortDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  line-height: ${typography.size.s22}px;
  margin: ${typography.size.s25}px 0 ${typography.size.s5}px 0;
  ${mediaQueries('xl')`
      flex-flow: row;
  `};
`;

const SearchResultsTitleWrapper = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 12px;
  ${mediaQueries('xl')`
     padding-bottom: 0;
  `};
`;
const SearchResultsLabel = styled.span`
  font-weight: 500;
`;
const SearchResultsForTitle = styled.span`
  padding-left: 5px;
`;

export {
  SearchAndSortDetailsWrapper,
  SearchResultsTitleWrapper,
  SearchResultsLabel,
  SearchResultsForTitle,
};
