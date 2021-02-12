import React, { FC } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, SubmitHelper } from '@hs/containers';
import { merchStatusChangeService } from '@hs/services';
import { LeftNavBar, LeftNavBarProps, ErrorPanel } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export interface RouteParams {
  type: string;
}

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
  reasonId: '',
  resetInput: false,
};

const MskuValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
});

const Msku: FC = () => {
  const params = useParams<RouteParams>();
  let header = '';
  if (params.type === 'create') {
    header = 'Create New MSKU';
  } else {
    header = 'Update Existing MSKU';
  }

  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await merchStatusChangeService.markNonProcurable({
        file: values.file?.file,
        params: { reasonId: values.reasonId },
      });
      if (res.message) {
        toast.success(res.message);
      }
      if (res.errors) {
        res.errors.map((err: string, index: number) => toast.error(err, { delay: 400 * (index + 1) }));
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
    const res = await merchStatusChangeService.getTemplateDownloadLink({
      sheetKey: 'reason',
    });
    try {
      if (res.isAvailable) {
        window.open(res.url);
      } else {
        toast.warn('Template does not exist.');
      }
    } catch (e) {
      toast.error('Error getting template url');
    }
  };
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <StyledCntnr>
        <h2>{header}</h2>
        <FileUploadPage
          acceptType={['csv', 'xls', 'xlsx']}
          onSubmit={onSubmit}
          onExport={onExport}
          sideBar={[]}
          validationSchema={MskuValidation}
          initialValues={initialValues}
        ></FileUploadPage>
        <ErrorPanel />
      </StyledCntnr>
    </>
  );
};

export default Msku;
