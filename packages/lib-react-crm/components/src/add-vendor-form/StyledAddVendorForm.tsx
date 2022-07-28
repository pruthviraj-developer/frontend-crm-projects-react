import styled from '@emotion/styled';
import {
    Button,
    InputLabel,
    Radio,
  } from '@material-ui/core';

export const AddVendorFormWrapper = styled.div`
    .MuiRadio-root{
        color: #007bff !important;
    }
    .MuiFormControl-fullWidth{
        /* .MuiInputLabel-outlined{
            transform: translate(14px, 10px) scale(1);
        } */
    }
    .MuiOutlinedInput-root{
        border-radius: 0px;
        .MuiOutlinedInput-input{
            padding: 10px;
        }
    }
`

export const RadioButtonWrap = styled(Radio)`
`

export const PaymentHeadingWrapper = styled.h4`
    
`

export const InputLabelMUI = styled(InputLabel)`
    font-size: 13px !important;
`
export const SubmitButtonWrapper = styled(Button)`
    margin-top: 60px !important;
    font-size: 12px !important;
`

export const ErrorMessageTextWrapper = styled.div`
    color: red;
    font-size: 10px;
    font-weight: bold;
    align-self: center;
`