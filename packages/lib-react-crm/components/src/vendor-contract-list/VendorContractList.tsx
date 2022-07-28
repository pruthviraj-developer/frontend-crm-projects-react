import React, { FC } from 'react';
import {IVendorContractListProps} from './IVendorContractList';
import { VendorContractTableWrapper, TableWrapperMUI, TBodyWrapperMUI, TableRowMUI, THeadWrapperMUI } from './StyledVendorContractList';
import VendorContractListRow, { VendorContractListHead } from './VendorContractListRow';

const tableHeadJson = {
    vendorContractId: 'Vendor Contract ID',
    poType: 'PO Type',
    isDefault: 'Default',
    factorySourcing: 'Factory Sourcing',
    createdAt: 'Created On',
    updatedAt: 'Updated On',
    isActive: 'Status',
    index: 'SI No.',
    paymentDetailsHeading: 'Payment Details'
}  

export const VendorContractList : FC<IVendorContractListProps> = ({data,paymentDetailsPopup,changeStatus,changeDefaultStatus}) => {
    return (
    <VendorContractTableWrapper>
        <TableWrapperMUI>
            <THeadWrapperMUI>
                <TableRowMUI>
                    <VendorContractListHead  {...tableHeadJson}></VendorContractListHead>
                </TableRowMUI>
            </THeadWrapperMUI>
            <TBodyWrapperMUI>
                {data.map((item,index)=>{
                    return(
                        <TableRowMUI key={`TableRowMUI${index}`}>
                            <VendorContractListRow 
                            key={`vendorContractRow${index}`} 
                            {...item} 
                            index={index+1} 
                            paymentDetailsPopup={()=>{
                               
                                paymentDetailsPopup(item)
                            }} 
                            changeDefaultStatus={()=>{
                                changeDefaultStatus( item.isDefault ? 0 : 1, item.vendorContractId)
                            }}
                            changeStatus={()=>{
                                changeStatus(item.isActive ? 0 : 1,item.vendorContractId)
                            }}
                            ></VendorContractListRow>
                        </TableRowMUI>
                    )    
                })}
            </TBodyWrapperMUI>
          
        </TableWrapperMUI>
          
    </VendorContractTableWrapper> );
}
 