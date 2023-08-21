import styled from '@emotion/styled';
import Table from '@material-ui/core/Table';

export const PstGenderCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 23px 16px 0 16px;
  padding-bottom: 0;
`;

export const PstTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #333;
`;

export const PstTitleCount = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  background: #f5f5f5;
  font-size: 13px
  color: #000;
`;

export const PstGenderTable = styled(Table)`
  td {
    border: 1px solid #a9adb3;
    font-size: 13px;
    padding: 5px;
  }
  td.MuiTableCell-head {
    font-weight: 600;
  }
  td.title {
    background-color: #f3f4f4;
  }
`;
