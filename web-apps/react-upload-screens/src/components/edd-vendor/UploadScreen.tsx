import React, { FC, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, SubmitHelper } from '@hs-crm/containers';
import { bulkUploadService } from '@hs/services';
import { ErrorPanel } from '@hs-crm/components';
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

const UploadScreen: FC<bulkUploadProps> = ({ header, uploadAction, downloadOption }: bulkUploadProps) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  useEffect(() => {
    setErrorMessages([]);
  }, [header]);

  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await bulkUploadService.eddVendorFileUpload({
        file: values.file?.file,
      });
      if (res?.data?.messages && res.data.messages.length) {
        res.data.messages.map((msg: string, index: number) => toast.success(msg, { delay: 400 * (index + 1) }));
      }
      setSubmitting(false);
      resetForm({ values: { ...initialValues, resetInput: true } });
    } catch (error: any) {
      if (error.data && error.data?.messages) {
        setErrorMessages(error.data.messages);
      } else {
        setErrorMessages([]);
      }
      setSubmitting(false);
      setErrors({});
    }
  };

  const onExport = async () => {
    try {
      const res = await bulkUploadService.eddVendorTemplate();
      if (res?.data?.isAvailable) {
        window.open(res?.data?.url, '_blank');
      } else {
        toast.warn(res?.data?.message);
      }
    } catch (e: any) {
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

export default UploadScreen;
