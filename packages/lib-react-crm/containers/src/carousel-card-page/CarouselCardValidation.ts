import * as Yup from 'yup';
export const CardPageValidation = Yup.object().shape({
  tiles: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        imageId: Yup.string(),
        imageUrl: Yup.string().required('Upload Image to proceed').url(),
        actionId: Yup.string().required('Select a PLP/SP/Boutique'),
        actionName: Yup.string(),
        type: Yup.string().default('plp'),
        position: Yup.number(),
      })
    )
    .required(),
  // .min(5, 'Have atleast 5 tiles')
  // .max(20, 'Number of tiles can not exceed 20'),
});
