import { NavLink } from 'react-router-dom';
import { FilterPanDataType } from '@hs-crm/components';

export const FiltersData: FilterPanDataType[] = [
  {
    display: 'Start date',
    key: 'startDate',
    fieldType: 'DatePicker',
  },
  {
    display: 'End date',
    key: 'endDate',
    fieldType: 'DatePicker',
  },
  {
    display: 'Status',
    key: 'modelStatuses',
    multiSelect: true,
    isString: true,
    options: [
      { display: 'Created', key: 'created' },
      { display: 'Running', key: 'running' },
      { display: 'Active', key: 'active' },
    ],
    customCss: {
      minWidth: 350,
      maxWidth: 400,
    },
  },
];

export const ArchivedFiltersData: FilterPanDataType[] = [
  {
    display: 'Start date',
    key: 'startDate',
    fieldType: 'DatePicker',
  },
  {
    display: 'End date',
    key: 'endDate',
    fieldType: 'DatePicker',
  },
];

export const RecommendationOption = {
  display: 'Recommendation Carousel',
  key: 'rcType',
  multiSelect: false,
  isString: true,
  options: [{ display: 'all', key: 'all' }],
};

export const DashboardColumns = [
  {
    id: 'id',
    key: 'id',
    label: 'Id',
    customRender: (row: any, isTitle?: boolean) => {
      if (isTitle) {
        return row.title;
      }
      if (row) {
        return (
          <>
            <NavLink to={{ pathname: `/recommendation/edit/${row.id}` }}>{row.id}</NavLink>
          </>
        );
      }
      return '--';
    },
  },
  {
    id: 'rcType',
    key: 'rcType',
    label: 'Recommendation Carousel',
  },
  {
    id: 'modelName',
    key: 'modelName',
    label: 'Model Name',
  },
  {
    id: 'createdBy',
    key: 'createdBy',
    label: 'Created By',
  },
  {
    id: 'updatedBy',
    key: 'updatedBy',
    label: 'Updated By',
  },

  {
    id: 'createdAt',
    key: 'createdAt',
    label: 'Created',
  },
  {
    id: 'updatedAt',
    key: 'updatedAt',
    label: 'Updated',
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
  },
];
