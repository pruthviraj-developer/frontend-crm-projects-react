import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, FileUploadSideBarOption, SubmitHelper } from '@hs-crm/containers';
import { merchStatusChangeService } from '@hs/services';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { InstockList, ListType, UploadScreenProps } from './IUploadScreens';
import { Helmet } from 'react-helmet';

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
  type: 'select',
  name: 'fulfillmentstatus',
  label: 'Fulfilment Status',
};

const remarkSideBarOption: FileUploadSideBarOption = {
  type: 'input',
  name: 'remark',
  label: 'Remark',
};

const initialValues = {
  file: undefined,
  fulfillmentstatus: '',
  remark: '',
};

const NonProcurableValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  fulfillmentstatus: Yup.string().required('Fulfilment Status is required'),
});

export const NonProcurableCurrentVendor: FC<UploadScreenProps> = ({ header }: UploadScreenProps) => {
  const [list, setList] = useState<ListType>([] as unknown as ListType);

  useEffect(() => {
    (async () => {
      try {
        const list = await merchStatusChangeService.getInstockList<InstockList>();
        setList(list.inStockList);
      } catch (error) {
        setList([] as unknown as ListType);
      }
    })();
    return () => {
      setList([] as unknown as ListType);
    };
  }, []);
  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await merchStatusChangeService.updateFulfilmentStatus({
        file: values.file?.file,
        params: { fulfillmentstatus: values.fulfillmentstatus, remark: values.remark },
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
      setErrors({ submit: error.data.data.message });
      setSubmitting(false);
      toast.error(error.data.data.message);
    }
  };
  const onExport = async () => {
    const res = await merchStatusChangeService.getTemplateDownloadLink({
      sheetKey: 'nonproc-current-vendor',
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
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <h1>{header}</h1>
      <FileUploadPage
        acceptType={['xlsx']}
        onSubmit={onSubmit}
        onExport={onExport}
        sideBar={[{ ...reasonSideBarOption, options: list }, remarkSideBarOption]}
        validationSchema={NonProcurableValidation}
        initialValues={initialValues}
      ></FileUploadPage>
    </StyledCntnr>
  );
};
