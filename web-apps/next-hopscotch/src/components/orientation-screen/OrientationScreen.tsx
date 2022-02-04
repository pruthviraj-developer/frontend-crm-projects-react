import { FC } from 'react';

import {
  OrientationScreenWrapper,
  OrientationDescription,
  OrientationMessage,
  OrientationIcon,
  Orientation,
  Details,
} from './StyledOrientationScreen';
import { RotateScreenIcon } from '@hs/icons';
const OrientationScreen: FC = () => {
  return (
    <OrientationScreenWrapper>
      <Orientation>
        <OrientationIcon icon={RotateScreenIcon} />
        <Details>
          <OrientationMessage>Rotate your device for a great experience</OrientationMessage>
          <OrientationDescription>
            We currently do not support landscape mode. Please rotate your device back to portrait mode.
          </OrientationDescription>
        </Details>
      </Orientation>
    </OrientationScreenWrapper>
  );
};

export default OrientationScreen;
