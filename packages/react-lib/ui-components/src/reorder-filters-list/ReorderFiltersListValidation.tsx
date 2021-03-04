import * as Yup from 'yup';
export const ReoOrderFormValidation = Yup.object().shape({
  attribute: Yup.string().required('Please select color or age'),
  vendor_id: Yup.string().required('Please select vendor'),
  brand_id: Yup.string().required('Please select brand'),
  // color_constraints: Yup.string().when('attribute', {
  //   is: (attribute) => attribute.key === 'color_constraints',
  //   then: Yup.string().required('Please select Color')
  // }),
  age_constraints: Yup.array().of(
    Yup.object().shape({
      from: Yup.number()
        .required('Please enter value')
        .positive('Please enter positive values')
        .max(180, 'Maximum value can be 180')
        .typeError('Please enter only numbers'),
      to: Yup.number()
        .required('Please enter value')
        .positive()
        .min(Yup.ref('from'), 'Minimun should be From Age')
        .max(180, 'Maximum value can be 180')
        .typeError('Please enter only numbers'),
    })
  ),

  // ).when('attribute', {
  //   is: (attribute) => {
  //     debugger;
  //     return attribute.key === 'age_constraints'},
  //   then: Yup.string().required('Please select Age Group')
  // }),
});
