import React, { FC } from 'react';
import { HSTable } from './HsTable';

export default {
  title: 'Tables',
};

const TableProps = {
  title: 'Table testing',
};

export const TableComponent: FC = () => <HSTable {...TableProps} />;
