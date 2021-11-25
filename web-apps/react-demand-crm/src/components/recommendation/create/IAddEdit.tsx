export interface IFormValues {
  id: string;
  rcType: string;
  modelName: string;
  s3BucketPath: string;
}

export interface IFormResponse {
  action: string;
  message?: string;
}

export interface IRecommendationCarouselList {
  key: string;
  displayName: string;
}
