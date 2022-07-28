import React, { FC } from "react";
import { AddVendorErrorProps, AddVendorProps, PaymentTerms,AddVendorDataProps } from "./IAddVendorForm";
import { AddVendorFormWrapper, PaymentHeadingWrapper, RadioButtonWrap, InputLabelMUI, SubmitButtonWrapper, ErrorMessageTextWrapper } from "./StyledAddVendorForm";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Select,TextField } from 'formik-material-ui';
import DateFnsUtils from '@date-io/date-fns';

import {
    MenuItem,
    CardContent,
    Grid,
    FormControlLabel,
    RadioGroup,
    InputAdornment,
} from '@material-ui/core';
import { useState } from "react";


let initialValues = {
    vendorName: '',
    vendorId: '',
    poType: '',
    isDefault: 0,
    factorySourcing: 0,
    rtvDays: 0,
    isActive: 0,
    paymentType: '',
    startDate: new Date(),
    advancePayment: 0,
    apPaymentTerm: 0,
    fullPayment: 0,
    fpPaymentTerm: 0,

};

function dateFormat(dateString){
    var d = new Date(dateString);
    var dateFormatedString = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() ;

    return dateFormatedString;
}

export const AddVendorForm: FC<AddVendorProps> = ({
    vendorName,
    onSubmit
}) => {
    const [disablePaymentField, setDisablePaymentField] = useState(false);


    return (
        <AddVendorFormWrapper>
            {vendorName && (
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        spacing={3}
                    >
                        <Grid container alignItems="center" item xs={2}>
                            <InputLabelMUI>Vendor Name</InputLabelMUI>
                        </Grid>
                        <Grid container alignItems="center" item xs={2}>
                            <InputLabelMUI>
                                <strong>{vendorName}</strong>
                            </InputLabelMUI>
                        </Grid>

                    </Grid>
                </CardContent>
                
            )}
             
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validate={(values) => {
                    const errors: Partial<AddVendorErrorProps> = {};
                    if (!values.poType) {
                        errors.poType = 'PO type is required';
                    }
                    if (!values.paymentType) {
                        errors.paymentType = 'Payment Type is required';
                    }
                    if ((values.poType === 'SOR' && values.rtvDays === 0) || !values.poType ) {
                        errors.rtvDays = 'RTV Days is required';
                    }
                    if(values.rtvDays<0){
                        errors.rtvDays = "RTV Days cannot be less than 0";
                        values.rtvDays = 0;
                    }
                    if (!(values.startDate)) {
                        errors.startDate = 'Start Date is required';
                    }
                    if (values.paymentType == 'Partialpayment' && !(values.advancePayment)) {
                        errors.advancePayment = 'Advanced Payment is required';
                    }
                    if ((values.paymentType == 'Partialpayment' || values.paymentType == 'Prepayment') && !(values.apPaymentTerm)) {
                        errors.apPaymentTerm = 'Advanced Payment Term is required';
                    }
                    if (values.paymentType == 'Partialpayment' && !(values.fullPayment)) {
                        errors.fullPayment = 'Full Payment is required';
                    }
                    if (values.paymentType == 'Partialpayment' && !(values.fullPayment)) {
                        errors.fullPayment = 'Full Payment is required';
                    }
                    if (values.fullPayment > 100 || values.fullPayment < 0) {
                        errors.fullPayment = 'Full Payment will only between 0 and 100';
                        values.fullPayment = 0;
                    }
                    if (values.advancePayment > 100 || values.advancePayment < 0) {
                        errors.fullPayment = 'Advanced Payment will only between 0 and 100';
                        values.advancePayment = 0;
                    }
                    if ((values.paymentType == 'Partialpayment' || values.paymentType == 'Postpayment') && !(values.fpPaymentTerm)) {
                        errors.fpPaymentTerm = 'Full Payment Term is required';
                        
                    }
                    if(values.apPaymentTerm < 0 ){
                        errors.apPaymentTerm = 'Advanced Payment Term cannot be less than 0';
                        values.apPaymentTerm = 0;
                    }
                    if(values.fpPaymentTerm < 0 ){
                        errors.fpPaymentTerm = 'Full Payment Term cannot be less than 0';
                        values.fpPaymentTerm = 0;
                    }
                    if((values.paymentType == 'Partialpayment' && values.advancePayment >= 100))
                    {
                        errors.advancePayment = 'Advanced Payment can not be more than 99';
                    }
                    if((values.paymentType == 'Partialpayment' && values.fullPayment >= 100))
                    {
                        errors.fullPayment = 'Full Payment can not be more than 99';
                    }
                    
                    return errors;
                    
                
                }}
                onSubmit={(values,actions) => {
                    let finalValue = {} as AddVendorDataProps;
                    let finalPaymentValue = {} as PaymentTerms;
                    
                    let objectKeys = ["poType","isDefault","factorySourcing","rtvDays","isActive"];
                    let objectKeysPayment = ["paymentType", "startDate","advancePayment","apPaymentTerm","fullPayment","fpPaymentTerm" ];

                    objectKeys.forEach((item) => {
                        if (values.hasOwnProperty(item)) {
                            finalValue[item] = values[item];
                        }
                      })

                      objectKeysPayment.forEach((item)=>{
                        if (values.hasOwnProperty(item)) {
                            let value = values[item];
                            if(item === "startDate")
                            {
                                value = dateFormat(values[item]);
                            }
                            finalPaymentValue[item] = value
                        }
                      })
                    
                      finalValue.paymentTerms = finalPaymentValue;
                    if(onSubmit){
                        onSubmit(finalValue,(submitFailed)=>{
                            // return submitFailed;
                            if(submitFailed){
                                actions.setSubmitting(false)
                            }
                        });
                    }

                }}
            >
                {({ values, isSubmitting, setFieldValue }) => {
                    
                    return (
                    <Form>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <CardContent>


                                <Grid
                                    container
                                    direction="row"
                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>PO Type</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Field
                                            component={Select}
                                            fullWidth
                                            name="poType"
                                            type="text"
                                            labelId="poTypeLabel"
                                            label="PO Type"
                                            value={values.poType}
                                            variant={'outlined'}
                                        >
                                            <MenuItem value="Pre-order">Pre-order</MenuItem>
                                            <MenuItem value="Out-Right">Out-Right</MenuItem>
                                            <MenuItem value="SOR">SOR</MenuItem>
                                        </Field>
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="poType"/>

                                </Grid>

                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Default</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={RadioGroup}
                                            aria-labelledby="default-radio-buttons-group-label"
                                            defaultValue="0"
                                            name="isDefault"
                                            row
                                            color="primary"
                                            size="small"
                                            onChange={(event) => {
                                                setFieldValue("isDefault", parseInt(event.currentTarget.value))
                                              }}
                                        >
                                            <FormControlLabel value="1" control={<RadioButtonWrap color="default" />} label="Yes" />
                                            <FormControlLabel value="0" control={<RadioButtonWrap color="default" />} label="No" />
                                        </Field>
                                    </Grid>
                                </Grid>

                                {/* Factory Sourcing */}
                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Factory Sourcing</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={RadioGroup}
                                            aria-labelledby="factory-sourcing-radio-buttons-group-label"
                                            defaultValue="0"
                                            name="factorySourcing"
                                            row
                                            color="primary"
                                            onChange={(event) => {
                                                setFieldValue("factorySourcing", parseInt(event.currentTarget.value))
                                              }}
                                        >
                                            <FormControlLabel value="1" control={<RadioButtonWrap color="default" />} label="Yes" />
                                            <FormControlLabel value="0" control={<RadioButtonWrap color="default" />} label="No" />
                                        </Field>
                                    </Grid>
                                </Grid>

                                {/* Rtv Days */}
                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>RTV Days</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={TextField}
                                            id="outlined-start-adornment"
                                            sx={{ m: 1, width: '25ch' }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">Days</InputAdornment>,
                                            }}
                                            label="RTV Days"
                                            type="number"
                                            variant={'outlined'}
                                            size="small"
                                            name="rtvDays"

                                        // helperText="Enter Title"
                                        />
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="rtvDays"/>

                                </Grid>

                                {/* Active Days */}
                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Active</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={RadioGroup}
                                            aria-labelledby="active-radio-buttons-group-label"
                                            defaultValue="0"
                                            name="isActive"
                                            row
                                            color="primary"
                                            onChange={(event) => {
                                                setFieldValue("isActive", parseInt(event.currentTarget.value))
                                              }}
                                        >
                                            <FormControlLabel value="1" control={<RadioButtonWrap color="default" />} label="Yes" />
                                            <FormControlLabel value="0" control={<RadioButtonWrap color="default" />} label="No" />
                                        </Field>
                                    </Grid>
                                </Grid>

                                <PaymentHeadingWrapper>Payment Details</PaymentHeadingWrapper>

                                {/* Payment Type */}
                                <Grid
                                    container
                                    direction="row"
                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Payment Type</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={Select}
                                            fullWidth
                                            name="paymentType"
                                            type="text"
                                            label="Payment Type"
                                            value={values.paymentType}
                                            variant={'outlined'}
                                            onChange={(event) => {
                                                let selectedOption = event.target.value;
                                                let disablePaymentFieldValue = selectedOption === "Prepayment" || selectedOption === "Postpayment" ? true : false;
                                                setDisablePaymentField(disablePaymentFieldValue)
                                                if(selectedOption === "Prepayment"){
                                                    setFieldValue("advancePayment", 100)
                                                    setFieldValue("fullPayment", 0)
                                                    setFieldValue("fpPaymentTerm", 0)
                                                }
                                                if(selectedOption === "Postpayment"){
                                                    setFieldValue("fullPayment", 100)
                                                    setFieldValue("advancePayment", 0)
                                                    setFieldValue("apPaymentTerm", 0)
                                                }
                                                if(selectedOption === "Partialpayment"){
                                                    setFieldValue("fullPayment", 0)
                                                    setFieldValue("advancePayment", 0)
                                                }
                                                setFieldValue("paymentType", selectedOption)
                                              }}
                                        // helperText="Enter Title"
                                        >
                                            <MenuItem value="Prepayment">Pre-Payment</MenuItem>
                                            <MenuItem value="Postpayment">Post-Payment</MenuItem>
                                            <MenuItem value="Partialpayment">Partial-Payment</MenuItem>
                                        </Field>
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="paymentType"/>

                                </Grid>

                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Start Date</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={DatePicker}
                                            fullWidth
                                            disablePast
                                            name="startDate"
                                            label="Start Date"
                                            format="dd-MM-yyyy"
                                            views={["year", "month", "date"]} 
                                        // helperText="Enter Title"
                                        />
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="startDate"/>
                                </Grid>
                                {/* Advanced Payment */}
                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Advanced Payment</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="advancePayment"
                                            type="number"
                                            label="Advanced Payment"
                                            variant={'outlined'}
                                            size="small"
                                            disabled={disablePaymentField ? true : false}
                                            onChange={(event)=>{
                                                
                                                let currentValue = event.target.value;
                                                if(values.paymentType === "Partialpayment")
                                                {
                                                    if(currentValue > 99){
                                                        currentValue = 99;
                                                    }
                                                    setFieldValue("advancePayment", currentValue)
                                                    setFieldValue("fullPayment", (100 - currentValue))
                                                }
                                                
                                            }}
                                        // helperText="Enter Title"
                                        />
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="advancePayment"/>

                                </Grid>

                                {/* Payment Terms */}
                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Advanced Payment Terms</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="apPaymentTerm"
                                            type="number"
                                            label="Advanced PaymentTerm"
                                            variant={'outlined'}
                                            size="small"
                                            disabled={values.paymentType.toLowerCase() === "postpayment" ? true : false}
                                        // helperText="Enter Title"
                                        />
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="apPaymentTerm"/>
                                </Grid>

                                {/* Full Payment */}
                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Full Payment</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="fullPayment"
                                            type="number"
                                            label="Full Payment"
                                            variant={'outlined'}
                                            size="small"
                                            disabled={disablePaymentField ? true : false}
                                            onChange={(event)=>{
                                                
                                                let currentValue = event.target.value;
                                                if(values.paymentType === "Partialpayment")
                                                {
                                                    if(currentValue > 99){
                                                        currentValue = 99;
                                                    }
                                                    setFieldValue("fullPayment", currentValue)
                                                    setFieldValue("advancePayment", (100 - currentValue))
                                                }
                                                
                                            }}
                                        // helperText="Enter Title"
                                        />
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="fullPayment"/>
                                </Grid>
                                {/* Payment Terms */}
                                <Grid
                                    container
                                    direction="row"

                                    spacing={3}
                                >
                                    <Grid container alignItems="center" item xs={2}>
                                        <InputLabelMUI required>Full Payment Terms</InputLabelMUI>
                                    </Grid>
                                    <Grid item xs={4}>

                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="fpPaymentTerm"
                                            type="number"
                                            label="Payment Terms"
                                            variant={'outlined'}
                                            size="small"
                                            disabled={values.paymentType.toLowerCase() === "prepayment" ? true : false}
                                        // helperText="Enter Title"
                                        />
                                    </Grid>
                                    <ErrorMessage component={ErrorMessageTextWrapper} name="fpPaymentTerm"/>
                                </Grid>


                                <Grid item xs>

                                    <SubmitButtonWrapper
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                        size="large"
                                        // onClick={onSubmit(values)}
                                    >
                                        Create Contract
                                    </SubmitButtonWrapper>
                                </Grid>
                            </CardContent>
                        </MuiPickersUtilsProvider>

                        {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                    </Form>
                )}
                }
            </Formik>

        </AddVendorFormWrapper>
    )
}
