import * as Yup from 'yup';
export const FiltersValidationSchema = Yup.object().shape({
  categoryId: Yup.mixed().required('Please select category'),
  subCategoryId: Yup.mixed().required('Please select sub category'),
});
