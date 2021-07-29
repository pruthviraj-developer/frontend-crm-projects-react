import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { IProductsData, IProductTypesList, IProductTypesData } from './IDashboard';
import { useQuery } from 'react-query';
import { buyerService } from '@hs/services';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useTableStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableHeader: {
    fontWeight: 700,
    textAlign: 'center',
  },
  tableRow: {
    textAlign: 'center',
    padding: '8px 5px',
  },
  pidTitle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  imagesLink: {
    textDecoration: 'none',
  },
  productDetails: {
    padding: '10px 25px',
  },
  productDetailsP0: {
    padding: 0,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const HsTableRow: FC<IProductsData> = (props: IProductsData) => {
  const classes = useTableStyles();
  const [product_type_id, setProductType] = React.useState('');
  const {
    data: productDetails,
    isSuccess: isProductDetailsSuccess,
    isFetching: isProductDetailsFetching,
  } = useQuery<IProductTypesList, Record<string, string>>(
    ['productDetails', product_type_id],
    () => buyerService.getTableData({ action: 'buyerDashboardDetailedInfo', product_type_id }),
    {
      staleTime: Infinity,
      retry: false,
      enabled: product_type_id !== '',
    },
  );

  const productDetailsColumn = [
    'Sl No',
    'MSKU Name',
    'PT',
    'Gender',
    'Age Class',
    'Price Bucket',
    'Target Width',
    'Current Width',
    'Max Width',
    'NEW PID required',
    'Discovery required',
  ];

  const showValue = (value: string | number) => {
    return value != null ? value : 'NA';
  };

  return (
    <>
      <TableRow>
        <TableCell
          className={clsx(classes.pidTitle, classes.tableRow)}
          onClick={() => setProductType(product_type_id === props.pid ? '' : props.pid)}
        >
          {props.pid}
          <IconButton aria-label="expand row" size="medium">
            {product_type_id === props.pid ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tableRow}>{props.ptName}</TableCell>
        <TableCell className={classes.tableRow}>{props.pstCount}</TableCell>
        <TableCell className={classes.tableRow}>{props.mskuCount}</TableCell>
        <TableCell className={classes.tableRow}>{props.totalGap}</TableCell>
        <TableCell className={classes.tableRow}>
          <Link
            to={{
              pathname: `/buyer/images/${props.pid}`,
              state: props.imgUrls || [],
            }}
            className={classes.imagesLink}
          >
            <Button type="button" color="primary" variant="outlined" size="large">
              Images
            </Button>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={product_type_id === props.pid ? classes.productDetails : classes.productDetailsP0}
          colSpan={6}
        >
          {isProductDetailsSuccess && productDetails?.data?.totalRecords != 0 && (
            <Collapse in={product_type_id === props.pid} timeout="auto" unmountOnExit>
              <Box>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {productDetailsColumn.map((title: string) => (
                        <TableCell key={title} className={classes.tableHeader}>
                          {title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productDetails?.data?.records?.map((details: IProductTypesData) => (
                      <TableRow key={details.mskuId}>
                        <TableCell className={classes.tableRow}>{details.mskuId}</TableCell>
                        <TableCell className={classes.tableRow}>{details.mskuName}</TableCell>
                        <TableCell className={classes.tableRow}>{details.ptName}</TableCell>
                        <TableCell className={classes.tableRow}>{showValue(details.gender)}</TableCell>
                        <TableCell className={classes.tableRow}>{details.ageClass}</TableCell>
                        <TableCell className={classes.tableRow}>{details.priceBucket}</TableCell>
                        <TableCell className={classes.tableRow}>{showValue(details.targetWidth)}</TableCell>
                        <TableCell className={classes.tableRow}>{showValue(details.currentWidth)}</TableCell>
                        <TableCell className={classes.tableRow}>{showValue(details.maxWidth)}</TableCell>
                        <TableCell className={classes.tableRow}>{showValue(details.pidRequired)}</TableCell>
                        <TableCell className={classes.tableRow}>{showValue(details.discoveryRequired)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          )}
          {isProductDetailsFetching && <h5 className={classes.loading}>Loading...</h5>}
          {isProductDetailsSuccess && productDetails?.data?.totalRecords === 0 && <h5>No data</h5>}
        </TableCell>
      </TableRow>
    </>
  );
};

export default HsTableRow;
