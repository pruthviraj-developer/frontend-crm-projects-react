import { IPlpRecordProps } from '@hs/framework';

export interface ITileProps {
  onClick: () => void;
  href: string;
  productData: IPlpRecordProps;
}
