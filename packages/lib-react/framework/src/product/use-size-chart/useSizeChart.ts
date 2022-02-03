import { SizeChartDTOListEntity, ISizeChartProps } from './IUseSizeChart';
import { useState, useEffect } from 'react';
const SUCCESS = 'success';
const CM_TO_INCH = 2.54;
const KG_TO_LB = 2.20462;
export const useSizeChart = ({
  action,
  displayType,
  sizeChartDTOList,
}: ISizeChartProps) => {
  const [chartData, setChartData] = useState<
    SizeChartDTOListEntity[] | undefined
  >([]);
  const [chartTableData, setChartTableData] = useState<any>([]);
  const [isLengthActive, setLengthActive] = useState<Array<string>>([]);
  const [isWeightActive, setWeightActive] = useState<Array<string>>([]);
  const [showWeightBlock, setWeightBlock] = useState<Array<boolean>>([]);
  const [showLengthBlock, setLengthBlock] = useState<Array<boolean>>([]);

  useEffect(() => {
    if (action === SUCCESS) {
      const sizeChartData = sizeChartDTOList;
      const showWeightBlock = [true, true];
      const showLengthBlock = [true, true];
      const isLengthActive: Array<string> = [];
      const isWeightActive: Array<string> = [];
      const tableData: any = [];
      const prepareTableData = () => {
        if (sizeChartData && sizeChartData[0].sizeChartParameterValueDTOList) {
          for (let index = 0; index < sizeChartData.length; index++) {
            if (
              sizeChartData[index] &&
              sizeChartData[index].parameterMeasureTypeList &&
              (sizeChartData[index].parameterMeasureTypeList || '').indexOf(
                'W'
              ) === -1
            ) {
              showWeightBlock[index] = false;
            }
            if (
              sizeChartData[index] &&
              sizeChartData[index].parameterMeasureTypeList &&
              (sizeChartData[index].parameterMeasureTypeList || '').indexOf(
                'L'
              ) === -1
            ) {
              showLengthBlock[index] = false;
            }
            isLengthActive[index] = sizeChartData[index].lengthUnit;
            isWeightActive[index] = sizeChartData[index].weightUnit;
            tableData[index] = [
              {
                valueList: sizeChartData[index].parameterNamesList,
              },
            ];
            if (sizeChartData[index].sizeChartParameterValueDTOList) {
              tableData[index] = tableData[index].concat(
                sizeChartData[index].sizeChartParameterValueDTOList
              );
            }
          }
          setLengthActive(isLengthActive);
          setWeightActive(isWeightActive);
          setWeightBlock(showWeightBlock);
          setLengthBlock(showLengthBlock);
          setChartTableData(tableData);
        }
      };
      prepareTableData();
      setChartData(sizeChartData);
    }
  }, [action, sizeChartDTOList]);

  const convertUnit = (unitType: string, unitIndex: number, index: number) => {
    const sizeChartData = [...(chartData || [])];
    const dto = sizeChartData?.[index]?.sizeChartParameterValueDTOList;
    if (dto?.length) {
      dto?.map(function (row) {
        row.valueList.forEach(function (colValue: string, colIndex: number) {
          const parameterType = sizeChartData[index]
            .parameterMeasureTypeList as unknown as Array<string>;
          if (parameterType && parameterType[colIndex] == unitType) {
            const colArray: any = colValue.replace(/\s/g, '').split('-');
            colArray.forEach(function (rangeValue: any, rangeIndex: number) {
              colArray[rangeIndex] =
                Math.round(rangeValue * unitIndex * 10) / 10;
            });
            row.valueList[colIndex] = colArray.join(' - ');
          }
        });
        return row;
      });
      setChartData(sizeChartData);
    }
  };

  const setWeight = (index: number, unit: string) => {
    if (isWeightActive[index] !== unit) {
      const _converterIndex = unit === 'kg' ? 1 / KG_TO_LB : KG_TO_LB;
      isWeightActive[index] = unit;
      const list = [...isWeightActive];
      list[index] = unit;
      setWeightActive(list);
      convertUnit('W', _converterIndex, index);
    }
  };

  const setLength = (index: number, unit: string) => {
    if (isLengthActive[index] !== unit) {
      const _converterIndex = unit === 'cm' ? CM_TO_INCH : 1 / CM_TO_INCH;
      const list = [...isLengthActive];
      list[index] = unit;
      setLengthActive(list);
      convertUnit('L', _converterIndex, index);
    }
  };

  useEffect(() => {
    if (displayType) {
      if (displayType.type === 'W') {
        setWeight(displayType.index, displayType.unit);
      }
      if (displayType.type === 'L') {
        setLength(displayType.index, displayType.unit);
      }
    }
  }, [displayType]);

  return {
    chartData,
    chartTableData,
    isLengthActive,
    isWeightActive,
    showWeightBlock,
    showLengthBlock,
  };
};
