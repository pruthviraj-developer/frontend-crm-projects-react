import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';

const ClearFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 24px 32px;
  min-height: calc(100vh - 224px);
`;

const FilterNoResult = styled(SvgIcon)`
  width: 128px;
  height: 128px;
  margin-bottom: 12px;
`;

const Message = styled.div`
  color: #707070;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 36px;
`;

const ViewAll = styled.button`
  color: #707070;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  padding: 10px 28px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-family: inherit;
  background-color: #fff;
  border: 1px solid #e6e6e6;
`;

export { ClearFilterWrapper, FilterNoResult, Message, ViewAll };
