import * as Yup from 'yup';

export const CarouselFormValidation = Yup.object().shape({
  title: Yup.string().required('YUP Title is required'),
  position: Yup.number().required('Position is required'),
  carouselType: Yup.number().required('Carousel type is required'),
  platform: Yup.array().of(Yup.string()).required('Platform is required'),
  sort: Yup.array().required('Sort is required'),
  tileHeight: Yup.number(),
  tileWidth: Yup.number(),
  //   startDate: Yup.date().required('Start date is required'),
  //   endDate: Yup.date().required('End date is required'),
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
