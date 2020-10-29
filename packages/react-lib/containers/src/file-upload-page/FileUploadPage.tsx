import React from 'react';
import { Formik, Field, Form } from 'formik';
import { FileListType, FileUpload } from '@hs/components';
import { Button, Grid, MenuItem, Paper } from '@material-ui/core';
import { StyledUploadForm } from './StyledFileUploadPage';
import { TextField } from 'formik-material-ui';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const carouselTypesOptions = () =>
  [
    { display: 'NonProcHighreturn due to quality and sizing', value: '1' },
    { display: 'NonProcHighreturn due to other reason', value: '2' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

export const FileUploadPage = () => (
  <Paper>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        reason: '',
        remark: '',
      }}
      onSubmit={async (values) => {
        await sleep(500);
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
        <Form>
          <Grid container spacing={1} justify="center">
            <StyledUploadForm>
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
            </StyledUploadForm>
            <Grid item xs={7}>
              <Field
                id={`file-upload`}
                component={FileUpload}
                name={`fileObj`}
                onChange={(value: FileListType) => {
                  try {
                    setFieldValue(`fileObj`, value[0]);
                  } catch (err) {
                    setFieldValue(`fileObj`, null);
                  }
                }}
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
