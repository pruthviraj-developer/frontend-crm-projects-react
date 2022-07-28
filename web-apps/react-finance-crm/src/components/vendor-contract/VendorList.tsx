import React from 'react';
import {VendorContractList,VendorPaymentDetailsPopup,IViewPaymentDetails} from '@hs-crm/components';
import { useQuery } from "react-query";
import { vendorServices } from '@hs/services';
import { useModal } from 'react-hooks-use-modal';
import { useState } from 'react';
import { IUpdateQueryResponseProps, IVendorContractList, urlParamsProps,IPaymentDetailsResponse } from './IVendor';
import styled from '@emotion/styled';
import {Pagination,PaginationProps, ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import {Button,Dialog,DialogActions,DialogTitle} from '@material-ui/core';
import { useHistory, useParams, useLocation } from "react-router";
import { Loader } from '@hs-crm/components';
import { toast } from 'react-toastify';

const queryString = require('query-string');

const pageSize = 10;


// Styled Element
const VendorComponentWrapper = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 0;
`

const VendorContractsHeading = styled.h4`
  color: #F9B628;
  text-align: left;
  font-size: 30px;
  font-weight: 500;
  margin: 10px 0;
  margin-bottom: 20px;
`;

const VendorNameWrapper = styled.h6`
    text-align: left;
    font-size: 12px;
    font-weight: 800;
    span{
        font-weight: 400
    }
`
const VendorName = styled.span`
    text-transform: capitalize;
    text-align: left;
    font-size: 12px;
    font-weight: 500;
`
const PaginationWrapper  = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: end;
`

const ContractListTableWrapper = styled.div`
    /* max-width: 800px; */
    background-color: #fff;
`

const ToggleButtonWrapper = styled(ToggleButton)`

    background-color: #6c757d !important;
    color:#fff !important;
    font-weight: 700;
    &.Mui-selected{
        background-color: #ed54a4 !important;
        color: #fff !important;
        font-weight: 700;
    }
`

const CreateNewContractButton = styled(Button)`
    background-color: #ed54a4 !important;
    color: #fff !important;
`;

const ToggleButtonGroupWrapper = styled.div`
    margin: 10px 0 20px 0;
    text-align: left;
    display: flex;
    justify-content: space-between;
`;

const PaginationMUI = styled(Pagination)`
    .MuiPaginationItem-root{
        background: #fff;
    }
`;
const PaymentPopupContentWrapper = styled.div`
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 0px;
`
const PaymentPopupHeadingWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    border-bottom: 1px solid #e9ecef;
    align-items: center;
    padding-bottom: 20px;
`

const PaymentPopupHeading = styled.h4`
    margin: 0px 15px;
`

const PaymentCloseButton = styled(Button)`
    color: #808080 !important;
    font-weight: 800 !important;
    font-size: 13px !important;
`;

const EmptyDashboard = styled.div`
    padding: 30px 0;
    font-size: 26px;
`
// Styled Element End


// Main function Starts

const VendorList = () => {
    let urlParams:urlParamsProps = useParams();
    let query = useLocation();
    let history = useHistory();
    let searchParams = queryString.parse(query.search)

    

    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('active');
    const [open, setOpen] = useState(false);
    const [updateQueryParam, setUpdateQueryParams] = useState({});
    const [updateContractId, setUpdateContractId] = useState<number|null>(null);
    const [paymentDetailsPopupData, setPaymentDetailsPopupData] = useState({} as IViewPaymentDetails);
    const [showPaymentPopup, setShowPaymentPopup] = useState<boolean>(false);
    const [popupTextState, setPopupTextState] = useState('');
    const [PaymentPopupWrapper,openPaymentPopup, closePaymentPopup] = useModal('root', {
        preventScroll: false,
        closeOnOverlayClick: true,
      });

    const {
        data:contractListData,
        isFetching,
        refetch

    } = useQuery<IVendorContractList>(
        ['mskuListData',currentPage,status],
        ({ pageParam = currentPage }) => {
            let apiParams = {
                pageNo : pageParam,
                pageSize : pageSize,
                isActive: status === "active" ? 1 : 0,
            }
            return(vendorServices.getContractList(apiParams,vendorId))
        },
        {
            cacheTime: Infinity,
            keepPreviousData: true,
            refetchIntervalInBackground: false,
            refetchOnReconnect:false,
            refetchOnWindowFocus:false,
        });
    
    let totalRecords = contractListData  ? contractListData.totalRecords : 0;
    let totalPageCount =  Math.ceil(totalRecords/pageSize);
    let vendorName = contractListData?.vendorName ?  contractListData.vendorName  :  searchParams?.vendorName ? searchParams.vendorName : '';
    let vendorId = urlParams.vendorId;
    
    function onPageChanges($event:React.ChangeEvent<unknown>, page:number){

        setCurrentPage(page)

    }

    function handleStatusChange($event: React.MouseEvent<HTMLElement, MouseEvent>, value: any){

        setStatus(value);
    }

    const handleConfirmationClickOpen = () => {
        setOpen(true);
      };
    
      const handleConfirmationClose = () => {
        setOpen(false);
      };

    function viewDetailsPopup(data:IViewPaymentDetails) {
        let paymentDetailsParams = {
            "contractId" : data.vendorContractId
        }
        let paymentDetailsPromise = vendorServices.getPaymentDetails<{},IPaymentDetailsResponse>({},vendorId,paymentDetailsParams.contractId);
        paymentDetailsPromise.then((paymentData:IPaymentDetailsResponse)=>{
            let paymentDetailsJson = {...data} as IViewPaymentDetails;
            paymentDetailsJson.paymentDetails = paymentData.data;
            setPaymentDetailsPopupData(paymentDetailsJson);
        })
        setShowPaymentPopup(true);
        setPaymentDetailsPopupData(data);
        openPaymentPopup();

    }

    function changeStatus(isActive:number,vendorContractId:number){
        let params = {
            isActive: isActive,
        }

        let popupText = `Are you Sure You want to change Status to ${isActive? 'Active' : 'InActive'}`;
        setPopupTextState(popupText);
        setUpdateQueryParams(params);
        setUpdateContractId(vendorContractId);
        handleConfirmationClickOpen();
    }

    function changeDefaultStatus(isDefault:number,vendorContractId:number){
        let params = {
            isDefault: isDefault,
        }
        let popupText = `Are you Sure You want to change Default Status to ${isDefault? 'Yes' : 'No'}`;
        setPopupTextState(popupText);
        setUpdateQueryParams(params);
        setUpdateContractId(vendorContractId);
        handleConfirmationClickOpen()
    }

    function createNewContract(){
        history.push(`contracts/new?vendorName=${vendorName}`);
    }

    function handleConfirmationYes(){
        let contractId = updateContractId != null ? updateContractId : null;
        if(!contractId) return false
        let updateQueryPromise = vendorServices.updateContract<{}, IUpdateQueryResponseProps>(updateQueryParam,vendorId,contractId);

        updateQueryPromise.then((data:IUpdateQueryResponseProps)=>{
            if(data.action.toLowerCase() === "success"){
                toast.success(data.data);
                refetch();
                handleConfirmationClose();
                setPopupTextState('');
            }
            else{
                toast.error(data.data);
            }
           
        })

    }

    function handleConfirmationNo(){
        handleConfirmationClose();
        setPopupTextState('');
    }

    let paginationOptions:PaginationProps = {
        count : totalPageCount,
        page: currentPage,
        onChange: onPageChanges,
        shape : 'rounded',
        variant : 'outlined',
    }
    return (
        <VendorComponentWrapper>
            <VendorContractsHeading>Vendor Contracts</VendorContractsHeading>
            {vendorName &&(<VendorNameWrapper>
                Vendor Name : <VendorName>{vendorName}</VendorName>
            </VendorNameWrapper>
                
            )
             }
            <ToggleButtonGroupWrapper>
                <ToggleButtonGroup
                    color="secondrary"
                    value={status}
                    exclusive
                    onChange={handleStatusChange}
                    >
                    <ToggleButtonWrapper value="active" disabled={status === "active" ? true : false } role="radio">Active</ToggleButtonWrapper>
                    <ToggleButtonWrapper value="inactive" disabled={status === "inactive" ? true : false } role="radio">InActive</ToggleButtonWrapper>
                </ToggleButtonGroup>
                <CreateNewContractButton variant="contained" disableElevation onClick={createNewContract}>Create New Contract</CreateNewContractButton>
            </ToggleButtonGroupWrapper>
            {!isFetching && contractListData?.data?.length ? (
                <>
                    <ContractListTableWrapper>
                        <VendorContractList data={contractListData.data} paymentDetailsPopup={viewDetailsPopup} changeDefaultStatus={changeDefaultStatus} changeStatus={changeStatus} ></VendorContractList>
                    </ContractListTableWrapper>
                    <PaginationWrapper>
                        <PaginationMUI {...paginationOptions}></PaginationMUI>
                    </PaginationWrapper>
                    
                    
                </>
            ) : (!isFetching && !contractListData?.data?.length  ) ? 
            (<EmptyDashboard>
                No {status} Contracts  Found
            </EmptyDashboard>) : isFetching ? (<Loader></Loader>) : ''

            }
           
               <PaymentPopupWrapper>
               {showPaymentPopup && Object.keys(paymentDetailsPopupData).length !== 0 ? (
                    <PaymentPopupContentWrapper>
                        <PaymentPopupHeadingWrapper>
                            <PaymentPopupHeading>Payment Details</PaymentPopupHeading>
                            <PaymentCloseButton onClick={closePaymentPopup}>X</PaymentCloseButton>
                        </PaymentPopupHeadingWrapper>
                        <VendorPaymentDetailsPopup {...paymentDetailsPopupData}></VendorPaymentDetailsPopup>
                    </PaymentPopupContentWrapper>

                    
                    ) : ''   
                }
               </PaymentPopupWrapper>
               <Dialog
                    open={open}
                    keepMounted
                    onClose={handleConfirmationClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{popupTextState}</DialogTitle>
                    <DialogActions>
                        <Button variant="contained" disableElevation onClick={handleConfirmationYes} color="primary">
                            Yes
                        </Button>
                        <Button variant="contained" disableElevation onClick={handleConfirmationNo} color="primary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
          
           
           
        </VendorComponentWrapper>
    );
}


export default VendorList;