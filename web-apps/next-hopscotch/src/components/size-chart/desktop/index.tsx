import { SizeChartPopupDesktop } from '@hs/components';
import { ISizeChartProps } from '@/types';
import { productDetailsService } from '@hs/services';
import { useState, FC } from 'react';
import { ISizeChartDtoProps, IDisplayType } from '../ISizeChart';
import { useQuery } from 'react-query';
import { useSizeChart } from '@hs/framework';

const SizeChart: FC<ISizeChartDtoProps> = ({ productName, id, closeSizeChartPopup }: ISizeChartDtoProps) => {
  const [displayType, setDisplayType] = useState<IDisplayType>();
  const { data: sizesData } = useQuery<ISizeChartProps>(
    ['sizeChartData', id],
    () => productDetailsService.getSizes(id),
    {
      enabled: id !== undefined,
    },
  );

  const { chartData, chartTableData, isLengthActive, isWeightActive, showWeightBlock, showLengthBlock } = useSizeChart({
    ...sizesData,
    displayType,
  });

  return (
    <SizeChartPopupDesktop
      {...{
        productName,
        onClickClose: closeSizeChartPopup,
        sizeChartData: chartData,
        chartTableData,
        setLength: (index: number, unit: string) => {
          setDisplayType({ index, unit, type: 'L' });
        },
        setWeight: (index: number, unit: string) => {
          setDisplayType({ index, unit, type: 'W' });
        },
        showWeightBlock,
        showLengthBlock,
        isLengthActive,
        isWeightActive,
      }}
    ></SizeChartPopupDesktop>
  );
};

export default SizeChart;
