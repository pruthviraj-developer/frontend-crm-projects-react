import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: 500,
  },
  select: {
    color: '#000',
    fontSize: '13px',
    padding: 10,
  },
  list: {
    padding: 0,
  },
  itemValue: {
    fontSize: '14px',
    color: '#000',
    width: 500,
  },
  dropdown: {
    width: '300px',
    position: 'relative',
    zIndex: 11,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    background: '#fff',
  },
  dropdownMenu: {
    margin: 0,
    padding: 0,
    border: 'solid 1px rgba(112, 112, 112, 0.4)',
    position: 'absolute',
    background: '#fff',
    width: '300px',
  },
  defaultText: {
    fontSize: '14px',
    lineHeight: 1.14,
    color: '#707070',
  },
  sortByText: {
    fontWeight: 600,
    margin: '0 5px',
  },
  sortButton: {
    backgroundColor: '#fff',
    padding: '8px 12px',
    borderRadius: '4px',
    border: 'solid 1px rgba(112, 112, 112, 0.4)',
  },
  sortByIcon: {
    verticalAlign: 'bottom',
  },
}));
