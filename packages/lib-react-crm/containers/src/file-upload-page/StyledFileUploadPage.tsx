import styled from '@emotion/styled';
// import { Colors } from '@hs/utils';
import { Paper, CircularProgress } from '@material-ui/core';

export const StyledUploadSideBar = styled(Paper)`
  width: 300px;
  padding: 16px;
  margin: 20px;
`;

export const StyledTemplateButton = styled.div`
  text-align: start;
`;

export const StyledUploadCntnr = styled(Paper)`
  margin: 20px;
  padding: 16px;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;
