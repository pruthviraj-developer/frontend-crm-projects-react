import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, FileUploadSideBarOption, SubmitHelper } from '@hs/containers';
import { merchStatusChangeService } from '@hs/services';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ReasonList, ListType } from './IUploadScreens';

const StyledCntnr = styled.div`
  margin-left: 90px;
  width: auto;
`;

// const reasonOptions = [
//   { display: 'NonProcHighreturn due to quality and sizing', id: 1 },
//   { display: 'NonProcHighreturn due to other reason', id: 2 },
//   { display: 'NonProcHighreturn111 due to other reason', id: 3 },
// ];

const reasonSideBarOption: FileUploadSideBarOption = {
  isSelect: true,
  name: 'reasonId',
  label: 'Reason',
};

// const remarkSideBarOption: FileUploadSideBarOption = {
//   isSelect: false,
//   name: 'remark',
//   label: 'Remark',
// };

const initialValues = {
  file: undefined,
  reasonId: '',
  resetInput: false,
};

const NonProcurableValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  reasonId: Yup.string().required('Reason is required'),
});

export const NonProcurable: FC = () => {
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
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
        if (res.errors) res.errors.map((err: string, index: number) => toast.error(err, { delay: 400 * (index + 1) }));
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
      sheetKey: 'nonproc',
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
    <StyledCntnr>
      <h1>Mark NonProcurable</h1>
      <FileUploadPage
        acceptType={['xlsx']}
        onSubmit={onSubmit}
        onExport={onExport}
        sideBar={[{ ...reasonSideBarOption, options: list }]}
        validationSchema={NonProcurableValidation}
        initialValues={initialValues}
      ></FileUploadPage>
    </StyledCntnr>
  );
};
