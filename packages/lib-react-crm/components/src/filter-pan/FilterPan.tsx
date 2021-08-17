import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { FilterSelect } from './FilterSelect';
import { DatePickerComponent } from './DatePickerComponent';
import { Textfield } from './Textfield';
import { FilterProps, DataType } from './IFilterPan';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      width: '100%',
    },
  })
);

const FilterPan = ({ data, onChange }: FilterProps) => {
  const classes = useStyles();
  const [selectedFilter, setSelectedFilter] = useState({});

  const handleFilterChange = (filter) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      ...filter,
    }));
  };

  useEffect(() => {
    const postData = {};
    Object.keys(selectedFilter).forEach((eachItem: string) => {
      if (selectedFilter[eachItem] !== undefined) {
        postData[eachItem] = selectedFilter[eachItem];
      } else {
        delete postData[eachItem];
      }
    });

    onChange(postData);
  }, [selectedFilter]);

  const getFilter = (fieldType: string, index, eachFilter) => {
    switch (fieldType) {
      case 'InputText':
        return (
          <Textfield
            key={eachFilter.key + index}
            filter={eachFilter}
            selectedFilter={selectedFilter[eachFilter.key]}
            setSelectedFilter={handleFilterChange}
          />
        );

      case 'DatePicker':
        return (
          <DatePickerComponent
            key={eachFilter.key + index}
            filter={eachFilter}
            selectedFilter={selectedFilter[eachFilter.key]}
            setSelectedFilter={handleFilterChange}
          />
        );

      default:
        return (
          <FilterSelect
            key={eachFilter.key + index}
            filter={eachFilter}
            selectedFilter={selectedFilter[eachFilter.key]}
            setSelectedFilter={handleFilterChange}
          />
        );
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off">
        <Grid direction="row" container spacing={3}>
          {data &&
            data.map((eachFilter: DataType, index: number) =>
              getFilter(eachFilter.fieldType, index, eachFilter)
            )}
        </Grid>
      </form>
    </Paper>
  );
};

export { FilterPan };
