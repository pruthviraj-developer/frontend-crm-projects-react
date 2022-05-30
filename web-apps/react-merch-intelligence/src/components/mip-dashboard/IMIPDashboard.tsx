import { tableDataType } from "@hs-crm/components";

export interface MIPDashboardProps {
    action: string
    statusCode: number
    data: Data
  }
  
  export interface Data {
    totalRecords: number
    mskuList: MskuList[]
  }
  
  export interface MskuList {
    imageUrl: string
    mskuName: string
    mskuId: number
    assotmentFlag: string
    mskuData: tableDataType
  }

  export interface urlParamsProps{
    page : string
  }