import {IVendorContractListDataProps} from '@hs-crm/components';

export interface IVendorContractList {
    action: string,
    totalRecords: number,
    vendorName: string,
    data: IVendorContractListDataProps[]
  }

  export interface urlParamsProps{
    vendorId: string
  }


  export interface IUpdateQueryResponseProps{
    "action": string, 
    "data": string
  }
  
  export interface IPaymentDetailsResponse {
    action: string
    data: IPaymentDetailsData[]
  }
  
  export interface IPaymentDetailsData {
    paymentType: string
    startDate: string
    advancePayment: number
    apPaymentTerm: number
    fullPayment: number
    fpPaymentTerm: number
  }

  export interface ICreateDataResponse {
    action: string
    data: any
    statusCode: number
  }