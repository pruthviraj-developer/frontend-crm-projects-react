import styled from '@emotion/styled';
// import { typography, Colors, HsTextAlign } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const SearchWrapper = styled.div`
  position: fixed;
  min-width: 100%;
  left: 0;
  top: 56px;
`;

const SearchField = styled.div`
  input {
    width: 100%;
    padding: 16px 0 16px 16px;
    font-size: 14px;
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

const SearchForm = styled.form``;

const CloseIcon = styled(SvgIcon)`
  opacity: 0.5;
  position: absolute;
  padding: 0;
  width: 16px;
  height: 16px;
  right: 18px;
  top: 18px;
  z-index: 1002;
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
  li:first-of-type {
    color: #333;
    font-weight: 400;
    padding: 9px 0 9px 16px;
    background-color: #f5f5f5;
  }
`;

const List = styled.li`
  list-style: none;
  font-size: 14px;
  line-height: 16px;
  border-bottom: 1px solid #e6e6e6;
  padding: 16px;
  p {
    margin: 0;
  }
  img {
    width: 40px;
    margin: 0 10px 0 0;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
  .search-autocomplete-result-with-image {
    display: flex;
    align-items: center;
  }
`;

export { SearchWrapper, SearchForm, SearchField, SearchList, List, CloseIcon };
