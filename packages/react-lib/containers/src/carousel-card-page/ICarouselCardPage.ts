import { CarouselCardProps } from '@hs/components';

export interface CarouselCardPageProps {
  imagesrc?: string;
}

export type ActionType = 'addTile' | 'removeTile' | 'changePosition';

export type Action<T> = [ActionType, T];

export interface Tile {
  tile_id?: number;
  image_url?: string;
  type: CarouselCardProps['type'];
  type_id?: number;
  position: number;
  cardId: string;
}
export interface State {
  imageWidth?: number;
  imageHeight?: number;
  tiles: Array<Tile>;
  addEnable: boolean;
}
