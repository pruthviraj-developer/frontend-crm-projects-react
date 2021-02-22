import React, { FC } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, SubmitHelper } from '@hs/containers';
import { bulkUploadService } from '@hs/services';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
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
    { linkUrl: '/bulk-upload/forecast', linkText: 'Upload Forecast File', icon: DashBoardIcon },
    { linkUrl: '/bulk-upload/capitalBudget', linkText: 'Upload Capital Budget File', icon: DashBoardIcon },
  ],
};

const initialValues = {
  file: undefined,
  resetInput: false,
};

const bulkUploadValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
});

const ForecastAndCapitalBudget: FC = () => {
  const routeParam = useParams<uploadRouteParam>();
  let header = '';
  let downloadAction = '';
  let uploadAction = '';
  if (routeParam.screenType === 'forecast') {
    header = 'Forecast Data Upload';
    downloadAction = 'downloadForecastTemplate';
    uploadAction = 'uploadForecastData';
  } else {
    header = 'Capital Budget Data Upload';
    downloadAction = 'downloadCapitalBudgetTemplate';
    uploadAction = 'uploadCapitalBudgetData';
  }

  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await bulkUploadService.bulkUpload({
        file: values.file?.file,
        params: { action: uploadAction },
      });
      if (res.data.success_message) {
        res.data.success_message.map((msg: string, index: number) => toast.success(msg, { delay: 400 * (index + 1) }));
      }
      if (res.data.error_message) {
        res.data.error_message.map((err: string, index: number) => toast.error(err, { delay: 400 * (index + 1) }));
      }
      setSubmitting(false);
      resetForm({ values: { ...initialValues, resetInput: true } });
    } catch (error) {
      setSubmitting(false);
      setErrors({ submit: error.data.data.message });
      toast.error(error.data.data.message);
    }
  };

  const onExport = async () => {
    const res = await bulkUploadService.downloadTemplate({
      action: downloadAction,
    });
    try {
      if (res.data.is_available) {
        window.open(res.data.url);
        res.data.message !== '' && toast.success(res.data.message);
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
        <h1>{header}</h1>
        <FileUploadPage
          key={downloadAction}
          acceptType={['xlsx']}
          onSubmit={onSubmit}
          onExport={onExport}
          sideBar={[]}
          validationSchema={bulkUploadValidation}
          initialValues={initialValues}
        ></FileUploadPage>
      </StyledCntnr>
    </>
  );
};

export default ForecastAndCapitalBudget;
