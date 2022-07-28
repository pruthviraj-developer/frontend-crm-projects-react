export interface IVendorContractListProps {
    data: IVendorContractListDataProps[],
    paymentDetailsPopup(data:object) : void,
    changeStatus(isActive:number,vendorContractId:number) : void,
    changeDefaultStatus(isDefault:number,vendorContractId:number) : void
  }
  
  export interface IVendorContractListDataProps {
    vendorContractId: number,
    poType: string,
    isDefault: number,
    factorySourcing: number,
    createdAt: string,
    updatedAt: string,
    rtvDays: number,
    isActive: number,
  }


  export interface IVendorContractListRowProps {
    vendorContractId: number,
    poType: string,
    isDefault?: number,
    factorySourcing: number,
    createdAt: string,
    updatedAt: string,
    rtvDays?: number,
    isActive?: number,
    index: number,
    paymentDetailsPopup():void,
    changeStatus():void,
    changeDefaultStatus():void
  }

  export interface IVendorContractListRowHeadProps {
    vendorContractId: string,
    poType: string,
    isDefault?: string,
    factorySourcing: string,
    createdAt: string,
    updatedAt: string,
    rtvDays?: string,
    isActive?: string,
    index: string,
    paymentDetailsHeading?: string,
  }

  export interface IViewPaymentDetails {
    vendorContractId: number,
    poType: string,
    isDefault: number,
    factorySourcing: number,
    createdAt: string,
    updatedAt: string,
    rtvDays: number,
    isActive: number,
    vendorName?: string,
    paymentDetails?: IPaymentDetails[]
  }

  export interface IPaymentDetails {
    paymentType: string | number
    startDate: string | number
    advancePayment: number | string
    apPaymentTerm: number | string 
    fullPayment: number | string
    fpPaymentTerm: number | string
  }

  export interface IPopupTable {
    rowArray:IPaymentDetails,
    type: "body" | "head",
    siNo?: number,
  }