export interface typeobject {
  key?: string | number;
  name?: string;
}

export interface State {
  title: string;
  type: typeobject;
  sort: [];
  position: '';
  platform: [];
  start_date: Date;
  end_date: Date;
}
