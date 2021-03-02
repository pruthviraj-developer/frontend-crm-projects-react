import React from 'react';
import { FileUploadPage } from './FileUploadPage';
import { action } from '@storybook/addon-actions';
import {
  FileUploadPageProps,
  FileUploadSideBarOption,
  FileUploadState,
  SubmitHelper,
} from './IFileUploadPage';
import * as Yup from 'yup';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'File upload Screen',
  component: FileUploadPage,
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

const createDownloadOption = [{ label: 'Download Test Template ' }];

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

const onSubmit = (
  values: FileUploadState,
  { setSubmitting, resetForm }: SubmitHelper
) => {
  action('onSubmit')(values);
  setSubmitting(false);
  resetForm({ values: { ...initialValues, resetInput: true } });
};

const Template: Story<FileUploadPageProps> = (args) => (
  <FileUploadPage {...args} />
);

export const FileUploadScreen = Template.bind({});
FileUploadScreen.args = {
  acceptType: ['xlsx'],
  onSubmit,
  onExport: action('onExport'),
  sideBar: [reasonSideBarOption, remarkSideBarOption],
  validationSchema: FileUploadPageValidation,
  initialValues,
  downloadOption: createDownloadOption,
};
