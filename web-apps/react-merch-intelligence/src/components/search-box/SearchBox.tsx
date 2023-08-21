import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    float: 'right',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '15px',
  },
  iconButton: {
    padding: 10,
  },
}));

interface ISearchBox {
  onInputChange: (data: string) => void;
}

const SearchBox = ({ onInputChange }: ISearchBox) => {
  const classes = useStyles();
  const handleInputChange = debounce((event: any) => {
    const value = event.target.value;
    onInputChange(value);
  }, 500);

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="PID Search..."
        inputProps={{ 'aria-label': 'PID Search' }}
        autoFocus
        onChange={handleInputChange}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
