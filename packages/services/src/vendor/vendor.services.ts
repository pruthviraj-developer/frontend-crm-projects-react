import { httpService } from '../http';

const getContractList = <P, R>(params: P,vendorId:string): Promise<R> => {
    const url =
      `/crm-api/intranet/vendors/${vendorId}/vendorcontracts/`;
    return httpService.get<R>({ url, params })
  };

  const updateContract = <P, R>(data: P, vendorId:string,contractId:number): Promise<R> => {
    let params = {};
    const url =
      `/crm-api/intranet/vendors/${vendorId}/vendorcontracts/${contractId}/`;
    return httpService.patch({ url, params, data })
  };

  const getPaymentDetails = <P,R>(params:P,vendorId:string,vendorContractId:number): Promise<R> => {
    const url =
    `/crm-api/intranet/vendors/${vendorId}/vendorcontracts/${vendorContractId}/paymentdetails`;
    return httpService.get<R>({ url, params })
  };

  const createContract = <P, R>(data: P,vendorId:string): Promise<R> => {
    const url =
    `/crm-api/intranet/vendors/${vendorId}/vendorcontracts/`;
    return httpService.post<R>({ url, data })
  };

export const vendorServices = {
    getContractList,
    updateContract,
    getPaymentDetails,
    createContract
  };