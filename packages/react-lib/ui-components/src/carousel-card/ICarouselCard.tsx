import { ImageUploadProps } from 'image-upload';
export interface CarouselCardProps extends ImageUploadProps {
  tile_id?: number;
  image_url?: string;
  type: 'plp' | 'sp' | 'boutique';
  type_id?: number;
  position: number;
}
