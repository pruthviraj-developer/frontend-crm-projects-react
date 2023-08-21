import { tableDataType } from '..';

export interface MIPProductListCardProps {
  imageUrl: string;
  productId: number;
  status: string;
  pidData: tableDataType;
  discoveryDecision: string;
  catalog: boolean;
  isDecisionTaken: boolean;
  keepFunctionDef(): Promise<any>;
  cullFunctionDef(): Promise<any>;
}

export interface IPromiseDataStatus {
  action: string;
  message: string;
  statusCode: number;
}

export interface keepCullResponse {
  productIds: [string | number];
  decisionType: 'string';
}
