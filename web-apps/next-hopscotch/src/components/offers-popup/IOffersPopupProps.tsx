import { IContextData } from '@hs/framework';
export interface IOfferPopupProps {
  offersUrl: string;
  product_id?: number;
  contextData?: IContextData;
  closeOffersPopup: () => void;
}
