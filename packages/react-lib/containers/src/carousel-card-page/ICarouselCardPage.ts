export interface Tile {
  id?: string;
  imageId?: string;
  imageUrl?: string;
  type: 'plp' | 'sp' | 'boutique';
  actionName?: string;
  actionId?: string;
  position: number;
}
export interface State {
  tileHeight?: number;
  tileWidth?: number;
  tiles: Tile[];
}
