import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FileUploadPage, FileUploadState, FileUploadSideBarOption } from '@hs/containers';
import { merchStatusChangeService } from '@hs/services';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { InstockList, ListType } from './IUploadScreens';

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
  name: 'fulfillmentstatus',
  label: 'Fulfillment Status',
};

const remarkSideBarOption: FileUploadSideBarOption = {
  isSelect: false,
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
  fulfillmentstatus: Yup.string().required('Fulfillment Status is required'),
});

export const NonProcurableCurrentVendor: FC = () => {
  const [list, setList] = useState<ListType>(([] as unknown) as ListType);

  useEffect(() => {
    (async () => {
      try {
        const list = await merchStatusChangeService.getInstockList<InstockList>();
        setList(list.inStockList);
      } catch (error) {
        setList(([] as unknown) as ListType);
      }
    })();
    return () => {
      setList(([] as unknown) as ListType);
    };
  }, []);
  const onSubmit = async (values: FileUploadState) => {
    try {
      const res = await merchStatusChangeService.markNonProcCurrentVendor({
        file: values.file?.file,
        params: { fulfillmentstatus: values.fulfillmentstatus, remark: values.remark },
      });
      toast(res);
    } catch (error) {
      toast(error.data.data.message);
    }
  };
  const onExport = () => {
    // console.log('Test')
  };
  // toast('🦄 Wow so easy!');
  // toast('🦄 Wow so easy!');
  return (
    <StyledCntnr>
      <h1>Mark Current Vendor NonProcurable</h1>
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
