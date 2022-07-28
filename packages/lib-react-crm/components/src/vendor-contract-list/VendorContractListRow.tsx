import React, {} from "react"
import { FC } from "react";
import {IVendorContractListRowHeadProps, IVendorContractListRowProps} from './IVendorContractList';
import { TableCellMUI, ToggleSwitchMUI,PaymentDetailsWrapper, ToggleSwitchLabel } from "./StyledVendorContractList";


const VendorContractListRow: FC<IVendorContractListRowProps> = ({
    poType ,
    factorySourcing ,
    createdAt ,
    updatedAt ,
    index,
    isDefault,
    isActive,
    paymentDetailsPopup,
    changeStatus,
    changeDefaultStatus
}) => {

    const onChangeDefaultState = () => {
        // setDefaultStatusState((currentState)=>{
        //     return !currentState
        // })
        changeDefaultStatus()
    }

    const onChangeActiveState = () => {
        // setActiveStatusState((currentState)=>{
        //     return !currentState
        // })
        changeStatus()
    }

    return ( 
        <>
            <TableCellMUI>{index}</TableCellMUI>
            <TableCellMUI>{poType}</TableCellMUI>
            <TableCellMUI>
                <ToggleSwitchMUI checked={isDefault? true : false} disabled={isDefault || !isActive ? true : false}  onChange={onChangeDefaultState}></ToggleSwitchMUI>
                <ToggleSwitchLabel>{isDefault ? 'Yes' : 'No'}</ToggleSwitchLabel>
            </TableCellMUI>
            
            <TableCellMUI>{createdAt}</TableCellMUI>  
            <TableCellMUI>{updatedAt}</TableCellMUI>
            <TableCellMUI>{factorySourcing?'Yes' : 'No'}</TableCellMUI>
            <TableCellMUI>
                <PaymentDetailsWrapper onClick={paymentDetailsPopup}>View Details</PaymentDetailsWrapper>
            </TableCellMUI>
            <TableCellMUI>
                <ToggleSwitchMUI checked={isActive ? true : false} disabled={isDefault? true : false} onChange={onChangeActiveState}></ToggleSwitchMUI>
                <ToggleSwitchLabel>{isActive ? 'Active' : 'InActive'}</ToggleSwitchLabel>
            </TableCellMUI>
        </>
    
    );
}

export const VendorContractListHead: FC<IVendorContractListRowHeadProps> = ({
        poType ,
        isDefault ,
        factorySourcing ,
        createdAt ,
        updatedAt ,
        isActive,
        index,
        paymentDetailsHeading
}) => {

    return ( 
        <>
            <TableCellMUI variant="head">{index}</TableCellMUI>
            
            
            <TableCellMUI variant="head">{poType}</TableCellMUI>
            {isDefault ? (
            <TableCellMUI variant="head">
                {isDefault}
            </TableCellMUI>
            ) : ''

            }
            <TableCellMUI variant="head">{createdAt}</TableCellMUI>  
            <TableCellMUI variant="head">{updatedAt}</TableCellMUI>
            <TableCellMUI variant="head">{factorySourcing}</TableCellMUI>
            {paymentDetailsHeading ? (
                <TableCellMUI variant="head">{paymentDetailsHeading}</TableCellMUI>
            ) : ''}
            {isActive ? (
                <TableCellMUI variant="head">{isActive}</TableCellMUI>
                ) : ''}
            
            
        </>
    
    );
}

export default VendorContractListRow;