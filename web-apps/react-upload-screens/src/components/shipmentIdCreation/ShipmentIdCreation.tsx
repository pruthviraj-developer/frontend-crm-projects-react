import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { FileUploadPage, FileUploadState, SubmitHelper } from '@hs-crm/containers';
import { LeftNavBar, LeftNavBarProps } from '@hs-crm/components';
import { financeAccountingService } from '@hs/services';
import { UploadIcon } from '@hs/icons';

export interface ShipmentIdCreationProps {
  header: string;
}

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

const navItems: LeftNavBarProps = {
  navList: [{ linkUrl: 'shipmentIdCreation', linkText: 'ShipmentId Creation Upload', icon: UploadIcon }],
};

const ShipmentIdCreation: FC<ShipmentIdCreationProps> = ({ header }: ShipmentIdCreationProps) => {
  const onSubmit = async (values: FileUploadState, { setSubmitting, setErrors, resetForm }: SubmitHelper) => {
    try {
      const res = await financeAccountingService.postShipmentIdData({
        createShipmentIdTemplate: values.file?.file,
      });
      if (res.message) {
        toast.success(res.message);
      }
      setSubmitting(false);
      resetForm({ values: { ...initialValues, resetInput: true } });
    } catch (error) {
      setSubmitting(false);
      const errorMsg = error.message || error.data?.message || error.data?.data?.message;
      setErrors({ submit: errorMsg });
      toast.error(errorMsg);
      resetForm({ values: { ...initialValues, resetInput: true } });
    }
  };

  const onExport = async () => {
    const res = await financeAccountingService.getTemplateDownloadLink({
      sheetKey: 'shipmentIdCreationTemplate',
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
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <LeftNavBar {...navItems}></LeftNavBar>
      <StyledCntnr>
        <h2>{header}</h2>
        <FileUploadPage
          key={'customDuty'}
          acceptType={['csv', 'xls', 'xlsx']}
          onSubmit={onSubmit}
          onExport={onExport}
          sideBar={[]}
          validationSchema={uploadValidation}
          initialValues={initialValues}
        ></FileUploadPage>
      </StyledCntnr>
    </>
  );
};

export default ShipmentIdCreation;
