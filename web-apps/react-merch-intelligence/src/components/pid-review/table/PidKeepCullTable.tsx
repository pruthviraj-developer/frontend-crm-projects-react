import { TableRow, TableBody, TableCell } from '@material-ui/core';
import { PidKeepCullWrapper } from '../StyledPidReview';

export const PidKeepCullTable: any = ({ targetCurrentWidthData = [], keepCullData = [] }) => {
  return (
    <PidKeepCullWrapper>
      <TableBody>
        {targetCurrentWidthData.map((item, index) => {
          return (
            <TableRow key={`targetCurrentWidthData${index}`}>
              <TableCell align="center" variant="head" className="title">
                {item[0]}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {item[1]}
              </TableCell>
            </TableRow>
          );
        })}
        {keepCullData.map((item, index) => {
          return (
            <TableRow key={`keepCullData${index}`}>
              <TableCell align="center" variant="head" className="title">
                {item[0]}
              </TableCell>
              <TableCell align="center" variant={index === 0 ? 'head' : 'body'}>
                {item[1]}
              </TableCell>
              <TableCell align="center" variant={index === 0 ? 'head' : 'body'}>
                {item[2]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </PidKeepCullWrapper>
  );
};
