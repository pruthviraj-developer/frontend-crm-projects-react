import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  FileUploadPage,
  FileUploadState,
  FileUploadSideBarOption,
  DropDownValuesWithType,
  SubmitHelper,
} from '@hs-crm/containers';
import { merchStatusChangeService } from '@hs/services';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { VendorList, CurrencyList, ListType, BrandList, UploadScreenProps } from './IUploadScreens';
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

const brandSideBarOption: FileUploadSideBarOption = {
  type: 'autocomplete',
  name: 'brandId',
  label: 'Brand',
};

const currencySideBarOption: FileUploadSideBarOption = {
  type: 'autocomplete',
  name: 'currency',
  label: 'Currency',
};

const vendorSideBarOption: FileUploadSideBarOption = {
  type: 'autocomplete',
  name: 'vendorId',
  label: 'Vendor',
  resetField: 'brandId',
};

const initialValues = {
  file: undefined,
  vendorId: '',
  brandId: '',
  currency: '',
  resetInput: false,
};

const TransferVendorValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  vendorId: Yup.string().required('Vendor is required'),
  brandId: Yup.string().required('Brand is required'),
  currency: Yup.string().required('Currency is required'),
});

export const TransferVendorWithRevisedData: FC<UploadScreenProps> = ({ header }: UploadScreenProps) => {
  const [brandsList, setBrandsList] = useState<ListType>([] as unknown as ListType);
  const [vendorList, setVendorList] = useState<ListType>([] as unknown as ListType);
  const [currencyList, setCurrencyList] = useState<ListType>([] as unknown as ListType);
  useEffect(() => {
    (async () => {
      try {
        const list = await merchStatusChangeService.getVendorList<VendorList>();
        setVendorList(list.vendorList);
      } catch (error) {
        setVendorList([] as unknown as ListType);
      }
      try {
        const list = await merchStatusChangeService.getCurrencyList<CurrencyList>();
        setCurrencyList(list.currencyList);
      } catch (error) {
        setCurrencyList([] as unknown as ListType);
      }
    })();
    return () => {
      setVendorList([] as unknown as ListType);
      setCurrencyList([] as unknown as ListType);
    };
  }, []);

  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await merchStatusChangeService.transferToVendorWithRevisedData({
        file: values.file?.file,
        params: { vendorId: values.vendorId.id, brandId: values.brandId.id, currency: values.currency.currencyCode },
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
      sheetKey: 'transfer-vendor',
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

  const onDropDownChange = (obj: DropDownValuesWithType) => {
    if (obj.name === 'Vendor') {
      (async () => {
        try {
          const list = await merchStatusChangeService.getBrandsList<BrandList>({ vendorId: obj.values.id });
          setBrandsList(list.brandList);
        } catch (error) {
          setBrandsList([] as unknown as ListType);
        }
      })();
    }
  };

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
        onDropDownChange={onDropDownChange}
        sideBar={[
          { ...vendorSideBarOption, options: vendorList },
          { ...brandSideBarOption, options: brandsList },
          { ...currencySideBarOption, options: currencyList },
        ]}
        validationSchema={TransferVendorValidation}
        initialValues={initialValues}
      ></FileUploadPage>
    </StyledCntnr>
  );
};
