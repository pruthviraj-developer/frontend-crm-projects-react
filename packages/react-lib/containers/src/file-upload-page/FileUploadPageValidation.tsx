import * as Yup from 'yup';

export const FileUploadPageValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  remark: Yup.string().required('Remark is required'),
  reason: Yup.string().required('Reason is required'),
});
