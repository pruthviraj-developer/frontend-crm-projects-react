import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { TableCellStyle } from './Style';

const receivedSkidDetails = [
  {
    key: 'oldSkid',
    label: 'OldSkid',
    customCss: {
      fontWeight: 'bold',
      minWidth: '100px',
      maxWidth: '100px',
      wordWrap: 'break-word',
    },
  },
  {
    key: 'newSkid',
    label: 'NewSkid',
    customCss: {
      fontWeight: 'bold',
      minWidth: '100px',
      maxWidth: '100px',
      wordWrap: 'break-word',
    },
  },
  {
    key: 'receivingZone',
    label: 'ReceivingZone',
    customCss: {
      fontWeight: 'bold',
      minWidth: '100px',
      maxWidth: '100px',
      wordWrap: 'break-word',
    },
  },
  {
    key: 'putawayBy',
    label: 'PutawayBy',
    customCss: {
      fontWeight: 'bold',
      minWidth: '150px',
      maxWidth: '150px',
      wordWrap: 'break-word',
    },
  },
  {
    key: 'receivedBy',
    label: 'ReceivedBy',
    customCss: {
      fontWeight: 'bold',
      minWidth: '150px',
      maxWidth: '150px',
      wordWrap: 'break-word',
    },
  },
];

export const HopscotchColumns = [
  {
    id: 'orderId',
    key: 'orderId',
    label: 'Order ID',
  },
  {
    id: 'rmaNo',
    key: 'rmaNo',
    label: 'RMA',
  },
  {
    id: 'trackingNumber',
    key: 'trackingNumber',
    label: 'Tracking Number',
  },
  {
    id: 'courierPartner',
    key: 'courierPartner',
    label: 'Courier Partner',
  },
  {
    id: 'hsku',
    key: 'hsku',
    label: 'HSKU',
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    label: 'Warehouse',
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
  },
  {
    id: 'lastUpdatedDate',
    key: 'lastUpdatedDate',
    label: 'Date',
    minWidth: '70px',
  },
  {
    id: 'totalUnits',
    key: 'totalUnits',
    label: 'Total Units',
  },
  {
    id: 'returnedUnits',
    key: 'returnedUnits',
    label: 'Return Units',
  },
  {
    id: 'returnType',
    key: 'returnType',
    label: 'Return/Rejected',
    minWidth: '70px',
  },
  {
    id: 'returnReason',
    key: 'returnReason',
    label: 'Return Reason',
    minWidth: '100px',
  },
  {
    id: 'receivedSkidDetails',
    key: 'receivedSkidDetails',
    padding: '0',
    customHeader: () => {
      return (
        <Table key={'receivedSkidDetails'}>
          <TableHead>
            <TableCellStyle
              colSpan={5}
              align="center"
              style={{
                fontWeight: 'bold',
              }}
            >
              Received Skid Details
            </TableCellStyle>
          </TableHead>
          <TableHead>
            {receivedSkidDetails.map((column: any) => (
              <TableCellStyle style={column.customCss}>{column.label}</TableCellStyle>
            ))}
          </TableHead>
        </Table>
      );
    },
    customRender: (row: any, isTitle?: boolean) => {
      if (isTitle) {
        return row.title;
      }
      if (row) {
        return (
          <>
            <Table key={row.id}>
              <TableBody>
                {row.receivedSkidDetails &&
                  row.receivedSkidDetails.map((childRow: any, index: any) => (
                    <TableRow>
                      <TableCellStyle
                        style={{
                          minWidth: '100px',
                          maxWidth: '100px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.oldSkid ? childRow.oldSkid : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '100px',
                          maxWidth: '100px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.newSkid ? childRow.newSkid : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '100px',
                          maxWidth: '100px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.receivingZone ? childRow.receivingZone : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '150px',
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.putawayBy ? childRow.putawayBy : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '150px',
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.receivedBy ? childRow.receivedBy : '-'}
                      </TableCellStyle>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        );
      }
      return '--';
    },
    label: 'Received Skid Details',
  },
];

export const MarketPlaceColumns = [
  {
    id: 'orderId',
    key: 'orderId',
    label: 'Order ID',
  },
  {
    id: 'rmaNo',
    key: 'rmaNo',
    label: 'RMA',
  },
  {
    id: 'trackingNumber',
    key: 'trackingNumber',
    label: 'Tracking Number',
  },
  {
    id: 'courierPartner',
    key: 'courierPartner',
    label: 'Courier Partner',
  },
  {
    id: 'hsku',
    key: 'hsku',
    label: 'HSKU',
  },
  {
    id: 'displayOrderCode',
    key: 'displayOrderCode',
    label: 'Display Order Code',
  },
  {
    id: 'place',
    key: 'place',
    label: 'Place',
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    label: 'Warehouse',
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
  },
  {
    id: 'lastUpdatedDate',
    key: 'lastUpdatedDate',
    label: 'Date',
    minWidth: '70px',
  },
  {
    id: 'totalUnits',
    key: 'totalUnits',
    label: 'Total Units',
  },
  {
    id: 'returnedUnits',
    key: 'returnedUnits',
    label: 'Return Units',
  },
  {
    id: 'returnType',
    key: 'returnType',
    label: 'Return/Rejected',
    minWidth: '70px',
  },
  {
    id: 'returnReason',
    key: 'returnReason',
    label: 'Return Reason',
    minWidth: '100px',
  },
  {
    id: 'receivedSkidDetails',
    key: 'receivedSkidDetails',
    padding: '0',
    customHeader: () => {
      return (
        <Table key={'receivedSkidDetails'}>
          <TableHead>
            <TableCellStyle
              colSpan={5}
              align="center"
              style={{
                fontWeight: 'bold',
              }}
            >
              Received Skid Details
            </TableCellStyle>
          </TableHead>
          <TableHead>
            {receivedSkidDetails.map((column: any) => (
              <TableCellStyle style={column.customCss}>{column.label}</TableCellStyle>
            ))}
          </TableHead>
        </Table>
      );
    },
    customRender: (row: any, isTitle?: boolean) => {
      if (isTitle) {
        return row.title;
      }
      if (row) {
        return (
          <>
            <Table key={row.id}>
              <TableBody>
                {row.receivedSkidDetails &&
                  row.receivedSkidDetails.map((childRow: any, index: any) => (
                    <TableRow>
                      <TableCellStyle
                        style={{
                          minWidth: '100px',
                          maxWidth: '100px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.oldSkid ? childRow.oldSkid : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '100px',
                          maxWidth: '100px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.newSkid ? childRow.newSkid : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '100px',
                          maxWidth: '100px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.receivingZone ? childRow.receivingZone : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '150px',
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.putawayBy ? childRow.putawayBy : '-'}
                      </TableCellStyle>
                      <TableCellStyle
                        style={{
                          minWidth: '150px',
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                          borderBottom: row.receivedSkidDetails.length - 1 === index ? '0' : '',
                        }}
                      >
                        {childRow.receivedBy ? childRow.receivedBy : '-'}
                      </TableCellStyle>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        );
      }
      return '--';
    },
    label: 'Received Skid Details',
  },
];
