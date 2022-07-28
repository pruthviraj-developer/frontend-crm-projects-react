import React from 'react';
import {AddVendorForm,AddVendorProps,AddVendorDataProps} from '@hs-crm/components';
import {ICreateDataResponse,urlParamsProps} from './IVendor';
import styled from '@emotion/styled';
import { vendorServices } from '@hs/services';
import { useParams, useLocation, useHistory } from "react-router";
import { toast } from 'react-toastify';

const queryString = require('query-string');


// Styled Component

const AddVendorFormWrapper = styled.div`
    margin-left: 120px;
    max-width: 1100px;
    text-align: left;
    padding: 50px 0;
`
const VendorContractsHeading = styled.h4`
  color: #F9B628;
  text-align: left;
  font-size: 30px;
  font-weight: 500;
  margin: 0px 0;
  margin-bottom: 20px;
`;

//styled component
const VendorNewContract = () => {
    let urlParams:urlParamsProps = useParams();
    let query = useLocation();
    let history = useHistory();

    let searchParams = queryString.parse(query.search);
    let vendorId = urlParams.vendorId;
    let vendorName = searchParams?.vendorName ? searchParams.vendorName : ''

    let vendorFormData = {} as AddVendorProps;
    vendorFormData.vendorName = vendorName;

    function onSubmitData(data:AddVendorDataProps,cb:any){

        vendorServices.createContract<AddVendorDataProps,ICreateDataResponse>(data,vendorId).then((response)=>{
    
            if(response.action.toLowerCase() === "success"){
                toast.success(response.data);
                history.push({
                    pathname: `/vendor/${vendorId}/contracts`
                })    
            }
            else{
                toast.error(response.data);
                cb(true);
            }
        }).catch((error)=>{
            toast.error(error + ' Unable to create Contract');
            cb(true);
        })
        
    }
    return (
        <AddVendorFormWrapper>
            <VendorContractsHeading>Create Contract</VendorContractsHeading>
            <AddVendorForm {...vendorFormData} onSubmit={onSubmitData}></AddVendorForm>
        </AddVendorFormWrapper>
    );
}

export default VendorNewContract;