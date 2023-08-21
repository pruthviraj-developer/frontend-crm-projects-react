import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  arrowBackIcon: {
    width: '40px',
    height: '32px',
  },
  totalRecords: {
    padding: '10px',
    lineHeight: 1.25,
    color: '#333',
    fontSize: '16px',
  },
  mipLandingContainer: {
    padding: '0 70px',
    marginTop: '90px',
    marginBottom: '90px',
  },
  filterWrapper: {
    width: '300px',
    marginTop: '12px',
  },
  pstGenderContainer: {
    marginTop: '7px',
    overflowY: 'scroll',
    maxHeight: '80vh',
  },
  paginationWrapper: {
    width: '80vw',
    position: 'fixed',
    top: 'auto',
    bottom: 0,
  },
  pagination: {
    padding: '15px',
    display: 'flex',
    justifyContent: 'center',
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
