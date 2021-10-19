import React, { FC } from 'react';
import {
  ISizeChartPopup,
  SizeChartDTOListEntity,
  SizeChartParameterValueDTOListEntity,
} from './ISizeChartPopup';
import {
  SizeChartWrapper,
  SizeChartHeaderWrapper,
  SizeChartHeader,
  SizeChartHeaderTitle,
  SizeChartHeaderProductName,
  SizeChartHeaderCloseIcon,
  SizeChartCloseIcon,
  SizeChartBody,
  SizeChartDetailsWrapper,
  SizeChartDetailImage,
  SizeChartDetailImages,
  ChartDetailImageIllustration,
  ImageLink,
  SizeTableWrapper,
  SizeOptionTypeLengthOrWidthHeader,
  SizeOptionType,
  SizeTable,
  SizeTableDetail,
  SizeTableBody,
  SizeTableRow,
  SizeTableRowTableData,
  SizeTips,
  SizeTipsTitle,
  SizeTipsList,
  SizeTipsListItem,
} from './StyledSizeChartPopup';
import { IconClose } from '@hs/icons';
export const SizeChartPopup: FC<ISizeChartPopup> = ({
  onClickClose,
  sizeChartData,
  productName,
  chartTableData,
  setLength,
  setWeight,
  showWeightBlock = [],
  showLengthBlock = [],
  isLengthActive = [],
  isWeightActive = [],
}: ISizeChartPopup) => {
  return (
    <SizeChartWrapper>
      <SizeChartHeaderWrapper>
        <SizeChartHeader>
          <SizeChartHeaderTitle>SIZE CHART</SizeChartHeaderTitle>
          <SizeChartHeaderCloseIcon
            onClick={() => {
              onClickClose();
            }}
          >
            <SizeChartCloseIcon icon={IconClose} />
          </SizeChartHeaderCloseIcon>
        </SizeChartHeader>
        <SizeChartHeaderProductName>{productName}</SizeChartHeaderProductName>
      </SizeChartHeaderWrapper>
      <SizeChartBody>
        {sizeChartData &&
          sizeChartData.map(
            (sizeChart: SizeChartDTOListEntity, index: number) => {
              return (
                <SizeChartDetailsWrapper key={index}>
                  {sizeChart.illustrationImageUrl && (
                    <SizeChartDetailImages>
                      <SizeChartDetailImage>
                        <ChartDetailImageIllustration
                          src={sizeChart.illustrationImageUrl}
                        />
                        {sizeChart.cueImageUrlList?.map(
                          (cueImg: string, ind: number) => (
                            <ImageLink key={ind} src={cueImg} />
                          )
                        )}
                      </SizeChartDetailImage>
                    </SizeChartDetailImages>
                  )}
                  <SizeTableWrapper>
                    {sizeChart.sizeChartParameterValueDTOList && (
                      <>
                        {showLengthBlock[index] && (
                          <SizeOptionTypeLengthOrWidthHeader>
                            Length:
                            <SizeOptionType
                              onClick={() => {
                                setLength(index, 'cm');
                              }}
                              className={
                                isLengthActive[index] === 'cm' ? 'active' : ''
                              }
                            >
                              cm
                            </SizeOptionType>
                            <SizeOptionType
                              onClick={() => {
                                setLength(index, 'in');
                              }}
                              className={
                                isLengthActive[index] === 'in' ? 'active' : ''
                              }
                            >
                              in
                            </SizeOptionType>
                          </SizeOptionTypeLengthOrWidthHeader>
                        )}
                        {showWeightBlock[index] && (
                          <SizeOptionTypeLengthOrWidthHeader>
                            Weight:
                            <SizeOptionType
                              onClick={() => {
                                setWeight(index, 'kg');
                              }}
                              className={
                                isWeightActive[index] === 'kg' ? 'active' : ''
                              }
                            >
                              kg
                            </SizeOptionType>
                            <SizeOptionType
                              onClick={() => {
                                setWeight(index, 'lb');
                              }}
                              className={
                                isWeightActive[index] === 'lb' ? 'active' : ''
                              }
                            >
                              lb
                            </SizeOptionType>
                          </SizeOptionTypeLengthOrWidthHeader>
                        )}
                      </>
                    )}
                    <SizeTable>
                      <SizeTableDetail>
                        <SizeTableBody>
                          {chartTableData[index] &&
                            chartTableData[index].map(
                              (
                                tableData: SizeChartParameterValueDTOListEntity,
                                inde: number
                              ) => {
                                return (
                                  <SizeTableRow key={inde}>
                                    {tableData.valueList &&
                                      tableData.valueList.map(
                                        (param: string, ind: number) => {
                                          return (
                                            <SizeTableRowTableData key={ind}>
                                              {param}
                                            </SizeTableRowTableData>
                                          );
                                        }
                                      )}
                                  </SizeTableRow>
                                );
                              }
                            )}
                        </SizeTableBody>
                      </SizeTableDetail>
                    </SizeTable>
                  </SizeTableWrapper>
                  {sizeChart.notesList && (
                    <SizeTips>
                      <SizeTipsTitle>
                        Size notes and fitting tips:
                      </SizeTipsTitle>
                      <SizeTipsList>
                        {sizeChart.notesList.map(
                          (notes: string, notesIndex: number) => {
                            return (
                              <SizeTipsListItem key={notesIndex}>
                                {notes}
                              </SizeTipsListItem>
                            );
                          }
                        )}
                      </SizeTipsList>
                    </SizeTips>
                  )}
                </SizeChartDetailsWrapper>
              );
            }
          )}
      </SizeChartBody>
    </SizeChartWrapper>
  );
};
