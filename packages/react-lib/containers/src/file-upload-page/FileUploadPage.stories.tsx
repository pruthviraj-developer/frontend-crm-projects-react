import React, { FC } from 'react';
import { FileUploadPage } from './FileUploadPage';
import { action } from '@storybook/addon-actions';
import { FileUploadSideBarOption } from './IFileUploadPage';
import * as Yup from 'yup';

export default {
  title: 'File upload Screen',
};

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

const FileUploadPageValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  remark: Yup.string().required('Remark is required'),
  reason: Yup.string().required('Reason is required'),
});

const initialValues = {
  file: undefined,
  reason: '',
  remark: '',
};

export const FileUploadScreen: FC = () => (
  <FileUploadPage
    acceptType={['xlsx']}
    onSubmit={action('onSubmit')}
    onExport={action('onExport')}
    sideBar={[reasonSideBarOption, remarkSideBarOption]}
    validationSchema={FileUploadPageValidation}
    initialValues={initialValues}
  ></FileUploadPage>
);
