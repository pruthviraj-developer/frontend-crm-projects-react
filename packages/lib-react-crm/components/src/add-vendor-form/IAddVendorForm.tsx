export interface AddVendorProps {
    vendorName: string,
    vendorId: number
    poType: string
    isDefault: number
    factorySourcing: number
    createdAt: string
    updatedAt: string
    rtvDays: number
    isActive: number
    paymentTerms: PaymentTerms,
    onSubmit?(data:AddVendorDataProps,cb:(submitFailed:boolean)=>void):void
}

export interface AddVendorErrorProps {

  poType: string
  rtvDays: string
  paymentType: string
  startDate: string
  advancePayment: string
  apPaymentTerm: string
  fullPayment: string
  fpPaymentTerm: string
}


export interface AddVendorDataProps {

  vendorId: number
  poType: string
  isDefault: number
  factorySourcing: number
  startDate: string
  rtvDays: number
  isActive: number
  paymentTerms: PaymentTerms,
}
  
  export interface PaymentTerms {
    paymentType: string
    startDate: string
    advancePayment: number
    apPaymentTerm: number
    fullPayment: number
    fpPaymentTerm: number
  }

  export interface PaymentTermsError {
    paymentType: string
    startDate: string
    advancePayment: string
    apPaymentTerm: string
    fullPayment: string
    fpPaymentTerm: string
  }