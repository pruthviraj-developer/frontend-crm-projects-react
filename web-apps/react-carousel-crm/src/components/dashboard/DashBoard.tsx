/* eslint-disable no-console */
import React, { FC } from 'react';
import { Button } from '@hs/components';
import { HSTable } from '@hs/components';
import { format } from 'date-fns';
import { httpService } from '@hs/services';
const DashBoard: FC = () => {
  const TableData: TableProps = {
    title: 'Table testing',
    columns: [
      { title: 'ID', field: 'id' },
      { title: 'Title', field: 'title' },
      {
        title: 'Sorted By',
        render: (rowData) => {
          if (rowData && rowData.sorts && rowData.sorts.length) {
            return rowData.sorts.join(',');
          }
          return '';
        },
      },
      { title: 'Created By', field: 'createdBy' },
      { title: 'Updated By', field: 'updatedBy' },
      {
        title: 'Created On',
        render: (rowData) => {
          if (rowData && rowData.createdOn) {
            return format(new Date(rowData.createdOn), 'dd-MM-yy');
          }
          return 'NA';
        },
      },
      {
        title: 'Last updated',
        render: (rowData) => {
          if (rowData && rowData.updatedOn) {
            return format(new Date(rowData.updatedOn), 'dd-MM-yy');
          }
          return 'NA';
        },
      },
    ],
    data: [
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
      {
        id: 1,
        title: 'Non Hero Carousel',
        birthYear: 1987,
        birthCity: 63,
        createdBy: 'info@nstechs.com',
        updatedBy: 'ayesha.siddiqa@hopscotch.in',
        updatedOn: '2020-08-17T17:15:17',
        createdOn: '2020-08-11T15:44:07',
        sorts: [
          'Boy 0-1 years',
          'Boy 1-6 years',
          'Boy 6+ years',
          'Girl 0-1 years',
          'Girl 1-6 years',
          'Girl 6+ years',
          'Sale',
          'All',
        ],
      },
    ],
  };
  return (
    <div>
      <h1>DashBoard</h1>
      <Button
        className="primary"
        onClick={() => {
          httpService
            .get({
              url: 'carouselservice/carousel/list',
              params: { pageSize: 20, pageNo: 1 },
            })
            .then((res) => console.log('response==', res))
            .catch((error: Error) => console.log('Reason of failure', error.message));
        }}
        value={'Test APi'}
      >
        Test Button
      </Button>
      <HSTable {...TableData} />
    </div>
  );
};

export default DashBoard;
