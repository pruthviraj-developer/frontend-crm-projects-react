import styled from '@emotion/styled';
// import { typography, Colors, HsTextAlign } from '@hs/utils';
// import { SvgIcon } from '@hs/icons';

const SearchWrapper = styled.div`
  top: 86px;
  right: 77px;
  width: 100%;
  position: fixed;
  max-width: 354px;
  z-index: 1006;
`;

const SearchField = styled.div`
  input {
    width: 100%;
    padding: 16px 0 16px 16px;
    /* font-size: 14px; */
    line-height: 20px;
    border: 0;
    position: relative;
    background-color: #fff;
    z-index: 1002;
    height: auto;
    -webkit-appearance: none;
    border-bottom: 1px solid #e6e6e6;
  }
  input:focus-visible {
    outline: none;
  }
`;

const SearchList = styled.ul`
  z-index: 1001;
  list-style-type: none;
  background: #fff;
  font-weight: 400;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  margin: 0;
  padding: 0;
  /* li:first-of-type {
    font-weight: 400;
  } */
`;

const List = styled.li`
  color: #333;
  font-size: 14px;
  cursor: pointer;
  list-style: none;
  line-height: 16px;
  border-bottom: 1px solid #e6e6e6;
  padding: 12px 12px 12px 35px;
  p {
    color: rgba(0, 0, 0, 0.8);
    line-height: 20px;
    margin: 0;
  }
  img {
    width: 80px;
    margin: 0 10px 0 0;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
  .search-autocomplete-result-with-image {
    display: flex;
    p {
      margin: 6% 0 0;
    }
  }
  &:hover {
    background-color: #f9f9f9;
  }
  &.recent-search {
    cursor: default;
  }
`;

export { SearchWrapper, SearchField, SearchList, List };