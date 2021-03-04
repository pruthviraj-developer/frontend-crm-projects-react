import * as Yup from 'yup';
export const ReoOrderFormValidation = Yup.object().shape({
  attribute: Yup.string().required('Please select color or age'),
  vendor_id: Yup.string().required('Please select vendor'),
  brand_id: Yup.string().required('Please select brand'),
  age_group: Yup.array().of(
    Yup.object().shape({
      from_age: Yup.number()
        .required('Please enter value')
        .positive('Please enter positive values')
        .max(180, 'Maximum value can be 180')
        .typeError('Please enter only numbers'),
      to_age: Yup.number()
        .required('Please enter value')
        .positive()
        .min(Yup.ref('from_age'), 'Minimun should be From Age')
        .max(180, 'Maximum value can be 180')
        .typeError('Please enter only numbers'),
    })
  ),
});
