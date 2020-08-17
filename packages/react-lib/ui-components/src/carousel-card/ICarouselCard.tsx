import { ImageUploadProps } from 'image-upload';
import { SelectBoxProps } from 'select-box';
import {
  AutoCompleteProps,
  AutoCompleteOption,
} from 'auto-complete/IAutoComplete';
export interface CarouselCardProps {
  tile_id?: number;
  image_url?: string;
  type?: 'plp' | 'sp' | 'boutique';
  type_id?: number;
  position?: number;
  imageupload?: ImageUploadProps;
  positionBox?: SelectBoxProps;
  typeBox?: SelectBoxProps;
  autoCopmpleOptions: AutoCompleteProps<AutoCompleteOption>;
}
