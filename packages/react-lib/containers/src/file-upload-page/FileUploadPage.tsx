import React, { FC } from 'react';
import { Formik, Field, Form } from 'formik';
import { FileListType, FileUpload } from '@hs/components';
import {
  Button,
  Grid,
  MenuItem,
  TextField as MuiTextField,
} from '@material-ui/core';
import {
  StyledUploadCntnr,
  StyledUploadSideBar,
  StyledTemplateButton,
  StyledCircularProgress,
} from './StyledFileUploadPage';
import { TextField } from 'formik-material-ui';
import {
  FileUploadPageProps,
  FileUploadSideBarOption,
  FileUploadListOption,
} from './IFileUploadPage';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';

export const FileUploadPage: FC<FileUploadPageProps> = ({
  acceptType,
  onSubmit,
  onExport,
  onDropDownChange,
  sideBar,
  validationSchema,
  initialValues,
}: FileUploadPageProps) => (
  <StyledUploadCntnr>
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
        <Form autoComplete="off">
          <Grid container spacing={1} justify="center">
            {sideBar && sideBar.length > 0 && (
              <StyledUploadSideBar elevation={3}>
                <Grid container direction="column" justify="center" spacing={3}>
                  {sideBar &&
                    sideBar.map((sideBarOption: FileUploadSideBarOption) => {
                      if (sideBarOption.type === 'autocomplete') {
                        return (
                          <Grid item xs key={sideBarOption.name}>
                            <Field
                              name={sideBarOption.name}
                              variant="standard"
                              component={Autocomplete}
                              onChange={(
                                evt: React.ChangeEvent<HTMLInputElement>,
                                values: FileUploadListOption
                              ) => {
                                if (evt) {
                                  if (sideBarOption.resetField) {
                                    setFieldValue(
                                      sideBarOption.resetField,
                                      null
                                    );
                                  }
                                  setFieldValue(
                                    sideBarOption.name,
                                    values || null
                                  );
                                  onDropDownChange &&
                                    onDropDownChange({
                                      name: sideBarOption.label,
                                      values: values,
                                    });
                                }
                              }}
                              getOptionLabel={(option: FileUploadListOption) =>
                                option.display || ''
                              }
                              getOptionSelected={(
                                option: FileUploadListOption,
                                selectedValue: FileUploadListOption
                              ) => option.id == selectedValue?.id || {}}
                              options={sideBarOption?.options || []}
                              renderInput={(
                                params: AutocompleteRenderInputParams
                              ) => (
                                <MuiTextField
                                  {...params}
                                  name={sideBarOption.name}
                                  label={sideBarOption.label}
                                  variant="outlined"
                                />
                              )}
                            />
                          </Grid>
                        );
                      } else if (sideBarOption.type === 'select') {
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
                                <MenuItem
                                  key={sideBarOption.key || item.id}
                                  value={sideBarOption.key || item.id}
                                >
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
            )}
            <Grid item xs={8}>
              <Grid container direction="column" justify="center">
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
                <Grid item xs={12}>
                  <StyledTemplateButton>
                    <Button
                      color={'primary'}
                      size={'large'}
                      type="button"
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => {
                        if (onExport) onExport();
                      }}
                    >
                      Download Template
                    </Button>
                  </StyledTemplateButton>
                </Grid>
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
                {isSubmitting ? 'Submitting' : 'Submit'}
                {isSubmitting && <StyledCircularProgress size={18} />}
              </Button>
            </Grid>
          </Grid>
          {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
        </Form>
      )}
    </Formik>
  </StyledUploadCntnr>
);
