import React, { FC, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, SubmitHelper } from '@hs/containers';
import { bulkUploadService } from '@hs/services';
import { ErrorPanel } from '@hs/components';
import { bulkUploadProps } from '../../types/IBulkUpload';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

const StyledCntnr = styled.div`
  margin-left: 90px;
  width: auto;
`;

const initialValues = {
  file: undefined,
  resetInput: false,
};

const uploadValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
});

const BulkUploadScreen: FC<bulkUploadProps> = ({ header, uploadAction, downloadOption }: bulkUploadProps) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  useEffect(() => {
    setErrorMessages([]);
  }, [header]);

  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await bulkUploadService.bulkUpload({
        file: values.file?.file,
        params: { action: uploadAction },
      });
      if (res.data && res.data.success_message) {
        res.data.success_message.length > 0 &&
          res.data.success_message.map((msg: string, index: number) =>
            toast.success(msg, { delay: 400 * (index + 1) }),
          );
      }
      if (res.data && res.data.error_message) {
        setErrorMessages(res.data.error_message);
      }
      setSubmitting(false);
      resetForm({ values: { ...initialValues, resetInput: true } });
    } catch (error) {
      setSubmitting(false);
      setErrors({ submit: error.data.data.message });
      toast.error(error.data.data.message);
      setErrorMessages([]);
    }
  };

  const onExport = async (downloadAction?: string) => {
    try {
      const res = await bulkUploadService.downloadTemplate({
        action: downloadAction,
      });
      if (res.data.is_available) {
        window.open(res.data.url, '_blank');
        res.data.message !== '' && toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    } catch (e) {
      toast.error(e?.data?.data?.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <StyledCntnr>
        <h2>{header}</h2>
        <FileUploadPage
          key={`file-'${uploadAction}`}
          acceptType={['csv', 'xls', 'xlsx']}
          onSubmit={onSubmit}
          onExport={onExport}
          sideBar={[]}
          validationSchema={uploadValidation}
          initialValues={initialValues}
          downloadOption={downloadOption}
        ></FileUploadPage>
        {errorMessages.length > 0 && (
          <ErrorPanel
            key={uploadAction}
            messages={errorMessages}
            onCopy={() => toast.info('Copied to Clipboard', { position: 'bottom-center' })}
          />
        )}
      </StyledCntnr>
    </>
  );
};

export default BulkUploadScreen;
