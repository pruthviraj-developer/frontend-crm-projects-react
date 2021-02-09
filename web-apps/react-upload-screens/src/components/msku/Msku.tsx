import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, FileUploadSideBarOption, SubmitHelper } from '@hs/containers';
import { merchStatusChangeService } from '@hs/services';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ReasonList, ListType } from './IUploadScreens';

const StyledCntnr = styled.div`
  margin-left: 90px;
  width: auto;
`;

const navItems: LeftNavBarProps = {
  navList: [{ linkUrl: '/msku', linkText: 'MSKU', icon: DashBoardIcon }],
};

const reasonSideBarOption: FileUploadSideBarOption = {
  isSelect: true,
  name: 'reasonId',
  label: 'Reason',
  type: 'select',
};

const initialValues = {
  file: undefined,
  reasonId: '',
  resetInput: false,
};

const NonProcurableValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  reasonId: Yup.string().required('Reason is required'),
});

const Msku: FC = () => {
  const [list, setList] = useState<ListType>(([] as unknown) as ListType);

  useEffect(() => {
    (async () => {
      try {
        const list = await merchStatusChangeService.getReasonList<ReasonList>();
        setList(list.reasonList);
      } catch (error) {
        setList(([] as unknown) as ListType);
      }
    })();
    return () => {
      setList(([] as unknown) as ListType);
    };
  }, []);
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
  const onExport = async (values?: FileUploadState) => {
    let reason = 'nonproc';
    if (values?.reasonId) {
      reason = values.reasonId;
    }
    if (!values?.file?.file) {
      toast.warn('Select dropdown.');
      return;
    }

    const res = await merchStatusChangeService.getTemplateDownloadLink({
      sheetKey: reason,
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
  // toast('🦄 Wow so easy!');
  // toast('🦄 Wow so easy!');
  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <StyledCntnr>
        <h1>MSKu</h1>
        <FileUploadPage
          acceptType={['xlsx']}
          onSubmit={onSubmit}
          onExport={onExport}
          sideBar={[{ ...reasonSideBarOption, options: list }]}
          validationSchema={NonProcurableValidation}
          initialValues={initialValues}
        ></FileUploadPage>
      </StyledCntnr>
    </>
  );
};

export default Msku;
