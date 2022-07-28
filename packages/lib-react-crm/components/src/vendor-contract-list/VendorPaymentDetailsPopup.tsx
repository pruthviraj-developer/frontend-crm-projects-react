import React from "react"
import { FC } from "react";
import { IViewPaymentDetails, IPopupTable } from "./IVendorContractList";
import { PopupContentWrapper, PopupDetailsWrapper, PopupTableWrapper, PopupText, PopupTextHead, PopupTextWrapper, TableCellMUI, TableRowMUI, TableWrapperMUI, TBodyWrapperMUI, THeadWrapperMUI } from "./StyledVendorContractList";

const paymentDetailsKey = [
    "siNo",
    "paymentType",
    "startDate",
    "advancePayment",
    "apPaymentTerm",
    "fullPayment",
    "fpPaymentTerm",
]
const popupTableHeadValue = {
    "siNo" : "Si No",
    "paymentType": "Payment Type",
    "startDate": "Start Date",
    "advancePayment": "Advanced Payment",
    "apPaymentTerm": "Payment Term",
    "fullPayment": "Full Payment",
    "fpPaymentTerm": "Payment Details"
}

export const VendorPaymentDetailsPopup: FC<IViewPaymentDetails> = ({
    poType,
    isDefault,
    factorySourcing,
    rtvDays,
    isActive,
    paymentDetails
}) => {

    return (
        <PopupDetailsWrapper>
            <PopupContentWrapper>
                <PoupTextComponent head="Vendor Name" text="Simba"></PoupTextComponent>
                <PoupTextComponent head="Po Type" text={poType}></PoupTextComponent>
                <PoupTextComponent head="Default" text={isDefault ? 'Yes' : 'No'}></PoupTextComponent>
                <PoupTextComponent head="Factory Sourcing" text={factorySourcing ? 'Yes' : 'No'}></PoupTextComponent>
                <PoupTextComponent head="RTV" text={rtvDays}></PoupTextComponent>
                <PoupTextComponent head="Active" text={isActive ? 'Yes' : 'No'}></PoupTextComponent>


            </PopupContentWrapper>
            {paymentDetails ? (
                <PopupTableWrapper>
                    <TableWrapperMUI>
                        <THeadWrapperMUI>
                            <TableRowMUI>
                                <PopupTable rowArray={popupTableHeadValue} type="head"></PopupTable>
                            </TableRowMUI>
                        </THeadWrapperMUI>
                        <TBodyWrapperMUI>
                            {paymentDetails.map((item, index) => {

                                return (
                                    <TableRowMUI key={`popupRow${index}`}>
                                        <PopupTable rowArray={item} type="body" siNo={index + 1}></PopupTable>
                                    </TableRowMUI>
                                )
                            })}
                        </TBodyWrapperMUI>

                    </TableWrapperMUI>
                </PopupTableWrapper>
            ) : ''}

        </PopupDetailsWrapper>
    )
}


export const PoupTextComponent = ({ head, text }) => {
    if (!head || !text) return (<></>);
    return (<PopupTextWrapper>
        <PopupTextHead>{head}</PopupTextHead>
        <PopupText>{text}</PopupText>
    </PopupTextWrapper>)
}


export const PopupTable: FC<IPopupTable> = ({ rowArray, type = "body", siNo = 0 }) => {
    return (
        <>
            {
                paymentDetailsKey.map((item, index) => {
                    return (
                        <TableCellMUI key={`tablePopup${index}`} variant={type}>{
                            item === "siNo" && siNo !== 0 ? siNo : rowArray[item]
                            }</TableCellMUI>
                    )

                })

            }

        </>

    )


}
