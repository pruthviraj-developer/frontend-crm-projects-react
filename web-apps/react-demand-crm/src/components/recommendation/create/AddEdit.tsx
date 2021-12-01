import React, { FC, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid, MenuItem, Paper } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { recommendationService } from '@hs/services';
import { IFormValues, IFormResponse, IRecommendationCarouselList } from './IAddEdit';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

let initialValues = {
  id: '',
  modelName: '',
  rcType: '',
  s3BucketPath: '',
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(12),
  },
  fields: {
    minWidth: '400px',
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    color: 'black',
  },
  error: {
    '&.MuiFormHelperText-root.Mui-error': {
      fontSize: 'small',
    },
  },
}));

const FormWrapper = styled.div`
  width: 95%;
  margin: 10px 10px 10px 90px;
`;

const AddEdit: FC<{ header: string }> = ({ header }) => {
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  const helperTestClasses = helperTextStyles();
  const [initialData, setInitialData] = useState(initialValues);
  const [recommendationCarouselList, setRecommendationCarouselList] = useState([
    {
      display: '---',
      key: '',
    },
  ]);
  const validationSchema = Yup.object().shape({
    modelName: Yup.string().required('Please Enter Model Name'),
    rcType: Yup.string().required('Please Choose Recommendation Carousel'),
    s3BucketPath: Yup.string().required('Please Enter Model S3 Path'),
  });
  const onSubmit = async (values: IFormValues, actions: any) => {
    try {
      const data: IFormResponse = await recommendationService.postModelData(values);
      if (data.action === 'success') {
        toast.success('success');
        actions.setSubmitting(false);
        if (!params?.id) {
          actions.resetForm();
        }
      } else {
        let msg = data.message || 'Something went wrong...';
        toast.error(msg);
      }
    } catch (e) {
      let msg = e.message || 'Something went wrong...';
      toast.error(msg);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let listType: IRecommendationCarouselList[] = await recommendationService.getRecommendCarouselTypes();
        listType.length > 0 && setRecommendationCarouselList(listType);
        if (params.id) {
          const data: IFormValues = await recommendationService.getModelData({ id: params.id });
          setInitialData(data);
        } else {
          setInitialData(initialValues);
        }
      } catch (e) {}
    })();
  }, [params.id]);

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <FormWrapper>
        <h1>{header}</h1>
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={initialData}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <Grid container spacing={1} direction="column" justify="center">
                <Paper className={classes.paper} elevation={8} variant="outlined">
                  <Grid container direction="column" spacing={3} justify="center">
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name="modelName"
                        type="text"
                        label="Model Name"
                        className={classes.fields}
                        disabled={params.id}
                        FormHelperTextProps={{ classes: helperTestClasses }}
                      ></Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        select
                        variant="outlined"
                        name="rcType"
                        label="Recommendation Carousel"
                        component={TextField}
                        disabled={params.id}
                        className={classes.fields}
                        FormHelperTextProps={{ classes: helperTestClasses }}
                      >
                        {recommendationCarouselList.map((item: IRecommendationCarouselList) => (
                          <MenuItem key={item.key} value={item.key}>
                            {item.display}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        name="s3BucketPath"
                        type="text"
                        label="Model S3 Path"
                        className={classes.fields}
                        FormHelperTextProps={{ classes: helperTestClasses }}
                      ></Field>
                    </Grid>
                    <Grid item>
                      <Button
                        color={'primary'}
                        variant={'contained'}
                        disabled={isSubmitting}
                        size={'large'}
                        type="submit"
                      >
                        {isSubmitting ? 'Submitting' : 'Submit'}
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </>
  );
};

export default AddEdit;
