import React, { FC } from 'react';
import { ISizeChartPopup } from './ISizeChartPopup';
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
} from './StyledSizeChartPopup';
import { IconClose } from '@hs/icons';
export const SizeChartPopup: FC<ISizeChartPopup> = ({}: ISizeChartPopup) => {
  return (
    <SizeChartWrapper>
      <SizeChartHeaderWrapper>
        <SizeChartHeader>
          <SizeChartHeaderTitle>SIZE CHART</SizeChartHeaderTitle>
          <SizeChartHeaderCloseIcon>
            <SizeChartCloseIcon icon={IconClose} fill={'#bbb'} />
          </SizeChartHeaderCloseIcon>
        </SizeChartHeader>
        <SizeChartHeaderProductName>
          Black Solid Jeans
        </SizeChartHeaderProductName>
      </SizeChartHeaderWrapper>
      <SizeChartDetailsWrapper>
        <SizeChartDetailImages>
          <SizeChartDetailImage>
            <ChartDetailImageIllustration src="https://static.hopscotch.in/fstatic/product/201507/472d2b7a-7975-4987-8b4f-3f8047596c58_full.png?version=1436881619676" />
            <ImageLink src="https://static.hopscotch.in/fstatic/product/201507/0f961c44-681a-48ed-bef7-ff9712c7af66_full.png?version=1437372200395" />
            <ImageLink src="https://static.hopscotch.in/fstatic/product/201507/ed6f256e-b839-4974-95ea-4cc5280ecfa0_full.png?version=1437372205447" />
          </SizeChartDetailImage>
        </SizeChartDetailImages>
        <SizeTableWrapper>
          <SizeOptionTypeLengthHeader>
            Length
            <SizeOptionType>cm</SizeOptionType>
            <SizeOptionType className={'active'}>in</SizeOptionType>
          </SizeOptionTypeLengthHeader>
          <SizeTable>
            <SizeTableDetail>
              <SizeTableBody>
                <SizeTableRow>
                  <SizeTableRowTableData>Fixed1</SizeTableRowTableData>
                  <SizeTableRowTableData>Fixed2</SizeTableRowTableData>
                  <SizeTableRowTableData>Fixed3</SizeTableRowTableData>
                  <SizeTableRowTableData>Fixed4</SizeTableRowTableData>
                  <SizeTableRowTableData>Age</SizeTableRowTableData>
                  <SizeTableRowTableData>Length</SizeTableRowTableData>
                  <SizeTableRowTableData>Size</SizeTableRowTableData>
                  <SizeTableRowTableData>Age</SizeTableRowTableData>
                  <SizeTableRowTableData>Length</SizeTableRowTableData>
                  <SizeTableRowTableData>Waist</SizeTableRowTableData>
                </SizeTableRow>
                <SizeTableRow>
                  <SizeTableRowTableData>90</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>90</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>16.5</SizeTableRowTableData>
                  <SizeTableRowTableData>2-3 years</SizeTableRowTableData>
                  <SizeTableRowTableData>20.5</SizeTableRowTableData>
                  <SizeTableRowTableData>15</SizeTableRowTableData>
                </SizeTableRow>
                <SizeTableRow>
                  <SizeTableRowTableData>100</SizeTableRowTableData>
                  <SizeTableRowTableData>3-4 years</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>90</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>16.5</SizeTableRowTableData>
                  <SizeTableRowTableData>21.5</SizeTableRowTableData>
                  <SizeTableRowTableData>15.7</SizeTableRowTableData>
                </SizeTableRow>
                <SizeTableRow>
                  <SizeTableRowTableData>110</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>16.5</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>90</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>16.5</SizeTableRowTableData>
                </SizeTableRow>
                <SizeTableRow>
                  <SizeTableRowTableData>120</SizeTableRowTableData>
                  <SizeTableRowTableData>5-6 years</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>16.5</SizeTableRowTableData>
                  <SizeTableRowTableData>26.4</SizeTableRowTableData>
                  <SizeTableRowTableData>17.3</SizeTableRowTableData>
                  <SizeTableRowTableData>90</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                </SizeTableRow>
                <SizeTableRow>
                  <SizeTableRowTableData>130</SizeTableRowTableData>
                  <SizeTableRowTableData>6-7 years</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                  <SizeTableRowTableData>16.5</SizeTableRowTableData>
                  <SizeTableRowTableData>26.4</SizeTableRowTableData>
                  <SizeTableRowTableData>17.3</SizeTableRowTableData>
                  <SizeTableRowTableData>90</SizeTableRowTableData>
                  <SizeTableRowTableData>4-5 years</SizeTableRowTableData>
                  <SizeTableRowTableData>24</SizeTableRowTableData>
                </SizeTableRow>
              </SizeTableBody>
            </SizeTableDetail>
          </SizeTable>
        </SizeTableWrapper>
      </SizeChartDetailsWrapper>
      {/* .size-tips */}
    </SizeChartWrapper>
  );
};
