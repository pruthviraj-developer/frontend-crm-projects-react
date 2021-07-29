export interface IFiltersSubmit {
  categoryId: OptionsType;
  subCategoryId: OptionsType;
}

export interface IFilters {
  onSubmit: (event: IFiltersSubmit | any) => void;
}

export interface OptionsType {
  id: number;
  name: string;
}
