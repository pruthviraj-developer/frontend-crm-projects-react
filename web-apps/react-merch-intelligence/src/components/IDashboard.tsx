interface ChartLabels {
  label: string;
  y: number;
}

export interface IChartData {
  attributeName: string;
  bifurcation?: ChartLabels[] | null;
}

export interface IPieChart {
  action: string;
  statusCode: number;
  data: IChartData[];
}

export interface IPieChartResponse {
  action: string;
  message?: null;
  params?: null;
  statusCode: number;
  data: IPieChart;
}

interface ICarouselListAttributesEntity {
  label: string;
  value?: string | null;
}

interface ICarouselList {
  pid: number;
  imageUrl: string;
  attributes: ICarouselListAttributesEntity[];
}

export interface ICarouselAPIResponse {
  action: string;
  message?: null;
  params?: null;
  statusCode: number;
  data: ICarouselData;
}

export interface ICarouselData {
  action: string;
  message?: string;
  statusCode: number;
  totalRecords: number;
  data: ICarouselList[];
}

export interface ICarouselItemsData {
  [key: number]: string;
}

export interface ICarouselResponse {
  [key: string]: ICarouselItemsData;
}

export interface ICarouselObjectsAttr {
  label: string;
  value: string;
}

export interface ICarouselObjectCards {
  imageUrl: string;
  pid: number;
  attributes: ICarouselObjectsAttr[];
}

export interface ICarouselObjectsData {
  label: string;
  actionButton: string;
  buttonType: string;
  carouselKey: string;
  categoryType: string;
  decisionType: string;
  defaultKey: string;
  cardsList: ICarouselObjectCards[];
}

export interface ICarouselObjectsResponse {
  [key: string]: ICarouselObjectsData;
}

export interface IDropdownOptionsArray {
  first: number;
  key: string;
  second: string;
  value: string;
}

export interface IDropdownsData {
  apiKey?: string;
  display: string;
  input_type: string;
  key: string;
  clearFields: Array<string>;
  options?: IDropdownOptionsArray[] | null;
}

export interface ISelectedFilterData {
  key: any;
  first?: number;
  second?: string;
  value?: string;
}

export interface ISelectedFilters {
  [key: string]: ISelectedFilterData;
}

export interface IPopupLabels {
  [key: string]: number;
}

export interface IPopUpData {
  [key: string]: IPopupLabels | null;
}

export interface IPostObjectsData {
  decisionType: string;
  productIds: Array<number>;
}

export interface IPostObjectDashboardResponse {
  [key: string]: IPostObjectsData[];
}

export interface ProgressLabels {
  label: string;
  value: number;
}

export interface IProgressData {
  title: string;
  info: ProgressLabels[];
}

export interface IProgressDataResponse {
  action: string;
  statusCode: number;
  data: IProgressData[] | null;
}

export interface IProgressResponse {
  action: string;
  message?: string;
  params?: string;
  statusCode: number;
  data: IProgressDataResponse;
}

export interface IPIDDatas {
  [key: number]: string;
}

export interface IPidData {
  [key: string]: IPIDDatas;
}

export interface StringObjects {
  [key: string]: string;
}

export interface TableConstItem {
  cardsList: Array<string>;
  onPageChange: any;
  categoryType: string;
  decisionType: string;
  defaultKey: string;
  page: number;
  updateDecisionType: string;
  carouselKey: string;
  label: string;
  actionButton: string;
  buttonType: string;
  updatePids: any;
}

export interface TableType {
  [key: string]: TableConstItem;
}

export interface IFiltersData {
  first: number;
  key: string;
  second: string;
  value: string;
}

export interface IFiltersResponse {
  [key: string]: IFiltersData[];
}

export interface IDashboardData {
  action?: string;
  message?: string;
  statusCode?: number;
}

export interface IDashboardResponse {
  action?: string;
  message?: string;
  params?: string;
  statusCode?: number;
  data: IDashboardData;
}
