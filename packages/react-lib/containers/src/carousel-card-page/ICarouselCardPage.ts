export interface Tile {
  id?: string;
  imageId?: string;
  imageUrl?: string;
  type: TileType;
  actionName?: string;
  actionId?: string;
  position: number;
}
export interface State {
  tileHeight?: number;
  tileWidth?: number;
  tiles: Tile[];
}

export type TileType = 'plp' | 'sp' | 'boutique';
