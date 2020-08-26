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
  sort: [];
  position: '';
  platform: [];
  start_date: Date;
  end_date: Date;
  tileHeight?: number;
  tileWidth?: number;
  tiles: Tile[];
}

export interface CreateNonCarouselProps {
  action?: (event: Record<string, unknown>) => void;
  carouselId?: string;
}
