export interface CarouselCardPageProps {
  imagesrc?: string;
}

export enum ActionType {
  addTile = 'addTile',
  removeTile = 'removeTile',
}

export type Action<T> = [ActionType.addTile, T] | [ActionType.removeTile, T];

export interface Tile {
  tile_id?: number;
  image_url?: string;
  type?: 'plp' | 'sp' | 'botique';
  type_id?: number;
  position: number;
}
export interface State {
  imageWidth?: number;
  imageHeight?: number;
  tiles: Array<Tile>;
  addEnable: boolean;
}
