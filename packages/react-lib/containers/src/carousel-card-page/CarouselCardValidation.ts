import * as Yup from 'yup';
export const CardPageValidation = Yup.object().shape({
  tiles: Yup.array()
    .required()
    .min(5, 'Have atleast 5 tiles')
    .max(20, 'Number of tiles can not exceed 20'),
});
