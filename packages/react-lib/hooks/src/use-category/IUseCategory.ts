export interface ISubCategory {
  sub_cat: OptionType[] | null;
}

export interface IProductTypes {
  pt?: OptionType[] | null;
}

export interface OptionType {
  key: string | number;
  value: string;
  second: string | number;
  first: string | number;
}

export interface IUseCategoryProps {
  category_id?: string;
  sub_category_ids?: string[];
}
