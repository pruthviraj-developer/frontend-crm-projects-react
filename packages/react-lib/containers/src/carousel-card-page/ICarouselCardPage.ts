export interface CarouselCardPageProps {
  imagesrc?: string;
}

export type ActionType = 'addTile' | 'removeTile' | 'changePosition';

export type Action<T> = [ActionType, T];

export interface Tile {
  id?: string;
  imageId?: string;
  imageUrl?: string;
  type: 'plp' | 'sp' | 'boutique';
  actionId?: string;
  position: number;
  width?: number;
  height?: number;
}
export interface State {
  imageWidth?: number;
  imageHeight?: number;
  tiles: Array<Tile>;
}
