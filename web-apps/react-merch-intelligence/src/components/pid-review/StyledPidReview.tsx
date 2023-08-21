import styled from '@emotion/styled';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  arrowBackIcon: {
    width: '40px',
    height: '32px',
  },
  totalRecords: {
    fontSize: '16px',
    lineHeight: 1.25,
    color: '#333',
    padding: '10px',
  },
  pidReviewContainer: {
    padding: '0 70px',
    marginTop: '90px',
    marginBottom: '90px',
  },
  scrollWrapper: {
    //maxHeight: '95vh',
    //overflow: 'scroll',
    marginLeft: '300px',
  },
  filterWrapper: {
    width: '300px',
    //marginTop: '12px',
    position: 'fixed',
  },
  dashboardText: {
    padding: '10px',
    lineHeight: 1.1,
    color: '#ed54a4',
    fontSize: '18px',
    fontWeight: 600,
  },
  tableContainer: {
    margin: '7px',
  },
  downloadButton: {
    fontWeight: 600,
    fontSize: '14px',
    backgroundColor: '#fff',
    marginRight: '24px',
  },
  count: {
    display: 'flex',
    color: '#000',
  },
  discoveryProductDetails: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#333',
  },
  size: {
    width: '22px',
    height: '22px',
    marginLeft: '22px',
    padding: '8px 7px',
    color: '#000',
    backgroundColor: '#f5f5f5',
  },
  expansionHeader: {
    padding: '0',
  },
  ErrorMessage: {
    display: 'flex',
    position: 'absolute',
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',
    fontSize: '30px',
    left: '50%',
    top: '50%',
    padding: '40px',
    transform: 'translate(-50%, -50%)',
  },
}));

export const PidKeepCullWrapper = styled(Table)`
  td {
    border: 1px solid #a9adb3;
    font-size: 13px;
    padding: 5px;
  }
  td.MuiTableCell-head {
    font-weight: 600;
  }
  td.title {
    background-color: #f3f4f4;
  }
`;

export const SalesMixAndInventoryWrapper = styled(Table)`
  td {
    border: 1px solid #a9adb3;
    font-size: 13px;
    padding: 5px;
  }
  td.MuiTableCell-head {
    font-weight: 600;
    background-color: #f3f4f4;
  }
`;
