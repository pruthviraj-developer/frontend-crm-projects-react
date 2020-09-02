import * as Yup from 'yup';

export const CarouselFormValidation = Yup.object().shape({
  title: Yup.string()
    .max(20, "Title can't be more than 20 characters")
    .required('Title is required'),
  position: Yup.number().required('Position is required'),
  carouselType: Yup.number().required('Carousel type is required'),
  platform: Yup.array().of(Yup.string()).required('Platform is required'),
  sorts: Yup.array().required('Sort is required'),
  tileHeight: Yup.number(),
  tileWidth: Yup.number(),
  startDate: Yup.date().required('Start date is required'),

  endDate: Yup.date()
    .required('End date is required')
    .when(
      'startDate',
      (startDate: any, schema: any) =>
        startDate &&
        schema.min(
          new Date(startDate),
          'End date should be greater than start date'
        )
    ),
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
    .max(12, 'Number of tiles can not exceed 12'),
  // .default([])
  // .required(),
  // .min(5, 'Have atleast 5 tiles')
  // .max(20, 'Number of tiles can not exceed 20'),
});
