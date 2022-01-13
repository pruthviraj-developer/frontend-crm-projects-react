import React, { FC } from 'react';
import {
  ISizeChartPopup,
  SizeChartDTOListEntity,
  SizeChartParameterValueDTOListEntity,
} from '../ISizeChartPopup';
import {
  SizeChartWrapperDesktop,
  SizeChartHeaderWrapperDesktop,
  SizeChartHeaderDesktop,
  SizeChartHeaderTitleDesktop,
  SizeChartHeaderProductNameDesktop,
  SizeChartHeaderCloseIconDesktop,
  SizeChartCloseIconDesktop,
  SizeChartBodyDesktop,
  SizeChartDetailsWrapperDesktop,
  SizeChartDetailImageDesktop,
  SizeChartDetailImagesDesktop,
  ChartDetailImageIllustrationDesktop,
  ImageLinkDesktop,
  SizeTableWrapperDesktop,
  SizeOptionTypeLengthOrWidthHeaderDesktop,
  SizeOptionTypeDesktop,
  SizeTableDesktop,
  SizeTableDetail,
  SizeTableBody,
  SizeTableRow,
  SizeTableRowTableData,
  SizeTips,
  SizeTipsTitle,
  SizeTipsList,
  SizeTipsListItem,
} from './StyledSizeChartPopupDesktop';
import { IconClose } from '@hs/icons';
export const SizeChartPopupDesktop: FC<ISizeChartPopup> = ({
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
    <SizeChartWrapperDesktop>
      <SizeChartHeaderWrapperDesktop>
        <SizeChartHeaderDesktop>
          <SizeChartHeaderTitleDesktop>SIZE CHART</SizeChartHeaderTitleDesktop>
          <SizeChartHeaderCloseIconDesktop
            onClick={() => {
              onClickClose();
            }}
          >
            <SizeChartCloseIconDesktop icon={IconClose} />
          </SizeChartHeaderCloseIconDesktop>
        </SizeChartHeaderDesktop>
      </SizeChartHeaderWrapperDesktop>
      <SizeChartBodyDesktop>
        {sizeChartData &&
          sizeChartData.map(
            (sizeChart: SizeChartDTOListEntity, index: number) => {
              return (
                <SizeChartDetailsWrapperDesktop key={index}>
                  {sizeChart.illustrationImageUrl && (
                    <SizeChartDetailImagesDesktop>
                      <SizeChartDetailImageDesktop>
                        <ChartDetailImageIllustrationDesktop
                          src={sizeChart.illustrationImageUrl}
                        />
                        {sizeChart.cueImageUrlList?.map(
                          (cueImg: string, ind: number) => (
                            <ImageLinkDesktop key={ind} src={cueImg} />
                          )
                        )}
                      </SizeChartDetailImageDesktop>
                    </SizeChartDetailImagesDesktop>
                  )}
                  <SizeTableWrapperDesktop>
                    {index === 0 && (
                      <SizeChartHeaderProductNameDesktop>
                        {productName}
                      </SizeChartHeaderProductNameDesktop>
                    )}
                    {sizeChart.sizeChartParameterValueDTOList && (
                      <>
                        {showLengthBlock[index] && (
                          <SizeOptionTypeLengthOrWidthHeaderDesktop>
                            Length:
                            <SizeOptionTypeDesktop
                              onClick={() => {
                                setLength(index, 'cm');
                              }}
                              className={
                                isLengthActive[index] === 'cm' ? 'active' : ''
                              }
                            >
                              cm
                            </SizeOptionTypeDesktop>
                            <SizeOptionTypeDesktop
                              onClick={() => {
                                setLength(index, 'in');
                              }}
                              className={
                                isLengthActive[index] === 'in' ? 'active' : ''
                              }
                            >
                              in
                            </SizeOptionTypeDesktop>
                          </SizeOptionTypeLengthOrWidthHeaderDesktop>
                        )}
                        {showWeightBlock[index] && (
                          <SizeOptionTypeLengthOrWidthHeaderDesktop>
                            Weight:
                            <SizeOptionTypeDesktop
                              onClick={() => {
                                setWeight(index, 'kg');
                              }}
                              className={
                                isWeightActive[index] === 'kg' ? 'active' : ''
                              }
                            >
                              kg
                            </SizeOptionTypeDesktop>
                            <SizeOptionTypeDesktop
                              onClick={() => {
                                setWeight(index, 'lb');
                              }}
                              className={
                                isWeightActive[index] === 'lb' ? 'active' : ''
                              }
                            >
                              lb
                            </SizeOptionTypeDesktop>
                          </SizeOptionTypeLengthOrWidthHeaderDesktop>
                        )}
                      </>
                    )}

                    <SizeTableDesktop>
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
                    </SizeTableDesktop>
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
                  </SizeTableWrapperDesktop>
                </SizeChartDetailsWrapperDesktop>
              );
            }
          )}
      </SizeChartBodyDesktop>
    </SizeChartWrapperDesktop>
  );
};
