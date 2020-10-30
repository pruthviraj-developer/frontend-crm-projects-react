import React, { FC } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState } from '@hs/containers';
import { merchStatusChangeService } from '@hs/services';
const StyledCntnr = styled.div`
  margin-left: 90px;
  width: auto;
`;

export const NonProcurable: FC = () => {
  const onSubmit = (values: FileUploadState) => {
    merchStatusChangeService.markNonProcurable({
      file: values.file?.file,
      params: { remark: values.remark, reason: values.reason },
    });
  };
  return (
    <StyledCntnr>
      <h1>Mark NonProcurable</h1>
      <FileUploadPage acceptType={['xlsx']} onSubmit={onSubmit}></FileUploadPage>
    </StyledCntnr>
  );
};
