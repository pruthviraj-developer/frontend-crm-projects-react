import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, SubmitHelper } from '@hs/containers';
import { bulkUploadService } from '@hs/services';
import { LeftNavBar, LeftNavBarProps, ErrorPanel } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { uploadRouteParam } from '../../types/IBulkUpload';

const StyledCntnr = styled.div`
  margin-left: 90px;
  width: auto;
`;

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/msku/create', linkText: 'MSKU Create', icon: DashBoardIcon },
    { linkUrl: '/msku/update', linkText: 'MSKU Update', icon: DashBoardIcon },
  ],
};

const initialValues = {
  file: undefined,
  resetInput: false,
};

const MskuValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
});

const MskuUpload: FC = () => {
  const params = useParams<uploadRouteParam>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  let header = '';
  let downloadFileTitle = '';
  let action = '';
  let uploadAction = '';
  if (params.screenType === 'create') {
    header = 'Create New MSKU';
    downloadFileTitle = 'Download Template';
    uploadAction = 'createMsku';
    action = 'downloadCreateMsku';
  } else {
    header = 'Update Existing MSKU';
    downloadFileTitle = 'Download current MSKU and taxonomy';
    uploadAction = 'updateMsku';
    action = 'downloadCurrentMsku';
  }

  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await bulkUploadService.bulkUpload({
        file: values.file?.file,
        params: { action: uploadAction },
      });
      if (res.data) {
        res.data.success_message.map((msg: string, index: number) => toast.success(msg, { delay: 400 * (index + 1) }));
      }
      if (res.data.error_message) {
        setErrorMessages(res.data.error_message);
        res.data.error_message.map((err: string, index: number) => toast.error(err, { delay: 400 * (index + 1) }));
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

  const onExport = async () => {
    const res = await bulkUploadService.downloadTemplate({
      action,
    });
    try {
      if (res.data.is_available) {
        window.open(res.data.url);
        toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    } catch (e) {
      toast.error(res.data.message);
    }
  };
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <StyledCntnr>
        <h2>{header}</h2>
        <FileUploadPage
          key={action}
          acceptType={['csv', 'xls', 'xlsx']}
          onSubmit={onSubmit}
          onExport={onExport}
          sideBar={[]}
          validationSchema={MskuValidation}
          initialValues={initialValues}
          downloadFileTitle={downloadFileTitle}
        ></FileUploadPage>
        <ErrorPanel messages={errorMessages} />
      </StyledCntnr>
    </>
  );
};

export default MskuUpload;
