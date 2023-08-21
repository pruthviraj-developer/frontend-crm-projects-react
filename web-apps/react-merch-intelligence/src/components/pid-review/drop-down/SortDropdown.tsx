import React, { useState, useEffect } from 'react';
import { useStyles } from './StyledDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const SortDropdown = ({ sortingOptions, updateSort }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const [sortName, setSortName] = useState('');

  useEffect(() => {
    sortingOptions.forEach((list: any) => {
      if (list.isSelected) {
        setSortName(list.sortName);
      }
    });
  }, [sortName, sortingOptions]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.dropdown} onMouseEnter={handleToggle} onMouseLeave={handleToggle}>
      <div className={classes.sortButton}>
        <span className={classes.defaultText}>
          Sort by High To Low:
          <span className={classes.sortByText}>{sortName}</span>
          <KeyboardArrowDownIcon fontSize="large" className={classes.sortByIcon} />
        </span>
      </div>
      {isOpen && (
        <ul className={classes.dropdownMenu}>
          {sortingOptions.map((list: any) => {
            return (
              <MenuItem key={list.orderRule} value={list.orderRule} onClick={(e) => updateSort(list.orderRule)}>
                {list.sortName}
              </MenuItem>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
