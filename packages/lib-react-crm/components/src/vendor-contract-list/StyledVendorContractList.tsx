import styled from '@emotion/styled';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import { Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

export const VendorContractTableWrapper = styled.div`
    
`

export const TableWrapperMUI = styled(Table)`
    
`;

export const TBodyWrapperMUI = styled(TableBody)`
    
`;

export const THeadWrapperMUI = styled(TableHead)`
    
`;

export const TableCellMUI = styled(TableCell)`
    
`;

export const TableRowMUI = styled(TableRow)`
    .MuiTableCell-head{
        font-weight: 800 !important;
        padding: 15px 10px !important;
    }
    .MuiTableCell-root{
      font-size: 12px !important;
      
    }
    .MuiTableCell-body{
      padding: 5px 10px;
    }
`;

// export const ToggleSwitchMUI = styled(Switch)(({  }) => ({
//     padding: 8,
//     '& .MuiSwitch-track': {
//       borderRadius: 22 / 2,
//       '&:before, &:after': {
//         content: '""',
//         position: 'absolute',
//         top: '50%',
//         transform: 'translateY(-50%)',
//         width: 'auto',
//         height: 16,
//       },
//       '&:before': {
//         content: '""yes" !important"' ,
//         color: '#fff',
//         left: 12,
//       },
//       '&:after': {
//         content: '""no" !important"' ,
//         right: 12,
//         color: 'white'
//       },
//     },
//     '& .MuiSwitch-thumb': {
//       boxShadow: 'none',
//       width: 16,
//       height: 16,
//       margin: 2,
//     },
//   }));`
//   .MuiSwitch-colorPrimary.Mui-checked{
//     color: white;
//   }
// `


export const ToggleSwitchMUI = withStyles(() => ({
  root: {
    width: 58,
    height: 24,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 3,
    color: 'grey',
    '&$checked': {
      transform: 'translateX(34px)',
      color: `#fff`,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
    },
  },
  thumb: {
    width: 18,
    height: 18,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid grey`,
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: `#fff`,
    height: `calc(100% - 2px)`,
  },
  checked: {},
}))(Switch);

export const ToggleSwitchLabel = styled.label`
  width: 60px;
  display: inline-block;
  text-align: center;
  font-size: 10px;
`

export const PaymentDetailsWrapper = styled.div`
  cursor: pointer;
  color: #007bff;
`

// Popup CSSS
export const PopupDetailsWrapper = styled.div`
  padding: 20px 20px;
  background-color: #fff;
`

export const PopupContentWrapper = styled.div`
  color: #000;
  font-size: 12px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
`

export const PopupTextHead = styled.span`
  font-weight: 600;
  &::after{
    content: ':';
  }
`

export const PopupText = styled.span`
  font-weight: 400;
  margin-left: 5px;
`
export const PopupTextWrapper = styled.div`
  margin: 5px 15px;
  flex: calc( 50% - 40px);
`

export const PopupTableWrapper = styled.div`
   margin-top: 60px;
   max-height: 120px;
   overflow-y: auto;
   .MuiTableCell-head{
     border-color: #000 !important;
   }
`
// Popup CSS End