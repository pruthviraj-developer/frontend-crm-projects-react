import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { FilterSelect } from './FilterSelect';
import { DatePickerComponent } from './DatePickerComponent';
import { Textfield } from './Textfield';
import { FilterPanProps, FilterPanDataType } from './IFilterPan';

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

const FilterPan = ({ data, onChange }: FilterPanProps) => {
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

  const getFilter = (
    fieldType: FilterPanDataType['fieldType'] = 'SelectBox',
    index: number,
    eachFilter: FilterPanDataType
  ) => {
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

      case 'SelectBox':
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
            data.map((eachFilter: FilterPanDataType, index: number) =>
              getFilter(eachFilter.fieldType, index, eachFilter)
            )}
        </Grid>
      </form>
    </Paper>
  );
};

export { FilterPan };
