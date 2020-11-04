import React, { FC } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, FileUploadSideBarOption } from '@hs/containers';
import { merchStatusChangeService } from '@hs/services';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const StyledCntnr = styled.div`
  margin-left: 90px;
  width: auto;
`;

const reasonOptions = [
  { display: 'NonProcHighreturn due to quality and sizing', value: '1' },
  { display: 'NonProcHighreturn due to other reason', value: '2' },
];

const reasonSideBarOption: FileUploadSideBarOption = {
  isSelect: true,
  name: 'reason',
  label: 'Reason',
  options: reasonOptions,
};

const remarkSideBarOption: FileUploadSideBarOption = {
  isSelect: false,
  name: 'remark',
  label: 'Remark',
};

const initialValues = {
  file: undefined,
  reason: '',
  remark: '',
};

export const NonProcurableValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  remark: Yup.string().required('Remark is required'),
  reason: Yup.string().required('Reason is required'),
});

export const NonProcurable: FC = () => {
  const onSubmit = (values: FileUploadState) => {
    merchStatusChangeService.markNonProcurable({
      file: values.file?.file,
      params: { remark: values.remark, reason: values.reason },
    });
  };
  const onExport = () => {
    // console.log('Test')
  };
  toast('🦄 Wow so easy!');
  toast('🦄 Wow so easy!');
  return (
    <StyledCntnr>
      <h1>Mark NonProcurable</h1>
      <FileUploadPage
        acceptType={['xlsx']}
        onSubmit={onSubmit}
        onExport={onExport}
        sideBar={[reasonSideBarOption, remarkSideBarOption]}
        validationSchema={NonProcurableValidation}
        initialValues={initialValues}
      ></FileUploadPage>
    </StyledCntnr>
  );
};
