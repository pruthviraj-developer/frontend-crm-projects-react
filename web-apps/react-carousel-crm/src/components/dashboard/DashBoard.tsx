/* eslint-disable no-console */
import React, { FC } from 'react';
import { Button } from '@hs/ui-components';
import { httpService } from '@hs/services';
const DashBoard: FC = () => {
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
    </div>
  );
};

export default DashBoard;
