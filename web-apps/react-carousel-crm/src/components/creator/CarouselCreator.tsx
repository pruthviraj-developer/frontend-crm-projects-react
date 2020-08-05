import React, { FC } from 'react';
import { Button } from '@hs/ui-components';

const CarouselCreator: FC = () => {
  const onClick = (event: React.MouseEvent) => {
    alert(event);
  };

  const buttonProps = {
    value: 'Button',
    className: 'secondary',
  };

  return <div> Test {<Button {...buttonProps} onClick={onClick} />} </div>;
};

export default CarouselCreator;
