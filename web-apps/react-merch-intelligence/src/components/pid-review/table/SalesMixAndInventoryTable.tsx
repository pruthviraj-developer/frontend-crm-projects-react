import { TableRow, TableBody, TableCell } from '@material-ui/core';
import { SalesMixAndInventoryWrapper } from '../StyledPidReview';

export const SalesMixAndInventoryTable: any = ({ SalesMixAndInventoryData = [] }) => {
  return (
    <SalesMixAndInventoryWrapper>
      <TableBody>
        {SalesMixAndInventoryData.map((item, index) => {
          return (
            <TableRow key={`SalesMixAndInventory${index}`}>
              <TableCell align="center" className="title" variant={index === 0 ? 'head' : 'body'}>
                {item[0]}
              </TableCell>
              <TableCell align="center" className="title" variant={index === 0 ? 'head' : 'body'}>
                {item[1]}
              </TableCell>
              <TableCell align="center" className="title" variant={index === 0 ? 'head' : 'body'}>
                {item[2]}
              </TableCell>
              <TableCell align="center" variant={index === 0 ? 'head' : 'body'}>
                {item[3]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </SalesMixAndInventoryWrapper>
  );
};
