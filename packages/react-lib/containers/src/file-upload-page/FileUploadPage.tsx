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
import styled from '@emotion/styled';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const ButtonWithMargin = styled.div`
  margin-bottom: 25px;
`;

export const FileUploadPage: FC<FileUploadPageProps> = ({
  acceptType,
  onSubmit,
  onExport,
  sideBar,
  validationSchema,
  initialValues,
}: FileUploadPageProps) => (
  <Paper>
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
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
                              <MenuItem key={item.id} value={item.id}>
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
            <Grid item xs={8}>
              <Grid item>
                <ButtonWithMargin>
                  <Button
                    color={'primary'}
                    variant={'contained'}
                    size={'large'}
                    type="button"
                    startIcon={<CloudDownloadIcon />}
                    onClick={() => {
                      if (onExport) onExport();
                    }}
                  >
                    Download Template
                  </Button>
                </ButtonWithMargin>
              </Grid>
              <Grid item>
                <Field
                  id={`file-upload`}
                  component={FileUpload}
                  name={`file`}
                  onChange={(value: FileListType) => {
                    try {
                      setFieldValue(`file`, value[0]);
                    } catch (err) {
                      setFieldValue(`file`, undefined);
                    }
                  }}
                  reset={values.resetInput && !dirty}
                  acceptType={acceptType}
                ></Field>
              </Grid>
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
          {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
        </Form>
      )}
    </Formik>
  </Paper>
);
