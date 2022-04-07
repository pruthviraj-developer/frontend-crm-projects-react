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
export interface TileImage {
  url: string;
  width?: string;
  height?: string;
}

export interface CreateNonCarouselPageState {
  title: string;
  titleImage: TileImage;
  carouselType: string;
  navigation: 'true' | 'false';
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
