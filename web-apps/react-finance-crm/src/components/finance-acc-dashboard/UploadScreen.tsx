import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { IHeaderType } from './IDashboard';
import { FileUploadPage, FileUploadSideBarOption, SubmitHelper } from '@hs/containers';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorPanel } from '@hs/components';
import { IDropDownChangeType, FileUploadState, IFileUploadResponse } from './IUploadScreen';
import { financeAccountingService } from '@hs/services';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: '3rem',
    fontSize: 28,
  },
}));

const UploadWrapper = styled.div`
  margin: -19px 0 0 9rem;
`;

const FinanceAccountingValidation = Yup.object().shape({
  file: Yup.mixed().required('Please upload a file'),
  shipmentId: Yup.string().required('Shipment number is required'),
});

const UploadScreen: FC<{ header: string }> = ({ header }: IHeaderType) => {
  const classes = useStyles();
  const history = useHistory();
  const [buttonLabel, setButtonLabel] = useState<string>('Validate');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [disableUpload, setDisableUpload] = useState<boolean>(false);
  const [overrideStatus, setOverrideStatus] = useState<boolean>(false);
  const [validateStatus, setValidateStatus] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const shipmentInputOption: FileUploadSideBarOption = {
    name: 'shipmentId',
    label: 'Shipment Number',
    disableInput: false,
  };

  const [sidebar, setSideBar] = useState([shipmentInputOption]);

  const confirmationOption: FileUploadSideBarOption = {
    name: 'canOverride',
    label: 'Are you sure want to override ?',
    options: [
      { display: 'Yes', id: 1 },
      { display: 'No', id: 0 },
    ],
    type: 'autocomplete',
  };

  const initialValues = {
    file: undefined,
    shipmentId: '',
  };

  const tryLater = 'Please try later';
  const showError = (error: Record<string, any>) => {
    let message = tryLater;
    if (error.action === 'FAILURE'.toLowerCase() && error.message.length > 0) {
      setErrorMessages(error.message);
    } else {
      message = error.message;
      toast.error(message);
    }
  };

  const onExport = async () => {
    const res = await financeAccountingService.getTemplateDownloadLink({
      sheetKey: 'financeaccounting',
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

  const onDropDownChange = (obj: IDropDownChangeType) => {
    if (obj.values && obj.values.id) {
      setButtonLabel('Submit');
      setDisableButton(false);
      setOverrideStatus(true);
      setValidateStatus(false);
    } else {
      obj.values === null ? setDisableButton(true) : setDisableButton(false);
      setOverrideStatus(false);
      setValidateStatus(true);
      setButtonLabel('Reset');
    }
  };

  const handleSubmit = (values: FileUploadState) => {
    const params = {
      shipmentId: values.shipmentId,
      override: overrideStatus,
      validate: validateStatus,
    };
    (async () => {
      try {
        const postData: IFileUploadResponse = await financeAccountingService.postFileData({
          customDutyTemplate: values.file?.file,
          params: params,
        });
        if (!postData.recordExist) {
          toast.success(postData.message[0] || 'File uploaded successfully');
          setTimeout(() => {
            history.push('/custom-duty/dashboard');
          }, 3000);
          return;
        }
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onSubmit = (values: FileUploadState, { setSubmitting, resetForm }: SubmitHelper) => {
    setSubmitting(false);
    const params = {
      shipmentId: values.shipmentId,
      override: overrideStatus,
      validate: validateStatus,
    };
    if (values) {
      (async () => {
        try {
          if (buttonLabel.toLowerCase() === 'validate') {
            setSubmitting(true);
            const checkValidResponse: IFileUploadResponse = await financeAccountingService.getValidStatus({
              customDutyTemplate: values.file?.file,
              params: params,
            });
            if (checkValidResponse.recordExist) {
              setSubmitting(false);
              setSideBar([{ ...shipmentInputOption, disableInput: true }, confirmationOption]);
              setButtonLabel('Submit');
              setDisableButton(true);
              setDisableUpload(true);
            } else {
              setSubmitting(false);
              toast.success(checkValidResponse.message[0] || 'Validation successful');
              setValidateStatus(false);
              setErrorMessages([]);
              setButtonLabel('Submit');
            }
          } else if (buttonLabel.toLowerCase() === 'reset') {
            setSideBar([{ ...shipmentInputOption, disableInput: false }]);
            setDisableUpload(false);
            setButtonLabel('Validate');
            setErrorMessages([]);
            resetForm();
          } else {
            setSubmitting(true);
            setErrorMessages([]);
            handleSubmit(values);
            setSideBar([{ ...shipmentInputOption, disableInput: true }]);
            resetForm();
          }
        } catch (error) {
          setSubmitting(false);
          showError(error);
          if (error.recordExist) {
            setSideBar([{ ...shipmentInputOption, disableInput: true }, confirmationOption]);
            setButtonLabel('Submit');
            setDisableButton(true);
            setDisableUpload(true);
          }
        }
      })();
    }
  };

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <UploadWrapper>
        <h1 className={classes.header}>{header}</h1>
        <FileUploadPage
          acceptType={['xlsx']}
          onSubmit={onSubmit}
          onExport={onExport}
          onDropDownChange={onDropDownChange}
          sideBar={sidebar}
          validationSchema={FinanceAccountingValidation}
          initialValues={initialValues}
          buttonLabel={buttonLabel}
          disableSubmit={disableButton}
          disableUpload={disableUpload}
        ></FileUploadPage>
        {errorMessages.length > 0 && (
          <ErrorPanel
            messages={errorMessages}
            onCopy={() => toast.info('Copied to Clipboard', { position: 'bottom-center' })}
          />
        )}
      </UploadWrapper>
    </>
  );
};

export default UploadScreen;
