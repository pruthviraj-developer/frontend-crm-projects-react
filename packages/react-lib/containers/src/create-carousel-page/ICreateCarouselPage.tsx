export interface typeobject {
  key?: string | number;
  name?: string;
}

export interface CreateCarouselPageState {
  title: string;
  type: typeobject;
  sort: [];
  position: '';
  platform: [];
  start_date: Date;
  end_date: Date;
}

export interface CreateCarouselProps {
  action?: (event: Record<string, unknown>) => void;
}
