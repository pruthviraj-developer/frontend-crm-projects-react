import React from 'react';
import { Formik, Field, Form } from 'formik';
import { FileListType, FileUpload } from '@hs/components';
import { Button, Grid, MenuItem, Paper } from '@material-ui/core';
import { StyledUploadSideBar } from './StyledFileUploadPage';
import { TextField } from 'formik-material-ui';
import { FileUploadPageProps, FileUploadState } from './IFileUploadPage';
import { FileUploadPageValidation } from './FileUploadPageValidation';
const carouselTypesOptions = () =>
  [
    { display: 'NonProcHighreturn due to quality and sizing', value: '1' },
    { display: 'NonProcHighreturn due to other reason', value: '2' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

const initialValues: FileUploadState = {
  file: undefined,
  reason: '',
  remark: '',
};
export const FileUploadPage = ({
  acceptType,
  onSubmit,
}: FileUploadPageProps) => (
  <Paper>
    <Formik
      validationSchema={FileUploadPageValidation}
      initialValues={initialValues}
      onSubmit={(values) => {
        if (onSubmit) onSubmit(values);
      }}
    >
      {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
        <Form autoComplete="off">
          <Grid container spacing={1} justify="center">
            <StyledUploadSideBar elevation={3}>
              <Grid container direction="column" justify="center" spacing={3}>
                <Grid item xs>
                  <Field
                    component={TextField}
                    type="text"
                    name="reason"
                    label="Reason"
                    select
                    inputProps={{
                      id: 'ol-select-type',
                    }}
                    variant={'outlined'}
                    fullWidth
                  >
                    {carouselTypesOptions()}
                  </Field>
                </Grid>
                <Grid item xs>
                  <Field
                    component={TextField}
                    type="text"
                    name="remark"
                    label="Remark"
                    variant={'outlined'}
                    fullWidth
                  ></Field>
                </Grid>
              </Grid>
            </StyledUploadSideBar>
            <Grid item xs={7}>
              <Field
                id={`file-upload`}
                component={FileUpload}
                name={`file`}
                onChange={(value: FileListType) => {
                  try {
                    setFieldValue(`file`, value[0]);
                  } catch (err) {
                    setFieldValue(`file`, null);
                  }
                }}
                acceptType={acceptType}
              ></Field>
            </Grid>
            <Grid item xs={6}>
              <Button
                color={'primary'}
                variant={'contained'}
                disabled={isSubmitting || !isValid || !dirty}
                size={'large'}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <pre>{JSON.stringify(values, null, 4)}</pre>
        </Form>
      )}
    </Formik>
  </Paper>
);
