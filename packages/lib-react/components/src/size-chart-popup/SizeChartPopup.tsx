import React, { FC } from 'react';
import {
  ISizeChartPopup,
  SizeChartDTOListEntity,
  IChartTablePropsEntity,
} from './ISizeChartPopup';
import {
  SizeChartWrapper,
  SizeChartHeaderWrapper,
  SizeChartHeader,
  SizeChartHeaderTitle,
  SizeChartHeaderProductName,
  SizeChartHeaderCloseIcon,
  SizeChartCloseIcon,
  SizeChartDetailsWrapper,
  SizeChartDetailImage,
  SizeChartDetailImages,
  ChartDetailImageIllustration,
  ImageLink,
  SizeTableWrapper,
  SizeOptionTypeLengthHeader,
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
// eslint-disable-next-line no-empty-pattern
export const SizeChartPopup: FC<ISizeChartPopup> = ({
  onClickClose,
  sizeChartData,
  productName,
  chartTableData,
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
            <SizeChartCloseIcon icon={IconClose} fill={'#bbb'} />
          </SizeChartHeaderCloseIcon>
        </SizeChartHeader>
        <SizeChartHeaderProductName>{productName}</SizeChartHeaderProductName>
      </SizeChartHeaderWrapper>
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
                  {/* {sizeChart.sizeChartParameterValueDTOList &&
                    sizeChart.sizeChartParameterValueDTOList.map()} */}
                  <SizeOptionTypeLengthHeader>
                    Length
                    <SizeOptionType>cm</SizeOptionType>
                    <SizeOptionType className={'active'}>in</SizeOptionType>
                  </SizeOptionTypeLengthHeader>
                  <SizeTable>
                    <SizeTableDetail>
                      <SizeTableBody>
                        {chartTableData[index] &&
                          chartTableData[index].map(
                            (
                              tableData: IChartTablePropsEntity,
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
                    <SizeTipsTitle>Size notes and fitting tips:</SizeTipsTitle>
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
    </SizeChartWrapper>
  );
};
