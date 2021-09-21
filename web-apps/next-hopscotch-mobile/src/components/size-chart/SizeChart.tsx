import type { NextPage } from 'next';
import { SizeChartPopup } from '@hs/components';
import { productDetailsService } from '@hs/services';
import { useState, useEffect, useRef, FC } from 'react';
import { useModal } from 'react-hooks-use-modal';

import { ISizeComponentProps } from '@/types';
const SUCCESS = 'success';
const SizeChart: FC<ISizeComponentProps> = ({ productName, id, response }: ISizeComponentProps) => {
  const [Modal, open, close] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const onSizeChartClick = () => {
    (async () => {
      try {
        const sizesData: ISizeChartProps = await productDetailsService.getSizes(id);
        if (sizesData.action === SUCCESS) {
          console.log(sizesData);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    open();
  };

  return (
    <Modal>
      <SizeChartPopup onClickClose={close}></SizeChartPopup>
    </Modal>
  );
};

export default SizeChart;
