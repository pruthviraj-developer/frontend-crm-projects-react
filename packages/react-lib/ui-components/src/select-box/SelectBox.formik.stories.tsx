import React, { FC } from 'react';
import { SelectBoxProps } from './IselectBox';
import { action } from '@storybook/addon-actions';
import { Formik, Field, Form } from 'formik';
import { MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
export default {
  title: 'Select Box Formik',
};

const SelectTestData: SelectBoxProps = {
  placeholder: 'Position',
  options: [
    { display: '1', value: '1' },
    { display: '2', value: '2' },
    { display: '3', value: '3' },
  ],
  selectedValue: 2,
};

export const SelectBoxComponentFormik: FC = () => (
  <Formik
    initialValues={{ position: '2' }}
    onSubmit={(values, { setSubmitting }) => {
      action('submit');
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting, values }) => (
      <Form>
        <Field
          component={TextField}
          type="text"
          name="position"
          label="Position"
          defaultValue="2"
          select
          inputProps={{
            id: 'outlined-select',
          }}
          variant={'outlined'}
        >
          {SelectTestData.options?.map((opt, index) => (
            <MenuItem key={opt.display + index.toString()} value={opt.value}>
              {opt.display}
            </MenuItem>
          ))}
        </Field>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <pre>{JSON.stringify(values, null, 4)}</pre>
      </Form>
    )}
  </Formik>
);
