import React, { useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { RecommendationTableToolbarProps } from './IDashBoard';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.primary.main,
            backgroundColor: lighten(theme.palette.primary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.dark,
          },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  }),
);

export const RecommendationTableToolbar = (props: RecommendationTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, rowsSelected } = props;

  const runModels = () => {
    props.run &&
      props.run({
        modelIds: rowsSelected,
      });
  };

  const deactivateModels = () => {
    props.deactivate &&
      props.deactivate({
        modelIds: rowsSelected,
      });
  };

  const refresh = () => {
    window.location.reload();
  };

  const showFilters = useCallback(() => {
    if (numSelected) {
      numSelected && props.showFilters && props.showFilters(false);
    } else {
      props.showFilters && props.showFilters(true);
    }
  }, [numSelected, props]);

  useEffect(() => {
    showFilters();
  }, [showFilters]);

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <>
            <Typography className={classes.title} color={'primary'} variant="h4" component="div" align="left">
              {numSelected} Selected
            </Typography>
            <div className="actions">
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10 }}
                onClick={runModels}
              >
                Run
              </Button>
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 10 }}
                onClick={deactivateModels}
              >
                Deactivate
              </Button>
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 10 }}
                onClick={refresh}
              >
                Refresh
              </Button>
            </div>
          </>
        ) : (
          <>
            <Typography className={classes.title} color={'primary'} variant="h5" component="div" align="left">
              Select Rows
            </Typography>
          </>
        )}
      </Toolbar>
    </>
  );
};
