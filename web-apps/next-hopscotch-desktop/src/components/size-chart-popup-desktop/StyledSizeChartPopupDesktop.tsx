import styled from '@emotion/styled';
import { typography, Colors, HsTextAlign } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const SizeChartWrapperDesktop = styled.div`
  font-size: ${typography.size.s1}px;
  line-height: ${typography.size.s2}px;
  font-weight: ${typography.weight.regular};
  background-color: ${Colors.WHITE};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  max-width: 83%;
  margin: auto;
`;

const SizeChartHeaderDesktop = styled.div`
  border-bottom: 1px solid ${Colors.MERCURY};
  position: relative;
`;

const SizeChartHeaderTitleDesktop = styled.div`
  padding: ${typography.size.s3}px 0;
`;

const SizeChartHeaderCloseIconDesktop = styled.div`
  position: absolute;
  right: ${typography.size.s3}px;
  top: ${typography.size.s1}px;
`;

const SizeChartCloseIconDesktop = styled(SvgIcon)`
  fill: #bbb;
`;

const SizeChartHeaderWrapperDesktop = styled.div`
  text-align: ${HsTextAlign.center};
  font-weight: ${typography.weight.medium};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  position: fixed;
  top: 60px;
  width: 100%;
  background: ${Colors.WHITE};
  z-index: 1001;
  max-width: 83%;
  margin: auto;
`;

const SizeChartHeaderProductNameDesktop = styled.div`
  color: ${Colors.GRAY20};
  border-bottom: 1px solid ${Colors.MERCURY};
  padding: ${typography.size.s1}px;
`;

const SizeChartDetailsWrapperDesktop = styled.div``;

const SizeChartDetail = styled.div`
  margin: 8px 0 0;
  border-bottom: 1px solid #e6e6e6;
`;

const SizeChartDetailImagesDesktop = styled.div``;

const SizeChartDetailImageDesktop = styled.div`
  position: relative;
`;

const ChartDetailImageIllustrationDesktop = styled.img`
  position: relative;
  width: 100%;
`;

const ImageLinkDesktop = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const SizeTableWrapperDesktop = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const SizeTableHeader = styled.div`
  padding: ${typography.size.s08}px 0;
`;

const SizeOptionTypeLengthOrWidthHeaderDesktop = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0 8px 12px;
`;

const SizeOptionTypeDesktop = styled.div`
  padding: ${typography.size.s08}px 6px 4px;
  margin: ${typography.size.s08}px;
  color: ${Colors.PINK[500]};
  font-weight: ${typography.weight.regular};
  cursor: pointer;
  &.active {
    border-bottom: 3px solid ${Colors.PINK[500]};
    font-weight: ${typography.weight.medium};
  }
`;

const SizeTableDesktop = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m4}px;
  overflow-x: scroll;
`;

const SizeTableDetail = styled.table`
  margin: ${typography.size.s08}px 0 0 108px;
  text-align: center;
  width: calc(100% - 128px);
  border-collapse: collapse;
  border-spacing: 0;
`;

const SizeTableBody = styled.tbody``;

const SizeTableRow = styled.tr`
  font-weight: ${typography.weight.regular};
  &:first-of-type td {
    background: #f5f5f5;
  }
`;

const SizeTableRowTableData = styled.td`
  font-weight: ${typography.weight.regular};
  background: #fff;
  border: 1px solid #e6e6e6;
  min-width: 120px;
  &:first-of-type {
    position: absolute;
    min-width: 130px;
    left: 0;
  }
`;

const SizeTips = styled.div`
  padding: 16px 0 16px 16px;
`;

const SizeTipsTitle = styled.div`
  font-weight: ${typography.weight.medium};
`;

const SizeTipsList = styled.ul`
  padding-left: 16px;
`;

const SizeTipsListItem = styled.li``;

const SizeChartBodyDesktop = styled.div`
  padding-top: 90px;
`;
export {
  SizeChartWrapperDesktop,
  SizeChartDetail,
  SizeChartDetailImageDesktop,
  SizeChartDetailImagesDesktop,
  SizeChartDetailsWrapperDesktop,
  SizeChartHeaderWrapperDesktop,
  SizeChartHeaderDesktop,
  SizeChartHeaderTitleDesktop,
  SizeChartBodyDesktop,
  SizeChartHeaderCloseIconDesktop,
  SizeChartHeaderProductNameDesktop,
  SizeChartCloseIconDesktop,
  SizeTableWrapperDesktop,
  SizeTableHeader,
  SizeOptionTypeDesktop,
  SizeOptionTypeLengthOrWidthHeaderDesktop,
  ChartDetailImageIllustrationDesktop,
  ImageLinkDesktop,
  SizeTableDesktop,
  SizeTableDetail,
  SizeTableBody,
  SizeTableRow,
  SizeTableRowTableData,
  SizeTips,
  SizeTipsTitle,
  SizeTipsList,
  SizeTipsListItem,
};
