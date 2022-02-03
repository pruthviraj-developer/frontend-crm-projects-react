import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Colors } from '@hs/utils';
import { Button, MenuItem, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { ChecksBalanceTableToolbarProps } from './ISelectableTable';

const modifyQuantityFormValidation = Yup.object().shape({
  action: Yup.mixed().required('Please select action type'),
  is_percentage_type: Yup.mixed().required('Please select update type'),
  value: Yup.number()
    .required('Please enter value')
    .positive()
    .typeError('Please enter only numbers')
    .when('is_percentage_type', {
      is: 'true',
      then: Yup.number(),
      otherwise: Yup.number().integer(),
    }),
});

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
  })
);

export const ChecksBalanceTableToolbar = (
  props: ChecksBalanceTableToolbarProps
) => {
  const classes = useToolbarStyles();
  const { numSelected, rowsSelected } = props;
  const [modifyQuantityForm, showModifyQuantityForm] = useState<boolean>(false);
  const cancelSelected = () => {
    props.deleteColumn &&
      props.deleteColumn({
        action_type: 'cancel',
        decreased_by: null,
        increased_by: null,
        is_percentage_type: null,
        skus: rowsSelected,
      });
  };

  const approveSelected = () => {
    props.exportColumn &&
      props.exportColumn({
        action_type: 'approve',
        decreased_by: null,
        increased_by: null,
        is_percentage_type: null,
        skus: rowsSelected,
      });
  };

  const modifySelected = (data) => {
    props.modifySelectedColumns &&
      props.modifySelectedColumns({
        action_type: 'modify',
        decreased_by: data.action === 'decreased_by' ? data.value : null,
        increased_by: data.action === 'increased_by' ? data.value : null,
        is_percentage_type: data.is_percentage_type,
        skus: rowsSelected,
      });
  };

  const showFilters = () => {
    props.showFilters && props.showFilters(true);
  };

  const dropDownList = [
    {
      name: 'action',
      label: 'Action Type',
      defaultValue: '',
      options: [
        { display: 'Increase By', value: 'increased_by' },
        { display: 'Decrease By', value: 'decreased_by' },
      ],
    },
    {
      name: 'is_percentage_type',
      label: 'Update Type',
      defaultValue: '',
      options: [
        { display: 'Percentage', value: 'true' },
        { display: 'Number', value: 'false' },
      ],
    },
  ];

  useEffect(() => {
    showModifyQuantityForm(false);
  }, [numSelected]);

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <>
            <Typography
              className={classes.title}
              color={'primary'}
              variant="h4"
              component="div"
              align="left"
            >
              {numSelected} Selected
            </Typography>
            <div className="actions">
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10 }}
                onClick={() => {
                  showModifyQuantityForm(!modifyQuantityForm);
                }}
              >
                Modify Quantity
              </Button>
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 10 }}
                onClick={cancelSelected}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 10 }}
                onClick={approveSelected}
              >
                Approve
              </Button>
            </div>
          </>
        ) : (
          <>
            <Typography
              className={classes.title}
              color={'primary'}
              variant="h5"
              component="div"
              align="left"
            >
              Select Rows
            </Typography>
            <Tooltip title="Filter list" onClick={showFilters}>
              <IconButton aria-label="filter list">
                <FilterListIcon
                  style={{ color: Colors.PINK[500], fontSize: 24 }}
                />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
      {modifyQuantityForm && (
        <Formik
          initialValues={{ action: '', is_percentage_type: '', value: '' }}
          validationSchema={modifyQuantityFormValidation}
          onSubmit={(values, { setSubmitting }) => {
            modifySelected({ ...values, action_type: 'modify' });
            setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                {dropDownList.map((listObject, index) => {
                  return (
                    <Grid item xs={2} key={listObject.name}>
                      <Field
                        select
                        variant={'outlined'}
                        name={listObject.name}
                        label={listObject.label}
                        component={TextField}
                        type="text"
                        inputProps={{
                          id: `ol-select-type-${index}`,
                        }}
                        fullWidth
                      >
                        {listObject?.options?.map((item: any, lindex) => (
                          <MenuItem key={lindex} value={item.value}>
                            {item.display}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                  );
                })}
                <Grid item xs={1}>
                  <Field
                    component={TextField}
                    name="value"
                    type="text"
                    label="Value"
                    variant={'outlined'}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    size="large"
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      padding: '14px 10px',
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
