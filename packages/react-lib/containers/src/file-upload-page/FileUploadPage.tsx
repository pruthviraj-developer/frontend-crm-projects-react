import React, { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import { FileListType, FileUpload } from '@hs/components';
import { Button, Grid, MenuItem, Paper } from '@material-ui/core';
import { StyledUploadSideBar } from './StyledFileUploadPage';
import { TextField } from 'formik-material-ui';
import {
  FileUploadPageProps,
  FileUploadSideBarOption,
} from './IFileUploadPage';

export const FileUploadPage: FC<FileUploadPageProps> = ({
  acceptType,
  onSubmit,
  sideBar,
  validationSchema,
  initialValues,
}: FileUploadPageProps) => (
  <Paper>
    <Formik
      validationSchema={validationSchema}
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
                {sideBar &&
                  sideBar.map((sideBarOption: FileUploadSideBarOption) => {
                    if (sideBarOption.isSelect) {
                      return (
                        <Grid item xs key={sideBarOption.name}>
                          <Field
                            component={TextField}
                            type="text"
                            name={sideBarOption.name}
                            label={sideBarOption.label}
                            select
                            inputProps={{
                              id: 'ol-select-type',
                            }}
                            variant={'outlined'}
                            fullWidth
                          >
                            {sideBarOption?.options?.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.display}
                              </MenuItem>
                            ))}
                          </Field>
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid item xs key={sideBarOption.name}>
                          <Field
                            component={TextField}
                            type="text"
                            name={sideBarOption.name}
                            label={sideBarOption.label}
                            variant={'outlined'}
                            fullWidth
                          ></Field>
                        </Grid>
                      );
                    }
                  })}
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
