export interface typeobject {
  key?: string | number;
  name?: string;
}

export interface Tile {
  id?: string;
  imageId?: string;
  imageUrl?: string;
  type: 'plp' | 'sp' | 'boutique';
  actionName?: string;
  actionId?: string;
  position: number;
}

export interface CreateNonCarouselPageState {
  title: string;
  carouselType: string;
  sorts: [];
  position: '';
  platform: [];
  startDate: Date;
  endDate: Date;
  tileHeight?: number;
  tileWidth?: number;
  tiles: Tile[];
  userTypes: [];
  customerIds: string;
}

export interface CreateNonCarouselProps {
  action?: (event: Record<string, unknown>) => void;
  carouselId?: string;
}
