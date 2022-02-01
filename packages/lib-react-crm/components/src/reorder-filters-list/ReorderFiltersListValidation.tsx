import * as Yup from 'yup';
export const ReoOrderFormValidation = Yup.object().shape({
  attribute: Yup.string().required('Please select color or age'),
  vendor_id: Yup.string().required('Please select vendor'),
  brand_id: Yup.string().required('Please select brand'),
  // color:Yup.array().min(2,'Please select atleast 2 colors'),
  age_constraints: Yup.array().of(
    Yup.object().shape({
      from: Yup.number()
        .required('Please enter value')
        .min(0, 'Minimun value should be zero')
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
  //     return attribute.key === 'age_constraints'},
  //   then: Yup.string().required('Please select Age Group')
  // }),
});
