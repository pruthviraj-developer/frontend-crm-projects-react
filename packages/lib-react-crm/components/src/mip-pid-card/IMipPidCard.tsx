import { tableDataType } from '..';

export interface MipPidCardProps {
  imageUrl: string;
  productId: number;
  pidData: tableDataType;
  isDecisionTaken?: boolean;
  isOpenOrder?: boolean;
  hasBestSeller?: boolean;
}
